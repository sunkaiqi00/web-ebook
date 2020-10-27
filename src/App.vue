<template>
  <div id="app">
    <span class="icon-clock"></span>
    <div class="text">kaihuai</div>
    <div>{{$store.getters.getName}}</div>
    <div>{{$store.getters.getInfo}}</div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getCount', 'getName', 'getInfo']),
  },

  mounted() {
    console.log(this.getInfo)
    console.log(this.getCount)
  },
}
// 设置1rem的值为多少
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  // 设置字体大小上限
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/css/global.scss';
.text {
  font-family: 'Days One';
  font-size: ptr(75);
}
</style>
