<template>
  <div>


    <v-layout
      column
      class="align-center mb-4"
    >
    <the-logo class="mb-4" :height="128" />
      <p
        v-text="'myPuskes'"
        class="mb-2 text-h4 font-weight-bold"
      />

      <p
        v-text="'Aplikasi yang memudahkan anda dalam mendapatkan Pelayanan Kesehatan'"
        class="text--secondary text-center subtitle-1"
        style="line-height: 1.2rem"
      />
    </v-layout>
  </div>
</template>

<script>
import TheLogo from '../Others/TheLogo.vue'
export default {
  components: { TheLogo },

}
</script>

<style>

</style>