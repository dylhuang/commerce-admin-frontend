<template>
  <SearchForm @onSearch="handleSearch" />
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2">
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/save')" type="primary" :icon="CirclePlus" class="!ml-0"
        @click="handleAdd">添加
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/delete')" type="danger" :icon="Delete" @click="handleBatchDel">删除
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/locked')" type="primary" :icon="Unlock"
        @click="handleBatchUnLocked">解锁
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/locked')" type="danger" :icon="Lock" @click="handleBatchLocked">锁定
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/enable')" type="primary" :icon="CircleCheck"
        @click="handleBatchEnable">启用
      </el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/admin/enable')" type="danger" :icon="CircleClose"
        @click="handleBatchDisabled">禁用
      </el-button>
    </div>
  </div>
  <div>
    <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column label="类型" align="center" width="80" v-if="useUserStoreHook().userInfo.sellerId == 0">
        <template #default="scope">
          <p v-for="(type, index) in roleTypes()" :key="index"><span v-if="type.id == scope.row.roleType">{{ type.desc
          }}</span></p>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="登陆帐号" width="120" align="center" />
      <el-table-column prop="name" label="姓名" width="90" align="center" />
      <el-table-column label="所属部门" align="center">
        <template #default="scope">
          <p style="float: left" v-if="scope.row.department">{{ scope.row.department.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template #default="scope">
          <p style="float: left">{{ scope.row.mobile }}</p><br>
          <p style="float: left">{{ scope.row.email }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
          <el-tag type="danger" style="margin-left:4px" v-if="scope.row.locked">已锁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="scope">
          <section v-if="scope.row.createDate">创建时间：{{ scope.row.createDate }}</section>
          <section v-if="scope.row.loginDate">登陆时间：{{ scope.row.loginDate }}</section>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-tooltip v-if="hasAuthBtn('/admin/v6_0_0/admin/update')" class="box-item" effect="dark" content="编辑"
            placement="top-start">
            <el-link class="ml-10px" :underline="false" type="primary" @click="handleEdit(scope.row.id, scope.row.name)"
              :icon="Edit" />
          </el-tooltip>
          <el-tooltip v-if="hasAuthBtn('/admin/v6_0_0/admin/rePassword')" class="box-item" effect="dark" content="设置密码"
            placement="top-start">
            <el-link class="ml-10px" :underline="false" type="primary" :icon="Setting"
              @click="handleRePassword(scope.row.id, scope.row.name)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <Pagination :total="pageInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
    :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNumber" />
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
import { findPage, delItem, locked, enable } from "@/api/system/admin";
import { roleTypes } from "@/api/common/constant";
import { hasAuthBtn } from "@/utils/permission";
import { useUserStoreHook } from "@/store/modules"
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
  pageNumber: 1,
  pageSize: 20,
  keyword: ""
});
const getPageList = async () => {
  const result = await findPage(pageParam);
  if (result.code === 100 && result.data) {
    pageInfo.table = result.data.records;
    pageInfo.total = result.data.totalCount - 0;
  }
};
const handleSearch = (val) => {
  pageParam.keyword = val;
  pageParam.pageNumber = 1;
  getPageList();
}
const handleSizeChange = val => {
  pageParam.pageSize = val;
  getPageList();
};
const handelCurrentChange = val => {
  pageParam.pageNumber = val;
  getPageList();
};
const handleRefreshData = () => {
  formVisible.value = false;
  pageParam.pageNumber = 1;
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

const handleBatchUnLocked = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择数据");
    return
  }
  const ids = multipleSelection.value.map(item => item.id);
  const result = await locked({ ids: ids, enable: false });
  if (result.code === 100) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
};

const handleBatchLocked = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择数据");
    return
  }
  const ids = multipleSelection.value.map(item => item.id);
  const result = await locked({ ids: ids, enable: true });
  if (result.code === 100) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}

const handleBatchEnable = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择数据");
    return
  }
  const ids = multipleSelection.value.map(item => item.id);
  const result = await enable({ ids: ids, enable: true });
  if (result.code === 100) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}
const handleBatchDisabled = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning("请选择数据");
    return
  }
  const ids = multipleSelection.value.map(item => item.id);
  const result = await enable({ ids: ids, enable: false });
  if (result.code === 100) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}

onMounted(() => {
  getPageList();
})
</script>

<style lang="scss" scoped></style>
