<template>
  <div class="flex justify-end p-2 bg-white ">
    <el-pagination layout="total,prev, pager, next,sizes" :page-sizes="[10, 20, 50, 100]" :page-size="props.pageSize"
      :total="props.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="props.pageNumber" />
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

<style lang="scss" scoped></style>
