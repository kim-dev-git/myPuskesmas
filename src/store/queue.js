import { db, serverTimestamp, } from '../services/firebase'

const END_POINT = 'queues'
const ref = db.collection(END_POINT)

const state = {
  queues: [],
  queuesToday: [],
  queue: null,
}

const getters = {
  queueA (state) {
    let queues = state.queuesToday
    let poli = 'Gigi dan Mulut'

    return queues.filter(q => q.poli === poli)
  },
  queueB (state) {
    let queues = state.queuesToday
    let poli = 'Umum'

    return queues.filter(q => q.poli === poli)
  },
  queueC (state) {
    let queues = state.queuesToday
    let poli = 'KIA (Ibu dan Anak)'

    return queues.filter(q => q.poli === poli)
  },
}

const mutations = {
  SET_QUEUE: (state, { data }) => {
    state.queue = data
  },
  SET_QUEUES: (state, { data }) => {
    state.queues = data
  },
  SET_QUEUES_TODAY: (state, { data }) => {
    state.queuesToday = data
  },
}

const actions = {
  async getToday ({ commit }) {
    commit('SET_LOADING', 'GET', { root: true  })

    try {
      let today = new Date()
      today.setHours(0,0,0,0)
      let tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      let start = today
      let end = tomorrow
      let field = 'createdAt'
      let query = ref
                  .where(field, '>=', start)
                  .where(field, '<=', end)
                  .orderBy(field, 'asc')

      await query.onSnapshot(snap => {
        const response = []
        if(!snap.docs.length) return
        snap.docs.forEach(doc => {
          var obj = doc.data()
          obj.id = doc.id
          response.push(obj)
        })
        commit('SET_QUEUES_TODAY', { data: response })
      })
    } catch (err) {
      console.log(err)
    } finally {
      commit('SET_LOADING', null, { root: true  })
    }
  },
  async get ({ commit }, { id }) {
    commit('SET_LOADING', 'GET', { root: true  })

    try {
      if (id) {
        let query = ref.doc(id)
        let data = (await query.get()).data()
        data.id = id
        commit('SET_QUEUE', { data })
      } else {
        let query = ref
        const data = []
        let { docs } = await query.get()
        docs.forEach(doc => {
          var obj = doc.data()
          obj.id = doc.id
          data.push(obj)
        })
        commit('SET_QUEUES', { data })
      }

    } catch (err) {
      console.error(err)
      return { status: 'error' }
    } finally {
      commit('SET_LOADING', null, { root: true  })
    }
  },
  async post ({ commit, rootGetters }, { payload }) {
    commit('SET_LOADING', 'POST', { root: true  })

    try {
      let user = rootGetters['user/userData']
      let batch = db.batch()
      let newRef = ref.doc()
      let userRef = db.collection('users').doc(user.uid)
      payload = Object.assign({}, payload, user)

      let queueNumber
      let queueType
      switch (payload.poli) {
        case 'Gigi dan Mulut':
          queueType = 'A'
          break;
        case 'Umum':
          queueType = 'B'
          break;
        case 'KIA (Ibu dan Anak)':
          queueType = 'C'
          break;
        default:
          break;
      }
      
      let queueToday = rootGetters['queue/queue' + queueType]
      queueNumber = queueType + String(queueToday.length + 1).padStart(2, '0')

      payload.queueNumber = queueNumber
      payload.createdAt = serverTimestamp ()
      payload.status = 'Dalam Antrian'

      batch.set(newRef, payload)
      batch.set(userRef, {
        currentQueue: newRef.id
      }, { merge: true })
      batch.commit()

      commit('SET_LOADING', null, { root: true  })

      return { status: 'success' }
    } catch (err) {
      console.error(err)
      commit('SET_LOADING', null, { root: true  })
      return { status: 'error' }
    }
  },
  async cancel ({ commit, rootGetters }, { payload, user, queue }) {
    commit('SET_LOADING', 'POST', { root: true  })

    if (!user) {
      user = rootGetters['user/userData']
    }

    try {
      let batch = db.batch()
      let userRef = db.collection('users').doc(user.uid)
      let queueRef = ref.doc(queue.id)
      payload.status = 'Dibatalkan'

      batch.set(userRef, { currentQueue: null }, { merge: true })
      batch.set(queueRef, payload, { merge: true })
      batch.commit()

      commit('SET_LOADING', null, { root: true  })

      return { status: 'success' }
    } catch (err) {
      commit('SET_LOADING', null, { root: true  })
      console.error(err)
      return { status: 'error' }
    }
  }
  // async put ({ commit, state, dispatch }, { payload }) {
  //   commit('SET_LOADING', 'POST', { root: true  })

  //   try {
  //     let { uid } = state.user
  //     await ref.doc(uid).set(payload, { merge: true })
  //     commit('SET_LOADING', null, { root: true  })
  //     await dispatch('getUser', uid)

  //     return { status: 'success' }
  //   } catch (err) {
  //     console.error(err)
  //     commit('SET_LOADING', null, { root: true  })
  //     return { status: 'error' }
  //   }
  // }
}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}