<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="上级菜单" v-show="parentName">
      <el-input disabled :value="parentName"/>
    </el-form-item>
    <el-form-item label="菜单名称">
      <el-input v-model="form.info.menuName" placeholder="请输入菜单名称"/>
    </el-form-item>
    <el-form-item label="权限标识">
      <el-input v-model="form.info.code" placeholder="权限标识"/>
    </el-form-item>
    <el-form-item label="路由名称">
      <el-input v-model="form.info.routeName" placeholder="请输入路由名称"/>
    </el-form-item>
    <el-form-item label="路由地址"  >
      <el-input v-model="form.info.path" placeholder="请输入路由地址"/>
    </el-form-item>
    <el-form-item label="菜单类型">
      <el-radio-group v-model="form.info.menuType">
        <el-radio label="M">目录</el-radio>
        <el-radio label="C">菜单</el-radio>
        <el-radio label="F">按钮</el-radio>

      </el-radio-group>
    </el-form-item>
    <el-form-item label="Icon">
<!--      <el-input v-model="form.info.icon"/>-->
      <icon-select v-model="form.info.icon" />
    </el-form-item>
    <el-form-item label="是否启用">
      <el-checkbox v-model="form.info.enable"/>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.info.orderNum"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive} from "vue";
import {addMenu, getMenuInfo, updateMenu} from "@/api/user/menu";
import {useCommonStoreHook} from "@/store/modules";
import {ElMessage} from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const form = reactive({
  info: {
    aliasName: "",
    description: "",
    icon: "",
    id: null,
    menuName: "",
    orderNum: 0,
    routeName:'',
    parentId: "",
    partitionId: "",
    code: "",
    path: "",
    enable: 1,
    menuType:'',
  },
});
;

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
  if (result.code === 200) {
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
  if (result.code === 200) {
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
    menuName: "",
    orderNum: 0,
    routeName:'',
    parentId: props.parentId,
    partitionId: props.partitionId,
    code: "",
    path: "",
    menuType:''
  }
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
@/api/user/menu