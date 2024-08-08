<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link v-for="tag in tags" ref="tag" :key="tag.routerUrl" :to="{ path: tag.routerUrl, query: tag.query }"
        class="tags-view-item" :class="isActive(tag) ? 'active' : ''"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)">
        {{ tag.name }}
        <el-icon v-if="!isAffix(tag)" class="el-tag__close" @click.prevent.stop="closeSelectedTag(tag)">
          <CircleClose />
        </el-icon>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag()">
        <el-icon size="20">
          <Refresh />
        </el-icon>
        刷新当前
      </li>
      <li @click="closeSelectedTag(selectedTag)">
        <el-icon size="20">
          <Remove />
        </el-icon>
        关闭当前
      </li>
      <li @click="handleCloseOther">
        <el-icon size="20">
          <CircleClose />
        </el-icon>
        关闭其他
      </li>
      <li @click="handleCloseAll">
        <el-icon size="20">
          <FolderDelete />
        </el-icon>
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue'
import { useCommonStoreHook } from '@/store/modules'
import { useRoute, useRouter } from 'vue-router'
import ScrollPane from "@/layout/components/TagsView/ScrollPane/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {
  Close,
  Remove,
  Refresh,
  CircleClose,
  FolderDelete
} from '@element-plus/icons-vue';
import { ElMessage } from "element-plus";

export default defineComponent({
  name: 'TagsView',
  components: {
    ScrollPane,
    SvgIcon,
    Close,
    Remove,
    Refresh,
    CircleClose,
    FolderDelete
  },
  setup () {
    const useCommonStore = useCommonStoreHook()
    const route = useRoute()
    const router = useRouter()
    const visible = ref(false)
    const selectedTag = ref({});
    const left = ref(0);
    const top = ref(0);
    const currentTag = reactive({
      name: "",
      routerUrl: "",
      query: {}
    })
    const tags = computed(() => useCommonStore.tags)
    const { proxy } = getCurrentInstance()
    function isActive (tag) {
      return tag.routerUrl === route.path
    }
    function isAffix (tag) {
      return tag.routerUrl === '/index'
    }
    function openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = proxy.$el.getBoundingClientRect().left - 180 // container margin left
      const offsetWidth = proxy.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth + 120 // left boundary
      const l = e.clientX - offsetLeft + 15 // 15: margin right
      if (l > maxLeft) {
        left.value = maxLeft
      } else {
        left.value = l
      }
      top.value = e.clientY
      visible.value = true
      selectedTag.value = tag
    }
    function closeMenu () {
      visible.value = false
    }
    function handleScroll () {
      closeMenu()
    }
    function handleChangeTag (data) {
      const hasThisTag = tags.value.filter(item => {
        return item.routerUrl === data.routerUrl
      })
      if (!hasThisTag.length) {
        useCommonStoreHook().addTag(data);
      }
    }
    function refreshSelectedTag () {
      //刷新页面
      //router.push(tag.routerUrl);
      //document.location.reload()
      useCommonStoreHook().globalRefresh()
    }
    function closeSelectedTag (tag) {
      if (tag.routerUrl === '/index') {
        ElMessage.warning("首页不能关闭");
        return
      }
      useCommonStoreHook().removeTag(tag);
      if (tag.routerUrl === currentTag.routerUrl) {
        const cRouter = tags.value[tags.value.length - 1];
        router.push(cRouter.routerUrl);
      }
    }
    function handleCloseOther () {
      const tags = useCommonStoreHook().tags.filter(item => item.routerUrl === router.currentRoute.value.fullPath);
      tags.unshift({ name: "首页", routerUrl: "/index", meta: { affix: true } })
      useCommonStoreHook().setTags(tags)
    }
    function handleCloseAll () {
      useCommonStoreHook().setTags([{ name: "首页", routerUrl: "/index", meta: { affix: true } }]);
      router.push('/index');
    }
    watch(() => router.currentRoute.value,
      (value) => {
        currentTag.name = value?.meta?.title;
        currentTag.routerUrl = value.path;
        currentTag.query = value.query;
        handleChangeTag({ name: value?.meta?.title, routerUrl: value.path, query: value.query });
      }, {
      immediate: true
    }
    )
    watch(visible, value => {
      if (value) {
        document.body.addEventListener('click', closeMenu);
      } else {
        document.body.removeEventListener('click', closeMenu);
      }
    })
    return {
      tags,
      visible,
      left,
      top,
      selectedTag,
      isActive,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      handleCloseAll,
      handleCloseOther,
      openMenu,
      handleScroll
    }
  }
})
</script>

<style scoped lang="scss">
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      padding: 0 8px;
      margin-left: 5px;
      margin-top: 4px;
      cursor: pointer;
      color: #495060;
      font-size: 12px;
      background: #fff;
      border-radius: 3px;

      &:first-of-type {
        margin-left: 10px;
      }

      &:last-of-type {
        margin-right: 10px;
      }

      &:hover {
        color: var(--el-color-primary);
      }

      &.active {
        background-color: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);

        &::before {
          content: '';
          background-color: #fff;
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2px;
        }
      }

      .el-tag__close {
        width: 14px;
        height: 14px;
        vertical-align: text-bottom;
        border-radius: 100%;

        //background-color: #b4bccc;
        //color: #fff;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
