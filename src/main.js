import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from './services/firebase'

Vue.config.productionTip = false


Vue.config.productionTip = false

let app
auth.onAuthStateChanged(async (firebaseUser) => {

  if(firebaseUser) {
    const u = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      email: firebaseUser.email,
    }
    await store.dispatch('user/checkUserExists', u)
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
