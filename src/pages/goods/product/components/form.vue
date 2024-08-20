<template>
  <el-form :model="form" ref="FormRef" :rules="rules"  label-width="140px">
    <el-form-item label="商品名称" prop="merchandiseName">
      <el-input v-model="form.merchandiseName" clearable placeholder="请输入商品名称"/>
    </el-form-item>
    <el-form-item label="日常单价" prop="businessPrice">
      <el-input v-model="form.businessPrice" clearable  placeholder="请输入日常单价"/>
    </el-form-item>
    <el-form-item label="是否日常可销售" prop="businessEnable">
      <el-radio-group v-model="form.businessEnable">
        <el-radio  :label=1>是</el-radio>
        <el-radio  :label=0>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动单价" prop="customerPrice">
      <el-input v-model="form.customerPrice"  placeholder="请输入活动单价"/>
    </el-form-item>
    <el-form-item label="是否会议可销售" prop="customerEnable">
      <el-radio-group v-model="form.customerEnable">
        <el-radio  :label=1>是</el-radio>
        <el-radio  :label=0>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub(FormRef)">保存</el-button>
      <el-button @click="handleCancel(FormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";
import { addMerchandise, editGoods, detailGoods } from "@/api/goods/goods";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null)
const form = ref({
    merchandiseId: null,
    merchandiseName: "",
    businessPrice: null,
    businessEnable:'',
    customerEnable: '',
    customerPrice: null,
});
const props = defineProps({
  id: null
});
const isPrice = (rule, value, callback) => {
    if (value <= 0) {
        callback(new Error('输入的数值必须大于0'));
      } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        callback(new Error('输入的数值最多有两位小数'));
      } else {
        callback();
      }
  };
const rules = reactive({
  merchandiseName:[{
    required:true,message:'请输入商品名称',trigger:'blur'
  }],
  businessPrice:[
    { required: true,validator:isPrice, trigger: 'blur' },
    { required: true,message: '请输入日常单价', trigger: 'blur' },
  ],
  customerPrice:[
    { required: true,validator:isPrice, trigger: 'blur' },
    { required: true,message: '请输入活动单价', trigger: 'blur' },
  ],
  customerEnable:[
    {required:true,message:'请选择是否会议可销售',}
  ],
  businessEnable:[
    {required:true,message:'请选择是否日常可销售',}
  ]
})
// 详情
const getFormInfo = async (merchandiseId ) => {
  const result = await detailGoods({ merchandiseId });
  if (result.code === 200) {
    form.value = {
      id:result.data.id,
      merchandiseName:result.data.merchandiseName,
      businessPrice:result.data.businessPrice,
      customerEnable:result.data.customerEnable ,
      businessEnable:result.data.businessEnable ,
      customerPrice:result.data.customerPrice,
    };
  }
};
const handleSub = async (FormRef) => {
  if (!FormRef) return
  const validator = await FormRef.validate((valid, fields) => {
    if (!valid) {
      return
    }
  })
  if (!validator) return
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
    emit("refreshData");
  }
};
const handleCancel = (formEl) => {
    form.value.merchandiseId= null
  if (!formEl) return
  formEl.resetFields()
  emit("closeDialog");
};

const initInfo = () => {

    if (props.id) {
      form.value.merchandiseId = props.id;
      getFormInfo(props.id);
    }
}
defineExpose({
  initInfo,
});
</script>