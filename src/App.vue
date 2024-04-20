<script setup>

  import FrameBox from "@/views/IndexView/components/FrameBox.vue";
  import {ref} from "vue";
  const frameRef = ref(null)

</script>

<template>
    <FrameBox ref="frameRef" />
    <router-view :frameRef="frameRef" />

</template>

<style scoped>

</style>
