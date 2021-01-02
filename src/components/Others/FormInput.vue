<template>
  <div>

    <v-layout id="input-array"
      v-if="input.type === 'array'"
      row
      wrap
      class="mx-0 mt-0 align-start"
    >
      <template
        v-for="(model, index) in models"
      >
        <v-text-field
          :key="'model-' + index"
          v-model="models[index]"
          outlined
          dense
          :autofocus="!models[index]"
          :label="input.label"
          :hint="input.hint "
          :rules="[v => (v.split(' ').length <= 1) || 'Tidak boleh menggunakan spasi']"
          class="mb-0 text-uppercase primary--text"
        />

        <v-btn
          :key="'button-' + index"
          icon
          large
          class="mx-2"
          @click="removeModel (index)"
        >
          <v-icon v-text="'mdi-delete'" />
        </v-btn>
      </template>

      <v-btn
        text
        :disabled="models.length > 0 && !models[models.length - 1]"
        color="primary"
        class="ml-n3"
        @click="newModel ()"
      >
        <v-icon v-text="'mdi-plus'" left />
        <span v-text="input.buttonLabel" class="text-none" />
      </v-btn>
      
    </v-layout>

    <v-text-field
      v-else
      v-model="model"
      outlined
      dense
      :autofocus="index === 0 && !model"
      :label="input.label"
      :hint="input.hint"
      class="mb-0 text-uppercase primary--text"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    index: {
      type: Number
    },
    input: {
      type: Object
    },
  },
  data: () => ({
    model: null,
    models: []
  }),
  methods: {
    newModel () {
      this.models.push('')
    },
    removeModel (index) {
      this.models.splice(index, 1)
    },
  },
  created () {
    this.model = this.value
    if (this.input.type === 'array') {
      if (this.value) {
        this.models = this.value
      } else {
        this.models = []
      }
    }
  },
  watch: {
    model (val) {
      this.$emit('input', val)
    },
    models (val) {
      this.$emit('input', val)
    },
  }
}
</script>

<style>

</style>