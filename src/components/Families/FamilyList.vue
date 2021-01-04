<template>
  <div>
    <v-layout
      column
    >
      <v-list>
        <template
          v-for="(family, index) in families"
        >
          <v-list-item
            :key="'family-' + index"
            @click="gotoProfileId(family.uid)"
          >
            <family-item
              :family="family"
              style="width: 100%"
            />
          </v-list-item>
        </template>
      </v-list>
    </v-layout>
  </div>
</template>

<script>
import TheAvatar from '../Others/TheAvatar.vue'
import FamilyItem from './FamilyItem.vue'
export default {
  components: { TheAvatar, FamilyItem },
  props: {
    families: {
      type: Array,
      required: true
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    gotoProfileId (uid) {
      this.$router.push('/profil/' + uid)
    }
  }
}
</script>

<style>

</style>