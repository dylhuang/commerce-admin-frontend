<template>
  <el-form :model="form" ref="FormRef"  label-width="120px">
    <el-form-item label="商品名称" prop="merchandiseName">
      <el-input v-model="form.merchandiseName" />
    </el-form-item>
    <el-form-item label="日常单价" prop="businessPrice">
      <el-input v-model="form.businessPrice" />
    </el-form-item>
    <el-form-item label="是否日常可销售" prop="businessEnable">
      <el-radio-group v-model="form.businessEnable">
        <el-radio  :label=1>是</el-radio>
        <el-radio  :label=0>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动单价" prop="customerPrice">
      <el-input v-model="form.customerPrice" />
    </el-form-item>
    <el-form-item label="是否会议可销售" prop="customerEnable">
      <el-radio-group v-model="form.customerEnable">
        <el-radio  :label=1>是</el-radio>
        <el-radio  :label=0>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel(FormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";
import { addNotice, editNotice, detailNotice } from "@/api/system/notice";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null)
const form = ref({
  noticeId: null,
  merchandiseName: "",
    businessPrice: 0,
    businessEnable:'',
    customerEnable: "",
    customerPrice: 0,
});
const props = defineProps({
  id: null
});

// 详情
const getFormInfo = async (id) => {
  const noticeId = id
  const result = await detailNotice({ noticeId });
  if (result.code === 200) {
    productDescHtml.value =result.data.content
    form.value = {
      id:result.data.id,
      merchandiseName:result.data.merchandiseName,
      businessPrice:result.data.businessPrice,
      customerEnable:result.data.customerEnable ,
      customerPrice:result.data.customerPrice,
    };
  }
};
const handleSub = async () => {
  form.value.content = productDescHtml.value;
  
  let result;
  if (form.value.noticeId) {
    result = await editNotice(form.value);
  } else {
    result = await addNotice(form.value);
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
   productDescHtml.value = ''
    form.value.noticeId= null
    form.value.content= ""
  if (!formEl) return
  formEl.resetFields()
  emit("closeDialog");
};

const initInfo = () => {

    if (props.id) {
      form.value.noticeId = props.id;
      getFormInfo(props.id);
    }
}
defineExpose({
  initInfo,
});
</script>