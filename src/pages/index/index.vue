<template>
  <div class="home flex-w justify-center items-center">
    <div class="flex justify-center home-tilte">欢迎来到 宇修前端 管理系统</div>
    <img class="home-img" src="../../assets/imgs/home_head.png" />

    <!-- <div class="view-wrap" ref="viewWrap" @scroll="onScroll" :style="{'--rowHeight':itemHeight+'px'}">
      <div class="view-scroll-bar" ref="scrollBar"></div>
      <div class="view-content" ref="viewContent">
        <div class="show-item" v-for="item in showList">{{ item }}</div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const startIndex = ref(0);
const endIndex = ref(30);
const showLength = ref(25);
const itemHeight = ref(20);
const showList = computed(() => {
  return bigList.slice(startIndex.value, endIndex.value);
})
const bigList = new Array(3000).fill(0).map((item, index) => { return index + 1 });
const viewWrap = ref(null);
const scrollBar = ref(null);
const viewContent = ref(null);

const onScroll = ()=>{
  console.log(viewWrap.value.scrollTop);
  const scrollTop = viewWrap.value.scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight.value);
  endIndex.value = startIndex.value + showLength.value;
  // viewContent.value.style.transform = `translate3d(0, ${scrollTop}px, 0)`;
  viewContent.value.style.transform = `translateY(${scrollTop}px)`;
}

// onMounted(() => {
//   nextTick(() => {
//     viewWrap.value.style.height = (itemHeight.value * showLength.value) + 'px';
//     scrollBar.value.style.height = (itemHeight.value * bigList.length) + 'px';
//   })
// })
</script>

<style lang="scss" scoped>
.home {
  height: 820px;
  background-color: #fff;


}

// .home-tilte {
//   padding-top: 100px;
//   font-size: 30px;
//   font-weight: 600;
// }
.home-img {
  width: 100%;
  height: auto;
  margin: auto;
}

.view-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: aquamarine;
  overflow-y: auto;
}

.view-scroll-bar {
  // width: 400px;
  // height: 2000px;
}

.view-content {
  position: absolute;
  top: 0;
  left: 0;
  .show-item{
    height: var(--rowHeight);
  }
}
</style>
