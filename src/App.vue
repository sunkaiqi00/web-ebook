<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  // data() {
  //   return {
  //     transitionName: '',
  //   }
  // },
  // watch: {
  //   $route(to, from) {
  //     console.log(from)
  //     console.log(to)
  //     if (to.meta.index > from.meta.index) {
  //       this.transitionName = 'fade-bottom'
  //     } else {
  //       this.transitionName = 'fade-top'
  //     }
  //   },
  // },
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
// .fade-bottom-enter-active,
// .fade-bottom-leave-active,
// .fade-top-enter-active,
// .fade-top-leave-active {
//   transition: all 1s;
// }
// .fade-bottom-enter-to,
// .fade-bottom-leave,
// .fade-top-enter-to,
// .fade-top-leave {
//   opacity: 1;
// }
// .fade-bottom-enter,
// .fade-bottom-leave-to,
// .fade-top-enter,
// .fade-top-leave-to {
//   opacity: 0;
// }
</style>
