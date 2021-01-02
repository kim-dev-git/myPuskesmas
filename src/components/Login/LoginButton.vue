<template>
  <div
    class="px-4"
    style="
      position: fixed;
      bottom: 24px;
      left: 0;
      width: 100%;
    "
  >
    <v-btn
      rounded
      large
      block
      color="primary"
      @click="onClick ()"
    >
      <v-icon v-text="'mdi-google'" left />
      <span v-text="'Login menggunakan akun Google'" class="text-none" />
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>