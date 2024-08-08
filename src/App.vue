<template>
  <el-config-provider :locale="currentLocale" :size="size">
    <router-view />
  </el-config-provider>
</template>
<script setup name="app">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const currentLocale = zhCn;
const size = 'default'
</script>
