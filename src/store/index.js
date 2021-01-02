import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import queue from './queue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    queue,
  },
  state: {
    loading: null,
    error: null,
    alertModel: false,
    alertData: null,
    poli: [
      'Gigi dan Mulut',
      'Umum',
      'KIA (Ibu dan Anak)',
    ]
  },
  mutations: {
    SET_ALERT: (state, data) => {
      state.alertData = data
      state.loading = null
    },
    CLEAR_ALERT: (state) => {
      state.alertData = null
      state.loading = null
      state.alertModel = false
      state.error = null
    },
    SET_ALERT_MODEL: (state, data) => {
      state.alertModel = data
    },
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    SET_ERROR: (state, { error }) => {
      state.error = error
      state.loading = null
    },
    CLEAR_ERROR: (state) => {
      state.error = null
    }
  },
  actions: {
  }
})
