import { db, auth, serverTimestamp, provider } from '../services/firebase'
import router from '../router'

const END_POINT = 'users'
const ref = db.collection(END_POINT)

const state = {
  users: [],
  user: null,
  registerRole: null,
  formPatient: [
    {
      label: 'NIK',
      value: 'nik',
      type: 'number',
    },
    {
      label: 'Nama',
      value: 'displayName',
      type: 'text',
    },
    {
      label: 'Email',
      value: 'email',
      type: 'email',
      disabled: true,
    },
    {
      label: 'No. Telp',
      value: 'phoneNumber',
      type: 'number',
    },
    {
      label: 'Tanggal Lahir',
      value: 'birthDate',
      type: 'date',
    },
    {
      label: 'Tempat Lahir',
      value: 'birthPlace',
      type: 'text',
    },
    {
      label: 'Jenis Kelamin',
      value: 'gender',
      type: 'select',
      options: [
        { text: 'Laki-laki', value: 'Laki-laki' },
        { text: 'Perempuan', value: 'Perempuan' },
      ]
    },
    {
      label: 'Agama',
      value: 'religion',
      type: 'select',
      options: [
        { text: 'Islam', value: 'Islam' },
        { text: 'Protestan', value: 'Protestan' },
        { text: 'Katolik', value: 'Katolik' },
        { text: 'Hindu', value: 'Hindu' },
        { text: 'Buddha', value: 'Buddha' },
        { text: 'Konghucu', value: 'Konghucu' },
      ]
    },
    {
      label: 'Status Perkawinan',
      value: 'married',
      type: 'select',
      options: [
        { text: 'Menikah', value: 'Menikah' },
        { text: 'Belum Menikah', value: 'Belum Menikah' },
      ]
    },
    {
      label: 'Alamat',
      value: 'address',
      type: 'textarea',
    },
    {
      label: 'Desa',
      value: 'village',
      type: 'autocomplete',
      itemText: 'text',
      options: [
        { text: 'Antasan Segera', abbr: 'AS' },
        { text: 'Puntik Luar', abbr: 'PL' },
        { text: 'Pantai Hambawang', abbr: 'PH' },
        { text: 'Bangkit Baru', abbr: 'BB' },
        { text: 'Tatah Alayung', abbr: 'TA' },
        { text: 'Tanipah', abbr: 'TN' },
        { text: 'Tabing Rimbah', abbr: 'TR' },
        { text: 'Karang Indah', abbr: 'KI' },
        { text: 'Karang Bunga', abbr: 'KB' },
        { text: 'Lok Rawa', abbr: 'LR' },
      ]
    },
    {
      label: 'No BPJS',
      value: 'noBPJS',
      type: 'number',
    },
  ]
}

const getters = {
  authenticated (state) {
    return state.user
  },
  userData (state) {
    let user = state.user
    return {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    }
  }
}

const mutations = {
  SET_USER: (state, data) => {
    state.user = data
  },
  SET_USERS: (state, { data }) => {
    state.users = data
  },
  SET_REGISTER_ROLE: (state, data) => {
    state.registerRole = data
  },
}

const actions = {
  async checkUserExists ({ commit, dispatch, state }, u) {
    const user = ref.doc(u.uid)

    commit('SET_LOADING', 'GET', { root: true  })
    
    await user.get().then(async (doc) => {
      if(doc.exists) {
        commit('SET_USER', doc.data())
        await dispatch('getUser', u.uid)

        commit('SET_LOADING', null, { root: true  })
      } else {

        u.currentQueue = null
        u.role = state.registerRole
        u.createdAt = serverTimestamp()

        await user.set(u)
        await dispatch('getUser', u.uid)

        router.push('/profil')

        commit('SET_LOADING', null, { root: true  })
        // location.reload()
      }
    })

  },
  async getUser ({ commit }, uid ) {
    const user = ref.doc(uid)
    
    commit('SET_LOADING', 'GET', { root: true  })

    // const data = (await user.get()).data()

    // console.log('run')
    user.onSnapshot(snap => {
      commit('SET_USER', snap.data())
    })

    
    commit('SET_LOADING', null, { root: true  })
  },
  async authGoogle ({ commit }) {
    commit('SET_LOADING', 'GET', { root: true  })
    await auth.signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var firebaseUser = result.user;
      commit('SET_LOADING', null, { root: true  })
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // this.errorMessage = errorMessage
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      commit('SET_LOADING', null, { root: true  })
      // ...
    })
  },
  async signOut({ commit }) {
    await auth.signOut()
    commit('SET_USER', null)
    router.push('/masuk')
  },
  async put ({ commit, state, dispatch }, { payload }) {
    commit('SET_LOADING', 'POST', { root: true  })

    try {
      let { uid } = state.user
      await ref.doc(uid).set(payload, { merge: true })
      commit('SET_LOADING', null, { root: true  })
      // await dispatch('getUser', uid)

      return { status: 'success' }
    } catch (err) {
      console.error(err)
      commit('SET_LOADING', null, { root: true  })
      return { status: 'error' }
    }
  }
}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}