<template>
  <div>
    <the-navbar />
    <the-layout>
      <v-container>
        <span v-text="'Data Keluarga Anda'" class="text-headline font-weight-bold" />
        
        <family-list :families="families" />

        <v-btn
          fixed
          bottom
          right
          rounded
          color="primary"
          class="mb-14"
        >
          <span v-text="'Tambah Anggota'" />
          <v-icon v-text="'mdi-plus'" right />
        </v-btn>

      </v-container>
    </the-layout>
  </div>
</template>

<script>
import FamilyList from '../components/Families/FamilyList.vue'
import TheAvatar from '../components/Others/TheAvatar.vue'
import TheLayout from '../components/Others/TheLayout.vue'
import TheNavbar from '../components/Others/TheNavbar.vue'
export default {
  components: { TheNavbar, TheLayout, TheAvatar, FamilyList },
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    families () {
      return this.$store.state.user.families
    }
  },
  methods: {
    init () {
      this.$store.dispatch('user/getFamilies', { uid: this.user.uid })
    },
  },
  created () {
    this.init ()
  }
}
</script>

<style>

</style>