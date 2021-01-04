<template>
  <v-avatar
    :size="size"
    style="cursor: pointer;"
    @click="onClick ()"
  >
    <v-img
      :src="image"
      lazy-src="https://via.placeholder.com/64.png/ddd/ddd"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
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