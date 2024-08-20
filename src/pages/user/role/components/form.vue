<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-card class="box-card">
        <template #header>
          <span>基础信息</span>
        </template>
        <el-form :model="formInfo" ref="ruleFormRef" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.trim="formInfo.roleName" />
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model.trim="formInfo.roleCode" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" v-model.trim="formInfo.remark" row="2" />
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
          node-key="id" :check-strictly="false" />
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" class="flex justify-end mt-4">
      <el-button type="primary" @click="handleSub(ruleFormRef)">保存</el-button>
      <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, nextTick,  } from "vue";
import { getTree, addItem, getItem, updateItem } from "@/api/user/role";
import { ElMessage } from "element-plus";

const props = defineProps({
  id: null
});
const formInfo = reactive({
  roleName: "",
  remark: "",
  id: null,
  roleCode:'',
  menuIds:[]
});
const checkNodes = ref([]);
const checkMenuIds = ref([])
const getFormInfo = async () => {
  const result = await getItem({ id: props.id });
  if (result.code === 200) {
    formInfo.id = props.id;
    formInfo.roleName = result.data.roleName;
    formInfo.roleCode = result.data.roleCode;
    formInfo.remark = result.data.remark;
    checkMenuIds.value = result.data.menuIds
    getRoleTree()
  }
};

const resetForm = () => {
  formInfo.id = null;
  formInfo.roleName = "";
  formInfo.roleCode = "";
  formInfo.remark = "";
  formInfo.menuIds = [];
  checkNodes.value = [];
}
const ruleFormRef = ref();
const rules = reactive({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ],
  roleCode: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
  ]
})
const getCheckedNodes = () => {
  let checkedKeys = treeRef.value.getCheckedKeys();
  let halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
 formInfo.menuIds = checkedKeys
}
const treeRef = ref(null);
const treeList = ref([]);
const treeProps = {
  children: 'children',
  label: 'menuName',
}
const getRoleTree = async () => {
  const result = await getTree({ id: props.id });
  if (result.code === 200) {
    treeList.value = result.data;
    if (props.id) {
      nextTick(()=>{
          checkMenuIds.value.forEach(item=>{
            let node =  treeRef.value.getNode(item)
            if(node.isLeaf){
              treeRef.value.setChecked(node,true)
            }
          })
      })
    
    }
  }
}

const emit = defineEmits(["closeDialog", "refreshData"]);
const handleCancel = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit("closeDialog");
};

const handleSub = async (formEl) => {
  if (!formEl) return
  const validator = await formEl.validate((valid, fields) => {
    if (!valid) {
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
  if (res.code === 200) {
    ElMessage.success("保存成功");
    emit("refreshData");
    checkNodes.value=[]
  }
}
const initInfo = () => {
  resetForm();
  if (props.id) {
    getFormInfo();
  } else{
    getRoleTree();
  }
 
 
}
defineExpose({
  initInfo,
});
</script>

<style lang="scss" scoped></style>
@/api/user/role