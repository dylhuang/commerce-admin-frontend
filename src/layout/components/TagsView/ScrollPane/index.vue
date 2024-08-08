<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroller-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup name="ScrollPane">
import {getCurrentInstance, onMounted, defineEmits, computed, onBeforeUnmount} from "vue";

const { proxy } = getCurrentInstance()

const emits = defineEmits(['scroll'])

const scrollWrapper = computed(() => proxy.$refs.scrollContainer.$refs.wrapRef)
onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})
function emitScroll () {
  emits('scroll')
}
function handleScroll (e) {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4;
}
</script>

<style scoped lang="scss">
.scroller-container{
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep {
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
