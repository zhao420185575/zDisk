<script setup>

</script>

<template>
    <div class="frame-box">
        <div class="masking"></div>
        <div class="frame-container">
            
        </div>
    </div>
</template>

<style scoped>
    .frame-box{
      height: 100vh;
      width: 100vw;
      position: fixed;
      z-index: 999;
    }
    .frame-box .masking{
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, .6);
    }
    .frame-box .frame-container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background-color: red;
    }
    .frame-container > iframe{
      width: 100%;
      height: 100%;
      border: 0;
    }
</style>