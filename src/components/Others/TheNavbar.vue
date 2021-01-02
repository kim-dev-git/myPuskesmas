<template>
  <div>
    <v-app-bar
      app
      :color="color"
      :flat="flat"
    >
      <v-container
        class="px-0 pt-3"
      >
        <v-layout
          class="mt-n2 mx-n4 pt-2 align-center"
        >
          <slot name="left-side">
            <v-btn
              v-if="close"
              icon
              class="mr-n2"
              @click="onClose ()"
            >
              <v-icon v-text="'mdi-close'" />
            </v-btn>
            <v-btn
              v-else-if="back"
              icon
              class="mr-n2"
              @click="onBack ()"
            >
              <v-icon v-text="'mdi-chevron-left'" large />
            </v-btn>
            <v-btn
              v-else-if="center"
              icon
              disabled
              class="mr-n2"
              style="opacity: 0"
            >
              <v-icon v-text="'mdi-chevron-left'" large />
            </v-btn>
          </slot>

          <v-spacer v-if="center" />

          <slot name="middle-side">
            <v-layout
              column
              :class="center ? 'align-center' : 'align-start'"
            >
              <v-layout
                :class="!center ? 'ml-4' : ''"
              >
                <v-icon
                  small
                  left
                  v-if="icon"
                  v-text="icon"
                />
                <p
                  v-text="title"
                  class="mb-0 subtitle-1 font-weight-bold"
                />
              </v-layout>
            </v-layout>
          </slot>

          <v-spacer />

          <slot name="right-side">
            <v-btn
              icon
              disabled
              style="opacity: 0"
            >
              <v-icon v-text="'mdi-chevron-left'" large />
            </v-btn>
          </slot>
        </v-layout>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'navbar'
    },
    flat: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onBack () {
      this.$emit('back')
    },
    onClose () {
      this.$emit('close')
    },
  }
}
</script>

<style>

</style>