<template>
  <div>
    <the-navbar
      back
      @back="$router.go(-1)"
    />
    <the-layout>
      <v-container>
        <v-card
          outlined
          class="my-2"
        >
          <v-skeleton-loader
            :loading="!loaded"
            type="list-item-avatar"
            class="py-10"
          >
            <v-layout
              class="px-6 py-0 my-n4"
            >
              <the-avatar v-if="family" :image="family.photoURL" :size="96" />
              <v-layout
                column
                class="ml-4 justify-center"
              >
                <span v-if="family" v-text="family.displayName" class="title font-weight-bold" style="line-height: 1.5rem;" />
                <span v-if="family" v-text="family.email" class="text--secondary" />
              </v-layout>
            </v-layout>
          </v-skeleton-loader>
        </v-card>
        <profile-data :user="family" :readonly="true" :loaded="loaded" />
      </v-container>
    </the-layout>
  </div>
</template>

<script>
import TheAvatar from '../components/Others/TheAvatar.vue'
import TheLayout from '../components/Others/TheLayout.vue'
import TheNavbar from '../components/Others/TheNavbar.vue'
import ProfileData from '../components/Profile/ProfileData.vue'
export default {
  components: { TheNavbar, TheLayout, ProfileData, TheAvatar },
  props: {
    uid: {
      type: String,
      required: true
    }
  },
  data : () => ({
    loaded: false
  }),
  computed: {
    family () {
      return this.$store.state.user.family
    },
    loading () {
      return this.family !== null
    }
  },
  methods: {
    async getUser () {
      await this.$store.dispatch('user/get', this.uid)
      this.loaded = true
    }
  },
  created () {
    this.getUser ()
  }
}
</script>

<style>

</style>