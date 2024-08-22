<template>
  <el-form :model="form" ref="FormRef" :rules="rules"  label-width="140px">
    <el-form-item label="服务类型名称" prop="serviceTypeName">
      <el-input v-model="form.serviceTypeName" clearable placeholder="请输入服务类型名称"/>
    </el-form-item>
 
    <el-form-item label="服务类型状态" prop="serviceTypeStatus">
      <el-radio-group v-model="form.serviceTypeStatus">
        <el-radio  :label=10>可用</el-radio>
        <el-radio  :label=20>不可用</el-radio>
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
import { addServiceType, editType, detailType } from "@/api/goods/type";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null)
const form = ref({
     serviceTypeId: null,
    serviceTypeName: "",
    serviceTypeStatus:"",
  
});
const props = defineProps({
  id: null
});

const rules = reactive({
  serviceTypeName:[{
    required:true,message:'请输入服务类型',trigger:'blur'
  }],
  serviceTypeStatus:[{
    required:true,message:'请输入服务类型状态',
  }],
  

})
// 详情
const getFormInfo = async (serviceTypeId ) => {
  const result = await detailType({ serviceTypeId });
  if (result.code === 200) {
    form.value = {
      id:result.data.id,
      serviceTypeName:result.data.serviceTypeName,
      serviceTypeStatus:Number(result.data.serviceTypeStatus),
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
  if (form.value.serviceTypeId) {
    result = await editType(form.value);
  } else {
    result = await addServiceType(form.value);
  }
  if (result.code === 200) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    FormRef.resetFields()
    emit("refreshData");
  }
};
const handleCancel = (FormRef) => {
    form.value.serviceTypeId= null
  if (!FormRef) return
  FormRef.resetFields()
  emit("closeDialog");
};

const initInfo = () => {
    if (props.id) {
      form.value.serviceTypeId = props.id;
      getFormInfo(props.id);
    }
}
defineExpose({
  initInfo,
});
</script>