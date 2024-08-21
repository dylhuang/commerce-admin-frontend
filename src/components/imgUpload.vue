<template>
    <div>
        <el-upload class="avatar-uploader" :class="square?'square':''" :action="UPLOAD.URL" :show-file-list="false"
            :data="{ fileType: UPLOAD.FILETYPE.IMAGE, type: UPLOAD.TYPE.SELLER }" :headers="{ Authorization }"
            :on-success="(res, file) => { handleAvatarSuccess(res, file) }" :before-upload="beforeAvatarUpload">
            <!-- <img v-if="props.imgUrl" :src="props.imgUrl" class="avatar"  /> -->
            <el-image v-if="props.imgUrl" style="width: 178px; height: 100px;" :src="props.imgUrl" fit="contain" />
            <el-icon v-else :size="50" class="avatar-uploader-icon">
                <Plus style="width: 2rem; height: 2rem;color: #8c939d" />
            </el-icon>
            <el-icon v-if="props.imgUrl" class="!absolute -top-2 -right-2" :size="20" @click.stop="handleRemoveImage">
                <CircleClose style="width: 20px; height: 20px;color: #999" />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { UPLOAD } from "@/api/common";
import { CircleClose, Plus } from "@element-plus/icons-vue";
import { width } from 'dom7';
const props = defineProps({
    imgUrl: String,
    square:Boolean
})

const Authorization = 'Bearer  ' + localStorage.getItem('token');

const beforeAvatarUpload = () => {

}
const emits = defineEmits(["uploadSuccess", "removeImg"])

const handleAvatarSuccess = (response, uploadFile) => {
    if (response.code === 200) {
        emits("uploadSuccess", response.data);
    }
}
const handleRemoveImage = () => {
    emits("removeImg");
}
</script>
<style scoped lang="scss">
.avatar-uploader {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    width: 180px;
    height: 100px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
}
.square{
  width: 120px;
  height: 120px;
}
</style>