<template>
  <div class="iconSelect-container">
    <el-popover
        shadow="none"
        placement="bottom-end"
        trigger="click"
        width="400"
    >
      <template #reference>
        <el-input
            v-model="inputValue"
            readonly
            placeholder="点击选择图标"
        >
          <template #prepend>
            <svg-icon v-if="inputValue" :icon-class="inputValue" />
            <el-icon v-else><Search /></el-icon>
          </template>
        </el-input>
      </template>
      <!-- 下拉选择弹窗 -->
      <el-input
          ref="iconSelect"
          class="p-2"
          v-model="filterValue"
          placeholder="搜索图标"
          clearable
          @input="handleFilter"
          :prefix-icon="Search"
      >
      </el-input>
      <el-divider border-style="dashed" />
      <el-scrollbar height="300px">
        <ul class="icon-list">
          <li
              class="icon-item"
              v-for="(iconName, index) in filterIconNames"
              :key="index"
              @click="handleSelect(iconName)"
          >
            <el-tooltip :content="iconName" placement="bottom" effect="light">
              <svg-icon
                  color="var(--el-text-color-regular)"
                  :icon-class="iconName"
              />
            </el-tooltip>
          </li>
        </ul>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script setup name="IconSelect">
  import {onMounted, ref, toRef, defineEmits} from 'vue'
  import {Search} from "@element-plus/icons-vue";

  const props = defineProps({
    modelValue: {
      type: String,
      require: false
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const inputValue = toRef(props, 'modelValue')
  //所有的图标名称集合
  const iconNames = []
  //筛选的值
  const filterValue = ref('')
  //过滤后的图标名称集合
  const filterIconNames = ref([])

  //加载icon
  function loadIcons () {
    const icons = import.meta.glob('@/assets/icons/*.svg')
    for (const icon in icons) {
      const iconName = icon.split('assets/icons/')[1].split('.svg')[0]
      iconNames.push(iconName)
    }
    filterIconNames.value = iconNames
  }
  // 筛选图标
  function  handleFilter () {
    if (filterValue.value) {
      filterIconNames.value = iconNames.filter(iconName =>
          iconName.includes(filterValue.value)
      )
    } else {
      filterIconNames.value = iconNames
    }
  }
  // 图标选择
  function handleSelect (iconName) {
    emit('update:modelValue', iconName)
    document.body.click()
  }
  onMounted(() => {
    loadIcons()
  })
</script>

<style scoped lang="scss">
.iconSelect-container {
  position: relative;
 // width: 400px;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  margin-top: 10px;

  .icon-item {
    cursor: pointer;
    width: 10%;
    margin: 0 10px 10px 0;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    border: 1px solid #ccc;
    &:hover {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
  }
}
</style>
