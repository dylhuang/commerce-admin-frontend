<template>
  <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
   <div class="bg-white p-2 rounded-sm">
     <div class="p-2">
       <el-button  plain type="primary" :icon="CirclePlus" class="!ml-0" @click="handleAdd">添加</el-button>
     </div>
       <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column type="index" width="60" label="序号" align="center" />
         <el-table-column label="商品编码" prop="title"> </el-table-column>
         <el-table-column label="商品名称" prop="title"> </el-table-column>
         <el-table-column label="状态">
           <template #default="scope">
             <el-tag type="success" v-if="scope.row.popup == 1">启用</el-tag>
             <el-tag type="danger" v-else>禁用</el-tag>
           </template>
         </el-table-column>
         <el-table-column label="活动单价" prop="title" sortable ></el-table-column>
         <el-table-column label="日常单价" prop="title" sortable ></el-table-column>
         <el-table-column label="日常可销售" prop="title"></el-table-column>
         <el-table-column label="会议可销售" prop="title"></el-table-column>
         <el-table-column label="操作" align="center">
           <template #default="scope">
             <el-tooltip class="box-item" effect="dark" content="详情"  placement="top-start">
               <el-link class="ml-10px" :underline="false" type="Success" @click="handleDel(scope.row.id)" :icon="Reading" />
             </el-tooltip>
             <el-tooltip class="box-item" effect="dark" content="编辑" placement="top-start">
               <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.title)" :icon="Edit" />
             </el-tooltip>
             <el-tooltip class="box-item" effect="dark" content="删除"  placement="top-start">
               <el-link class="ml-10px" :underline="false" type="error" @click="handleDel(scope.row.id)" :icon="Delete" />
             </el-tooltip>
             
           </template>
         </el-table-column>
       </el-table>
     </div>
   <!-- 分页 -->
 
   <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
     :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNumber" />
 
   <!-- form dialog -->
   <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
     <MenuForm ref="menuFormRef" :id="editId"  @closeDialog="formVisible = false" @refreshData="handleRefreshData" />
   </el-dialog>
 </template>
 
 <script setup  >
 import { ref, reactive,onMounted } from "vue";
 import { getNoticeList,deleteNotice} from "@/api/system/notice";
 import { CirclePlus, Top, Back, Delete, Edit,Reading } from "@element-plus/icons-vue";
 import MenuForm from "./components/form.vue";
 import SearchForm from "./components/search.vue";
 import Pagination from "@/components/pagination.vue";
 import { hasAuthBtn } from "@/utils/permission";
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
   title:'',
   pageNum:1,
   pageSize:10
 });
 // 弹框
 const menuFormRef = ref(null);
 const formVisible = ref(false);
 const dialogTitle = ref("新增公告")
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
   const result = await getNoticeList(pageParam);
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
 const handleDel = async (noticeId) => {
   const canDel = await confirmBox("是否确认删除数据");
   if (!canDel) return;
   const result = await deleteNotice({noticeId});
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