<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-render></ebook-render>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
  </div>
</template>
<script>
import EbookRender from '@/components/ebook/EbookRender'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import EbookBookMark from '@/components/ebook/EbookBookMark'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookRender,
    EbookTitle,
    EbookMenu,
    EbookBookMark,
  },
  methods: {
    move(val) {
      this.$refs.ebook.style.top = val + 'px'
    },
    store() {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    },
    // 记录阅读时长
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.timer = setInterval(() => {
        readTime++
        if (readTime % 5 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
  },
  watch: {
    offsetY(val) {
      if (!this.menuVisible && this.bookAvailable) {
        if (val > 0) {
          this.move(val)
        } else if (val === 0) {
          this.store()
        }
      }
    },
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
}
</script>
<style lang="scss" scoped>
.ebook {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
</style>