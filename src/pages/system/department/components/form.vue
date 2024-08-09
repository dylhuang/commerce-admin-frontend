<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="formInfo" ref="ruleFormRef" :rules="rules" label-width="80px">
        <el-form-item label="上级部门">
          <!-- <el-input disabled :value="props.parent?.parentName" /> -->
          <el-tree-select v-model="formInfo.parentId" :data="depList" :props="treeProps" check-strictly
                          :render-after-expand="false"/>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model.trim="formInfo.name"/>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" class="flex justify-end mt-4">
      <el-button type="primary" @click="handleSub(ruleFormRef)">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-col>
  </el-row>
</template>

<script setup>


import {ref, reactive, toRaw} from "vue";
import {addItem, getItem, updateItem} from "@/api/system/department";
import {useCommonStoreHook} from "@/store/modules";
import {ElMessage} from "element-plus";


const treeProps = {
  children: 'children',
  label: 'name',
  value: 'id'
}
const props = defineProps({
  id: null,
  parent: {
    parentName: null,
    parentId: null
  }
});
const formInfo = reactive({
  id: null,
  name: "",
  parentId: "0",
});
const getFormInfo = async () => {
  const result = await getItem({id: props.id});
  if (result.code === 200) {
    formInfo.name = result.data.name;
    formInfo.parentId = result.data.parentId + "";
    formInfo.id = props.id;
  }
};

const resetForm = () => {
  formInfo.name = "";
  formInfo.parentId = "0";
  formInfo.id = null;
}
const ruleFormRef = ref();
const rules = reactive({
  name: [
    {required: true, message: '请输入部门名称', trigger: 'blur'},
  ]
})
const emit = defineEmits(["closeDialog", "refreshData"]);
const handleCancel = () => {
  resetForm();
  emit("closeDialog");
};

const handleSub = async (formEl) => {
  if (!formEl) return
  const validator = await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields);
      return
    }
  })
  if (!validator) return
  let res = {};
  if (formInfo.id) {
    res = await updateItem(formInfo);
  } else {
    res = await addItem(formInfo);
  }
  if (res.code === 200) {
    ElMessage.success("操作成功");
    emit("refreshData");
  }
}
const depList = ref([]);
const initInfo = () => {
  depList.value = [
    {id: "0", name: "顶级"},
    ...toRaw(useCommonStoreHook().departmentTree)
  ];
  resetForm();
  if (props.id) {
    getFormInfo();
  }
}
defineExpose({
  initInfo,
});
</script>

<style lang="scss" scoped></style>
