<template>
    <SearchForm @onSearch="handleSearch" @onReset="handleSearch" />
     <div class="bg-white p-2 rounded-sm">
       <div class="p-2 top-btn">
         <el-button   :icon="CirclePlus" class="!ml-0 search-btn" @click="handleAdd">添加</el-button>
       </div>
         <el-table :data="tableInfo.tableData" border style="width: 100%">
           <!-- <el-table-column type="selection" width="55" /> -->
           <el-table-column label="产品名称" align="center"  prop="name"> </el-table-column>
           <el-table-column label="产品编码" align="center"  prop="code"> </el-table-column>
           <el-table-column label="产品单价(元)" align="center" prop="price"> </el-table-column>
           <!-- <el-table-column label="创建人" prop="createBy"> </el-table-column> -->
           <el-table-column label="创建时间" align="center" prop="createTime" width='200px'> </el-table-column>
           <!-- <el-table-column label="更新人" prop="updateBy" > </el-table-column> -->
           <el-table-column label="更新时间" align="center" prop="updateTime" width='200px'> </el-table-column>
           <el-table-column label="产品状态" width='200px' align="center">
            <template #default="scope" >
              <el-switch
                v-model="scope.row.status"
                active-value="10"
                inactive-value="20"
                @change="changeGoods(scope.row.id)"
              />
            </template>
           </el-table-column>
           
           <el-table-column label="操作" align="center" fixed="right" width="140px">
             <template #default="scope">
                <div class="table-actve">
                  <div class="color-65" @click="handlelDetail(scope.row.id)" >详情</div>
                  <div class="color-65" @click="handleEdit(scope.row.id, scope.row.name)" >编辑</div>
                  <div class="color-65 ml-1" @click="handleDel(scope.row.id)" >删除</div>
                </div>
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
   import { useRouter } from "vue-router";
   const router = useRouter()
  
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
    router.push('/goods/goods/detail/?id='+ id)
    // detailVisible.value = true
    // detailId.value = id
    // dialogTitle.value = `${name}-编辑`;
  }
  
  const handleInitDetail = () =>{
    menuDetailRef.value.getDetail()
  }
  
  const pageParam = reactive({
    merchandiseName:'',
     pageNum:1,
     pageSize:10
   });
   const handleSearch = (val) => {
     pageParam.name = val.name;
     pageParam.pageNum = 1;
     getTableList();
   };

   onMounted(()=>{
     getTableList()
   })
 
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
    router.push('/goods/goods/edit')
    //  editId.value = '',
    //  dialogTitle.value = "新增商品";
    //  formVisible.value = true;
   }
   const handleEdit = (id, name) => {
      router.push({
        path: "/goods/goods/edit",
        query: { id: id },
      });
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