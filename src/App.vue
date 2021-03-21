<template>
  <div id="app">
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view :key="key" />
      </transition>
    </keep-alive>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  computed: {
    key() {
      return this.$route.path.replace('///g', '~')
    }
  }
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
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: all 1s;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
