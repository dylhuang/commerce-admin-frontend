<template>
    <div class="p-2 bg-white mb-1 rounded-sm">
        <el-row class="p-1">
            <el-col :span="22">
                <span>菜单名称 : </span>
                <el-input class="!w-xs ml-1" :clearable="true" v-model.trim="menuName" placeholder="请输入关键字" />
            </el-col>
            <el-col :span="2" class="flex justify-end">
                <el-button type="primary" @click="handleSub">确定</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const menuName = ref("");
const emits = defineEmits(["onSearch"]);
const handleSub = () => {
    emits("onSearch", menuName.value);
}

</script>
<style scoped lang="scss">

</style>
