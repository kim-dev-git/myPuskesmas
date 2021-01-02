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
            <span v-text="label" class="font-weight-bold" />
            <v-spacer />
            <dialog-button-submit
              :loading="loading"
              :disabled="!active"
              @click="submit ()"
            />
          </v-layout>
          <v-divider />
          
          <span v-text="'Poli tujuan'" class="mx-3 mt-2 mb-n1 font-weight-bold text--secondary" />
          <v-layout
            row
            wrap
            class="pa-5"
          >
            <template
              v-for="(item, index) in poli"
            >
              <v-btn
                :key="'item-' + index"
                v-text="item"
                outlined
                small
                class="ma-1 text-none"
                :style="item === selectedPoli ? 'opacity: 1' : 'opacity: .64'"
                @click="selectPoli (item)"
              />
            </template>
          </v-layout>

          <v-textarea
            v-if="selectedPoli"
            v-model="complaint"
            label="Keluhan"
            outlined
            auto-grow
            :autofocus="selectedPoli !== null"
            rows="3"
            class="mx-3"
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
import DialogAlert from './DialogAlert.vue'
import DialogButtonSubmit from './DialogButtonSubmit.vue'
export default {
  components: {
    DialogButtonSubmit,
    DialogAlert,
  },
  props: {
    value: {
      type: Boolean
    },
    label: {
      type: String,
      default: 'Ambil Antrian'
    },
    onSubmit: {
      type: String
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