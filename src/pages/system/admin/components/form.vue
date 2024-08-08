<template>
  <div class="formHeader">
    <el-form :model="form" label-width="80px">
      <el-form-item label="帐号">
        <div v-if="adminId == 1">
          <el-input v-model="form.info.username" placeholder="系统自动生成"/>
        </div>
        <div v-else>
          <el-input v-model="form.info.username" placeholder="系统自动生成" disabled/>
        </div>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.info.name" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.info.password" type="password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.info.roleIds" multiple>
          <el-option :label="item.name" :value="item.id" v-for="item in roleList" :key="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.info.email" placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.info.mobile" placeholder="请输入联系方式"/>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-tree-select v-model="form.info.adminExtend.departmentId" :data="deptTree" :props="treeProps" check-strictly
                        :render-after-expand="false"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSub">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {addItem, updateItem, getItem} from "@/api/system/admin";
import {findListRole, getDepartmentTree, getPublicKey} from "@/api/common/index";
import {JSEncrypt} from "jsencrypt";
import {ElMessage} from "element-plus";
import {useUserStoreHook} from "@/store/modules.js";

const roleList = ref([]);
const deptTree = ref([]);
const adminId = useUserStoreHook().userInfo.id;
const treeProps = {
  children: 'children',
  label: 'name',
  value: 'id'
}
const form = reactive({
      info: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
        roleIds: [],
        adminExtend: {
          departmentId: "",
          name: ""
        }
      },
    })
;
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  }
});
const getRoleList = async () => {
  const result = await findListRole({});
  if (result.code === 100) {
    roleList.value = result.data;
  }
}
const getDeptTree = async () => {
  const result = await getDepartmentTree({});
  if (result.code === 100) {
    deptTree.value = result.data;
  }
}
const getFormInfo = async (id) => {
  const result = await getItem({id});
  if (result.code === 100) {
    form.info = result.data;
  }
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSub = async () => {
  const res = await getPublicKey();
  const encryptor = new JSEncrypt();
  const {publicKey, sessionGenerateId} = res;
  localStorage.setItem("sessionGenerateId", sessionGenerateId);
  encryptor.setPublicKey(publicKey);
  if (form.info.password) {
    form.info.password = encryptor.encrypt(form.info.password);
  }
  let result;
  if (form.info.id) {
    result = await updateItem(form.info);
  } else {
    result = await addItem(form.info);
  }
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
    name: "",
    email: "",
    mobile: "",
    password: "",
    adminExtend: {
      departmentId: ""
    }
  }
  getRoleList();
  getDeptTree();
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>

<style lang="scss" scoped>
.formHeader .el-select {
  width: 800px;
}
</style>