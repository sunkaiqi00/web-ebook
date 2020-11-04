<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div
      class="shelf-footer-tab-wrapper"
      v-for="item in tab"
      :key="item.index"
      @click="onTabClick(item)"
    >
      <div class="shelf-footer-tab" :class="{'is-selected' : isSelected}">
        <div class="icon-private tab-icon" v-if="item.index===1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index===1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index===2 &&!isDownload"></div>
        <div class="icon-download-remove tab-icon" v-if="item.index===2 && isDownload"></div>
        <div class="icon-move tab-icon" v-if="item.index===3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index===4"></div>
        <div class="tab-text" :class="{'remove-text': item.index===4}">{{label(item)}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
import { saveBookShelf, removeLocalStorage } from '@/utils/localStorage'
import { download } from '@/api/store'
import { removeLocalForage } from '@/utils/localForage'
export default {
  mixins: [storeShelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    // tab 文字
    tab() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1,
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2,
        },
        {
          label: this.$t('shelf.move'),
          index: 3,
        },
        {
          label: this.$t('shelf.remove'),
          index: 4,
        },
      ]
    },
    // 是否为私密阅读  图标随着改变
    isPrivate() {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every((item) => item.private)
      }
    },
    // 是否已下载
    isDownload() {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every((item) => item.cache)
      }
    },
  },
  data() {
    return {
      popupMenu: null,
    }
  },
  methods: {
    onTabClick(item) {
      if (!this.isSelected) {
        return
      }
      switch (item.index) {
        case 1:
          this.showPrivate() // 私密阅读
          break
        case 2:
          this.showDownload() // 下载
          break
        case 3:
          this.dialog().show() // 移动
          break
        case 4:
          this.showRemove() // 移除书架
          break
        default:
          break
      }
      // this.toast({ text: 'hello kaihuai' }).show()
    },
    // 隐藏 popup组件显示方法
    hidePopup() {
      this.popupMenu.hide()
    },
    // 隐藏popup组件 取消编辑模式 保存修改后的书 公用方法
    onComplete() {
      this.hidePopup()
      this.setIsEditMode(false)
      saveBookShelf(this.shelfList)
    },
    // 移除书架 popup框
    showRemove() {
      // 选中一本书与多本书 title需要改变
      let title
      if (this.shelfSelected.length === 1) {
        title = this.$t('shelf.removeBookTitle').replace(
          '$1',
          `《${this.shelfSelected[0].title}》`
        )
      } else {
        title = this.$t('shelf.removeBookTitle').replace(
          '$1',
          this.$t('shelf.selectedBooks')
        )
      }
      this.popupMenu = this.popup({
        title: title,
        btn: [
          {
            text: this.$t('shelf.removeBook'),
            type: 'danger',
            click: () => {
              this.removeSelected()
            },
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            },
          },
        ],
      }).show()
    },
    // 移除书
    removeSelected() {
      // 遍历书列表移除移除选中列表中的书
      this.shelfSelected.forEach((selected) => {
        this.setShelfList(this.shelfList.filter((book) => book !== selected))
      })
      this.setShelfSelected([])
      this.onComplete()
    },
    // 下载选中书
    async downloadSelectedBook() {
      for (let i = 0; i < this.shelfSelected.length; i++) {
        await this.downloadBook(this.shelfSelected[i]).then(
          (book) => (book.cache = true)
        )
      }
    },
    downloadBook(book) {
      let text
      let toast = this.toast({ text })
      toast.continueShow()
      return new Promise((resolve, reject) => {
        download(
          book,
          (book) => {
            toast.remove() // create-api remove方法 移除当前提示框
            resolve(book)
          },
          reject,
          (progressEvent) => {
            let progress =
              Math.floor((progressEvent.loaded / progressEvent.total) * 100) +
              '%'
            let text = this.$t('shelf.progressDownload').replace(
              '$1',
              `${book.fileName}.epub(${progress})`
            )
            toast.updataText(text)
          }
        )
      })
    },
    async setDownload() {
      this.onComplete()
      if (this.isDownload) {
        this.removeSelectedBook()
      } else {
        await this.downloadSelectedBook()
        saveBookShelf(this.shelfList)
        this.simpleToast(this.$t('shelf.setDownloadSuccess'))
      }
    },
    // 删除下载缓存
    removeSelectedBook() {
      Promise.all(this.shelfSelected.map((book) => this.removeBook(book))).then(
        (books) => {
          books.map((book) => {
            book.cache = false
          })
          saveBookShelf(this.shelfList)
          this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
        }
      )
    },
    removeBook(book) {
      return new Promise((resolve, reject) => {
        // 删除localstorage缓存
        removeLocalStorage(`${book.categoryText}/${book.fileName}-info`)
        // 删除下载缓存
        removeLocalForage(`${book.fileName}`)
        resolve(book)
      })
    },
    // 下载 弹出框
    showDownload() {
      this.popupMenu = this.popup({
        title: this.isDownload
          ? this.$t('shelf.removeDownloadTitle')
          : this.$t('shelf.setDownloadTitle'),
        btn: [
          {
            text: this.isDownload
              ? this.$t('shelf.delete')
              : this.$t('shelf.open'),
            click: () => {
              this.setDownload()
            },
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            },
          },
        ],
      }).show()
    },
    // 设置 取消 私密阅读
    setPrivate() {
      let isprivate
      if (this.isPrivate) {
        isprivate = false
      } else {
        isprivate = true
      }
      this.shelfSelected.forEach((book) => {
        book.private = isprivate
      })
      this.onComplete()
      if (isprivate) {
        this.simpleToast(this.$t('shelf.setPrivateSuccess'))
      } else {
        this.simpleToast(this.$t('shelf.closePrivateSuccess'))
      }
    },
    // 私密阅读 弹出框
    showPrivate() {
      this.popupMenu = this.popup({
        title: this.isPrivate
          ? this.$t('shelf.closePrivateTitle')
          : this.$t('shelf.setPrivateTitle'),
        btn: [
          {
            text: this.isPrivate
              ? this.$t('shelf.close')
              : this.$t('shelf.open'),
            click: () => {
              this.setPrivate()
            },
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            },
          },
        ],
      }).show()
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label
          break
        case 2:
          return this.isDownload ? item.label2 : item.label
          break
        default:
          return item.label
          break
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(-2) px2rem(4) rgba(0, 0, 0, 0.1);
  background: #fff;
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;

    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      &.is-selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
      }
      .icon-shelf {
        color: #e74c3c;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
      }
      .remove-text {
        color: #e74c3c;
      }
    }
  }
}
</style>