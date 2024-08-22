<template>
    <el-card class="box-card">
        <el-row>
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">产品名称：</div>
                    {{dataDetail.name}}
                </div>
              </el-col>
            <el-col :span="12">
               <div class="flex">
                <div class="leftName"> 产品编码：</div>{{dataDetail.code}}
               </div>
            </el-col>
        </el-row>
        
        
        <el-row class="mt-2">
            <el-col :span="12">
               <div class="flex">
                 <div class="leftName">创建时间：</div>{{dataDetail.createTime}} 
               </div>
            </el-col>
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">更新时间：</div>{{dataDetail.updateTime}}
                </div>
            </el-col>
        </el-row>
        <el-row class="mt-2">
            <el-col :span="12">
               <div class="flex">
                <div class="leftName">状态：</div>{{dataDetail.stuas == 10 ? '可用' : '不可用'}}
               </div>
            </el-col>
            <el-col :span="12">
               <div class="flex">
                <div class="leftName">绑定服务类型：</div>{{goodsType}}
               </div>
            </el-col>
        </el-row>
    <el-row class="mt-2 btn">
      <el-button class="page-btn" @click="handleCancel">返回</el-button>
    </el-row>

    </el-card>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { fetchProduct } from "@/api/goods/goods";
import { useRouter } from 'vue-router';
const router = useRouter();
const productId = ref(null)
const dataDetail = ref({})
const goodsType = ref()
const getDetail = async(productId) =>{
  
  const res = await fetchProduct({productId})
  if(res.code == 200) {
    dataDetail.value = res.data
    goodsType.value =  res.data?.serviceTypeVOList.map(item=>item.serviceTypeName).join(',')
    console.log(goodsType.value);
    
  }
}

const handleCancel = () =>{
    router.push('/goods/goods')
}

onMounted(()=>{
    productId.value = router.currentRoute.value.query.id;
    getDetail(productId.value)
})
</script>

<style lang="scss" scoped>
    .leftName{
        width: 100px;
        // text-align: right;
    }
    .btn{
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
</style>