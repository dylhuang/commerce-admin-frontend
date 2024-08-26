<template>
  <SearchForm @onSearch="handleSearch" @onReset="handleReset" />
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2 top-btn">
      <el-button  :icon="CirclePlus" class="!ml-0 search-btn"
        @click="handleAdd">添加
      </el-button>
    
    </div>
    <div>
      <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column prop="roleName" label="角色名称" align="center" />
        <el-table-column prop="roleCode" label="角色编码" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="120" align="center" fixed="right" style="background-color:#F4F6F8;">
          <template #default="scope">
              <div class="table-actve">
                <div class="color-65"  @click="handleEdit(scope.row.id, scope.row.roleName)">编辑</div>
                <div class="color-65 ml-1" @click="handleBatchDel(scope.row.id)">删除</div>
              </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 分页 -->
  <Pagination :total="pageInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
    :pageSize="pageParam.pageSize" :pageNum="pageParam.pageNum" />
  <el-dialog v-model="formVisible" :title="dialogTitle" width="70%" @opened="handleInitForm">
    <RoleForm ref="roleForm" :id="currentId" @closeDialog="handleClose" @refreshData="handleRefreshData" />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import SearchForm from "./components/search.vue";
import Pagination from "@/components/pagination.vue";
import RoleForm from "./components/form.vue";
import { getList, delItem } from "@/api/user/role";
import { hasAuthBtn } from "@/utils/permission";
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue";
import { confirmBox } from "@/utils/feedBack/confirm";
import { ElMessage } from "element-plus";

const pageInfo = reactive({
  table: [],
  total: 0,
})
const pageParam = reactive({
  pageSize: 20,
  pageNum: 1,
  roleName: ""
});
const getRoleList = async () => {
  const result = await getList(pageParam);
  if (result.code === 200 && result.data) {
    pageInfo.table = result.data.list;
    pageInfo.total = result.data.total;
  }
};
const handleSearch = (val) => {
  pageParam.roleName = val.keyword;
  pageParam.pageNum = 1;
  getRoleList();
}
const handleReset = (val) => {
  pageParam.roleName = val.keyword;
  pageParam.pageNum = 1;
  getRoleList();
};
const handleSizeChange = val => {
  pageParam.pageSize = val;
  getRoleList();
};
const handelCurrentChange = val => {
  pageParam.pageNum = val;
  getRoleList();
};
const handleRefreshData = () => {
  formVisible.value = false;
  pageParam.pageNum = 1;
  getRoleList();
}
const handleClose = () => {
  formVisible.value = false;
  currentId.value = null;
}
// 勾选
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
}
// 弹框控制
const roleForm = ref(null);
const formVisible = ref(false);
const dialogTitle = ref("新增角色");
const currentId = ref(null);
const handleInitForm = () => {
  roleForm.value.initInfo();
}
// 添加
const handleAdd = () => {
  dialogTitle.value = '新增角色'
  currentId.value = null;
  formVisible.value = true;
}
const handleEdit = (id, name) => {
  dialogTitle.value = `${name}-编辑`;
  currentId.value = id;
  formVisible.value = true;
}
const handleBatchDel = async (ids) => {
  const canDel = await confirmBox("是否确认删除数据");
  if (!canDel) return;
  const result = await delItem([ids]);
  if (result.code === 200) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}
// const handleBatchDel = async () => {
//   if (!multipleSelection.value.length) {
//     ElMessage.warning("请选择删除数据");
//     return
//   }
//   const ids = multipleSelection.value.map(item => item.id);
//   await handleDel(ids)
// }

onMounted(() => {
  getRoleList();
})
</script>

<style lang="scss" scoped></style>
@/api/user/role