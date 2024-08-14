<template>
  <el-form :model="form" ref="FormRef"  label-width="120px">
    <el-form-item label="公告标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="公告摘要" prop="summary">
      <el-input
        v-model="form.summary"
        :rows="5"
        type="textarea"
        maxlength="1024"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="公告内容">
      <div class="border-1">
        <Toolbar
          style="border-bottom: 1px solid #f1f1f1"
          :editor="editorRef"
          :defaultConfig="wangEditorConfig.toolbarConfig"
          mode="simple"
        />
        <Editor
          style="min-height: 400px"
          v-model="productDescHtml"
          :defaultConfig="wangEditorConfig.editorConfig"
          mode="simple"
          @onCreated="handleCreated"
        />
      </div>
    </el-form-item>
    <el-form-item label="是否启用" prop="popup">
      <el-radio-group v-model="form.popup">
        <el-radio  :label=1>启用</el-radio>
        <el-radio  :label=0>禁用</el-radio>
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
import { addNotice, editNotice, detailNotice } from "@/api/notice/system";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { useCommonStoreHook } from "@/store/modules";
const wangEditorConfig = useCommonStoreHook().wangEditorConfig;
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null)
const form = ref({
  noticeId: null,
    title: "",
    summary: "",
    content: "",
    popup: '1',
});
const props = defineProps({
  id: null
});
// 富文本框
const editorRef = shallowRef();
let productDescHtml = ref("");
const handleCreated = async (editor) => {
  editorRef.value = editor;
 
};
// 详情
const getFormInfo = async (id) => {
  const noticeId = id
  const result = await detailNotice({ noticeId });
  if (result.code === 200) {
    productDescHtml.value =result.data.content
    form.value = {
      id:result.data.id,
      title:result.data.title,
      summary:result.data.summary,
      popup:result.data.popup ,
      content:result.data.content,
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
