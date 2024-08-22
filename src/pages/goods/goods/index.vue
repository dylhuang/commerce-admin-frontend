<template>
    <SearchForm @onSearch="handleSearch" @onReset="handleSearch" />
     <div class="bg-white p-2 rounded-sm">
       <div class="p-2 top-btn">
         <el-button  plain type="primary" :icon="CirclePlus" class="!ml-0" @click="handleAdd">添加</el-button>
       </div>
         <el-table :data="tableInfo.tableData" border style="width: 100%">
           <el-table-column type="selection" width="55" />
           <el-table-column label="产品名称" prop="name"> </el-table-column>
           <el-table-column label="产品编码" prop="code"> </el-table-column>
           <el-table-column label="产品单价(元)" prop="price"> </el-table-column>
           <!-- <el-table-column label="创建人" prop="createBy"> </el-table-column> -->
           <el-table-column label="创建时间" prop="createTime" width='200px'> </el-table-column>
           <!-- <el-table-column label="更新人" prop="updateBy" > </el-table-column> -->
           <el-table-column label="更新时间" prop="updateTime" width='200px'> </el-table-column>
           <el-table-column label="产品状态" width='200px'>
            <template #default="scope" >
              <el-switch
                v-model="scope.row.status"
                active-text="可用"
                active-value="10"
                inactive-text="不可用"
                inactive-value="20"
                @change="changeGoods(scope.row.id)"
              />
            </template>
           </el-table-column>
           
           <el-table-column label="操作" align="center" fixed="right" width="140px">
             <template #default="scope">
               <el-tooltip class="box-item" effect="dark" content="详情"  placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="success" @click="handlelDetail(scope.row.id)" :icon="Reading" />
               </el-tooltip>
               <el-tooltip class="box-item" effect="dark" content="编辑" placement="top-start">
                 <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.name)" :icon="Edit" />
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
   import { fetchProductList,deleteProduct,ableProduct} from "@/api/goods/goods";
   import { CirclePlus, Top, Back, Delete, Edit,Reading } from "@element-plus/icons-vue";
   import MenuForm from "./components/form.vue";
   import SearchForm from "./components/search.vue";
   import Detail from "./components/detail.vue";
   import Pagination from "@/components/pagination.vue";
   import { hasAuthBtn } from "@/utils/permission";
   import { confirmBox } from "@/utils/feedBack/confirm";
   import { ElMessage } from "element-plus";
   import router from "@/router";
  
    // 切换状态
    const changeGoods = async(productId) =>{
      const res = await ableProduct({productId})
      if(res.code == 200 ){
        ElMessage.success('修改成功')
      }

    }


  const detailVisible = ref(false)
  const detailTitle = ref('详情')
  const detailId = ref(null)
  const menuDetailRef= ref(null)
  // 详情
  const handlelDetail = (id) =>{
    router.push('/goods/goods/detail?id='+ id)
    // detailVisible.value = true
    // detailId.value = id
    // dialogTitle.value = `${name}-编辑`;
  }
  
  const handleInitDetail = () =>{
    menuDetailRef.value.getDetail()
  }
  
  
   const handleSearch = (val) => {
    console.log(val);
     pageParam.name = val.name;
     pageParam.code = val.code;
     pageParam.status = val.status;
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
     const result = await fetchProductList(pageParam);
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
   const handleDel = async (productId) => {
     const canDel = await confirmBox("是否确认删除数据");
     if (!canDel) return;
     const result = await deleteProduct({productId});
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