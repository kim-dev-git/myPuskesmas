<template>
  <div>
    <the-navbar>
      <template slot="left-side">
        <v-layout
          row
          wrap
          class="pl-6 align-center"
        >
          <the-logo :height="32" />
          <span class="ml-3 title" v-text="'myPuskes'" />
        </v-layout>
      </template>
      <template slot="right-side">
        <the-avatar v-if="user" :image="user.photoURL" :size="40" class="mr-3" @click="gotoProfile ()" />
      </template>
    </the-navbar>

    <the-layout>
      <v-layout
        v-if="user.currentQueue"
        class="py-2 grey lighten-3"
      >
        <v-container>
          <queue-card :queue="queue" :user="user" @cancel="dialogCancel = true" />
        </v-container>
      </v-layout>
      <v-container
        class="pb-15"
      >
        <queues-card queues="queueA" class="my-4" />
        <v-divider />
        <queues-card queues="queueB" class="my-4" />
        <v-divider />
        <queues-card queues="queueC" class="my-4" />
        <v-divider />
      </v-container>
    </the-layout>

    <v-btn id="button-show-qr"
      v-if="user.currentQueue"
      fixed
      bottom
      right
      rounded
      color="primary"
      class="mb-14"
      @click="dialogQr = true"
    >
      <span v-text="'Tampilkan Kode QR'" class="text-none" />
    </v-btn>
    <v-btn id="button-get-queue"
      v-else
      fixed
      bottom
      right
      rounded
      color="primary"
      class="mb-14"
      @click="dialogQueue = true"
    >
      <span v-text="'Ambil Antrian'" class="text-none" />
    </v-btn>

    <dialog-queue
      v-model="dialogQueue"
      label="Ambil Antrian"
      onSubmit="queue/post"
    />
    <dialog-qr-code
      v-model="dialogQr"
      :queue="queue"
    />
    <dialog-cancel
      v-model="dialogCancel"
      :queue="queue"
      onSubmit="queue/cancel"
    />
  </div>
</template>

<script>
import DialogCancel from '../components/Main/DialogCancel.vue'
import QueueCard from '../components/Main/QueueCard.vue'
import QueuesCard from '../components/Main/QueuesCard.vue'
import DialogQrCode from '../components/Others/DialogQrCode.vue'
import DialogQueue from '../components/Others/DialogQueue.vue'
import TheAvatar from '../components/Others/TheAvatar.vue'
import TheLayout from '../components/Others/TheLayout.vue'
import TheLogo from '../components/Others/TheLogo.vue'
import TheNavbar from '../components/Others/TheNavbar.vue'
export default {
  components: { TheNavbar, TheLayout, TheLogo, TheAvatar, DialogQueue, QueueCard, QueuesCard, DialogQrCode, DialogCancel },
  props: {
    user: {
      type: Object
    }
  },
  data: () => ({
    dialogQr: null,
    dialogQueue: null,
    dialogCancel: false,
  }),
  computed: {
    queue () {
      return this.$store.state.queue.queue
    }
  },
  methods: {
    gotoProfile () {
      this.$router.push('profil')
    },
    init () {
      this.$store.dispatch('queue/getToday')
    }
  },
  created () {
    this.init ()
  },
  watch: {
    user: {
      immediate: true,
      handler (user) {
        if (user) {
          if (user.currentQueue) {
            if (!this.queue) {
              setTimeout(() => {
                this.$store.dispatch('queue/get', { id: user.currentQueue })
              }, 1000)
            }
          } else {
            this.$store.commit('queue/SET_QUEUE', { data: null })
          }
        }
      }
    }
  }
}
</script>

<style>

</style>