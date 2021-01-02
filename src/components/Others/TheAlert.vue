<template>
  <div>
    <transition name="bounce">
      <v-layout
        v-if="model"
        column
        class="white"
        style="
          z-index: 99;
          position: fixed;
          top: 0;
          height: 100vh;
          width: 100%;
        "
      >

        <v-layout
          column
          class="align-center justify-center"
        >
          <div
            class="px-6"
          >
            <sweetalert-icon
              :icon="!loading && notification ? notification.type : 'loading'"
              class="mt-n15"
            />

            <p
              v-text="text"
              class="headline font-weight-bold text-center"
            />

            <p
              v-if="notification"
              v-text="notification.text"
              class="text--secondary text-center"
            />
          </div>

        </v-layout>

        <v-layout
          v-if="!loading"
          column
          style="
            position: absolute;
            bottom: 0;
            width: 100%;
          "
        >
          <v-divider />

          <v-btn
            text
            x-large
            block
            color="primary"
            @click="onClose ()"
          >
            <span v-text="'Tutup'" class="font-weight-bold" />
          </v-btn>
        </v-layout>
      </v-layout>
    </transition>
  </div>
</template>

<script>

import SweetalertIcon from 'vue-sweetalert-icons'

export default {
  components: {
    SweetalertIcon,
  },
  computed: {
    notification () {
      return this.$store.state.alertData
    },
    model () {
      return this.$store.state.alertModel
    },
    loading () {
      return this.$store.state.loading === 'POST'
    },
    text () {
      let loading = this.loading
      let error = this.$store.state.error

      if (loading) {
        return 'Memproses...'
      } else {
        if (error) {
          return 'Terjadi kesalahan!'
        } else {
          return 'Berhasil!'
        }
      }
    }
  },
  methods: {
    onClose () {
      this.$store.commit('CLEAR_ALERT')
    }
  }
}
</script>

<style lang="scss" scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
    }
    55% {
      transform: scale(1.04);
      opacity: .9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>