<template>
  <el-card >
    <template #header>
      <div class="card-header">
        <span>商品详情</span>
      </div>
    </template>
    <div class="box-card">
      <el-row class="mt-10">
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">商品名称：</div>
            {{ dataDetail.merchandiseName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">商品编码：</div>
            {{ dataDetail.merchandiseCode }}
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-2">
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">日常单价:</div>
            {{ dataDetail.businessPrice }}元
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">日常可销售:</div>
            {{ dataDetail.businessEnable == 0 ? "否" : "是" }}
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-2">
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">会议单价：</div>
            {{ dataDetail.customerPrice }} 元
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">会议可销售：</div>
            {{ dataDetail.customerEnable == 0 ? "否" : "是" }}
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-2">
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">创建时间：</div>
            {{ dataDetail.createTime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">更新时间：</div>
            {{ dataDetail.updateTime }}
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-2">
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">状态：</div>
            {{ dataDetail.stuas == 10 ? "可销售" : "不可销售" }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex">
            <div class="leftName">绑定服务类型：</div>
            {{ goodsType }}
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="mt-2 btn">
      <el-button class="page-btn" @click="handleCancel">返回</el-button>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { detailGoods } from "@/api/goods/product";
import { useRouter } from "vue-router";
const router = useRouter();
const merchandiseId = ref(null);
const dataDetail = ref({});
const goodsType = ref();
const getDetail = async (merchandiseId) => {
  const res = await detailGoods({ merchandiseId });
  if (res.code == 200) {
    dataDetail.value = res.data;
    goodsType.value = res.data?.serviceTypeVOList
      .map((item) => item.serviceTypeName)
      .join(",");
    console.log(goodsType.value);
  }
};

const handleCancel = () => {
  router.push("/goods/product");
};

onMounted(() => {
  merchandiseId.value = router.currentRoute.value.query.id;
  getDetail(merchandiseId.value);
});
</script>

<style lang="scss" scoped>
.box-card {
  padding-left: 60px !important;
}
.leftName {
  width: 100px;
  // text-align: right;
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
