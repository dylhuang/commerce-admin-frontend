<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-card class="box-card">
        <template #header>
          <span>基础信息</span>
        </template>
        <el-form :model="formInfo" ref="ruleFormRef" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="formInfo.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" v-model.trim="formInfo.description" row="2" />
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card class="box-card">
        <template #header>
          <span>角色授权</span>
        </template>
        <el-tree ref="treeRef" class="h-350px overflow-y-auto" :data="treeList" :props="treeProps" show-checkbox
          node-key="key" :default-checked-keys="checkNodes" />
      </el-card>
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
import { ref, reactive } from "vue";
import { getTree, addItem, getItem, updateItem } from "@/api/system/role";
import { ElMessage } from "element-plus";

const props = defineProps({
  id: null
});
const formInfo = reactive({
  name: "",
  description: "",
  id: null,
  resourceIds: []
});
const getFormInfo = async () => {
  const result = await getItem({ id: props.id });
  if (result.code === 100) {
    formInfo.id = props.id;
    formInfo.name = result.data.name;
    formInfo.description = result.data.description;
  }
};

const resetForm = () => {
  formInfo.id = null;
  formInfo.name = "";
  formInfo.description = "";
  formInfo.resourceIds = [];
  checkNodes.value = [];
}
const ruleFormRef = ref();
const rules = reactive({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ]
})
const treeRef = ref();
const treeList = ref([]);
const treeProps = {
  children: 'children',
  label: 'title',
}
const getRoleTree = async () => {
  const result = await getTree({ id: props.id });
  if (result.code === 100) {
    treeList.value = result.data;
    if (props.id) {
      findCheckNodes(result.data);
    }
  }
}
const checkNodes = ref([]);
const findCheckNodes = (list) => {
  list.forEach(item => {
    if (item.selectable && !item.children.length) {
      checkNodes.value.push(item.key)
    }
    if (item.children && item.children.length) {
      findCheckNodes(item.children)
    }
  });
}
const getCheckedNodes = () => {
  const list = treeRef.value.getCheckedNodes(false, false);
  formInfo.resourceIds = list.map(item => item.key);
}

const emit = defineEmits(["closeDialog", "refreshData"]);
const handleCancel = () => {
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
  getCheckedNodes();
  if (!validator) return
  let res = {};
  if (formInfo.id) {
    res = await updateItem(formInfo);
  } else {
    res = await addItem(formInfo);
  }
  if (res.code === 100) {
    ElMessage.success("保存成功");
    emit("refreshData");
  }
}
const initInfo = () => {
  resetForm();
  if (props.id) {
    getFormInfo();
  }
  getRoleTree();
}
defineExpose({
  initInfo,
});
</script>

<style lang="scss" scoped></style>
