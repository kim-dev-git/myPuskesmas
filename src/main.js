import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueDebounce from 'vue-debounce'
import { auth } from './services/firebase'

Vue.use(vueDebounce, {
  lock: false,
  listenTo: 'input',
  defaultTime: '700ms',
  fireOnEmpty: true
})

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
