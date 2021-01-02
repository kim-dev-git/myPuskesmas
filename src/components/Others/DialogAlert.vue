<template>
   <v-bottom-sheet id="alert"
      persistent
      v-model="model"
    >
      <v-card>
        <sweetalert-icon
          :icon="status === 'success' ? 'success' : 'error'"
        />
        <p
          v-text="status === 'error' ? 'Gagal' : 'Berhasil'"
          class="text-center title"
        />
        <v-divider />
        <v-btn
          v-if="status === 'error'"
          block
          text
          large
          @click="onClose ()"
        >
          <span v-text="'Tutup'" />
        </v-btn>
      </v-card>
    </v-bottom-sheet>
</template>

<script>
import SweetalertIcon from 'vue-sweetalert-icons'
export default {
  components: {
    SweetalertIcon,
  },
  props: {
    value: {
      type: Boolean
    },
    status: {
      type: String
    },
  },
  data: () => ({
    model: null
  }),
  methods: {
    onClose () {
      this.$emit('close')
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (v) {
          this.model = v
        }
      }
    },
    model (v) {
      this.$emit('input', v)
    },
    status (v) {
      if(v) {
        this.model = true
        if(v === 'success') {
          setTimeout(() => {
            this.onClose ()
          }, 1000)
        }
      } else {
        this.model = false
      }
    }
  }
}
</script>

<style>

</style>