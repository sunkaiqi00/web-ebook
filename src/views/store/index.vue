<template>
  <div class="store">
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
export default {}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.store {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
