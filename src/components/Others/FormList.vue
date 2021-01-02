<template>
  <div>
    <v-layout
      column
      class="mt-5"
    >
      <template
        v-for="(input, index) in inputs"
      >
        <form-input
          v-model="value[input.value]"
          :key="'input-' + index"
          :input="input"
          :index="index"
        />
      </template>
    </v-layout>
  </div>
</template>

<script>
import FormInput from './FormInput.vue'
export default {
  components: { FormInput },
  props: {
    inputs: {
      type: Array
    },
    value: {}
  }
}
</script>

<style>

</style>