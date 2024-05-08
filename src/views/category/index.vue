<template>
  <a-collapse v-model:activeKey="activeKey">
    <!-- <a-collapse-panel v-for="item, index in list" :key="index" :header="item">
      <p>{{ text }}</p>
    </a-collapse-panel> -->
  </a-collapse>
</template>
<script lang="ts" setup>
import data from '../data.json'

const temp = new Set(...data.map(item => item.category))
const array = Array.from(temp, title => ({ title, data: [] }))
console.log('123', temp, array)

// const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const activeKey = ref(['1']);

watch(activeKey, val => {
  console.log(val);
});
</script>

<style lang="scss" scoped>
.ant-collapse {
  margin: 20px;
  :deep(.ant-collapse-content) {
    background: transparent;
  }
}
</style>