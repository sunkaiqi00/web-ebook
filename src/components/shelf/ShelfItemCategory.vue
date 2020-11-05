<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item,index) in data.itemList" :key="index">
        <img class="shelf-item-category-img" v-lazy="item.cover" alt />
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-item-category {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shelf-item-category-list {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    .shelf-item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      // padding: px2rem(5);
      box-sizing: border-box;
      &:nth-child(3n + 1) {
        padding: px2rem(2.5) px2rem(2.5) px2rem(2.5) px2rem(5);
      }
      &:nth-child(3n + 2) {
        padding: px2rem(2.5);
      }
      &:nth-child(3n + 3) {
        padding: px2rem(2.5) px2rem(5) px2rem(2.5) px2rem(2.5);
      }
      .shelf-item-category-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shelf-item-category-bg {
    width: 100%;
    height: 100%;
    @include center;
    font-size: px2rem(40);
    color: #ccc;
    background: #fff;
  }
}
</style>