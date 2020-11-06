<template>
  <div
    class="shelf-item"
    :class="{'item-shadow' : data.type === 1 || data.type === 2}"
    @click="onItemClick"
  >
    <component :is="item" :data="data" :class="{'is-edit' : isEditMode && data.type === 2}"></component>
    <div
      :class="{'icon-selected' : data.type === 1,'is-selected' : data.selected}"
      v-show="isEditMode"
    ></div>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfItemBook from './ShelfItemBook'
import ShelfItemCategory from './ShelfItemCategory'
import ShelfItemAdd from './ShelfItemAdd'
export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object,
  },
  data() {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd,
    }
  },
  computed: {
    item() {
      return this.data.type === 1
        ? this.book
        : this.data.type === 2
        ? this.category
        : this.add
    },
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        // 编辑模式 选择或取消选择
        this.data.selected = !this.data.selected
        if (this.data.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.data)
        } else {
          this.setShelfSelected(
            this.shelfSelected.filter((item) => item.id !== this.data.id)
          )
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {
          this.$router.push({
            path: '/store/category',
            query: {
              title: this.data.title,
            },
          })
        } else {
          this.$router.push('/store/home')
        }
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-item {
  position: relative;
  // width: 100%;
  width: px2rem(93);
  // height: 100%;
  height: px2rem(132);
  background: #fff;
  &.item-shadow {
    box-shadow: 0 0 px2rem(10) rgba(0, 0, 0, 0.3);
  }
  .is-edit {
    opacity: 0.5;
  }
  .icon-selected {
    position: absolute;
    right: px2rem(2);
    bottom: px2rem(2);
    font-size: px2rem(22);
    color: rgba(255, 255, 255, 0.3);
    &.is-selected {
      color: $color-blue;
    }
  }
}
</style>