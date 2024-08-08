<template>
  <SearchForm @onSearch="handleSearch" />
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2">
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/role/save')" type="primary" :icon="CirclePlus" class="!ml-0"
        @click="handleAdd">添加
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/role/delete')" type="danger" :icon="Delete" @click="handleBatchDel">删除
      </el-button>
    </div>
    <div>
      <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="description" label="备注" />
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column label="操作" width="80" align="center">
          <template #default="scope">
            <el-tooltip v-if="hasAuthBtn('/admin/v6_0_0/role/update')" class="box-item" effect="dark" content="编辑"
              placement="top-start">
              <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.name)"
                :icon="Edit" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 分页 -->
  <Pagination :total="pageInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
    :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNumber" />
  <el-dialog v-model="formVisible" :title="dialogTitle" width="70%" @opened="handleInitForm">
    <RoleForm ref="roleForm" :id="currentId" @closeDialog="handleClose" @refreshData="handleRefreshData" />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import SearchForm from "./components/search.vue";
import Pagination from "@/components/pagination.vue";
import RoleForm from "./components/form.vue";
import { getList, delItem } from "@/api/system/role";
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
  pageNumber: 1,
  keyword: ""
});
const getRoleList = async () => {
  const result = await getList(pageParam);
  if (result.code === 100 && result.data) {
    pageInfo.table = result.data.records;
    pageInfo.total = result.data.totalCount - 0;
  }
};
const handleSearch = (val) => {
  pageParam.keyword = val;
  pageParam.pageNumber = 1;
  getRoleList();
}
const handleSizeChange = val => {
  pageParam.pageSize = val;
  getRoleList();
};
const handelCurrentChange = val => {
  pageParam.pageNumber = val;
  getRoleList();
};
const handleRefreshData = () => {
  formVisible.value = false;
  pageParam.pageNumber = 1;
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
  currentId.value = null;
  formVisible.value = true;
}
const handleEdit = (id, name) => {
  dialogTitle.value = `${name}-编辑`;
  currentId.value = id;
  formVisible.value = true;
}
const handleDel = async (data) => {
  const canDel = await confirmBox("是否确认删除数据");
  if (!canDel) return;
  const result = await delItem({ ids: data });
  if (result.code === 100) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}
const handleBatchDel = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择删除数据");
    return
  }
  const ids = multipleSelection.value.map(item => item.id);
  await handleDel(ids)
}

onMounted(() => {
  getRoleList();
})
</script>

<style lang="scss" scoped></style>
