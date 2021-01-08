<template>
  <div>
    <the-navbar title="Keluarga" />
    <the-layout>
      <v-container>
        <span v-text="'Data Keluarga Anda'" class="text-headline font-weight-bold" />

        <v-card
          v-if="!user.familyId"
          flat
          color="grey lighten-4"
          class="my-4 pa-4"
        >
          <v-layout
            column
          >
            <p v-text="'Klik tombol dibawah jika anda kepala keluarga'" />
              <v-btn
                outlined
                block
                v-text="'Saya Kepala Keluarga'"
                @click="isHeadOfFamily ()"
              />
          </v-layout>
        </v-card>
        
        <family-list :families="families" />

        <v-btn
          v-if="user.uid === user.familyId"
          fixed
          bottom
          right
          rounded
          color="primary"
          class="mb-14"
          @click="dialogFind = true"
        >
          <span v-text="'Tambah Anggota'" />
          <v-icon v-text="'mdi-plus'" right />
        </v-btn>

        <dialog-find-family
          v-model="dialogFind"
        />

      </v-container>
    </the-layout>


  </div>
</template>

<script>
import DialogFindFamily from '../components/Families/DialogFindFamily.vue'
import FamilyList from '../components/Families/FamilyList.vue'
import TheAvatar from '../components/Others/TheAvatar.vue'
import TheLayout from '../components/Others/TheLayout.vue'
import TheNavbar from '../components/Others/TheNavbar.vue'
export default {
  components: { TheNavbar, TheLayout, TheAvatar, FamilyList, DialogFindFamily },
  props: {
    user: {
      type: Object
    }
  },
  data: () => ({
    dialogFind: false
  }),
  computed: {
    families () {
      return this.$store.state.user.families
    }
  },
  methods: {
    init () {
      this.$store.dispatch('user/getFamilies', { uid: this.user.uid })
    },
    async isHeadOfFamily () {
      let payload = {
        familyId: this.user.uid
      }
      await this.$store.dispatch('user/put', { payload })
      await this.init ()
    }
  },
  created () {
    this.init ()
  }
}
</script>

<style>

</style>