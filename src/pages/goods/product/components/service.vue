<template>
    <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
     <div class="bg-white p-2 rounded-sm">
         <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55" />
           <el-table-column type="index" width="60" label="序号" align="center" />
           <el-table-column label="商品名称" prop="merchandiseName"> </el-table-column>
           <el-table-column label="发布状态" prop="status">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="10"
                inactive-value="20"
                @change="changeSwitch(scope.row.id)"
              />
             </template>
           </el-table-column>
           <el-table-column label="详细" prop="customerPrice"></el-table-column>
           <el-table-column label="创建时间" prop="businessPrice"></el-table-column>
           <el-table-column label="更新时间" prop="businessPrice"></el-table-column>
         
           <el-table-column label="操作" align="center">
             <template #default="scope">
               <el-tooltip class="box-item" effect="dark" content="详情"  placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="success" @click="handlelDetail(scope.row.id,scope.row.merchandiseName)" :icon="Reading" />
               </el-tooltip>
               <el-tooltip class="box-item" effect="dark" content="编辑" placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.merchandiseName)" :icon="Edit" />
               </el-tooltip>
               <el-tooltip class="box-item" effect="dark" content="删除"  placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="danger" @click="handleDel(scope.row.id)" :icon="Delete" />
               </el-tooltip>
               
             </template>
           </el-table-column>
         </el-table>
       </div>
</template>

<script setup>
     import { ref, reactive,onMounted } from "vue";
     import { getTypeList,deleteGoods,ableMerchandise} from "@/api/goods/type";
     import SearchForm from "./search.vue";
    // 表格数据
    const tableInfo = reactive({
      tableData: [],
      total: 0
    });
     const pageParam = reactive({
        pageNum:1,
        pageSize:10,
        merchandiseName:''
     })
    //  搜索
    const handleSearch = (val) => {
      pageParam.merchandiseName = val.keyword;
      pageParam.pageNum = 1;
      getTygetTypeListdatapeList();
    };

    const handleReset = (val) => {
      pageParam.merchandiseName = val.keyword;
      pageParam.pageNum = 1;
      getTypeListdata();
    };
    const handleSelectionChange =() =>{

    }
     const getTypeListdata = async () => {
        const result = await getTypeList(pageParam);
        if (result.code === 200) {
        tableInfo.tableData = result.data.list || [];
        tableInfo.total = result.data.total;
    }
   }
   defineExpose({
    getTypeListdata,
})
</script>

<style lang="scss" scoped>

</style>