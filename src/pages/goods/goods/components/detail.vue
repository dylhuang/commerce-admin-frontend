<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">商品名称：</div>
                    {{dataDetail.merchandiseName}}
                </div>
              </el-col>
            <el-col :span="12">
               <div class="flex">
                <div class="leftName"> 商品编码：</div>{{dataDetail.merchandiseCode}}
               </div>
            </el-col>
        </el-row>
        <el-row class="mt-2">
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">日常单价:</div>{{dataDetail.businessPrice}}元
                </div>
            </el-col>
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">日常可销售:</div> {{dataDetail.businessEnable == 0 ? '否' : '是'}}
                </div>
            </el-col>
        </el-row>
        <el-row class="mt-2">
            <el-col :span="12">
               <div class="flex">
                 <div class="leftName">会议单价：</div>{{dataDetail.customerPrice}} 元
               </div>
            </el-col>
            <el-col :span="12">
                <div class="flex">
                    <div class="leftName">会议可销售：</div>{{dataDetail.customerEnable == 0 ? '否' : '是'}}
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
                <div class="leftName">状态：</div>{{dataDetail.stuas == 10 ? '可销售' : '不可销售'}}
               </div>
            </el-col>
           
        </el-row>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { detailType } from "@/api/goods/type";
const props = defineProps({
    id: null
});
const dataDetail = ref({})
const goodsType = ref()
const getDetail = async() =>{
  let serviceTypeId = props.id
  
  const res = await detailType({serviceTypeId})
  if(res.code == 200) {
    dataDetail.value = res.data
    goodsType.value =  res.data.serviceTypeVOList.map(item=>{
        item.name
    })
    console.log(  goodsType.value );
    
  }
}

defineExpose({
    getDetail,
})

</script>

<style lang="scss" scoped>
    .leftName{
        width: 100px;
        // text-align: right;
    }
</style>