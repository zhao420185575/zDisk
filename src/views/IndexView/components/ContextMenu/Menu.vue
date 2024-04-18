<script setup>
import {computed, onMounted, ref, nextTick, defineExpose, inject} from "vue";

    const state = ref(false)
    const contextMenu = ref(null);
    const addCreate = inject('addCreate')
    const changeUrl = inject('changeUrl')
    const getCurrentUrl = inject('getCurrentUrl')
    const download = inject('download')

    const downloadMD5 = ref(null)

    const createFolder = () =>{
        addCreate()
        onClose()
    }

    onMounted(async () => {
    // 确保组件已经渲染
      await nextTick();
    // 触发组件focus
    //   contextMenu.value.focus();
    });

    const onClose = () =>{
        state.value = false
        downloadMD5.value = null
    }

    const showMenu = (x ,y, currentDom) =>{
        contextMenu.value.style.left = `${x}px`
        contextMenu.value.style.top = `${y}px`
        state.value = true

    }

    const handleClickOutside = (event) =>{
      if(!state.value) return
      const isClickedOutside = !event.target.closest('.menu-box')
      if(isClickedOutside){
          onClose()
      }

    }

    const getMd5 = (fileMD5) =>{
        downloadMD5.value = fileMD5
    }

    onMounted(() =>{
          window.addEventListener('click', handleClickOutside)
    })

    const refresh = () =>{
        changeUrl(getCurrentUrl())
        onClose()
    }

    const downloadFile = () =>{
        download()
        onClose()
    }

    defineExpose(({
        showMenu,
        getMd5
    }))

</script>

<template>
    <div
        class="menu-box"
        ref="contextMenu"
        @blur="onClose"
        v-show="state"
    >
        <ul>
          <li @click="createFolder">
            <el-icon><FolderAdd /></el-icon>
            <span>新建文件夹</span>
          </li>
          <li @click="refresh">
            <el-icon><RefreshLeft /></el-icon>
            <span>刷新</span>
          </li>
          <li @click="downloadFile">
            <el-icon><Download /></el-icon>
            <span>下载</span>
          </li>
          <li v-show="downloadMD5">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </li>
          <li>
            <el-icon><Edit /></el-icon>
            <span>重命名</span>
          </li>
        </ul>
    </div>
</template>

<style scoped>
    li{
      list-style: none;
    }
    .menu-box{
        position: fixed;
        width: 180px;
        background: white;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 14px;
        user-select: none;
        z-index: 999;
    }
    .menu-box > ul{
        width: 100%;
        height: 100%;
    }
    .menu-box > ul > li{
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;
        padding: 4px 10px;
        box-sizing: border-box;
        cursor: pointer;
        transition: .3s background-color;
        color: #606266;
        border-radius: 4px;
    }
    .menu-box > ul > li:hover{
        background: #a0cfff;
    }
    .menu-box > ul > li > span{
        color: #303133;
        margin: 0 8px;
        font-weight: 700;
    }
</style>