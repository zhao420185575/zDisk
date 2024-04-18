<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useRouter } from 'vue-router'
import {getShareFile} from "@/api/IndexView/index.js";

const router = useRouter()

const { secret } = router.currentRoute.value.params
const { pwd } = router.currentRoute.value.query

const fileData = ref()

onMounted(async () =>{
  if(secret !== ''){
    const res = await getShareFile({
      secret: secret,
      pwd: pwd
    })

    if(res){
      fileData.value = res
    }else {

    }
  }



})

</script>

<template>

</template>

<style scoped>

</style>