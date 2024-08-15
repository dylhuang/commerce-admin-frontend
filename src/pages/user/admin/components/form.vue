<template>
  <div class="formHeader">
    <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item v-if="passwordId == null" label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="form.roleIds" multiple>
          <el-option :label="item.roleName" :value="item.id" v-for="item in roleList" :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label=0>男</el-radio>
          <el-radio :label=1>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入电话" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSub(ruleFormRef)">保存</el-button>
        <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { addItem, updateItem, getItem,getList } from "@/api/user/admin";
import { ElMessage } from "element-plus";

const roleList = ref([]);
const passwordId = ref(null)
const form = ref({
    id:'',
    userName: "",
    password: "",
    nickName: "",
    email: "",
    phone: "",
    gender: '',
    remark: "",
    roleIds: [],
});
const ruleFormRef = ref();
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },

 
});
const validateText = (rule, value, callback) => {
   if (value !== "" && /[^a-zA-Z]/g.test(value)) {
    callback(new Error("请输入字母"));
   } else {
    callback();
   }
  };

const rules = reactive({
  userName: [
    { required: true,validator:validateText, trigger: 'blur' },
    { required: true,message: '请输入用户名称', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
  ],
  roleIds: [
    { required: true, message: '请选择角色'},
  ]
})

const getRoleList = async () => {
  const result = await getList({});
  if (result.code === 200) {
    roleList.value = result.data.list;
  }
};
const getFormInfo = async (id) => {
  const result = await getItem({ id });
  if (result.code === 200) {
    form.value.userName = result.data.userName
    form.value.nickName = result.data.nickName
    form.value.email = result.data.email
    form.value.phone = result.data.phone
    form.value.roleIds = result.data.roleVOS.map(item=>Number(item.roleId))
    form.value.gender = result.data.gender
    form.value.remark = result.data.remark
    
  }
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSub = async (formEl) => {
  if (!formEl) return
  const validator = await formEl.validate((valid, fields) => {
    if (!valid) {
      return
    }
  })
  if (!validator) return
  let result;
  if (form.value.id) {
    result = await updateItem(form.value);
  } else {
    result = await addItem(form.value);
  }
  if (result.code === 200) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    passwordId.value = null
    formEl.resetFields()
    emit("closeDialog");
    emit("refreshData");
  }
};
const handleCancel = (formEl) => {
  if (!formEl) return
  passwordId.value = null
  formEl.resetFields()
  emit("closeDialog");
};
const initInfo = () => {
 
  getRoleList();
  if (props.id) {
    passwordId.value = props.id
    form.value.id = props.id
    getFormInfo(props.id);
  }
};
defineExpose({
  initInfo,
});
</script>

<style lang="scss" scoped>
.formHeader .el-select {
  width: 800px;
}
</style>
@/api/user/admin