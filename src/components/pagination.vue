<template>
  <div class="flex justify-end p-2 bg-white ">
    <el-pagination background  layout="prev, pager, next" size="small" :page-sizes="[10, 20, 50, 100]" :page-size="props.pageSize"
      :total="props.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
      :current-page="props.pageNumber" style="--el-color-primary: #003865" />
</div>
</template>

<script setup>
const props = defineProps({
  total: 0,
  pageSize: 20,
  pageNumber: 1
});
const emits = defineEmits(["sizeChange", "currentChange"]);
const handleSizeChange = (val) => {
  emits("sizeChange", val);
};
const handleCurrentChange = (val) => {
  emits("currentChange", val);
};
</script>

<style lang="scss" scoped>

// .el-pagination.is-background.el-pager li:not(.disabled).active{
//   background-color:green;/*进行修改选中项背景和字体*/
//   color:#fff;
// }
</style>
