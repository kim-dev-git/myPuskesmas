<template>
  <div>
    <v-bottom-sheet id="form"
      :persistent="loading"
      v-if="!status"
      v-model="model"
    >
      <v-card>
        <v-layout
          v-if="form"
          column
        >
          <v-layout id="header"
            row
            wrap
            class="pa-6 align-center"
          >
            <span v-text="form.label" class="font-weight-bold" />
            <v-spacer />
            <dialog-button-submit
              :loading="loading"
              :disabled="!inputModel"
              @click="submit ()"
            />
          </v-layout>
          <v-divider />
          <!-- //////////////////////////////////// -->
          <div>

            <!-- Select Text Field -->
            <v-menu
              v-if="form.type === 'select'"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="inputModel"
                  v-bind="attrs"
                  v-on="on"
                  flat
                  solo
                  autofocus
                  readonly
                  :disabled="loading"
                  :placeholder="form.label"
                  class="mb-n6"
                  @keyup.enter="submit ()"
                />
              </template>
              <v-list>
                <v-list-item
                  v-for="(option, index) in form.options"
                  :key="index"
                  @click="selectOption(option)"
                >
                  <v-list-item-title>{{ option.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- AutoComplete Text Field -->
            <v-autocomplete
              v-else-if="form.type === 'autocomplete'"
              :items="form.options"
              :item-text="form.itemText"
              :filter="customFilter"
              v-model="inputModel"
              flat
              solo
              autofocus
              :disabled="loading"
              :placeholder="form.label"
              class="mb-n6"
              @keyup.enter="submit ()"
            ></v-autocomplete>

            <!-- Normal Text Field -->
            <v-text-field
              v-else
              v-model="inputModel"
              flat
              solo
              autofocus
              :type="form.type"
              :disabled="loading"
              :placeholder="form.label"
              class="mb-n6"
              @keyup.enter="submit ()"
            />
          </div>
          <!-- //////////////////////////////////// -->
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
    form: {
      type: Object
    },
    data: {
      type: Object
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
      let form = this.form
      let data = this.data
      let newVal = this.inputModel

      if (!newVal) return

      if (form.type === 'date') {
        newVal = new Date (newVal)
      }

      let payload = {
        [form.value]: newVal
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
      this.inputModel = null
      this.status = null
    },
    selectOption (option) {
      this.inputModel = option.value
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.text.toLowerCase()
      const textTwo = item.abbr.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (v) {
          let form = this.form
          let data = this.data
          let oriVal = data[form.value]

          if (oriVal && form.type === 'date') {
            oriVal = this.toInputDate(oriVal)
          }
          
          this.inputModel = oriVal
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