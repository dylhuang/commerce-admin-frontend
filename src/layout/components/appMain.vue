<template>
  <el-scrollbar class="main-scrollbar">
    <router-view v-slot="{ Component, route }" v-if="isRouterAlive">
      <template v-if="Component">
        <transition name="fade-transform" mode="out-in">
          <div>
            <!-- <keep-alive :exclude="cachedViews">
              <suspense>
                <template #default>
                  <component :is="Component" :key="route.fullPath" />
                </template>
                <template #fallback> Loading... </template>
              </suspense>
            </keep-alive> -->
            <suspense>
              <template #default>
                <component :is="Component" :key="route.fullPath" />
              </template>
              <template #fallback> Loading... </template>
            </suspense>
          </div>
        </transition>
      </template>
    </router-view>
  </el-scrollbar>
</template>

<script setup>
import { useCommonStoreHook } from "@/store/modules";
import { storeToRefs } from "pinia";
const { isRouterAlive } = storeToRefs(useCommonStoreHook());

const cachedViews = [
  "scmEdit",
  "sellerPlat",
  "sellerTemplate",
  "sellerMerchant",
  "contentEdit",
  "gameUnionSetting",
  "gameTradeSetting",
  "cacheCodeType"
];
</script>

<style lang="scss" scoped></style>
