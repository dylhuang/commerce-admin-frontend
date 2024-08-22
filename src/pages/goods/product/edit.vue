<template>
  <el-card>
    <el-form :model="form" ref="FormRef" :rules="rules" label-width="140px">
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
        <el-col :span="12">
          <el-form-item label="绑定产品" prop="productId">
            <el-select
              v-model="form.productId"
              multiple
              placeholder="请选择绑定产品(可多选)"
              @change="changeSelect"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in productList"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="日常单价" prop="businessPrice">
            <el-input
              v-model="form.businessPrice"
              clearable
              placeholder="请输入日常单价"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否日常可销售" prop="businessEnable">
            <el-radio-group v-model="form.businessEnable">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动单价" prop="customerPrice">
            <el-input
              v-model="form.customerPrice"
              placeholder="请输入活动单价"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否会议可销售" prop="customerEnable">
            <el-radio-group v-model="form.customerEnable">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 产品表格 -->
    <div class="mt-14">
      <el-table
        :data="tableData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
        border
      >
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="goodsPrice" label="产品单价" />
        <el-table-column prop="productNumber" label="产品数量">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.productNumber"
              @change="prodNumberChange"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn-bottom">
      <el-button type="primary" class="page-btn" @click="handleSub(FormRef)"
        >保存</el-button
      >
      <el-button class="page-btn" @click="handleCancel(FormRef)"
        >返回</el-button
      >
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";
import { addMerchandise, editGoods, detailGoods } from "@/api/goods/product";
import { fetchProductList } from "@/api/goods/goods";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
import router from "@/router";
import { Return } from "@icon-park/vue-next";

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

// 获取产品列表
const productList = ref([]);
const getProductList = async () => {
  const res = await fetchProductList();
  if (res.code == 200) {
    productList.value = res.data.list;
  }
};
const tableData = ref([]);
// 获取选中的产品
const changeSelect = (data) => {
  const arr = productList.value.filter((item) =>
    data.some((i) => item.id == i)
  );
  tableData.value = arr.map((item) => {
    console.log(tableData.value?.find((item) => item.productId === item?.id));
    let obj = {
      name: item.name,
      productId: item.id,
      productNumber: 0,
      goodsPrice: item.price,
      ...(tableData.value?.find((items) => items.productId === item?.id) || {}),
    };
    return obj;
  });
  prodNumberChange()
};

// 判断；列表 数量

const cannotEmpty = (data) => {
  return data.every((item) => !!item.productNumber);
};

// 详情
const getFormInfo = async (merchandiseId) => {
  const result = await detailGoods({ merchandiseId });
  if (result.code === 200) {
    form.value = {
      id: result.data.id,
      merchandiseName: result.data.merchandiseName,
      //   businessPrice: result.data.businessPrice,
      customerEnable: result.data.customerEnable,
      businessEnable: result.data.businessEnable,
      customerPrice: result.data.customerPrice,
      productId: result.data.productVOList.map((item) => item.id),
    };
  }
};
const handleSub = async (FormRef) => {
  if (!cannotEmpty(tableData.value)) {
    ElMessage({
      message: "产品数量请填写完整",
      type: "error",
    });
    return;
  }
  form.value.relationList = tableData.value;
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
    router.push("/goods/product");
  }
};
const handleCancel = (formEl) => {
  form.value.merchandiseId = null;
  if (!formEl) return;
  formEl.resetFields();
  router.push("/goods/product");
};

onMounted(() => {
  form.value.merchandiseId = router.currentRoute.value.query.id;
  if (form.value.merchandiseId) {
    getFormInfo(form.value.merchandiseId);
  }
  getProductList();
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
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
