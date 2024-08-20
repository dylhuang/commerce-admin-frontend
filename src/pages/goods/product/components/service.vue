<template>
    <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
     <div class="bg-white p-2 rounded-sm">
         <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
           <el-table-column type="index" width="60" label="序号" align="center" />
           <el-table-column label="服务类型名称" prop="serviceTypeName"> </el-table-column>
           <el-table-column label="服务类型状态" prop="serviceTypeStatus">
              <template #default="scope">
                <el-tag type="success" v-if="scope.row.serviceTypeStatus == 10">可用</el-tag>
                <el-tag type="danger" v-else>否</el-tag>
             </template>
           </el-table-column>
           <el-table-column label="创建时间" prop="createTime"  ></el-table-column>
           <el-table-column label="更新时间" prop="updateTime"  ></el-table-column>
         </el-table>
           <!-- 分页 -->
          <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
            :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNum" />
        
       </div>
          <div class="dialog-btn">
            <el-button @click="cancelTypeBtn">取消</el-button>
            <el-button type="primary" @click="querServiceType">确认</el-button>
          </div>
</template>

<script setup>
     import { ref, reactive,onMounted } from "vue";
     import { getTypeList,bindType} from "@/api/goods/type";
     import SearchForm from "./searchServe.vue";
     const emit = defineEmits(["closeDialog", "refreshData"]);
     const props = defineProps({
        id: null
      });
      const merchandiseId = ref(null)

    // 表格数据
    const tableInfo = reactive({
      tableData: [],
      total: 0
    });
     const pageParam = reactive({
        pageNum:1,
        pageSize:10,
        serviceTypeName:''
     })
    //  搜索
    const handleSearch = (val) => {
      pageParam.serviceTypeName = val.keyword;
      pageParam.pageNum = 1;
      getTypeListdata();
    };
    const handleSizeChange = val => {
     pageParam.pageSize = val;
     getTypeListdata();
   };
   const handelCurrentChange = val => {
     pageParam.pageNum = val;
     getTypeListdata();
   };
    const handleReset = (val) => {
      pageParam.serviceTypeName = val.keyword;
      pageParam.pageNum = 1;
      getTypeListdata();
    };
    const multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
      multipleSelection.value = val.map(item=>item.id);
      console.log( multipleSelection.value);
    }
  
     //  绑定服务按钮
   const querServiceType = async() =>{
      const data = {
        merchandiseId:merchandiseId.value,
        serviceTypeIdList:multipleSelection.value
      }
      const res = await bindType(data)
      if(res.code === 200){
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        emit("refreshData");
      }
   }
   const cancelTypeBtn = () =>{
    emit("closeDialog");
   }
   const getTypeListdata = async () => {
        merchandiseId.value=props.id;
        console.log(props.id);
        
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
.dialog-btn{
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>