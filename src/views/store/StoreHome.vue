<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{background:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="mt"></recommend>
      <featured
        class="mt"
        :data="featured"
        :titleText="$t('home.featured')"
        :btnText="$t('home.seeAll')"
      ></featured>
      <div class="category-list-wrapper mt" v-for="(item,index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="mt" :data="categories"></category>
    </scroll>
  </div>
</template>
<script>
import SearchBar from '@/components/home/SearchBar'
import scroll from '@/components/common/scroll'
import FlapCard from '@/components/home/FlapCard'
import GuessYouLike from '@/components/home/GuessYouLike'
import Recommend from '@/components/home/Recommend'
import Featured from '@/components/home/Featured'
import CategoryBook from '@/components/home/CategoryBook'
import Category from '@/components/home/Category'
import { storeHomeMixin } from '@/utils/mixin'
import { home } from '@/api/store'
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: '', // 首页banner图片
      guessYouLike: null, // 猜你喜欢数据
      recommend: null, // 推荐
      featured: null, // 精选
      categoryList: null, // 列表
      categories: null // 所有分类
    }
  },
  components: {
    SearchBar,
    scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
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
    }
  },
  mounted() {
    home().then(res => {
      if (res && res.status === 200) {
        let data = res.data
        let randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
        // console.log(this.categoryList)
      }
    })
  }
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.store-home {
  width: 100%;
  height: 100%;
  min-width: 200px;
  max-width: 640px;
  margin: 0 auto;
  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-repeat: no-repeat !important;
      background-size: 100% 100% !important;
    }
  }
  .mt {
    margin-top: px2rem(20);
  }
}
</style>