<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="代码类型">
      <el-input v-model="form.info.codeType" disabled/>
    </el-form-item>
    <el-form-item label="代码值">
      <el-input v-model="form.info.codeValue"/>
    </el-form-item>
    <el-form-item label="代码key">
      <el-input v-model="form.info.codeKey"/>
    </el-form-item>
    <el-form-item label="代码名称">
      <el-input v-model="form.info.codeName"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive, ref} from "vue";
import {addItem, updateItem, getItem} from "@/api/system/codeTypeValue.js";
import {storeToRefs} from "pinia";
import {useCodeTypeStoreHook} from "@/store/modules.js";
import {ElMessage} from "element-plus";
const { selectCodeTypeRow } = storeToRefs(useCodeTypeStoreHook());
const form = reactive({
      info: {
        id: null,
        codeType: selectCodeTypeRow.value.codeType,
        codeValue: "",
        codeKey: "",
        codeName: ""
      },
    })
;
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  }
});
const getFormInfo = async (id) => {
  const result = await getItem({id});
  if (result.code === 200) {
    form.info = result.data;
  }
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSub = async () => {
  if (form.info.codeValue == null || form.info.codeValue === '') {
    ElMessage.warning("请输入代码值");
    return
  }
  if (form.info.codeKey == null || form.info.codeKey === '') {
    ElMessage.warning("请输入代码key");
    return
  }
  if (form.info.codeName == null || form.info.codeName === '') {
    ElMessage.warning("请输入代码名称");
    return
  }
  let result;
  if (form.info.id) {
    result = await updateItem(form.info);
  } else {
    result = await addItem(form.info);
  }
  if (result.code === 200) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    emit("closeDialog");
    emit("refreshData");
  }
};
const handleCancel = () => {
  emit("closeDialog");
};
const initInfo = () => {
  form.info = {
    d: null,
    codeType: selectCodeTypeRow.value.codeType,
    codeValue: "",
    codeKey: "",
    codeName: ""
  }
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
