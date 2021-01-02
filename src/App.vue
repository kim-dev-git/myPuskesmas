<template>
  <v-app>
    <router-view :user="user" />
    <the-bottom-nav v-show="bottomNavCondition" />
    <the-alert />
  </v-app>
</template>

<script>
import TheAlert from './components/Others/TheAlert.vue';
import TheBottomNav from './components/Others/TheBottomNav.vue';

export default {
  components: { TheBottomNav, TheAlert },
  name: 'App',

  data: () => ({
    //
  }),
  
  computed: {
    user () {
      return this.$store.state.user.user
    },
    path () {
      return this.$route.path
    },
    lastPath () {
      return this.path.split('/').pop()
    },
    bottomNavCondition () {
      // return this.user &&
      //   this.lastPath !== 'tambah' &&
      //   this.lastPath !== 'edit'
      let arr = this.path.split('/')
      
      return this.user && arr.length < 3
    }
  }
};
</script>
