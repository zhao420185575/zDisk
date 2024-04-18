<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo nav"
        :collapse="true"
        :router="true"
    >
        <el-menu-item index="MyDisk">
            <el-icon><Files /></el-icon>
            <template #title>我的存储空间</template>
        </el-menu-item>

        <el-menu-item index="Share">
            <el-icon><Connection /></el-icon>
            <template #title>文件分享</template>
        </el-menu-item>

        <el-menu-item index="Center">
            <el-icon><User /></el-icon>
            <template #title>个人中心</template>
        </el-menu-item>

        <el-menu-item index="Setting">
            <el-icon><Setting /></el-icon>
            <template #title>设置</template>
        </el-menu-item>

    </el-menu>
</template>

<script setup>
    import { inject, onMounted, ref, watch } from "vue";
    import router from "@/router/index.js";
    const activeIndex = ref("")

    const changeTitle = inject("changeTitle")

    const title = ref(["我的存储空间", "文件分享", "个人中心", "设置"])
    const pathArr = ref(["MyDisk", "Share", "Center", "Setting"])
    const index = ref(0)

    const selectFunc = () =>{

        activeIndex.value = router.currentRoute.value.name

        index.value = pathArr.value.indexOf(activeIndex.value)
        changeTitle(title.value[index.value])
    }
    watch(() => router.currentRoute.value.path, (newValue, oldValue) =>{
        selectFunc()
    })

    onMounted(() =>{
        selectFunc()
    })
</script>

<style scoped>

</style>