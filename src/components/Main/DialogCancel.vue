<template>
  <div>
    <v-bottom-sheet id="form"
      :persistent="loading"
      v-if="!status"
      v-model="model"
    >
      <v-card>
        <v-layout
          column
        >
          <v-layout id="header"
            row
            wrap
            class="pa-6 align-center"
          >
            <span v-text="'Batalkan Antrian'" class="font-weight-bold" />
            <v-spacer />
            <v-btn
              small
              depressed
              :disabled="!reason"
              :loading="loading"
              color="error"
              @click="submit ()"
            >
              <span v-text="'Batalkan Antrian'" class="text-none" />
            </v-btn>
          </v-layout>

          <v-divider />

          <span v-text="'Antrian anda'" class="mx-3 my-2 text-none" />

          <v-card
            flat
            class="pa-2 mx-3"
            color="grey lighten-3"
          >
            <v-layout
              v-if="queue"
              row
              wrap
              class="mx-3 ma-1"
            >
              <span v-text="queue.queueNumber" class="font-weight-bold" />
              <v-spacer />
              <span v-text="queue.poli" />
            </v-layout>
          </v-card>
          
          <v-textarea
            v-model="reason"
            label="Alasan membatalkan antrian"
            hint="Contoh: Salah ambil antrian, ada urusan mendadak, dsj"
            outlined
            auto-grow
            autofocus
            rows="2"
            class="mt-4 mx-3"
          />

        </v-layout>
      </v-card>
    </v-bottom-sheet>

    <dialog-alert
      v-model="alertModel"
      :status="status"
      @close="reset ()"
    />
  </div>
</template>

<script>
import { toInputDate, toDate } from '../../filters/date'
import DialogAlert from '../Others/DialogAlert.vue'
import DialogButtonSubmit from '../Others/DialogButtonSubmit.vue'
export default {
  components: {
    DialogButtonSubmit,
    DialogAlert,
  },
  props: {
    value: {
      type: Boolean
    },
    onSubmit: {
      type: String
    },
    queue: {
      type: Object
    },
  },
  data: () => ({
    model: null,
    alertModel: false,
    inputModel: null,
    status: null,
    reason: null,
  }),
  computed: {
    loading () {
      return this.$store.state.loading === 'POST'
    },
  },
  methods: {
    toInputDate,
    toDate,
    submit () {

      let payload = {
        reason: this.reason
      }
      let queue = this.queue
      
      this.$store.dispatch(this.onSubmit, { payload, queue })
        .then(res => {
          if (res.status) {
            this.status = res.status
          }
        })
    },
    reset () {
      this.alertModel = false
      this.model = false
      this.selectedPoli = null
      this.complaint = null
      this.status = null
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (v) {
          this.model = v
        }
      }
    },
    model (v) {
      this.$emit('input', v)
    },
  },
}
</script>

<style>

</style>