<template>
     <div class="bg-white page-width">
      <div class="f-16 color-65">服务类型列表</div>
       <SearchForm  @onSearch="handleSearch" @onReset="handleReset" />
       <div class="top-btn">
         <el-button   :icon="CirclePlus" class="!ml-0 search-btn" @click="handleAdd">添加</el-button>
       </div>
         <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55" />
           <el-table-column type="index" width="60" label="序号" align="center" />
           <el-table-column label="服务类型名称" align="center" prop="serviceTypeName"> </el-table-column>
           <el-table-column label="服务类型状态" align="center" prop="serviceTypeStatus">
              <template #default="scope">
                <el-tag type="success" v-if="scope.row.serviceTypeStatus == 10">可用</el-tag>
                <el-tag type="danger" v-else>否</el-tag>
             </template>
           </el-table-column>
           <el-table-column label="创建时间" align="center" prop="createTime"  ></el-table-column>
           <el-table-column label="更新时间" align="center" prop="updateTime"  ></el-table-column>
         
           <el-table-column label="操作" align="center" width="120" fixed="right">
             
              <template #default="scope">
                <div class="table-actve">
                  <div class="color-65" @click="handleEdit(scope.row.id, scope.row.serviceTypeName)">编辑</div>
                  <div class="color-65 ml-1" @click="handleDel(scope.row.id)">删除</div>
                </div>
            </template>
           </el-table-column>
         </el-table>
              <!-- 分页 -->
      <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
        :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNum" />
       </div>

   
     <!-- form dialog -->
     <el-dialog v-model="formVisible" :close-on-click-modal="false" :title="dialogTitle" width="50%" @opened="handleInitForm">
       <MenuForm ref="menuFormRef" :id="editId"  @closeDialog="formVisible = false" @refreshData="handleRefreshData" />
     </el-dialog>
     <!-- 详情 -->
     <el-dialog v-model="detailVisible" :title="detailTitle" center width="50%" @opened="handleInitDetail">
        <Detail ref="menuDetailRef"  :id="detailId"   />
        <template #footer>
        <div class="dialog-footer">
          <el-button @click="detailVisible = false">取消</el-button>
          <el-button type="primary" @click="detailVisible = false">
            确认
          </el-button>
        </div>
      </template>
     </el-dialog>
   </template>
   
   <script setup  >
   import { ref, reactive,onMounted } from "vue";
   import { getTypeList,deletefetch} from "@/api/goods/type";
   import { CirclePlus, Top, Back, Delete, Edit,Reading } from "@element-plus/icons-vue";
   import MenuForm from "./components/form.vue";
   import SearchForm from "./components/search.vue";
   import Detail from "./components/detail.vue";
   import Pagination from "@/components/pagination.vue";
   import { hasAuthBtn } from "@/utils/permission";
   import { confirmBox } from "@/utils/feedBack/confirm";
   import { ElMessage } from "element-plus";
   
   const multipleSelection = ref([]);
   const handleSelectionChange = (val) => {
     multipleSelection.value = val;
   }
  const detailVisible = ref(false)
  const detailTitle = ref('详情')
  const detailId = ref(null)
  const menuDetailRef= ref(null)
  // 详情
  const handlelDetail = (id,name) =>{
    detailVisible.value = true
    detailId.value = id
    dialogTitle.value = `${name}-编辑`;
  }
  
  const handleInitDetail = () =>{
    menuDetailRef.value.getDetail()
  }
  
  
   const handleSearch = (val) => {
     pageParam.serviceTypeName = val.keyword;
     pageParam.serviceTypeStatus = val.serviceTypeStatus;

     pageParam.pageNum = 1;
     getTableList();
   };
   const handleReset = (val) => {
     pageParam.serviceTypeName = val.keyword;
     pageParam.serviceTypeStatus = val.serviceTypeStatus;
     pageParam.pageNum = 1;
     getTableList();
   };
   onMounted(()=>{
     getTableList()
   })
   const pageParam = reactive({
    serviceTypeName:'',
    serviceTypeStatus:'',
     pageNum:1,
     pageSize:10
   });
   // 弹框
   const menuFormRef = ref(null);
   const formVisible = ref(false);
   const dialogTitle = ref("新增商品")
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
     const result = await getTypeList(pageParam);
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
     dialogTitle.value = "新增商品";
     formVisible.value = true;
   }
   const handleEdit = (id, name) => {
     editId.value = id;
     dialogTitle.value = `${name}-编辑`;
     formVisible.value = true;
   };
   const handleDel = async (serviceTypeId) => {
     const canDel = await confirmBox("是否确认删除数据");
     if (!canDel) return;
     const result = await deletefetch({serviceTypeId});
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