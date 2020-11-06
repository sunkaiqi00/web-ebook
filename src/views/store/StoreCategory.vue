<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title"></shelf-title>
    <scroll
      class="shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      ref="scroll"
      @onScroll="onScroll"
      v-if="isShowList"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <shelf-footer></shelf-footer>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfTitle from '../../components/shelf/ShelfTitle'
import scroll from '@/components/common/scroll'
import ShelfList from '@/components/shelf/ShelfList'
import ShelfFooter from '@/components/shelf/ShelfFooter'
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      // 书架滚动组件距底部距离
      scrollBottom: 0,
    }
  },
  watch: {
    isEditMode(isEditMode) {
      // 编辑模式 书架底部书的信息需要展示完整 传递bottom 重新计算scroll的高度
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      })
    },
  },
  components: {
    ShelfTitle,
    scroll,
    ShelfList,
    ShelfFooter,
  },
  computed: {
    isShowList() {
      return (
        this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      )
    },
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
  },
  mounted() {
    this.getCategoryfList(this.$route.query.title)
    this.setCurrentType(2)
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.store-shelf {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  min-width: 200px;
  max-width: 640px;
  margin: 0 auto;
  .shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
  }
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #333;
    @include center;
  }
}
</style>