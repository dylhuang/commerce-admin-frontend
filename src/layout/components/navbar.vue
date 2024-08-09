<template>
  <div class="layout-nav flex justify-between items-center px-3">
    <section>
      <hamburger />
    </section>
    <section class="inline-flex flex-1">
      <breadcrumb />
    </section>
    <section class="inline-flex">
      <el-dropdown>
        <span class="inline-flex items-center">
          {{ userInfo.name }}
          <el-icon size="20">
            <User style="width: 16px;height: 16px;margin-left: 2px;" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handlePwd">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </div>
  <el-drawer class="pwd-drawer" v-model="pwdDrawerVisible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" style="font-weight: 600;">修改密码</h4>
      <el-icon class="el-icon--left" :size="17" @click="close">
        <Close style="width: 2rem; height: 2rem;color: #333" />
      </el-icon>
    </template>
    <el-form :model="pwdForm" label-width="80px" label-position="left">
      <el-form-item label="新密码">
        <el-input type="password" v-model="pwdForm.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="pwdForm.confirmPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
        <el-button @click="pwdDrawerVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, } from 'vue';
import { useCommonStoreHook } from "@/store/modules";
import { storeToRefs } from "pinia";
import {
  Close,
  User,
} from '@element-plus/icons-vue';
import { useUserStoreHook } from "@/store/modules";
import { useRouter } from 'vue-router';
import { getPublicKey, rePassword } from '@/api/user.js';
import { JSEncrypt } from 'jsencrypt';
import { ElMessage } from "element-plus";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
// import { resetRouter } from '@/router';

const router = useRouter();
const handleLoginOut = () => {
  useCommonStoreHook().resetCommonStore();
  router.removeRoute('layout')
  router.push("/login");
};
const { userInfo } = storeToRefs(useUserStoreHook());

// 修改密码
const pwdDrawerVisible = ref(false);
const pwdForm = reactive({
  password: '',
  confirmPassword: ''
})
const handlePwd = () => {
  pwdDrawerVisible.value = true;
}
const handleSubmit = async () => {
  if (!pwdForm.password) {
    ElMessage.warning("请输入密码");
    return
  }
  if (!pwdForm.confirmPassword) {
    ElMessage.warning("请确认密码");
    return
  }
  if (pwdForm.password !== pwdForm.confirmPassword) {
    ElMessage.warning("两次密码不一致");
    return
  }
  // const res = await getPublicKey();
  const encryptor = new JSEncrypt();
  const { publicKey, sessionGenerateId } = res;
  localStorage.setItem("sessionGenerateId", sessionGenerateId);
  encryptor.setPublicKey(publicKey);
  const subParam = {
    password: '',
    confirmPassword: '',
    id: userInfo.value.id
  }
  subParam.password = encryptor.encrypt(pwdForm.password);
  subParam.confirmPassword = subParam.password;
  const res2 = await rePassword(subParam);
  if (res2.code === 200) {
    ElMessage.success("修改成功，请重新登录");
    setTimeout(() => {
      handleLoginOut();
    }, 1500)
  }
}
</script>

<style lang="scss" scoped>
.layout-nav {
  width: 100%;
  height: 50px;
  background-color: #fff;
  color: #444;
  border-bottom: 1px solid #f5f5f5;
}

.pwd-drawer {
  :deep(.el-drawer__title) {
    font-weight: 600;
  }
}
</style>
