<template>
  <div class="login-container w-full h-screen" v-loading="loginLoding">
    <el-row class="h-screen">
      <el-col :span="12" class="flex">
        <img src="@/assets/common/login-icon.png" style="margin: auto" />
      </el-col>
      <el-col :span="12" class="flex">
        <el-form
          class="form-content rounded-xl"
          :rules="rules"
          :model="form"
          :show-message="false"
          ref="loginFormRef"
        >
          <div class="title">
            <img src="@/assets/common/login-title.png" />
          </div>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <template #prefix>
                <img src="@/assets/common/user-icon.png" alt="" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <img src="@/assets/common/password-icon.png" alt="" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              clearable
              v-model="form.code"
              placeholder="验证码"
              style="flex: 1"
              @keydown.enter="handleLogin"
            >
              <template #prefix>
                <img src="@/assets/common/code-icon.png" alt="" />
              </template>
            </el-input>
            <el-image
              style="
                width: 130px;
                height: 45px;
                border-radius: 4px;
                margin-left: 5px;
                border: 2px solid #5eeef8;
                padding: 5px;
              "
              :src="imgCodeInfo.baseImage"
              @click="getLoginCode"
            />
          </el-form-item>
          <el-button
            class="w-full mt-4"
            style="height: 40px"
            :loading="loginLoding"
            :disabled="loginLoding"
            v-throttle="handleLogin"
          >
            <span>登录</span>
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="login">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getVerificationCode } from "@/api/user.js";
import { useUserStoreHook, useCommonStoreHook } from "@/store/modules";
import Layout from "@/layout/index.vue";
import Index from "@/pages/index/index.vue";
// import loginBg from "@/assets/common/login-bg.svg";
const router = useRouter();

const imgCodeInfo = reactive({
  generateId: "",
  baseImage: "",
});
// getVerificationCode
const getLoginCode = async () => {
  const res = await getVerificationCode();
  if (res.code === 100) {
    imgCodeInfo.baseImage = `data:image/jpeg;base64,${res.data.baseImage}`;
    imgCodeInfo.generateId = res.data.generateId;
  }
};
const loginLoding = ref(false);
const form = reactive({
  username: "",
  password: "",
  code: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
const loginFormRef = ref(null);
const handleLogin = () => {
  if (!loginFormRef.value) return;
  if (!form.username) {
    ElMessage.error("请输入账号");
    return;
  }
  if (!form.password) {
    ElMessage.error("请输入密码");
    return;
  }
  if (!form.code) {
    ElMessage.error("请输入验证码");
    return;
  }
  loginFormRef.value.validate((valid, fields) => {
    if (valid) {
      loginLoding.value = true;
      onLogin();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const onLogin = async () => {
  const loginParam = {
    generateId: imgCodeInfo.generateId,
    password: form.password,
    code: form.code,
    username: form.username,
  };
  const res = await useUserStoreHook().userLoginAction(loginParam);
  loginLoding.value = false;
  if (res.code === 100) {
    ElMessage.success("登录成功");
    router.push("/");
  } else {
    form.code = null;
    getLoginCode();
  }
};
// 页面加载
onMounted(() => {
  useCommonStoreHook().resetCommonStore();
  const logining = localStorage.getItem("logining");
  if (logining) {
    localStorage.clear();
    localStorage.setItem("logining", true);
  } else {
    localStorage.clear();
  }
  sessionStorage.clear();
  if (!router.hasRoute("layout")) {
    router.addRoute({
      path: "/",
      name: "layout",
      redirect: "/index",
      component: Layout,
      children: [
        {
          path: "/index",
          name: "index",
          component: Index,
        },
      ],
    });
  }
  getLoginCode();
});
</script>

<!-- -->
<style lang="scss" scoped>
.el-button {
  height: 48px !important;
  color: #fff !important;
  background: linear-gradient(90deg, #1fc5ff 0%, #19f8ff 100%);
  border-radius: 12px;
  margin-top: 28px;
  span {
    font-size: 16px !important;
  }
}

.login-container {
  background: url("@/assets/common/login-bg.png") no-repeat;
  background-size: 100% 100%;
}

.form-content {
  // height: 695px;
  width: 360px;
  margin: auto;
  padding: 40px 20px;
  background: #fff;
  position: relative;
  box-shadow: 9px 9px 50px 10px rgba(217, 217, 217, 0.26);
  border: solid 2px #beecf9;
  box-sizing: border-box;
  .title {
    padding: 0 16px 28px;
    border-bottom: 1px solid #eeebeb;
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 10px 14px;
    background-color: #fafafa;
    border-radius: 12px;
    box-shadow: none;
  }
  .el-input__inner {
    font-size: 16px;
  }
  .el-input__prefix-inner {
    img {
      width: 22px;
      height: 22px;
    }
  }
}

:deep(.el-input .el-input__icon) {
  width: 20px;
}
 
:deep(.el-icon svg) {
  height: 20px;
  width: 20px;
  font-size: 18px;
}
</style>
