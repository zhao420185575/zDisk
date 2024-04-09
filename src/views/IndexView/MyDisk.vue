<template>
    <div class="main-box">
        <div class="function-box">
            <div class="url-box">
                <el-input
                    v-model="url"
                    style="max-width: 600px"
                    class="input-with-select"
                >
                    <template #prepend>
                        <el-button>
                            <el-icon><Back /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>

        <DiskDesktop />

    </div>
</template>

<script setup>
    import { ref } from "vue";
    import DiskDesktop from "@/views/IndexView/components/DiskDesktop.vue";

    const url = ref("/home")

</script>

<style scoped>
    .main-box{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 14px;
        display: flex;
        flex-direction: column;
    }
    .main-box .url-box{
        user-select: none;
        margin: 0 0 8px 0;
    }
</style>