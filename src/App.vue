<script setup>

  import FrameBox from "@/views/IndexView/components/FrameBox.vue";
  import {onMounted, ref} from "vue";
  const frameRef = ref(null)
  // const clearToken = () => {
  //   let beginTime = 0
  //   let differTime = 0
  //   window.onbeforeunload = () => {
  //     beginTime = new Date().getTime()
  //   }
  //   window.onunload = () => {
  //     differTime = new Date().getTime() - beginTime
  //     if(differTime <= 5) {
  //       localStorage.removeItem('token')
  //     }
  //   }
  // }
  // onMounted(() => {
  //   clearToken()
  // })

</script>

<template>
    <FrameBox ref="frameRef" />
    <router-view :frameRef="frameRef" />

</template>

<style scoped>

</style>
