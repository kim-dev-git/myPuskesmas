<template>
  <img
    :src="image"
    :height="height"
  />
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 64
    }
  },
  data: () => ({
    image: require('@/assets/logo.png')
  })
}
</script>

<style>

</style>