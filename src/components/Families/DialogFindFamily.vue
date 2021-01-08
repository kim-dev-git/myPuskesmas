<template>
  <div>
    <v-bottom-sheet id="form"
      :persistent="loading"
      v-if="!status"
      v-model="model"
    >
      <v-card>
        <v-layout
          column
        >
          <v-layout id="header"
            row
            wrap
            class="pa-6 align-center"
          >
            <span v-text="'Tambah anggota keluarga'" class="font-weight-bold" />
            <v-spacer />
            <v-btn
              small
              icon
              depressed
              color="transparent"
              @click="model = false"
            >
              <v-icon v-text="'mdi-close'" />
            </v-btn>
          </v-layout>

          <v-divider />

          <v-layout
            row
            wrap
            class="ma-3 align-center"
          >
            <v-text-field
              dense
              outlined
              clearable
              v-model="search"
              placeholder="Input NIK keluarga anda"
              class="mb-n6 mt-1"
              @keyup.enter="onSearch ()"
            />
            <v-btn
              icon
              :disabled="!search"
              :loading="loading"
              color="primary"
              class="ml-2"
              @click="onSearch ()"
            >
              <v-icon v-text="'mdi-magnify'" />
            </v-btn>
          </v-layout>
          
          <v-list>
            <template
              v-for="(search, index) in users"
            >
              <v-list-item
                :key="'user-' + index"
              >
                <v-card
                  style="width: 100%"
                  class="px-4 py-0"
                >
                  <v-layout
                    row
                    wrap
                    class="my-0 py-3 mx-0 align-center"
                  >
                    <the-avatar :image="search.photoURL" :size="48" />
                    <v-spacer />
                    <v-layout
                      column
                      class="align-end"
                    >
                      <span v-text="search.displayName" class="font-weight-bold" />
                      <span v-text="search.nik" />
                    </v-layout>
                    <v-btn
                      v-if="search.familyId !== user.uid"
                      icon
                      tile
                      height="48"
                      class="grey ml-2 mr-n4"
                      @click="addToFamily (search)"
                    >
                      <v-icon large v-text="'mdi-plus'" color="white" />
                    </v-btn>
                    <v-btn
                      v-else
                      disabled
                      icon
                      tile
                      height="48"
                      class="ml-2"
                    >
                      <v-icon large v-text="'mdi-check'" color="white" />
                    </v-btn>
                  </v-layout>
                </v-card>
              </v-list-item>
            </template>
          </v-list>

        </v-layout>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import TheAvatar from '../Others/TheAvatar.vue'
export default {
  components: { TheAvatar },
  props: {
    value: {
      type: Boolean
    },
    onSubmit: {
      type: String
    },
  },
  data: () => ({
    model: null,
    alertModel: false,
    inputModel: null,
    status: null,
    search: null,
  }),
  computed: {
    loading () {
      return this.$store.state.loading === 'GET'
    },
    users () {
      return this.$store.state.user.userByNik
    },
    user () {
      return this.$store.state.user.user
    },
    
  },
  methods: {
    submit () {
      // let payload = {
      //   reason: this.reason
      // }
      // let queue = this.queue
      
      // this.$store.dispatch(this.onSubmit, { payload, queue })
      //   .then(res => {
      //     if (res.status) {
      //       this.status = res.status
      //     }
      //   })
    },
    reset () {
      this.alertModel = false
      this.model = false
      this.complaint = null
      this.status = null
    },
    onSearch () {
      this.$store.dispatch('user/getByNik', { nik: this.search })
    },
    addToFamily (user) {
      this.$store.dispatch('user/addToFamily', { user })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (v) {
          this.$store.commit('user/SET_USER_BY_NIK', null)
          this.model = v
        }
      }
    },
    model (v) {
      this.$emit('input', v)
    },
  },
}
</script>

<style>

</style>