<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <div class="container-left">
        <SearchForm @onSearch="handleSearch" />
        <div class="bg-white p-2 rounded-sm">
          <div class="p-2">
            <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/codeType/save')" type="primary" :icon="CirclePlus" class="!ml-0"
                        @click="handleAdd">添加
            </el-button>
            <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/codeType/delete')" type="danger" :icon="Delete"
                        @click="handleBatchDel">删除
            </el-button>
            <el-button  plain v-if="hasAuthBtn('/admin/v6_0_0/codeType/flushCache')" type="primary" :icon="Refresh"
                        @click="handleFlushCache">刷新缓存
            </el-button>
          </div>
          <div>
            <el-table :data="pageInfo.table" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column type="index" width="60" label="序号" align="center" />
              <el-table-column prop="codeType" label="代码类型" align="left" />
              <el-table-column prop="codeTypeName" label="代码类型名称" />
              <el-table-column label="操作" width="80" align="center">
                <template #default="scope">
                  <el-tooltip v-if="hasAuthBtn('/admin/v6_0_0/codeType/update')" class="box-item" effect="dark" content="编辑"
                              placement="top-start">
                    <el-link class="ml-10px" :underline="false" type="primary"
                             @click="handleEdit(scope.row.id, scope.row.codeType)" :icon="Edit" />
                  </el-tooltip>
                  <el-tooltip class="box-item" effect="dark" content="明细"
                              placement="top-start">
                    <el-link class="ml-10px" :underline="false" type="primary"
                             @click="handleRowItem(scope.row)" :icon="Reading" />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分页 -->
        <Pagination :total="pageInfo.total" @sizeChange="handleSizeChange" @currentChange="handelCurrentChange"
                    :pageSize="pageParam.pageSize" :pageNumber="pageParam.pageNumber"/>
        <el-dialog v-model="formVisible" :title="dialogTitle" width="50%" @opened="handleInitForm">
          <CodeType ref="subSysForm" :id="currentId" @closeDialog="handleClose" @refreshData="handleRefreshData" />
        </el-dialog>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="container-right">
        <code-type-value ref="codeTypeValueRef" />
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import SearchForm from "./components/search.vue";
import Pagination from "@/components/pagination.vue";
import CodeType from "./components/form.vue";
import CodeTypeValue from "./codeTypeValue/index.vue";
import { getList, delItem, flushCache } from "@/api/system/codeType.js";
import { hasAuthBtn } from "@/utils/permission";
import { CirclePlus, Delete, Edit, Reading, Refresh } from "@element-plus/icons-vue";
import { confirmBox } from "@/utils/feedBack/confirm";
import { ElMessage } from "element-plus";
import {useCodeTypeStoreHook} from "@/store/modules.js";

const codeTypeValueRef = ref();
const pageInfo = reactive({
  table: [],
  total: 0,
})
const pageParam = reactive({
  pageSize: 20,
  pageNumber: 1,
  keyword: ""
});
const getPageList = async () => {
  const result = await getList(pageParam);
  if (result.code === 200 && result.data) {
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
// 勾选
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
}
// 弹框控制
const subSysForm = ref(null);
const formVisible = ref(false);
const dialogTitle = ref("新增数据字典");
const currentId = ref(null);
const handleInitForm = () => {
  subSysForm.value.initInfo();
}
// 添加
const handleAdd = () => {
  currentId.value = null;
  formVisible.value = true;
}
const handleEdit = (id, codeType) => {
  dialogTitle.value = `${codeType}-编辑`;
  currentId.value = id;
  formVisible.value = true;
}

const handleRowItem = (row) => {
  useCodeTypeStoreHook().setSelectRow(row);
  codeTypeValueRef.value.getPageList()
}
const handleDel = async (data) => {
  const canDel = await confirmBox("是否确认删除数据");
  if (!canDel) return;
  const result = await delItem({ ids: data });
  if (result.code === 200) {
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
const handleFlushCache = async () => {
  const result = await flushCache();
  if (result.code === 200) {
    ElMessage.success("操作成功");
    handleRefreshData();
  }
}
onMounted(() => {
  getPageList();
})
</script>

<style lang="scss" scoped>
.container-left {
  width: 100%;
  height: 100%;
  display: flex;
  border-right: 1px solid #EBEEF5;
  flex-direction: column;
}
.container-right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
