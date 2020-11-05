<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {}
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
  background: #7f8c8d;
  position: relative;
}
</style>
