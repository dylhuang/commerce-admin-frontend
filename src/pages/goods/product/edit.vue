<template>
  <el-card>
    <div class="title-box">
      <div class="left-border"></div>
      <div class="detail-title">基本信息</div>
    </div>
    <el-form
      :model="form"
      ref="FormRef"
      :rules="rules"
      label-width="160px"
      class="mt-10"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="merchandiseName">
            <el-input
              v-model="form.merchandiseName"
              clearable
              placeholder="请输入商品名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="零售价格" prop="businessPrice">
            <el-input
              v-model="form.businessPrice"
              clearable
              placeholder="请输入零售价格"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可零售价格销售" prop="businessEnable">
            <el-radio-group v-model="form.businessEnable">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="协议价格" prop="customerPrice">
            <el-input
              v-model="form.customerPrice"
              placeholder="请输入协议价格"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可协议价格销售" prop="customerEnable">
            <el-radio-group v-model="form.customerEnable">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 产品表格 -->
    <div class="title-box">
      <div class="left-border"></div>
      <div class="detail-title">产品信息</div>
    </div>
    <div class="goods-box">
      <SearchForm @onSearch="handleSearch" @onReset="handleSearch" />
      <el-table
        :data="tableData"
        ref="tableRef"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
        :max-height="400"
        border
        @selection-change="handleSelectionChange"
        @cell-click="handlecellClick"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="goodsPrice" label="产品单价" />
        <el-table-column prop="productNumber" label="产品数量">
          <template #default="scope">
            <el-input-number
              :min="0"
              v-model="scope.row.productNumber"
              @change="prodNumberChange"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn-bottom">
      <el-button  class="page-btn bg-65" @click="handleSub(FormRef)"
        >保存</el-button
      >
      <el-button class="page-btn" @click="handleCancel(FormRef)"
        >返回</el-button
      >
    </div>
  </el-card>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, shallowRef } from "vue";
import { addMerchandise, editGoods, detailGoods } from "@/api/goods/product";
import { fetchProductList } from "@/api/goods/goods";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
import SearchForm from "./components/searchServe.vue";

const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null);
const form = ref({
  merchandiseId: null,
  merchandiseName: "",
  businessPrice: null,
  businessEnable: "",
  customerEnable: "",
  customerPrice: null,
  productId: [],
  relationList: [],
});
const tableRef = ref(null);
const pageParam = reactive({
  name: "",
});
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
  merchandiseName: [
    {
      required: true,
      message: "请输入商品名称",
      trigger: "blur",
    },
  ],
  businessPrice: [
    { required: true, validator: isPrice, trigger: "blur" },
    { required: true, message: "请输入日常单价", trigger: "blur" },
  ],
  customerPrice: [
    { required: true, validator: isPrice, trigger: "blur" },
    { required: true, message: "请输入活动单价", trigger: "blur" },
  ],
  customerEnable: [{ required: true, message: "请选择是否会议可销售" }],
  businessEnable: [{ required: true, message: "请选择是否日常可销售" }],
  productId: [{ required: true, message: "请选择绑定产品" }],
});

const prodNumberChange = () => {
  form.value.businessPrice = tableData.value.reduce((prev, item) => {
    return prev + (item.goodsPrice || 0) * item?.productNumber;
  }, 0);
};
//  搜索
const handleSearch = (val) => {
  pageParam.serviceTypeName = val.name;
  pageParam.pageNum = 1;
  getProductList();
};
// 获取产品列表
const tableData = ref([]);
const getProductList = async () => {
  const res = await fetchProductList();
  if (res.code == 200) {
    tableData.value = res.data.list.map((item) => {
      const goodsObj = {
        name: item.name,
        productId: item.id,
        productNumber: 0,
        goodsPrice: item.price,
      };
      return goodsObj;
    });
  }
};
// 详情
const getFormInfo = async (merchandiseId) => {
  const result = await detailGoods({ merchandiseId });
  if (result.code === 200) {
    form.value = {
      id: result.data.id,
      merchandiseName: result.data.merchandiseName,
      businessPrice: result.data.businessPrice,
      customerEnable: result.data.customerEnable,
      businessEnable: result.data.businessEnable,
      customerPrice: result.data.customerPrice,
      productId: result.data.productVOList.map((item) => item.id),
    };
    tableData.value.map((items) => {
      result.data.productVOList.forEach((item) => {
        if (items.productId == item.id) {
          items.productNumber = item.productNumber;
        }
      });
    });
    nextTick(() => {
      toggleSelection(form.value.productId);
    });
  }
};
// 编辑是回显列表
const toggleSelection = (rows) => {
  console.log(rows);

  if (rows) {
    tableData.value.forEach((row) => {
      tableRef.value.toggleRowSelection(row, rows.includes(row.productId));
    });
  } else {
    tableRef.value.clearSelection();
  }
};
// 勾选
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  form.value.relationList = multipleSelection.value.map((item) => {
    const checkList = {
      productNumber: item.productNumber,
      productId: item.productId,
    };
    return checkList;
  });
  prodNumberChange();
};
// 获取当前行  改变数量
const handlecellClick = (val) => {
  if (multipleSelection.value.length > 0) {
    form.value.relationList.map((item) => {
      if (item.productId == val.productId) {
        (item.productNumber = val.productNumber),
          (item.productId = val.productId);
      }
    });
  }
};

// 判断；列表 数量

const cannotEmpty = (data) => {
  return data.every((item) => !!item.productNumber);
};

const handleSub = async (FormRef) => {
  if (!cannotEmpty(multipleSelection.value)) {
    ElMessage({
      message: "产品数量需大于0",
      type: "error",
    });
    return;
  }

  if (!FormRef) return;
  const validator = await FormRef.validate((valid, fields) => {
    if (!valid) {
      return;
    }
  });
  if (!validator) return;
  let result;

  if (form.value.merchandiseId) {
    result = await editGoods(form.value);
  } else {
    result = await addMerchandise(form.value);
  }
  if (result.code === 200) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    FormRef.resetFields();
    tableRef.value.clearSelection();

    router.push("/goods/product");
  }
};
const handleCancel = (FormRef) => {
  form.value.merchandiseId = null;
  if (!FormRef) return;
  FormRef.resetFields();
  tableRef.value.clearSelection();
  router.push("/goods/product");
};

onMounted(() => {
  getProductList();
  form.value.merchandiseId = router.currentRoute.value.query.id;
  if (form.value.merchandiseId) {
    nextTick(() => {
      getFormInfo(form.value.merchandiseId);
    });
  }
});
</script>
<style scoped lang="scss">
.el-select {
  width: 50%;
}
.el-input {
  width: 50%;
}
.btn-bottom {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.goods-box {
  width: 90%;
  margin: 0 auto;
}
</style>
