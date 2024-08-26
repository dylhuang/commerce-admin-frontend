<template>
    <div class="bg-white p-2 mb-1">
        <el-form class="mt-3" ref="searchFormRef" :model="searchForm" :inline="true" >
                <el-form-item label="产品名称:" prop="name">
                    <el-input v-model.trim="searchForm.name" placeholder="请输入产品名称" />
                </el-form-item>
                <!-- <el-form-item label="产品编码:" prop="code">
                    <el-input v-model.trim="searchForm.code" placeholder="请输入产品编码" />
                </el-form-item>
                <el-form-item label="产品状态:" prop="status">
                    <el-select v-model="searchForm.status" placeholder="请选择产品状态" style="width: 240px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                        />
                    </el-select>
                </el-form-item> -->
                <el-form-item class="float-right">
                      <el-button class="search-btn" @click="handleSub" :icon="Search">搜索</el-button>
                    <el-button @click="handleReset(searchFormRef)" :icon="Refresh">重置</el-button>
                </el-form-item>
    </el-form>
    </div>
   
</template>

<script setup>
import { ref,reactive } from 'vue';
import { Search,Refresh,CaretBottom,CaretTop} from '@element-plus/icons-vue'
const searchForm = reactive({
    name:'',
    code:'',
    status:null,
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

</style>