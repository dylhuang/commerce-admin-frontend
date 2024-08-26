<template>
        <el-form class="margint-20" ref="searchFormRef" :model="searchForm" :inline="true" >
            <el-form-item label="服务类型名称:" prop="keyword">
                <el-input v-model.trim="searchForm.keyword" class="specific-input-class" placeholder="请输入服务类型名称" />
            </el-form-item>
            <el-form-item label="服务类型状态:" class="ml-10" prop="serviceTypeStatus">
                <!-- <el-input v-model.trim="searchForm.keyword" class="specific-input-class" placeholder="请输入服务类型状态" /> -->
                <el-select v-model="searchForm.serviceTypeStatus" placeholder="请输入服务类型状态" style="width: 240px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
            </el-form-item>
            <el-form-item class="float-right">
                <el-button class="search-btn" @click="handleSub" :icon="Search">搜索</el-button>
                <el-button @click="handleReset(searchFormRef)" :icon="Refresh">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="divider"></div>

   
</template>

<script setup>
import { ref,reactive } from 'vue';
import { Search,Refresh,CaretBottom,CaretTop} from '@element-plus/icons-vue'
const searchForm = reactive({
    keyword:'',
    serviceTypeStatus:''
});
const options = [
    {
        value: '10',
        label: '可用',
    },
    {
        value: '20',
        label: '不可用',
    },
]
const searchFormRef = ref(null);
const emits = defineEmits(["onSearch","onReset"]);
const handleSub = () => {
    emits("onSearch", searchForm);
}
const handleReset = (formEl) => {
    if (!formEl) return
    formEl.resetFields();
    emits("onReset", searchForm);
}
</script>
<style scoped lang="scss">
.divider{
    height: 1px;
    width: 100%;
    background: #f2f3f5;
}
.el-form--inline {
    .el-form-item{
        margin-right: 0px !important;
    }
}
:deep .el-input__wrapper {
  border-radius: 0 !important;
}

</style>