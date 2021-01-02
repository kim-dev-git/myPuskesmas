<template>
  <v-btn
    small
    depressed
    :loading="loading"
    :disabled="disabled"
    color="primary"
    @click="onClick ()"
  >
    <span v-text="text" class="text-none" />
  </v-btn>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    text: {
      type: String,
      default: 'Simpan'
    },
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>