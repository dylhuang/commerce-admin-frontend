<template><!-- <SearchForm @onSearch="handleSeach" /> -->
  <div class="bg-white p-2 rounded-sm">
    <div class="p-2">
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/department/save')" type="primary" :icon="CirclePlus"
        @click="handleAdd">添加</el-button>
      <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/department/delete')" type="danger" :icon="Delete"
        @click="handleBatchDel">删除</el-button>
      <el-button :icon="Top" @click="handleReturnTop">顶级</el-button>
      <el-button v-show="stepList.length > 1" :icon="Back" @click="handleReturnStep">上一级</el-button>
    </div>
    <div>
      <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column label="部门名称">
          <template #default="scope">
            <el-button type="primary" size="small" link @click="handleNext(scope.row)">
              {{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="上级部门" align="center">
          <template #default="scope">
            <span>
              {{ stepList.length ? stepList.map(item => item.name).join('-') : '顶级' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column label="操作" width="80" align="center">
          <template #default="scope">
            <el-tooltip v-if="hasAuthBtn('/admin/v6_0_0/department/update')" class="box-item" effect="dark" content="编辑"
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
  <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
    <form-module ref="formModule" :id="currentId" @parent="formParent" @closeDialog="handleClose"
      @refreshData="handleRefreshData" />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';
import FormModule from './components/form.vue';
import { getList, delItem } from '@/api/system/department';
import { hasAuthBtn } from "@/utils/permission";
import { CirclePlus, Delete, Back, Top, Edit } from '@element-plus/icons-vue';
import { confirmBox } from '@/utils/feedBack/confirm';
import { useCommonStoreHook } from '@/store/modules';
import { ElMessage } from 'element-plus';

const pageInfo = reactive({
  table: [],
  total: 0,
});
const pageParam = reactive({
  pageSize: 20,
  pageNumber: 1,
  parentId: '0',
});
const getDepList = async () => {
  const result = await getList(pageParam);
  if (result.code === 200 && result.data) {
    pageInfo.table = result.data.records;
    pageInfo.total = result.data.totalCount - 0;
  }
};
const stepList = ref([{ name: '顶级', id: '0' }]);
const handleNext = ({ id, parentId, name }) => {
  pageParam.pageNumber = 1;
  pageParam.parentId = id;
  getDepList();
  stepList.value.push({
    name,
    id: parentId,
  });
};
const handleSizeChange = val => {
  pageParam.pageSize = val;
  getDepList();
};
const handelCurrentChange = val => {
  pageParam.pageNumber = val;
  getDepList();
};
const handleRefreshData = () => {
  formVisible.value = false;
  pageParam.pageNumber = 1;
  pageParam.parentId = '0';
  stepList.value = [{ name: '顶级', id: '0' }];
  // 同步部门信息
  useCommonStoreHook().getDepartmentTreeAction();
  getDepList();
};
const handleClose = () => {
  formVisible.value = false;
  currentId.value = null;
};
const handleReturnTop = () => {
  stepList.value = [{ name: '顶级', id: '0' }];
  pageParam.pageNumber = 1;
  pageParam.parentId = '0';
  getDepList();
};
const handleReturnStep = () => {
  const stepLength = stepList.value.length;
  if (stepLength > 1) {
    const endStep = stepList.value[stepLength - 1];
    pageParam.pageNumber = 1;
    pageParam.parentId = endStep.id;
    stepList.value = stepList.value.slice(0, -1);
    getDepList();
  } else if (stepLength) {
    handleReturnTop();
  }
};
// 勾选
const multipleSelection = ref([]);
const handleSelectionChange = val => {
  multipleSelection.value = val;
};
// 弹框控制
const formModule = ref(null);
const formVisible = ref(false);
const dialogTitle = ref('新增部门');
const currentId = ref(null);
const formParent = reactive({
  parentName: null,
  parentId: null,
});
const handleInitForm = () => {
  formModule.value.initInfo();
};
// 添加
const handleAdd = () => {
  currentId.value = null;
  formVisible.value = true;
};
const handleEdit = (id, name) => {
  dialogTitle.value = `${name}-编辑`;
  currentId.value = id;
  formVisible.value = true;
};
const handleDel = async data => {
  const canDel = await confirmBox('是否确认删除数据');
  if (!canDel) return;
  const result = await delItem({ ids: data });
  if (result.code === 200) {
    ElMessage.success('操作成功');
    handleRefreshData();
  }
};
const handleBatchDel = async () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning('请选择删除数据');
    return;
  }
  const ids = multipleSelection.value.map(item => item.id);
  await handleDel(ids);
};

onMounted(() => {
  if (!useCommonStoreHook().departmentTree.length) {
    useCommonStoreHook().getDepartmentTreeAction();
  }
  getDepList();
});
</script>

<style lang="scss" scoped></style>
