<template>
  <div>
    <the-navbar
      back
      title="Detail Data Keluarga"
      @back="$router.go(-1)"
    >
      <template slot="right-side">
        <v-btn
          v-if="family && user.uid !== family.uid"
          small
          depressed
          color="error"
          class="mr-4"
          @click="dialog = true"
        >
          <v-icon v-text="'mdi-delete'" small left />
          <span v-text="'Hapus'" />
        </v-btn>
      </template>
    </the-navbar>
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

        <dialog-delete
          v-model="dialog"
          :data="family"
          onSubmit="user/deleteFromFamily"
        />

      </v-container>
    </the-layout>
  </div>
</template>

<script>
import DialogDelete from '../components/Families/DialogDelete.vue'
import TheAvatar from '../components/Others/TheAvatar.vue'
import TheLayout from '../components/Others/TheLayout.vue'
import TheNavbar from '../components/Others/TheNavbar.vue'
import ProfileData from '../components/Profile/ProfileData.vue'
export default {
  components: { TheNavbar, TheLayout, ProfileData, TheAvatar, DialogDelete },
  props: {
    uid: {
      type: String,
      required: true
    }
  },
  data : () => ({
    loaded: false,
    dialog: false
  }),
  computed: {
    user () {
      return this.$store.state.user.user
    },
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
    },
    // async deleteFromFamily () {
    //   await this.$store.dispatch('user/deleteFromFamily', { uid: this.uid })
    //   this.dialogDelete = false
    // }
  },
  created () {
    this.getUser ()
  }
}
</script>

<style>

</style>