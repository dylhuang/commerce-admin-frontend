<template>
  <div>
    <el-upload class="file-uploader" :action="UPLOAD.URL" :limit="1"
      :data="{ fileType: UPLOAD.FILETYPE.IMAGE, type: UPLOAD.TYPE.SELLER }" :headers="{ token }"
      :on-success="(res, file) => { handleAvatarSuccess(res, file) }">
      <template #trigger>
        <el-button type="primary">上传文件</el-button>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { UPLOAD } from "@/api/common";

const token = localStorage.getItem("token");

const emits = defineEmits(["uploadSuccess"]);

const handleAvatarSuccess = (response, uploadFile) => {
  if (response.code === 200) {
    emits("uploadSuccess", response.data.filePath);
  }
}
</script>
<style scoped lang="scss">
:deep(.el-upload-list__item-file-name){
  max-width: 200px;
}
</style>