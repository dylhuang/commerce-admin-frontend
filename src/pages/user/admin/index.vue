<template>
  <SearchForm @onSearch="handleSearch" />
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2 top-btn">
      <el-button  :icon="CirclePlus" class="!ml-0 search-btn"
        @click="handleAdd">添加
      </el-button>
    </div>
  </div>
  <div>
    <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column prop="userName" label="用户名" width="120" align="center" />
      <el-table-column prop="nickName" label="昵称" width="90" align="center" />
      <el-table-column label="联系方式" align="center">
        <template #default="scope">
          <p style="float: left">{{ scope.row.mobile }}</p><br>
          <p style="float: left">{{ scope.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          <section v-if="scope.row.createTime">{{ scope.row.createTime }}</section>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-tooltip  class="box-item" effect="dark" content="编辑"
            placement="top-start">
            <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.userName)"
              :icon="Edit" />
          </el-tooltip>
          <el-tooltip  class="box-item" effect="dark" content="设置密码"
            placement="top-start">
            <el-link class="ml-10px" :underline="false" type="primary" :icon="Setting"
              @click="handleRePassword(scope.row.id, scope.row.nickName)" />
          </el-tooltip>
          <el-tooltip  class="box-item" effect="dark" content="删除"
            placement="top-start">
            <el-link class="ml-10px" :underline="false" type="danger" :icon="Delete"
              @click="handleBatchDel(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <Pagination :total="pageInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
    :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNum" />
  <el-dialog v-model="formVisible" :title="dialogTitle" width="40%" @opened="handleInitForm">
    <AdminForm ref="adminForm" :id="currentId" @closeDialog="handleClose" @refreshData="handleRefreshData" />
  </el-dialog>
  <el-dialog v-model="formPwVisible" :title="dialogPwTitle" width="30%" @opened="handleInitPwForm">
    <PasswordForm ref="passwordForm" :id="currentId" @closeDialog="handlePwClose" @refreshData="handlePwRefreshData" />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import SearchForm from "./components/search.vue";
import Pagination from "@/components/pagination.vue";
import AdminForm from "./components/form.vue";
import PasswordForm from "./components/password.vue";
import { findPage, delItem } from "@/api/user/admin";
import { hasAuthBtn } from "@/utils/permission";
import {
  CirclePlus,
  Delete,
  Unlock,
  Lock,
  CircleCheck,
  CircleClose,
  Edit,
  Setting
} from "@element-plus/icons-vue";
import { confirmBox } from "@/utils/feedBack/confirm";
import { ElMessage } from "element-plus";

// 弹框控制
const adminForm = ref(null);
const formVisible = ref(false);
const dialogTitle = ref("新增管理员");
const passwordForm = ref(null);
const formPwVisible = ref(false);
const dialogPwTitle = ref("设置密码");
const currentId = ref(null);

const pageInfo = reactive({
  table: [],
  total: 0,
})
const pageParam = reactive({
  pageNum: 1,
  pageSize: 20,
  keyword: ""
});
const getPageList = async () => {
  const result = await findPage(pageParam);
  if (result.code === 200 && result.data) {
    pageInfo.table = result.data.list;
    pageInfo.total = result.data.total;
  }
};
const handleSearch = (val) => {
  pageParam.keyword = val;
  pageParam.pageNum = 1;
  getPageList();
}
const handleSizeChange = val => {
  pageParam.pageSize = val;
  getPageList();
};
const handelCurrentChange = val => {
  pageParam.pageNum = val;
  getPageList();
};
const handleRefreshData = () => {
  formVisible.value = false;
  pageParam.pageNum = 1;
  getPageList();
}
const handleClose = () => {
  formVisible.value = false;
  currentId.value = null;
}
const handlePwClose = () => {
  formPwVisible.value = false;
  currentId.value = null;
}
const handlePwRefreshData = () => {
  formPwVisible.value = false;
}
// 勾选
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
}

const handleInitForm = () => {
  adminForm.value.initInfo();
}
const handleInitPwForm = () => {
  passwordForm.value.initInfo();
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
const handleRePassword = (id, name) => {
  dialogPwTitle.value = `${name}-设置密码`;
  currentId.value = id;
  formPwVisible.value = true;
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
  getPageList();
})
</script>

<style lang="scss" scoped></style>