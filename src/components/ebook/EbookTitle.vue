<template>
  <!-- 顶部菜单 -->
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <div class="icon-back" @click="back"></div>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <div class="icon-shelf"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-cart"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-more"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    back() {
      console.log('back')
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global.scss';
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(48);
  z-index: 160;
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  display: flex;
  .left {
    flex: 0 0 px2rem(60);
    @include center;
    .icon-back {
      font-size: px2rem(20);
      margin-left: px2rem(-5);
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      font-size: px2rem(20);
    }
  }
}
</style>