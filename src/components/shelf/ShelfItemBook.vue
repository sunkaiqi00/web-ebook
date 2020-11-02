<template>
  <div class="shelf-item-book">
    <img class="shelf-item-book-cover" :src="data.cover" alt />
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-item-book {
  width: 100%;
  height: 100%;
  .shelf-item-book-cover {
    width: 100%;
    height: 100%;
  }
}
</style>