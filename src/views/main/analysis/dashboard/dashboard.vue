<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ty-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="goodsCategoryCount"></pie-echarts>
        </ty-card>
      </el-col>
      <el-col :span="10">
        <ty-card title="不同城市商品销量">
          <map-echarts :map-data="goodsAddressSale"></map-echarts>
        </ty-card>
      </el-col>
      <el-col :span="7">
        <ty-card title="分类商品数量(玫瑰图)">
          <rose-echarts :rose-data="goodsCategoryCount"></rose-echarts>
        </ty-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="histogram">
      <el-col :span="12">
        <ty-card title="分类商品的销量">
          <line-echarts v-bind="goodsCategorySale"></line-echarts>
        </ty-card>
      </el-col>
      <el-col :span="12">
        <ty-card title="分类商品的收藏">
          <BarEcharts v-bind="goodsCategoryCollect"></BarEcharts>
        </ty-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'

import TyCard from '@/base-ui/card/index'
import {
  BarEcharts,
  LineEcharts,
  MapEcharts,
  PieEcharts,
  RoseEcharts
} from '@/components/page-echarts'

const store = useStore()
store.dispatch('dashboard/getDashBoardDataAction')
const goodsCategoryCount = computed(() => {
  return store.state.dashboard.goodsCategoryCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const goodsAddressSale = computed(() => {
  return store.state.dashboard.goodsAddressSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
// const goodsCategoryCollect = computed(() => {
//   const dataAxis: string[] = []
//   const data: any[] = []
//   const goodsCollect = store.state.dashboard.goodsCategoryCollect
//   for (const item of goodsCollect) {
//     dataAxis.push(item.name)
//     data.push(item.goodsFavor)
//   }
//   return { dataAxis, data }
// })
// console.log(goodsCategoryCollect)
const goodsCategoryCollect = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsCollect = store.state.dashboard.goodsCategoryCollect
  for (const item of categoryGoodsCollect) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})
const goodsCategorySale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryCount = store.state.dashboard.goodsCategorySale
  for (const item of categoryCount) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return {
    xLabels,
    values
  }
})
</script>

<style scoped>
.histogram {
  margin-top: 20px;
}
</style>
