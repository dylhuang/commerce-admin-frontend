<template>
  <el-form :model="form" ref="FormRef" :rules="rules" label-width="120px">
    <el-form-item label="图片名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="图片类型" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio :label="10">首页广告位</el-radio>
        <el-radio :label="20">其他</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="上传图片" prop="imageUrl">
      <ImgUpload
        @uploadSuccess="handleUploadSuccess"
        @removeImg="handleRemoveImg"
        :imgUrl="form.imageUrl"
      ></ImgUpload>
    </el-form-item>
    <el-form-item label="图片描述" prop="description">
      <el-input
        v-model="form.description"
        :rows="2"
        type="textarea"
        maxlength="60"
        show-word-limit
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel(FormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";
import { addImage, editImage, fetchImage } from "@/api/system/banner";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
import ImgUpload from "@/components/imgUpload.vue";

const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null);
const props = defineProps({
  id: null,
});
const form = ref({
  noticeId: null,
  name: "",
  description: "",
  imageUrl: "",
  type: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择图片类型"}],
  imageUrl: [{ required: true, message: "请选择上传图片",}],
});

// 上传处理
const handleUploadSuccess = (val) => {
  form.value.imageUrl = val;
};
const handleRemoveImg = (target) => {
  form.value.imageUrl = "";
};
// 详情
const getFormInfo = async (id) => {
  const noticeId = id;
  const result = await fetchImage({ noticeId });
  if (result.code === 200) {
    form.value = {
      id: result.data.id,
      name: result.data.name,
      description: result.data.description,
      type: result.data.type,
      content: result.data.content,
    };
  }
};
const handleSub = async () => {
  let result;
  if (form.value.noticeId) {
    result = await editImage(form.value);
  } else {
    result = await addImage(form.value);
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
  productDescHtml.value = "";
  form.value.noticeId = null;
  form.value.content = "";
  if (!formEl) return;
  formEl.resetFields();
  emit("closeDialog");
};

const initInfo = () => {
  if (props.id) {
    form.value.noticeId = props.id;
    getFormInfo(props.id);
  }
};
defineExpose({
  initInfo,
});
</script>
