<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>
<script>
import Bookmark from '../common/Bookmark'
import { realPx } from '@/utils/utils'
import { ebookMixin } from '@/utils/mixin'
import { getBookmark, saveBookmark } from '@/utils/localStorage'
const BLUE = '#346cbc'
const WHITE = '#bdc3c7'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      text: '',
      color: WHITE,
      isFixed: false, // 书签是否定位
    }
  },
  components: {
    Bookmark,
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`,
      }
    },
  },
  watch: {
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.height && v < this.threshold) {
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHeight()
      } else if (v === 0) {
        this.restore()
      }
    },
    // 判断当前是否有书签
    isBookmark(isBookmark) {
      if (isBookmark) {
        this.color = BLUE
        this.isFixed = true
      } else {
        this.color = WHITE
        this.isFixed = false
      }
    },
  },
  methods: {
    // 添加书签
    addBookmark() {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      let cfibase = currentLocation.start.cfi.replace(/!.*/, '')
      let cfistart = currentLocation.start.cfi
        .replace(/.*!/, '')
        .replace(/\)$/, '')
      let cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
      let cfirange = `${cfibase}!,${cfistart},${cfiend})`
      this.currentBook.getRange(cfirange).then((range) => {
        // console.log(range.toString())
        let text = range.toString().replace(/\s\s/g, '')
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text,
        })

        saveBookmark(this.fileName, this.bookmark)
      })
    },
    // 删除书签
    removeBookmark() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      let cfi = currentLocation.start.cfi
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        this.bookmark = this.bookmark.filter((item) => item.cfi !== cfi)
        saveBookmark(this.fileName, this.bookmark)
      }
      this.setIsBookmark(false)
    },
    restore() {
      // 状态4：归位
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    beforeHeight() {
      // 状态1：未超过书签的高度
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold(v) {
      // 状态2：未到达零界状态
      this.$refs.bookmark.style.top = `${-v}px`
      this.beforeHeight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    afterThreshold(v) {
      // 状态3：超越零界状态
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      const iconDown = this.$refs.iconDown
      if (
        iconDown.style.transform === '' ||
        iconDown.style.transform === 'rotate(0deg)'
      ) {
        iconDown.style.transform = 'rotate(180deg)'
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  width: 100%;
  height: px2rem(35);
  z-index: 100;
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(16);
      color: #7f8c8d;
      transition: all 0.2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(12);
      color: #7f8c8d;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>