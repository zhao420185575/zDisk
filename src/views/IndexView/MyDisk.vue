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

    </div>
</template>

<script setup>
    import {ref} from "vue";

    const url = ref("/home")
</script>

<style scoped>
    .main-box{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
    }
    .main-box .url-box{
        user-select: none;
    }
</style>