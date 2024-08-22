<template>
  <el-form :model="form" ref="FormRef" :rules="rules"  label-width="140px">
    <el-form-item label="产品名称" prop="name">
      <el-input v-model="form.name" clearable placeholder="请输入产品名称"/>
    </el-form-item>
    <el-form-item label="产品价格" prop="price">
      <el-input v-model="form.price" clearable  placeholder="请输入产品价格"/>
    </el-form-item>
    <el-form-item label="绑定服务类型" prop="serviceTypeIdList">
        <el-select v-model="form.serviceTypeIdList" multiple >
          <el-option :label="item.serviceTypeName" :value="item.id" v-for="item in typeList" :key="item.id"
          />
        </el-select>
      </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="handleSub(FormRef)">保存</el-button>
      <el-button @click="handleCancel(FormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";
import { addProduct, fetchProduct, editProduct } from "@/api/goods/goods";
import { getTypeList} from "@/api/goods/type";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const emit = defineEmits(["closeDialog", "refreshData"]);
const FormRef = ref(null)
const form = ref({
    productId: null,
    name: "",
    price:"",
    serviceTypeIdList:[]
  
});
const props = defineProps({
  id: null
});
const isPrice = (rule, value, callback) => {
    if (value <= 0) {
        callback(new Error('输入的数值必须大于0'));
      }else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        callback(new Error('只能输入数字有且只有两位小数'));
      } else {
        callback();
      }
  };
const rules = reactive({
  name:[
      { required:true,message:'请输入产品名称',trigger:'blur' }
  ],
  serviceTypeIdList:[
      { required:true,message:'请输入产品名称' }
  ],
  price:[
    { required:true,message:'请输入产品价格',trigger:'blur' },
    { required: true,validator:isPrice, trigger: 'blur' }
  ],
  

})
const typeList = ref([])

// 获取服务状态
const getServiceType = async() =>{
  const res = await getTypeList()
  if(res.code == 200){
    typeList.value = res.data.list 
  }
}


// 详情
const getFormInfo = async (productId ) => {
  const result = await fetchProduct({ productId });
  if (result.code === 200) {
    form.value = {
      productId:result.data.id || '',
      name:result.data.name || '',
      price:Number(result.data.price) || '',
      serviceTypeIdList:result.data.serviceTypeVOList.map(item=>Number(item.id))
    };
  }
};
const handleSub = async (FormRef) => {
  if (!FormRef) return
  const validator = await FormRef.validate((valid, fields) => {
    if (!valid) {
      return
    }
  })
  if (!validator) return
  let result;
  if (form.value.productId) {
    result = await editProduct(form.value);
  } else {
    result = await addProduct(form.value);
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
    form.value.productId= null
  if (!formEl) return
  formEl.resetFields()
  emit("closeDialog");
};

const initInfo = () => {
    if (props.id) {
      form.value.productId = props.id;
       getFormInfo(props.id);
    }
    getServiceType()
}
defineExpose({
  initInfo,
});
</script>
<style scoped lang="scss">
.el-select{
  width:100%;
}
</style>