<template>
  <div class="layop-page">
    <div class="layout-header">
    <sidebar-logo />
    <Navbar />
  </div>
  <div class="classic-container" :class="objClass">
    <Slidebar class="sidebar-container" />
    <div class="main-container">
      <AppMain class="main-content" />
    </div>
  </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Slidebar from "./components/slidebar.vue";
import AppMain from "./components/appMain.vue";
import Navbar from "./components/navbar.vue";
import SidebarLogo from "./components/SidebarLogo/index.vue";
import Tags from "./components/tags.vue";
import { useCommonStoreHook } from "@/store/modules.js";
import TagsView from "@/layout/components/TagsView/index.vue";

const useCommonStore = useCommonStoreHook();
const objClass = computed(() => ({
  hideSidebar: useCommonStore.sliderCollapse,
}));
</script>

<style lang="scss" scoped>
// .layop-page{
//   height: 100vh;
// }
.layout-header {
  width: 100%;
  height: 50px;
  display: flex;
}
.classic-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: hidden;
  background: #f5f5f5;
}


.main-content {
  display: flex;
  width: calc(100% - 1rem);
  flex: 1;
  flex-direction: column;
  margin: 0.25rem 0.5rem;
  color: #606266;
}
</style>
