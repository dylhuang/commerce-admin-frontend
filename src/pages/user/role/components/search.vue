<template>
        <div class="bg-white p-2 mb-1">
            <el-form class="mt-3" ref="searchFormRef" :model="searchForm" :inline="true" >
                    <el-form-item label="角色名称:" prop="keyword">
                        <el-input v-model.trim="searchForm.keyword" placeholder="请输入角色名称" />
                    </el-form-item>
                    <el-form-item >
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
        keyword:''
    });
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