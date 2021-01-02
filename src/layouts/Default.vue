<template>
  <router-view :user="user" />
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>

<style>

</style>