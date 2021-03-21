<template>
  <div class="shelf-list" :style="{top: shelfListTop}" ref="shelfList">
    <transition-group name="list" tag="div" id="shelf-list">
      <div
        class="shelf-list-item-wrapper"
        v-for="item in data"
        :key="item.id"
        :class="{'f-start':item.type===3}"
      >
        <shelf-item :data="item"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { realPx, px2rem } from '@/utils/utils'
import ShelfItem from './ShelfItem'
export default {
  mixins: [storeShelfMixin],
  props: {
    top: {
      type: Number,
      default: 94
    },
    data: Array
  },
  components: {
    ShelfItem
  },
  computed: {
    // 定位 top 高度
    shelfListTop() {
      return px2rem(this.top) + 'rem'
    }
  }
  // methods: {
  // 每个书 item的高度 图片为250*350(比例)  有四个30的padding
  //   itemHeight() {
  //     if (this.$refs.shelfList) {
  //       return (
  //         ((this.$refs.shelfList.offsetWidth - realPx(120)) / 3 / 250) * 350 +
  //         'px'
  //       )
  //     }
  //   },
  // },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-list {
  position: absolute;
  // top: px2rem(94);
  left: 0;
  z-index: 100;
  width: 100%;
  #shelf-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: px2rem(15);
      box-sizing: border-box;
      @include columnCenter;
      &.f-start {
        // @include top;
        padding-bottom: px2rem(40);
        box-sizing: border-box;
      }
      &.list-leave-active {
        display: none;
      }
      &.list-move {
        transition: transform 0.5s;
      }
      .shelf-list-title-wrapper {
        margin-top: px2rem(10);
        text-align: center;
      }
    }
  }
}
</style>