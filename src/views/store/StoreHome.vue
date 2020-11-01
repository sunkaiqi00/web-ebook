<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
      <div>kaihuai</div>
    </scroll>
  </div>
</template>
<script>
import SearchBar from '@/components/home/SearchBar'
import scroll from '@/components/common/scroll'
import FlapCard from '@/components/home/FlapCard'
import { storeHomeMixin } from '@/utils/mixin'
import { home } from '@/api/store'
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      scrollTop: 94,
      random: null,
    }
  },
  components: {
    SearchBar,
    scroll,
    FlapCard,
  },

  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    },
  },
  mounted() {
    home().then((res) => {
      if (res && res.status === 200) {
        let data = res.data
        let randomIndex = Math.floor(Math.random() * data.random.length)
        // console.log(data.random[randomIndex])
        this.random = data.random[randomIndex]
      }
    })
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.store-home {
  width: 100%;
  height: 100%;
}
</style>