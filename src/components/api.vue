<template>
  <div>
    <v-layout
      column
      class="pa-4 pb-0"
    >
      <v-layout
        row
        wrap
        class="ma-0 mb-4"
      >
        <v-chip
          v-for="(i, index) in illness"
          :key="'illness-' + index"
          outlined
          style="opacity: 1"
        >
          <span v-text="i.title" />
          <v-btn
            icon
            small
            class="ml-1 mr-n3"
          >
            <v-icon small v-text="'mdi-close'" />
          </v-btn>
        </v-chip>
      </v-layout>
      <v-text-field
        outlined
        clearable
        placeholder="Ketik nama penyakit"
        v-debounce="searchICD"
        v-model="keyword"
        :loading="loading"
        class="mb-n6"
      />
    </v-layout>

    <v-card
      outlined
      class="mt-3 ma-4"
    >
      <v-layout>
        <v-layout
          v-if="icd && !icd.status"
          column
          class="pa-4"
          style="width: 80%"
        >
          <span v-if="icd.title" v-text="icd.title['@value']" class="font-weight-bold" />
          <span v-if="icd.definition" v-text="icd.definition['@value']" class="line-clamp" />
        </v-layout>
        <v-layout
          v-else
          column
          class="pa-4 align-center"
        >
          <span v-if="!loading" v-text="keyword ? 'Tidak ditemukan' : 'Ketik nama penyakit'" class="text--secondary" />
        </v-layout>
        <v-layout
          v-if="icd && icd.title"
          class="align-center justify-center primary"
        >
          <v-btn
            text
            large
            color="white"
            @click="add ()"
          >
            <v-icon large v-text="'mdi-plus'" />
          </v-btn>
        </v-layout>
      </v-layout>
    </v-card>

    
  </div>
</template>

<script>

import { search } from '../services/icd'

export default {
  data: () => ({
    loading: false,
    keyword: '',
    icd: null,
    illness: [],
  }),
  methods: {
    async searchICD () {
      this.icd = null
      if (this.keyword) {
        this.loading = true
        let res = await search(this.keyword)
        console.log(res)
        this.icd = res
        this.loading = false
      }
    },
    add () {
      let icd = this.icd
      let obj = {
        id: icd['@id'],
        title: icd.title['@value'],
        definition: icd.definition['@value'],
      }
      this.illness.push(obj)
      this.keyword = null
      this.icd = null
    }
  },
  async created () {
    // console.log(await search('Pseudomembranous'))
    // console.log(process.env.VUE_APP_ICD_CLIENT_ID)
  }
}
</script>

<style scoped>
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
</style>