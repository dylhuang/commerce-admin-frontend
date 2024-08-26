<template>
  <el-sub-menu v-if="menuInfo.children && menuInfo.children.length" :index="menuInfo.path">
    <template #title>
      <el-icon class="menu-icon"><svg-icon v-if="menuInfo && menuInfo.icon" :icon-class="menuInfo.icon" /></el-icon>
      <span>
        {{ menuInfo.menuName }}
      </span>
    </template>
    <menu-item v-for="item in menuInfo.children" :menuInfo="item" :key="item.key" />
  </el-sub-menu>
  <el-menu-item v-else :index="menuInfo.path" @click="handleRoute">
    <el-icon class="menu-icon"><svg-icon v-if="menuInfo && menuInfo.icon" :icon-class="menuInfo.icon" /></el-icon>
    <template #title>
      <span>
        {{ menuInfo.menuName }}
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
  router.push(props.menuInfo.path);
}
</script>

<style lang="scss" scoped>
.el-menu-item{
  height: 46px !important;
  line-height: 46px !important;
}
.el-menu-item:hover{
    color: #fff !important;
    background-color: rgba(156,219,217,0.1);
}
.menu-icon {
  width: 32px;
  height: 32px;
}
</style>
