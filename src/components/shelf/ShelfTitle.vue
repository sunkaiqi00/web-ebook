<template>
  <transition name="fade">
    <div
      class="shelf-title"
      :class="{'title-shadow' : ifHideTitleShadow}"
      v-show="shelfTitleVisible"
    >
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-left" @click="clearCache" v-show="showClear">
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-right" v-if="showEdit">
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
        >{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-left" @click="back" v-show="showBack">
        <span class="icon-back"></span>
      </div>
      <div
        class="shelf-title-btn-text"
        :class="{'shelf-title-left':changeGroupLeft,'shelf-title-right':changeGroupRight}"
        v-if="showChangeGroupLeft"
      >
        <span class="shelf-title-btn-text" @click="changeGroup">{{$t('shelf.editGroup')}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalStorage, saveBookShelf } from '@/utils/localStorage'
import { clearLocalForage } from '@/utils/localForage'
export default {
  mixins: [storeShelfMixin],
  props: {
    title: String,
  },
  data() {
    return {
      // 隐藏阴影
      ifHideTitleShadow: true,
    }
  },
  computed: {
    emptyCategory() {
      return (
        !this.shelfCategory ||
        !this.shelfCategory.itemList ||
        this.shelfCategory.itemList.length === 0
      )
    },
    showEdit() {
      return this.currentType === 1 || !this.emptyCategory
    },
    showClear() {
      return this.currentType === 1
    },
    showBack() {
      return this.currentType === 2 && !this.isEditMode
    },
    showChangeGroupLeft() {
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory)
    },
    changeGroupLeft() {
      return !this.emptyCategory
    },
    changeGroupRight() {
      return this.emptyCategory
    },
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
    // 隐藏popup
    hidePopup() {
      this.popupMenu.hide()
    },
    // popup 弹出层 传入指定显示内容
    createPopupBtn(text, onClick, type = 'nommal') {
      return {
        text: text,
        type: type,
        click: onClick,
      }
    },
    onComplete() {
      this.hidePopup()
      // 书架列表中删除 删除书列表中的当前分类列表
      this.setShelfList(
        this.shelfList.filter((book) => book.id !== this.shelfCategory.id)
      ).then(() => {
        saveBookShelf(this.shelfList)
        this.setShelfList(this.shelfList)
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
        this.setIsEditMode(false)
      })
    },
    // 修改分组 名字
    changeGroupName() {
      this.hidePopup()
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title,
      }).show()
    },
    // 点击确定删除 弹出确认框
    deleteGroup() {
      if (!this.emptyCategory) {
        this.setShelfSelected(this.shelfCategory.itemList)
        this.moveOutOfGroup(this.onComplete)
      } else {
        this.Complete()
      }
    },
    // 删除分组
    showDeleteGroup() {
      this.hidePopup()
      setTimeout(() => {
        this.popupMenu = this.popup({
          title: this.$t('shelf.deleteGroupTitle'),
          btn: [
            this.createPopupBtn(
              this.$t('shelf.confirm'),
              () => {
                this.deleteGroup()
              },
              'danger'
            ),
            this.createPopupBtn(this.$t('shelf.cancel'), () => {
              this.hidePopup()
            }),
          ],
        }).show()
      }, 200)
    },
    // 修改分组
    changeGroup() {
      this.popupMenu = this.popup({
        btn: [
          this.createPopupBtn(this.$t('shelf.editGroupName'), () => {
            this.changeGroupName()
          }),
          this.createPopupBtn(
            this.$t('shelf.deleteGroup'),
            () => {
              this.showDeleteGroup()
            },
            'danger'
          ),
          this.createPopupBtn(this.$t('shelf.cancel'), () => {
            this.hidePopup()
          }),
        ],
      }).show()
    },
    back() {
      this.$router.go(-1)
      this.setIsEditMode(false)
    },
    // 取消编辑  存储选中书的数组清空 selected属性设置为false
    onEditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach((item) => {
          item.selected = false
          if (item.itemList) {
            item.itemList.forEach((item) => (item.selected = false))
          }
        })
      }
      this.setIsEditMode(!this.isEditMode)
    },
    // 清除缓存
    clearCache() {
      // local storage缓存
      clearLocalStorage()
      // indexdb 缓存
      clearLocalForage()
      this.setShelfList([])
      this.setShelfSelected([])
      this.getShelfList() // mixin 方法
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
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
    .icon-back {
      font-size: px2rem(20);
      color: #666;
    }
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
  .shelf-title-left {
    position: absolute;
    padding-left: px2rem(15);
    font-size: px2rem(14);
    color: #666;
    height: 100%;
    @include center;
  }
  .shelf-title-right {
    position: absolute;
    right: 0;
    height: 100%;
    padding-right: px2rem(15);
    font-size: px2rem(14);
    @include center;
  }
}
</style>