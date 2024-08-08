<template>
    <div class="p-2 bg-white mb-1 rounded-sm">
        <el-row class="p-1">
            <el-col :span="22">
                <span style="margin-right: 10px">代码类型 : {{selectCodeTypeRow.codeType}}</span>
                <span>关键字 : </span>
                <el-input class="!w-xs ml-1" :clearable="true" v-model.trim="searchKey" placeholder="请输入关键字" />
            </el-col>
            <el-col :span="2" class="flex justify-end">
                <el-button type="primary" @click="handleSub">确定</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {storeToRefs} from "pinia";
import {useCodeTypeStoreHook} from "@/store/modules.js";
const searchKey = ref("");
const emits = defineEmits(["onSearch"]);
const { selectCodeTypeRow } = storeToRefs(useCodeTypeStoreHook());
const handleSub = () => {
    emits("onSearch", searchKey.value);
}

</script>
<style scoped lang="scss">

</style>
