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
            <span v-text="'Hapus Dari Keluarga'" class="font-weight-bold" />
            <v-spacer />
            <v-btn
              small
              depressed
              :loading="loading"
              color="error"
              @click="submit ()"
            >
              <span v-text="'Hapus'" class="text-none" />
            </v-btn>
          </v-layout>

          <v-divider />

          <span v-text="'Data Keluarga'" class="mx-3 my-2 text-none" />

          <v-card
            flat
            class="pa-2 mx-3 mb-4"
            color="grey lighten-3"
          >
            <v-layout
              v-if="data"
              row
              wrap
              class="mx-3 ma-1 align-center"
            >
              <the-avatar :image="data.photoURL" :size="48" />
              <v-spacer />
              <v-layout
                column
                class="align-end"
              >
                <span v-text="data.displayName" class="font-weight-bold" />
                <span v-text="data.nik" class="text--secondary" />
              </v-layout>
            </v-layout>
          </v-card>

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
import TheAvatar from '../Others/TheAvatar.vue'
export default {
  components: {
    DialogButtonSubmit,
    DialogAlert,
    TheAvatar,
  },
  props: {
    value: {
      type: Boolean
    },
    onSubmit: {
      type: String
    },
    data: {
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
    user () {
      return this.$store.state.user.user
    },
  },
  methods: {
    toInputDate,
    toDate,
    submit () {      
      this.$store.dispatch(this.onSubmit, { uid: this.data.uid })
        .then(res => {
          if (res.status) {
            this.status = res.status
            if (res.status === 'success') {
              this.$router.go(-1)
            }
          }
        })
    },
    reset () {
      this.alertModel = false
      this.model = false
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