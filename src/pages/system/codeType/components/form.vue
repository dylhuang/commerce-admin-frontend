<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="代码类型">
      <el-input v-model="form.info.codeType"/>
    </el-form-item>
    <el-form-item label="代码类型名称">
      <el-input v-model="form.info.codeTypeName"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive, ref} from "vue";
import {addItem, updateItem, getItem} from "@/api/system/codeType.js";
import {ElMessage} from "element-plus";

const form = reactive({
      info: {
        id: null,
        codeType: "",
        codeTypeName: "",
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
  let result;
  if (form.info.codeType == null || form.info.codeType === '') {
    ElMessage.warning("请输入代码类型");
    return
  }
  if (form.info.codeTypeName == null || form.info.codeTypeName === '') {
    ElMessage.warning("请输入代码类型名称");
    return
  }
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
    id: null,
    codeType: "",
    codeTypeName: "",
  }
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
