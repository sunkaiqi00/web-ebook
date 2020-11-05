<template>
  <div class="store-shelf" ref="storeShelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll
      class="shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      ref="scroll"
      @onScroll="onScroll"
    >
      <shelf-search ref="shelfSearchWrapper"></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'

import ShelfTitle from '../../components/shelf/ShelfTitle'
import scroll from '@/components/common/scroll'
import ShelfSearch from '@/components/shelf/ShelfSearch'
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
        this.$refs.scroll.refresh()
      })
    },
  },
  components: {
    ShelfTitle,
    scroll,
    ShelfSearch,
    ShelfList,
    ShelfFooter,
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
  },
  mounted() {
    // 获取书
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
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
}
</style>