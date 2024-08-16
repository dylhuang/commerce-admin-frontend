<template>
  <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
   <div class="bg-white p-2 rounded-sm">
     <div class="p-2">
       <el-button  plain type="primary" :icon="CirclePlus" class="!ml-0" @click="handleAdd">添加</el-button>
     </div>
       <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column type="index" width="60" label="序号" align="center" />
         <el-table-column label="商品编码" prop="merchandiseCode"> </el-table-column>
         <el-table-column label="商品名称" prop="merchandiseName"> </el-table-column>
         <el-table-column label="商品状态(是否可用)" prop="status">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="10"
              inactive-value="20"
              @change="changeSwitch(scope.row.id)"
            />
           </template>
         </el-table-column>
         <el-table-column label="活动单价" prop="customerPrice" sortable ></el-table-column>
         <el-table-column label="日常单价" prop="businessPrice" sortable ></el-table-column>
         <el-table-column label="日常可销售" prop="businessEnable">
          <template #default="scope">
             <el-tag type="success" v-if="scope.row.businessEnable == 1">是</el-tag>
             <el-tag type="danger" v-else>否</el-tag>
           </template>
         </el-table-column>
         <el-table-column label="会议可销售" prop="customerEnable">
          <template #default="scope">
             <el-tag type="success" v-if="scope.row.customerEnable == 1">是</el-tag>
             <el-tag type="danger" v-else>否</el-tag>
           </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
           <template #default="scope">
            <el-tooltip class="box-item" effect="dark" content="绑定服务类型"  placement="top-start">
               <el-link class="ml-10px" :underline="false" type="Warning" @click="handleType(scope.row.id)" :icon="CirclePlus" />
             </el-tooltip>
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
   <!-- 分页 -->
 
   <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
     :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNum" />
 
   <!-- form dialog -->
   <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
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
   <!-- 绑定服务类型 -->
   <el-dialog v-model="typelVisible" :title="typeTitle" center width="50%" @opened="handleTypeDetail">
      <serviceType ref="menuTypeRef"  :id="typeId"   />
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
 import { getGoodsList,deleteGoods,ableMerchandise} from "@/api/goods/goods";
 import { CirclePlus, Top, Back, Delete, Edit,Reading} from "@element-plus/icons-vue";
 import MenuForm from "./components/form.vue";
 import SearchForm from "./components/search.vue";
 import Detail from "./components/detail.vue";
 import serviceType from "./components/service.vue";
 import Pagination from "@/components/pagination.vue";
 import { hasAuthBtn } from "@/utils/permission";
 import { confirmBox } from "@/utils/feedBack/confirm";
 import { ElMessage } from "element-plus";
 
 const multipleSelection = ref([]);
 const handleSelectionChange = (val) => {
   multipleSelection.value = val;
 }
// 绑定类型
const menuTypeRef = ref(null)
const typelVisible = ref(false)
const handleType = () =>{
  typelVisible.value = true
}
const handleTypeDetail = () =>{
  menuTypeRef.value.getTypeListdata()
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

// 切换状态
const changeSwitch = async(merchandiseId ) =>{
   const res = await ableMerchandise({merchandiseId})
   if(res.code == 200 ){
    ElMessage.success('修改成功')
   }
}
 const handleSearch = (val) => {
   pageParam.merchandiseName = val.keyword;
   pageParam.pageNum = 1;
   getTableList();
 };
 const handleReset = (val) => {
   pageParam.merchandiseName = val.keyword;
   pageParam.pageNum = 1;
   getTableList();
 };
 onMounted(()=>{
   getTableList()
 })
 const pageParam = reactive({
  merchandiseName:'',
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
   const result = await getGoodsList(pageParam);
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
 const handleDel = async (merchandiseId) => {
   const canDel = await confirmBox("是否确认删除数据");
   if (!canDel) return;
   const result = await deleteGoods({merchandiseId});
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