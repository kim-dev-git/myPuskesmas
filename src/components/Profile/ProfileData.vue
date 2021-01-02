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
            v-for="(form, index) in formPatient"
          >
            <!-- <v-divider v-if="index === 0" :key="'divider-top-' + index" /> -->
            <v-list-item
              :key="'form-' + index"
              class="py-0"
              @click="onClickItem(form)"
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
            </v-list-item>
            <v-divider v-if="index !== formPatient.length - 1" :key="'divider-' + index" />
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
    }
  },
  data: () => ({
    dialogInput: false,
    selectedForm: null
  }),
  computed: {
    formPatient () {
      return this.$store.state.user.formPatient
    }
  },
  methods: {
    toDate,
    onClickItem (form) {
      if (!form.disabled) {
        let data = this.user
        this.selectedForm = form
        this.dialogInput = true
      }
    },
    formValue (form) {
      let val= this.user[form.value]

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