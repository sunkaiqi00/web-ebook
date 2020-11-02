<template>
  <transition name="fade">
    <div
      class="shelf-title"
      :class="{'title-shadow' : ifHideTitleShadow}"
      v-show="shelfTitleVisible"
    >
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-left" @click="clearCache">
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-right">
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
        >{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      // 隐藏阴影
      ifHideTitleShadow: true,
    }
  },
  computed: {
    selectedText() {
      let selectNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectNumber <= 0
        ? this.$t('shelf.selectBook')
        : selectNumber === 1
        ? this.$t('shelf.haveSelectedBook').replace('$1', selectNumber)
        : this.$t('shelf.haveSelectedBooks').replace('$1', selectNumber)
    },
  },
  // 监听滚动高度 是否添加阴影
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideTitleShadow = false
      } else {
        this.ifHideTitleShadow = true
      }
    },
  },
  methods: {
    // 取消编辑  存储选中书的数组清空 selected属性设置为false
    onEditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach((item) => {
          item.selected = false
        })
      }
      this.setIsEditMode(!this.isEditMode)
    },
    // 清除缓存
    clearCache() {
      console.log('clearCache')
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-title {
  position: relative;
  width: 100%;
  height: px2rem(42);
  z-index: 120;
  background: #fff;
  box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, 0.1);
  &.title-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: px2rem(18);
      line-height: px2rem(20);
      color: #333;
      font-weight: bold;
    }
    .shelf-title-sub-text {
      font-size: px2rem(10);
      color: #333;
      margin-top: px2rem(1);
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    @include center;
    .shelf-title-btn-text {
      font-size: px2rem(14);
      color: #666;
    }
    &.shelf-left {
      left: 0;
      padding-left: px2rem(15);
    }
    &.shelf-right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>