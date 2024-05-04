<template>
  <div class="box">
    <div class="user-icon">
      <a-avatar src="user-ic.png" :size="80" />
    </div>
    <div class="user-name">xiehongchen</div>
    <div class="user-info flex flex-row-around">
      <div class="item">
        <div class="title">文章</div>
        <div class="count">{{ article.articleNum }}</div>
      </div>
      <div class="item">
        <div class="title">项目</div>
        <div class="count">{{ article.projectNum }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticle } from '@/store/article'
const article = useArticle()
</script>

<style lang="scss" scoped>
.box {
  margin-top: 50px;
  background-color: #FFF;
  border-radius: 10px;
  padding: 30px;
  width: 200px;
  .user-icon {
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    width: 80px;
    height: 80px;
    margin: 0 auto;
    background: #ebeef5;
    transition: transform 1s ease;
    &:hover {
      transform: rotate(360deg);
    }
  }
  .user-name {
    margin-top: 10px;
    font-size: 25px;
    color: #000;
  }
  .user-info {
    margin-top: 20px;
    .item {
      .title {
        font-size: 14px;
        color: #666;
      }
      .count {
        font-size: 20px;
        color: #000;
      }
    }
  }
}
</style>