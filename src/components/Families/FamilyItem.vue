<template>
  <div>
    <v-layout
      column
      class="mx-n4"
    >
      <v-card
        outlined
      >
        <v-skeleton-loader
          :loading="!family"
          type="list-item-avatar"
          class="py-3"
        >
          <v-layout
            row
            wrap
            class="ma-3 my-1"
          >
            <the-avatar :image="family.photoURL" :size="48" />
            <v-spacer />
            <v-layout
              column
              class="align-end"
            >
              <span v-text="family.displayName" class="font-weight-bold" />
              <v-chip
                v-text="family.uid === user.uid ? 'Kepala Keluarga' : 'Anggota Keluarga'"
                small
                class="overline"
              />
            </v-layout>
          </v-layout>
        </v-skeleton-loader>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import TheAvatar from '../Others/TheAvatar.vue'
export default {
  components: { TheAvatar },
  props: {
    family: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
}
</script>

<style>

</style>