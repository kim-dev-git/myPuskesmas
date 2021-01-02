<template>
  <v-avatar
    :size="size"
    style="cursor: pointer;"
    @click="onClick ()"
  >
    <img :src="image" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    image: {
      type: String
    },
    size: {
      type: Number,
      default: 64
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