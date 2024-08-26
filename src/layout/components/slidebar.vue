<template>
  <div class="sidebar-container">
    
    <el-scrollbar class="vertical-menus-scrollbar">
      <el-menu
          active-text-color="#409eff"
          background-color="#003865"
          :collapse="sliderCollapse"
          :default-active="route.fullPath"
          text-color="#fff"
          :collapse-transition="false"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose">
        <menu-item v-for="nav in menuList" :key="nav.key" :menuInfo="nav" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStoreHook, useCommonStoreHook } from "@/store/modules";
import MenuItem from "./menu/menuItem.vue";

const { menuList } = storeToRefs(useUserStoreHook());
const { sliderCollapse } = storeToRefs(useCommonStoreHook());
const route = useRoute();

const handleOpen = () => {

}
const handleClose = () => {

}
onMounted(()=>{
  if(!menuList.value.length){
    useUserStoreHook().getUserMenu();
  }
})
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: calc(100% - 50px);

}


.el-sub-menu:hover {
  color: #2E95FB !important;
  background-color: rgba(156,219,217,0.1);
}
//.sidebar-container {
//  transition: width 0.3s;
//  width: 180px;
//  background-color: #001529;
//  height: 100vh;
//}
//
//:deep(.el-menu) {
//  border-right: none
//}
</style>
