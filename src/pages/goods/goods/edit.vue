<template>
  <el-card>
    <div class="title-box">
      <div class="left-border"></div>
      <div class="detail-title">基本信息</div>
    </div>
    <el-form :model="form" ref="FormRef" :rules="rules" label-width="140px">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品价格" prop="price">
        <el-input v-model="form.price" clearable placeholder="请输入产品价格" />
      </el-form-item>
      <!-- <el-form-item label="绑定服务类型" prop="serviceTypeIdList">
          <el-select v-model="form.serviceTypeIdList" multiple >
            <el-option :label="item.serviceTypeName" :value="item.id" v-for="item in typeList" :key="item.id"
            />
          </el-select>
        </el-form-item> -->
    </el-form>
    <div class="title-box">
      <div class="left-border"></div>
      <div class="detail-title">服务类型</div>
    </div>
    <div class="goods-box">
      <searchType @onSearch="handleSearch" @onReset="handleSearch" />
      <el-table
        :data="typeList"
        ref="tableRef"
        class="mt-4"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
        :max-height="400"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column label="服务类型名称" prop="serviceTypeName">
        </el-table-column>
        <el-table-column label="服务类型状态" prop="serviceTypeStatus">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.serviceTypeStatus == 10"
              >可用</el-tag
            >
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn-bottom">
      <el-button  class="page-btn bg-65" @click="handleSub(FormRef)"
        >保存</el-button
      >
      <el-button class="page-btn" @click="handleCancel(FormRef)"
        >取消</el-button
      >
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef, nextTick } from "vue";
import { addProduct, fetchProduct, editProduct } from "@/api/goods/goods";
import { getTypeList } from "@/api/goods/type";
import { ElMessage } from "element-plus";
import searchType from "./components/searchType.vue";
import IconSelect from "@/components/IconSelect/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null);
const form = ref({
  productId: null,
  name: "",
  price: "",
  serviceTypeIdList: [],
});
const props = defineProps({
  id: null,
});
const pageParam = reactive({
  merchandiseName: "",
});
const handleSearch = (val) => {
  pageParam.merchandiseName = val.keyword;
  getServiceType();
};
const isPrice = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error("输入的数值必须大于0"));
  } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    callback(new Error("只能输入数字有且只有两位小数"));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  serviceTypeIdList: [{ required: true, message: "请输入产品名称" }],
  price: [
    { required: true, message: "请输入产品价格", trigger: "blur" },
    { required: true, validator: isPrice, trigger: "blur" },
  ],
});
const typeList = ref([]);
// 获取服务状态
const getServiceType = async () => {
  const res = await getTypeList();
  if (res.code == 200) {
    typeList.value = res.data.list;
  }
};

// 勾选
const multipleSelection = ref([]);
const tableRef = ref(null);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  form.value.serviceTypeIdList = multipleSelection.value.map((item) => item.id);
};
// 编辑是回显列表
const toggleSelection = (rows) => {
  if (rows) {
    typeList.value.forEach((row) => {
      tableRef.value.toggleRowSelection(row, rows.includes(row.id));
    });
  } else {
    tableRef.value.clearSelection();
  }
};
// 详情
const getFormInfo = async (productId) => {
  const result = await fetchProduct({ productId });
  if (result.code === 200) {
    form.value = {
      productId: result.data?.id || "",
      name: result.data?.name || "",
      price: Number(result.data?.price) || "",
      serviceTypeIdList: result.data?.serviceTypeVOList.map((item) =>
        Number(item.id)
      ),
    };
    nextTick(() => {
      toggleSelection(form.value.serviceTypeIdList);
    });
  }
};
const handleSub = async (FormRef) => {
  if (!FormRef) return;
  const validator = await FormRef.validate((valid, fields) => {
    if (!valid) {
      return;
    }
  });
  if (!validator) return;
  let result;
  if (form.value.productId) {
    result = await editProduct(form.value);
  } else {
    result = await addProduct(form.value);
  }
  if (result.code === 200) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    FormRef.resetFields();
    tableRef.value.clearSelection();
    router.push("/goods/goods");
  }
};
const handleCancel = (FormRef) => {
  form.value.productId = null;
  if (!FormRef) return;
  tableRef.value.clearSelection();
  FormRef.resetFields();
  router.push("/goods/goods");
};

onMounted(() => {
  getServiceType();
  form.value.productId = router.currentRoute.value.query.id;
  nextTick(() => {
  if (form.value.productId) {
      getFormInfo(form.value.productId);
    }
  });
});
</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}
.btn-bottom {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>
