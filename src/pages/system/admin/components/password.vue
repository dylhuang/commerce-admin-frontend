<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="旧密码">
      <el-input v-model="form.info.oldPassword" type="password" placeholder="请输入旧密码"/>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.info.password" type="password" placeholder="请输入新密码"/>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.info.confirmPassword" type="password" placeholder="请输入确认密码"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive} from "vue";
import {rePassword} from "@/api/system/admin";
import {getPublicKey} from "@/api/common/index";
import {JSEncrypt} from "jsencrypt";
import {ElMessage} from "element-plus";

const form = reactive({
      info: {
        id: "",
        oldPassword: "",
        password: "",
        confirmPassword: ""
      }
    })
;
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  oldPassword: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  }
});
const getFormInfo = async (id) => {
  form.info.id = id;
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSubmit = async () => {
  const res = await getPublicKey();
  const encryptor = new JSEncrypt();
  const { publicKey, sessionGenerateId } = res;
  localStorage.setItem("sessionGenerateId", sessionGenerateId);
  encryptor.setPublicKey(publicKey);
  const oldPassword = encryptor.encrypt(form.info.oldPassword);
  const password = encryptor.encrypt(form.info.password);
  const confirmPassword = encryptor.encrypt(form.info.confirmPassword);
  form.info.oldPassword = oldPassword;
  form.info.password = password;
  form.info.confirmPassword = confirmPassword;
  let result = await rePassword(form.info);
  if (result.code === 100) {
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
    id: "",
    oldPassword: "",
    password: "",
    confirmPassword: ""
  }
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
