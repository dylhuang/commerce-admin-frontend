<template>
    <div class="p-2 bg-white mb-1 rounded-sm">
        <!-- <el-row v-show="currentTags.length">
            <el-col :span="24" class="bg-white p-1 flex items-center">
                <span style="color:#333;margin-right: 5px;">当前位置 : </span>
                <el-breadcrumb :separator-icon="ArrowRight" class="inline-flex leading-6">
                    <el-breadcrumb-item v-for="(item, index) in currentTags" :key="index">{{
                        item.name
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row> -->
        <el-row class="p-1">
            <el-col :span="22">
                <el-form :model="queryForm">
                    <el-form-item label="子系统" class="!mb-0">
                        <el-select v-model="queryForm.subSystemId">
                            <el-option :label="item.partName" :value="item.id" v-for="item in queryForm.subSysList"
                                :key="item.id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="2" class="flex justify-end">
                <el-button type="primary" @click="handleSub">确定</el-button>
            </el-col>
        </el-row>
    </div>


</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getSubSysList } from "@/api/common";
import { useCommonStoreHook } from "@/store/modules";

// const props = defineProps({
//     currentTags: []
// })

const queryForm = reactive({
    subSystemList:[],
    subSystemId: "",
});
const emits = defineEmits(["onSearch"]);
const handleSub = () => {
    emits("onSearch", queryForm.subSystemId);
}
const onGetSubSysList = async () => {
    const result = await getSubSysList();
    if (result.code === 200 && result.data) {
        useCommonStoreHook().setSubSystemList(result.data);
        queryForm.subSysList = result.data;
        queryForm.subSystemId = result.data[0].id;
        emits("onSearch", queryForm.subSystemId);
    }
};
onMounted(() => {
    onGetSubSysList();
});
</script>
<style scoped lang="scss">

</style>