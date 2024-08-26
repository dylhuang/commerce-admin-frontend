<template>
  <SearchForm :currentTags="currentTags" @onSearch="handleSubChange" />
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2 top-btn">
      <el-button  v-if="hasAuthBtn('user:user:add')"  :icon="CirclePlus" class="!ml-0 search-btn"
        @click="handleAddMenu">添加
      </el-button>
      <el-button :icon="Top" @click="handleBackTop">顶级</el-button>
      <el-button v-show="currentTags.length" :icon="Back" @click="handleBackStep" class="mr-3">上一级
      </el-button>
    </div>
    <div>
      <el-table :data="tableInfo.tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column label="名称">
          <template #default="scope">
            <el-button type="primary" size="small" link 
              @click="handleNext(scope.row.id, scope.row.menuName)">
              {{ scope.row.menuName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="图标">
          <template #default="scope">
            <svg-icon :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.isEnable == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" content="编辑"
              placement="top-start">
              <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.menuName)"
                :icon="Edit" />
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="删除"
              placement="top-start">
              <el-link class="ml-10px" :underline="false" type="danger" @click="handleBatchDel(scope.row.id)"
                :icon="Delete" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 分页 -->
  <Pagination :total="tableInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
    :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNumber" />

  <!-- form dialog -->
  <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
    <MenuForm ref="menuFormRef" :id="editId" :partitionId="pageParam.partitionId" :parentId="pageParam.parentId"
      :parentName="parentName" @closeDialog="formVisible = false" @refreshData="handleRefreshData" />
  </el-dialog>
</template>

<script setup  >
import { ref, reactive,onMounted } from "vue";
import { delMenu, getResourceList } from "@/api/user/menu";
import { CirclePlus, Top, Back, Delete, Edit } from "@element-plus/icons-vue";
import MenuForm from "./components/form.vue";
import SearchForm from "./components/search.vue";
import Pagination from "@/components/pagination.vue";
import { hasAuthBtn } from "@/utils/permission";
import { confirmBox } from "@/utils/feedBack/confirm";
import { ElMessage } from "element-plus";

const multipleSelection = ref([]);
const currentTags = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
}
const handleSubChange = (subSystemId) => {
  pageParam.menuName = subSystemId;
  getTableList();
};
onMounted(()=>{
  getTableList()
})
const pageParam = reactive({
  parentId: "0",
  partitionId: "",
  menuName:''
});
// 表格数据
const tableInfo = reactive({
  tableData: [],
  total: 0
});
const getTableList = async () => {
  const result = await getResourceList(pageParam);
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
  pageParam.pageNumber = val;
  getTableList();
};
const handleRefreshData = () => {
  pageParam.pageNumber = 1;
  formVisible.value = false;
  getTableList();
}

// 弹框
const menuFormRef = ref(null);
const formVisible = ref(false);
const dialogTitle = ref("新增菜单")
const editId = ref("");
const parentName = ref("");
const handleInitForm = () => {
  menuFormRef.value.initInfo();
}

const handleAddMenu = () => {
  editId.value = "";
  if (currentTags.value.length) {
    parentName.value = currentTags.value[currentTags.value.length - 1].name;
  } else {
    parentName.value = "";
  }
  dialogTitle.value = "新增菜单";
  formVisible.value = true;
}
const handleEdit = (id, name) => {
  editId.value = id;
  dialogTitle.value = `${name}-编辑`;
  if (currentTags.value.length) {
    parentName.value = currentTags.value[currentTags.value.length - 1].name;
  } else {
    parentName.value = "";
  }
  formVisible.value = true;
};
const handleBatchDel = async ids => {
  const canDel = await confirmBox("是否确认删除数据");
  if (!canDel) return;
  
  const result = await delMenu([ids]);
  if (result.code === 200) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
};

// 当前位置

const handleNext = (id, name) => {
  currentTags.value.push({ id: pageParam.parentId, name });
  pageParam.parentId = id;
  pageParam.pageNumber = 1;
  getTableList();
};
const handleBackTop = () => {
  pageParam.pageNumber = 1;
  pageParam.parentId = "0";
  currentTags.value = [];
  getTableList();
};
const handleBackStep = () => {
  pageParam.pageNumber = 1;
  pageParam.parentId = currentTags.value[currentTags.value.length - 1].id;
  currentTags.value = currentTags.value.slice(0, -1);
  getTableList();
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>