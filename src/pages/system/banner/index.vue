<template>
    <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
     <div class="bg-white p-2 rounded-sm">
       <div class="p-2 top-btn">
         <el-button  plain type="primary" :icon="CirclePlus" class="!ml-0" @click="handleAdd">添加</el-button>
        
       </div>
         <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55" />
           <el-table-column type="index" width="60" label="序号" align="center" />
           <el-table-column label="图像名称" prop="name"> </el-table-column>
           <el-table-column label="图像类型" prop="title"> 
            <template #default="scope">
              <div v-if="scope.row.type == 10" >首页轮播</div>
              <div v-else>其他</div>
            </template>

           </el-table-column>
           
           <el-table-column label="图像状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-text="启用"
                :active-value="1"
                inactive-text="禁用"
                :inactive-value="0"
                @change="changeImage(scope.row.id)"
              />
            </template>
           </el-table-column>
           <el-table-column prop="createTime" label="创建时间" />
           <el-table-column label="操作" align="center">
             <template #default="scope">
               <el-tooltip class="box-item" effect="dark" content="编辑"
                 placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.name)"
                   :icon="Edit" />
               </el-tooltip>
               <el-tooltip class="box-item" effect="dark" content="删除"
                 placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="danger" @click="handleDel(scope.row.id)"
                   :icon="Delete" />
               </el-tooltip>
             </template>
           </el-table-column>
         </el-table>
       </div>
     <!-- 分页 -->
   
     <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
       :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNum" />
   
     <!-- form dialog -->
     <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
       <MenuForm ref="menuFormRef" :id="editId"  @closeDialog="formVisible = false" @refreshData="handleRefreshData" />
     </el-dialog>
   </template>
   
   <script setup  >
   import { ref, reactive,onMounted } from "vue";
   import { fetchImageList,deleteImage,ableImage} from "@/api/system/banner";
   import { CirclePlus, Top, Back, Delete, Edit } from "@element-plus/icons-vue";
   import MenuForm from "./components/form.vue";
   import SearchForm from "./components/search.vue";
   import Pagination from "@/components/pagination.vue";
   // import { hasAuthBtn } from "@/utils/permission";
   import { confirmBox } from "@/utils/feedBack/confirm";
   import { ElMessage } from "element-plus";
   
   const multipleSelection = ref([]);
   const handleSelectionChange = (val) => {
     multipleSelection.value = val;
   }
   const handleSearch = (val) => {
     pageParam.title = val.keyword;
     pageParam.pageNum = 1;
     getTableList();
   };
   const handleReset = (val) => {
     pageParam.title = val.keyword;
     pageParam.pageNum = 1;
     getTableList();
   };
   onMounted(()=>{
     getTableList()
   })
   const pageParam = reactive({
     name:'',
     pageNum:1,
     pageSize:10
   });
   
// 切换状态
const changeImage = async(imageId) =>{
  
    const res = await ableImage({imageId})
    if(res.code == 200 ){
      ElMessage.success('修改成功')
    }
  
}
   // 弹框
   const menuFormRef = ref(null);
   const formVisible = ref(false);
   const dialogTitle = ref("新增")
   const editId = ref("");
   const handleInitForm = () => {
     menuFormRef.value.initInfo();
   }
   // 表格数据
   const tableInfo = reactive({
     tableData: [],
     total: 0
   });
   const getTableList = async () => {
     const result = await fetchImageList(pageParam);
     if (result.code === 200) {
       tableInfo.tableData = result.data.list || [];
       tableInfo.total = result.data.total;
     }
   };
   const handleSizeChange = val => {
     pageParam.pageSize = val;
     getTableList();
   };
   const handelCurrentChange = val => {
     pageParam.pageNum = val;
     getTableList();
   };
   const handleRefreshData = () => {
     pageParam.pageNum = 1;
     formVisible.value = false;
     getTableList();
   }
   
   const handleAdd = () => {
     editId.value = '',
     dialogTitle.value = "新增公告";
     formVisible.value = true;
   }
   const handleEdit = (id, name) => {
     editId.value = id;
     dialogTitle.value = `${name}-编辑`;
     formVisible.value = true;
   };
   const handleDel = async (imageId) => {
     const canDel = await confirmBox("是否确认删除数据");
     if (!canDel) return;
     const result = await deleteImage({imageId});
     if (result.code === 200) {
       ElMessage.success("操作成功");
       handleRefreshData();
     }
   };
   
   
   
   </script>
   
   <style lang="scss" scoped>
   .el-form-item {
     margin-bottom: 0;
   }
   </style>