<template>
  <div class="tags-scroll">
    <el-tag v-for="tag in tags" :type="tag.routerUrl === currentTag.routerUrl ? '' : 'info'"
      :closable="tag.routerUrl === '/index' ? false : true" :key="tag.routerUrl" class="tag mr-3"
      @close="handleClose(tag)">
      <router-link :to="tag.routerUrl">
        {{ tag.name }}
      </router-link>
    </el-tag>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStoreHook } from "@/store/modules";
import { storeToRefs } from "pinia";

const router = useRouter();
const { tags } = storeToRefs(useCommonStoreHook());
const currentTag = reactive({
  name: "",
  routerUrl: ""
})

const handleChangeTag = (data) => {
  const hasThisTag = tags.value.filter(item => {
    return item.routerUrl === data.routerUrl
  })
  if (!hasThisTag.length) {
    useCommonStoreHook().addTag(data);
  }
}

watch(
  () => router.currentRoute.value,
  (value) => {
    currentTag.name = value?.meta?.title;
    currentTag.routerUrl = value.fullPath;
    handleChangeTag({ name: value?.meta?.title, routerUrl: value.fullPath });
  }, {
  immediate: true
}
);

const handleClose = (data) => {
  console.log(data);
  useCommonStoreHook().removeTag(data);
  if (data.routerUrl === currentTag.routerUrl) {
    const cRouter = tags.value[tags.value.length - 1];
    router.push(cRouter.routerUrl);
  }
}
</script>

<style lang="scss" scoped>
.tags-scroll {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  background-color: #fff;

  :deep(.el-scrollbar__wrap) {
    line-height: 40px;
  }
}

.el-tag {
  height: 28px;
  background-color: #fff;
}
</style>
