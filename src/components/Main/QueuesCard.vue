<template>
  <div>
    <span v-text="title" class="font-weight-bold" />
    <v-card
      v-if="items"
      class="mt-2 py-2"
    >
      <v-layout
        row
        wrap
        class="ma-3"
      >
        <v-layout
          column
          class="align-center"
        >
          <p
            v-text="'Total Antrian'"
            class="mb-0 text--secondary"
          />
          <p
            v-text="items.length"
            class="mb-0 title"
          />
        </v-layout>
        <v-divider vertical />
        <v-layout
          column
          class="align-center"
        >
          <p
            v-text="'Antrian Terkini'"
            class="mb-0 text--secondary"
          />
          <p
            v-text="completed[completed.length - 1] ? completed[completed.length - 1].queueNumber : '-'"
            class="mb-0 title"
          />
        </v-layout>
        <v-divider vertical />
        <v-layout
          column
          class="align-center"
        >
          <p
            v-text="'Telah Dilayani'"
            class="mb-0 text--secondary"
          />
          <p
            v-text="completed.length"
            class="mb-0 title"
          />
        </v-layout>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    queues: {
      type: String
    },
  },
  computed: {
    title () {
      let title
      switch (this.queues) {
        case 'queueA':
          title = 'Gigi dan Mulut'
          break;
        case 'queueB':
          title = 'Umum'
          break;
        case 'queueC':
          title = 'KIA (Ibu dan Anak)'
          break;
      
        default:
          break;
      }

      return 'Poli ' + title
    },
    items () {
      let items = this.$store.getters['queue/' + this.queues]
      return items.filter(v => v.status !== 'Dibatalkan')
    },
    completed () {
      return this.items.filter(v => v.status !== 'Dalam Antrian' && v.status !== 'Dibatalkan')
    },
    onQueue () {
      return this.items.filter(v => v.status === 'Dalam Antrian')
    },
    onProgress () {
      return this.items.filter(v => v.status === 'Sedang Diperiksa')
    },
  }
}
</script>

<style>

</style>