<template>
  <div>
    <v-bottom-sheet id="form"
      :persistent="loading"
      v-if="!status && queue"
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
            <span v-text="label" class="font-weight-bold" />
            <v-spacer />
            <v-btn
              icon
              @click="model = false"
            >
              <v-icon v-text="'mdi-close'" />
            </v-btn>
          </v-layout>
          <v-divider />

          <v-layout
            column
            class="px-3 align-center"
          >
            <p
              v-text="'Arahkan Kode QR ke kamera untuk melakukan daftar pemeriksaan'"
              class="mb-o mt-4 text-center text--secondary"
            />

            <qrcode
              :value="queue.id"
              :options="{ width: 240 }"
              class="mt-n4"
            />

            <v-card
              flat
              outlined
              class="ma-4 mt-0 mb-8"
              width="100%"
            >
              <v-layout
                row
                wrap
                class="pa-4 ma-0 align-center grey lighten-4"
              >
                <span v-text="queue.poli" class="font-weight-bold" />
                <v-spacer />
                <span v-text="queue.createdAt.seconds" class="text--secondary" />
              </v-layout>
              <v-layout
                class="pa-4"
              >
                <span v-text="queue.complaint" />
              </v-layout>
            </v-card>
          </v-layout>
          

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
import qrcode from '@chenfengyuan/vue-qrcode';
import DialogAlert from './DialogAlert.vue'
import DialogButtonSubmit from './DialogButtonSubmit.vue'
export default {
  components: {
    qrcode,
    DialogButtonSubmit,
    DialogAlert,
  },
  props: {
    value: {
      type: Boolean
    },
    label: {
      type: String,
      default: 'Kode QR'
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
    alertModel: null,
    inputModel: null,
    status: null,
    selectedPoli: null,
    complaint: null,
  }),
  computed: {
    loading () {
      return this.$store.state.loading === 'POST'
    },
    poli () {
      return this.$store.state.poli
    },
    active () {
      return this.selectedPoli !== null && this.complaint !== null
    }
  },
  methods: {
    toInputDate,
    toDate,
    selectPoli (item) {
      this.selectedPoli = item
    },
    submit () {

      let payload = {
        poli: this.selectedPoli,
        complaint: this.complaint
      }
      
      this.$store.dispatch(this.onSubmit, { payload })
        .then(res => {
          if (res.status === 'success') {
            this.status = 'success'
          } else {
            this.status = 'error'
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