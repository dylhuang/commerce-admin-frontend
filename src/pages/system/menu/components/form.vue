<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="所属子系统">
      <el-select v-model="form.info.partitionId" :disabled="form.info.parentId != 0">
        <el-option :label="item.partName" :value="item.id" v-for="item in subSysList" :key="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="上级菜单" v-show="parentName">
      <el-input disabled :value="parentName"/>
    </el-form-item>
    <el-form-item label="菜单名称">
      <el-input v-model="form.info.name"/>
    </el-form-item>
    <el-form-item label="接口权限">
      <el-input v-model="form.info.path"/>
    </el-form-item>
    <el-form-item label="路由地址">
      <el-input v-model="form.info.routerUrl"/>
    </el-form-item>
    <el-form-item label="Icon">
<!--      <el-input v-model="form.info.icon"/>-->
      <icon-select v-model="form.info.icon" />
    </el-form-item>
    <el-form-item label="是否启用">
      <el-checkbox v-model="form.info.enable"/>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.info.orders"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive} from "vue";
import {addMenu, getMenuInfo, updateMenu} from "@/api/system/menu";
import {useCommonStoreHook} from "@/store/modules";
import {ElMessage} from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";

const subSysList = useCommonStoreHook().subSystemList;
const form = reactive({
  info: {
    aliasName: "",
    description: "",
    icon: "",
    id: null,
    name: "",
    orders: 0,
    parentId: "",
    partitionId: "",
    path: "",
    routerUrl: "",
    enable: true
  },
});
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
  parentId: {
    type: String,
    required: true,
  },
  partitionId: {
    type: String
  },
  parentName: {
    type: String
  }
});
const getFormInfo = async (id) => {
  const result = await getMenuInfo({id});
  if (result.code === 100) {
    form.info = result.data;
  }
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSub = async () => {
  let result;
  if (form.info.id) {
    result = await updateMenu(form.info);
  } else {
    result = await addMenu(form.info);
  }
  if (result.code === 100) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    emit("refreshData");
  }
};
const handleCancel = () => {
  emit("closeDialog");
};
const initInfo = () => {
  form.info = {
    aliasName: "",
    description: "",
    icon: "",
    id: null,
    name: "",
    orders: 0,
    parentId: props.parentId,
    partitionId: props.partitionId,
    path: "",
    routerUrl: "",
  }
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
