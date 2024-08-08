<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 2">{{ item.meta.title }}</span>
      <a v-else @click="handleLink(item)"> {{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const levelList = ref([])
    function getBreadcrumb () {
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }
      levelList.value = matched
    }
    function handleLink (item) {
      const { path } = item
      router.push(path)
    }
    function isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim() === 'index'
    }
    watch(() => route.fullPath,
        () => {
          getBreadcrumb()
        },
        {
          immediate: true
        }
    )
    onMounted(() => {
      getBreadcrumb()
    })
    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style scoped lang="scss">
.app-breadcrumb {
  font-size: 14px;
  line-height: 50px;
  margin-left: 20px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
