<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-render></ebook-render>
    <ebook-menu></ebook-menu>
  </div>
</template>
<script>
import EbookRender from '@/components/ebook/EbookRender'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookRender,
    EbookTitle,
    EbookMenu,
  },
  methods: {
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
<style scoped>
</style>