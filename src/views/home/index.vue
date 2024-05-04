<template>
  <div class="container">
    <div v-silder-in v-for="item, index in data" :key="item.title" class="item flex" @click="goDoc(item)">
      <template v-if="index % 2">
        <div class="img">
          <img :src="item.image" style="width: 100%; height: 100%" alt="" />
        </div>
        <div class="box right">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.summary }}</div>
          <div class="info flex flex-col-center flex-row-right">
            <CalendarFilled style="font-size: 15px" />
            <!-- 创建时间 -->
            <div class="m-5">{{ item.date }}</div>
            <EditFilled style="font-size: 15px;margin-left: 20px;" />
            <!-- 更新时间 -->
            <div class="m-5">{{ item.updateDate }}</div>
          </div>
          <div class="info flex flex-col-center flex-row-right">
            <TagFilled style="font-size: 15px" />
            <!-- 标签 -->
            <div class="m-5" v-for="tag in item.tags" :key="tag" @click="goTag(tag)">{{ tag }}</div>
            <AppstoreFilled style="font-size: 15px;margin-left: 20px" />
            <!-- 分类 -->
            <div class="m-5" v-for="cate in item.category" :key="cate" @click="goCate(cate)">{{ cate }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="box">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.summary }}</div>
          <div class="info flex flex-col-center flex-row-left">
            <CalendarFilled style="font-size: 15px" />
            <!-- 创建时间 -->
            <div class="m-5">{{ item.date }}</div>
            <EditFilled style="font-size: 15px;margin-left: 20px" />
            <!-- 更新时间 -->
            <div class="m-5">{{ item.updateDate }}</div>
          </div>
          <div class="info flex flex-col-center flex-row-left">
            <TagFilled style="font-size: 15px" />
            <!-- 标签 -->
            <div class="m-5" v-for="tag in item.tags" :key="tag">{{ tag }}</div>
            <AppstoreFilled style="font-size: 15px;margin-left: 20px;" />
            <!-- 分类 -->
            <div class="m-5" v-for="cate in item.category" :key="cate">{{ cate }}</div>
          </div>
        </div>
        <div class="img">
          <img :src="item.image" style="width: 100%; height: 100%" alt="" />
        </div>
      </template>
    </div>
  </div>

</template>

<script setup lang="ts">
import data from './data.json'
import { CalendarFilled, TagFilled, AppstoreFilled, EditFilled } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
import { useArticle } from '@/store/article'
const article = useArticle()
onMounted(() => {
  console.log('data', data)
  article.articleNum = data.length
})
const router = useRouter()
const goDoc = (item: { title: string }) => {
  article.info = item
  router.push({ name: 'doc', params: { name: item.title } })
}
const goTag = (item: string) => {
  router.push({ name: 'result', params: { name: item } })
}
const goCate = (item: string) => {
  router.push({ name: 'result', params: { name: item } })
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 80%;
  overflow: auto;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    width: 100%;
    height: 200px;
    margin-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: left;
    padding: 20px;
    color: #FFF;

    .img {
      height: 100%;
    }

    .right {
      text-align: right;
    }

    .left {
      text-align: left;
    }

    .box {
      flex: 1;

      .title {
        font-size: 30px;
      }

      .desc {
        margin-top: 10px;
        font-size: 20px;
      }

      .info {
        font-size: 15px;
        margin-top: 10px;

        .m-5 {
          margin: 5px;
        }
      }
    }
  }
}
</style>