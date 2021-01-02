<template>
  <div>
    <v-bottom-navigation
      grow
      app
      v-model="active"
      color="primary"
    >
      <v-layout
        height="100%"
        width="100%"
        class="align-center justify-center"
      >
        <template
          v-for="(nav, index) in navList"
        >
          <v-btn
            :key="'nav-' + index"
            :exact="nav.link === '/'"
            text
            :value="nav.value"
            :to="nav.link"
            height="100%"
            :style="active !== nav.value ? 'opacity: .64' : ''"
          >
            <span v-text="nav.text" />

            <v-icon v-text="active === nav.value ? nav.icon : nav.icon + '-outline'" />
          </v-btn>
        </template>
      </v-layout>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: null,
    navList: [
      { text: 'Utama', icon: 'mdi-home', value: 'dashboard', link: '/' },
      { text: 'Riwayat', icon: 'mdi-clipboard-list', value: 'history', link: '/riwayat' },
      { text: 'Keluarga', icon: 'mdi-account-group', value: 'family', link: '/keluarga' },
    ]
  })
}
</script>

<style>

</style>