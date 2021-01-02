<template>
  <div>
    <v-skeleton-loader
      :loading="!loading"
      type="card-heading, image"
      max-height="200"
    >
      <span v-text="'Antrian Anda'" class="font-weight-bold" />
      <v-card
        v-if="queue"
        class="mt-2 pa-4"
      >
        <v-layout
          row
          wrap
          class="mx-2 my-1 align-center"
        >
          <v-layout
            column
            class="align-start"
          >
            <span v-text="'Umum'" class="text--secondary" />
            <span v-text="queue.queueNumber" class="headline font-weight-bold" />
          </v-layout>

          <v-spacer />

          <span v-text="queue.poli" class="headline" />
        </v-layout>
        <v-divider class="my-2" />

        <p
          v-html="'Tekan tombol <b>Tampilkan Kode QR</b> dan arahkan ke kamera pada komputer loket untuk melakukan pemeriksaan sesuai poli tujuan'"
          class="mb-2 text--disabled text-center body-2"
        />

        <v-divider class="my-2" />

        <v-layout
          class="pt-2 justify-end"
        >
          <v-btn
            small
            outlined
            color="error"
            style="opacity: .8"
            @click="onCancel ()"
          >
            <v-icon v-text="'mdi-close'" left />
            <span v-text="'Batalkan Antrian'" />
          </v-btn>
        </v-layout>

      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  props: {
    queue: {
      type: Object
    },
    user: {
      type: Object
    },
  },
  computed: {
    loading () {
      let state = this.$store.state.loading === 'GET'
      return !state && this.queue
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>

</style>