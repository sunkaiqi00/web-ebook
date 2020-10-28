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
export default {
  components: {
    EbookRender,
    EbookTitle,
    EbookMenu,
  },
}
</script>
<style scoped>
</style>