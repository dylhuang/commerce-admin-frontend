<template>
  <el-sub-menu v-if="menuInfo.subMenu && menuInfo.subMenu.length" :index="menuInfo.routerUrl">
    <template #title>
      <el-icon class="menu-icon"><svg-icon v-if="menuInfo && menuInfo.icon" :icon-class="menuInfo.icon" /></el-icon>
      <span>
        {{ menuInfo.name }}
      </span>
    </template>
    <menu-item v-for="item in menuInfo.subMenu" :menuInfo="item" :key="item.key" />
  </el-sub-menu>
  <el-menu-item v-else :index="menuInfo.routerUrl" @click="handleRoute">
    <el-icon class="menu-icon"><svg-icon v-if="menuInfo && menuInfo.icon" :icon-class="menuInfo.icon" /></el-icon>
    <template #title>
      <span>
        {{ menuInfo.name }}
      </span>
      <!-- <router-link :to="menuInfo.routerUrl">
        <span>
        {{ menuInfo.name }}
      </span>
      </router-link> -->
    </template>
  </el-menu-item>
</template>

<script setup name="menuItem">
import router from "@/router";
const props = defineProps({
  menuInfo: Object
})

const handleRoute = () => {
  router.push(props.menuInfo.routerUrl);
}
</script>

<style lang="scss" scoped>
.menu-icon {
  width: 32px;
  height: 32px;
}
</style>
