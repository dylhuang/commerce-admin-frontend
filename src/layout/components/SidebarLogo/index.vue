<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <router-link v-if="collapse" key="collapse" to="/" class="sidebar-logo-link">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 v-else class="sidebar-title">{{ title }}</h1>
    </router-link>
    <router-link v-else key="expand" to="/" class="sidebar-logo-link">
      <img :src="logo" class="sidebar-logo" alt="" />
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useCommonStoreHook } from "@/store/modules";
import logoImg from '@/assets/logo/logo.png';
export default defineComponent({
  name: 'SidebarLogo',
  setup () {
    const { sliderCollapse } = storeToRefs(useCommonStoreHook());
    const collapse = ref(sliderCollapse)
    const logo = ref(logoImg)
    const title = ref('宇修管理系统')
    return {
      logo,
      title,
      collapse
    }
  }
})
</script>

<style scoped lang="scss">

.sidebar-logo-container {
  width: 200px;
  height: 50px;
  line-height: 50px;

  .sidebar-logo-link {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
  }

  .sidebar-title {
    font-size: 16px;
    font-weight: 600;
    padding-left: 10px;
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}</style>
