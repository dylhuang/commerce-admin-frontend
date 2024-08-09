<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="系统名称">
      <el-input v-model="form.info.partName"/>
    </el-form-item>
    <el-form-item label="系统类型">
      <el-select v-model="form.info.roleType">
        <el-option :label="item.desc" :value="item.id" v-for="item in roleTypes()" :key="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.info.memo"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSub">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive, ref} from "vue";
import {addItem, updateItem, getItem} from "@/api/system/subSystem";
import {cacheCodeList} from "@/api/common/index";
import {roleTypes} from "@/api/common/constant";

const cacheValueList = ref([]);
const form = reactive({
      info: {
        id: null,
        partName: "",
        roleType: "",
        memo: ""
      },
    })
;
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
  roleType: {
    type: [String, Number],
    required: false,
  },
  partName: {
    type: String
  }
});
const getCacheCodeList = async () => {
  const result = await cacheCodeList({"value": "SubSystemRoleType"});
  if (result.code === 200) {
    cacheValueList.value = result.data;
  }
}
const getFormInfo = async (id) => {
  const result = await getItem({id});
  if (result.code === 200) {
    form.info = result.data;
    form.info.roleType = result.data.roleType + 0;
  }
};
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleSub = async () => {
  let result;
  if (form.info.id) {
    result = await updateItem(form.info);
  } else {
    result = await addItem(form.info);
  }
  if (result.code === 200) {
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
    id: null,
    partName: "",
    roleType: "",
    memo: ""
  }
  getCacheCodeList();
  if (props.id) {
    getFormInfo(props.id);
  }
}
defineExpose({
  initInfo
})

</script>
