<template>
  <div>
    <v-layout
      column
      class="my-4"
    >
      <v-card
        outlined
      >
        <v-list>
          <template
            v-for="(form, index) in formUsed"
          >
            <v-list-item
              :key="'form-' + index"
              class="py-0"
              @click="onClickItem(form)"
            >
              <v-skeleton-loader
                :loading="!loaded"
                type="text"
                style="width: 100%"
                class="py-2"
              >
                <v-layout
                  row
                  wrap
                  class="px-3"
                >
                  <span
                    v-text="form.label"
                    class="text--secondary"
                  />
                  <v-spacer />
                  <span
                    v-text="formValue(form) || '-'"
                    class="font-weight-bold"
                  />
                </v-layout>
              </v-skeleton-loader>
            </v-list-item>
            <v-divider v-if="index !== formUsed.length - 1" :key="'divider-' + index" />
          </template>
        </v-list>
      </v-card>
    </v-layout>

    <dialog-input
      v-model="dialogInput"
      :form="selectedForm"
      :data="user"
      onSubmit="user/put"
    />

  </div>
</template>

<script>
import { toDate } from '../../filters/date'
import DialogInput from '../Others/DialogInput.vue'
export default {
  components: { DialogInput },
  props: {
    user: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    },
    loaded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    dialogInput: false,
    selectedForm: null
  }),
  computed: {
    formPatient () {
      return this.$store.state.user.formPatient
    },
    formDoctor () {
      return this.$store.state.user.formDoctor
    },
    formUsed () {
      if (!this.user) return this.formPatient

      let { role } = this.user

      switch (role) {
        case 'pasien':
          return this.formPatient
          break
          
        case 'dokter':
          return this.formDoctor
          break

        default:
          break
      }
    }
  },
  methods: {
    toDate,
    onClickItem (form) {
      if (!this.readonly) {
        if (!form.disabled) {
          let data = this.user
          this.selectedForm = form
          this.dialogInput = true
        }
      }
    },
    formValue (form) {
      let val

      if (this.user && this.user[form.value]) {
        val = this.user[form.value]
      } else {
        return ''
      }

      if (form.type === 'date') {
        val = toDate(val)
      }

      return val
    }
  }
}
</script>

<style>

</style>