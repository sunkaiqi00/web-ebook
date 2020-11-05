<template>
  <div
    class="shelf-search-wrapper"
    :class="{'search-top' : ifInputClicked,'title-shadow' : ifHideTitleShadow}"
    ref="searchWrapper"
  >
    <div class="shelf-search" :class="{'search-top' : ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            v-model="searchText"
          />
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancel" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div
          class="shelf-search-tab-item"
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        >
          <span
            class="shelf-search-tab-text"
            :class="{'tab-is-selected' : item.id === selectTab}"
          >{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { saveLocale } from '@/utils/localStorage'
import { storeShelfMixin } from '@/utils/mixin'

export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      // 是否点击搜索框
      ifInputClicked: false,
      // 搜索关键字
      searchText: '',
      selectTab: 1,
      // 隐藏阴影
      ifHideTitleShadow: true,
    }
  },
  watch: {
    offsetY(offsetY) {
      // 搜索组件的阴影显示 列表高度且点击了搜索框
      if (offsetY > 0 && this.ifInputClicked) {
        this.ifHideTitleShadow = false // 显示
      } else {
        this.ifHideTitleShadow = true // 隐藏
      }
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default'),
        },
        {
          id: 2,
          text: this.$t('shelf.progress'),
        },
        {
          id: 3,
          text: this.$t('shelf.purchase'),
        },
      ]
    },
  },
  methods: {
    onTabClick(id) {
      this.selectTab = id
    },
    // 清楚搜索关键字
    clearSearchText() {
      this.searchText = ''
    },
    // 切换中英文
    switchLocale() {
      if (this.lang === 'cn') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'cn'
      }
      saveLocale(this.$i18n.locale)
    },
    // 点击搜索框
    onSearchClick() {
      this.ifInputClicked = true
      // 隐藏书架标题 title
      this.setShelfTitleVisible(false)
      this.$refs.searchWrapper.style.left = '50%'
      this.$refs.searchWrapper.style.transform = 'translateX(-50%)'
    },
    // 点击取消
    onCancel() {
      this.ifInputClicked = false
      this.searchText = ''
      this.mLeft = 0
      // 显示书架标题 title
      this.setShelfTitleVisible(true)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-search-wrapper {
  position: relative;
  width: 100%;
  height: px2rem(94);
  z-index: 105;
  font-size: px2rem(16);
  background: #fff;
  box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-width: 640px;
  &.search-top {
    position: fixed;
    left: 0;
    top: 0;
  }
  &.title-shadow {
    box-shadow: none;
  }
  .shelf-search {
    position: absolute;
    top: px2rem(42);
    left: 0;
    z-index: 105;
    width: 100%;
    height: px2rem(52);
    display: flex;
    transition: top $animationTime linear;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      flex: 1;
      display: flex;
      margin: px2rem(8) 0 px2rem(8) 0;
      border: px2rem(1) solid #ccc;
      margin-left: px2rem(20);
      border-radius: px2rem(5);
      .icon-search-wrapper {
        flex: 0 0 px2rem(22);
        @include right;
        .icon-search {
          font-size: px2rem(12);
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        @include center;
        .search-input {
          width: 100%;
          font-size: px2rem(14);
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 px2rem(24);
        @include left;
        .icon-close-circle-fill {
          font-size: px2rem(14);
          color: #ccc;
        }
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .icon-cn,
      .icon-en {
        font-size: px2rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .cancel-text {
        font-size: px2rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    top: px2rem(52);
    left: 0;
    z-index: 105;
    display: flex;
    width: 100%;
    height: px2rem(42);
    .shelf-search-tab-item {
      flex: 1;
      @include center;
      .shelf-search-tab-text {
        font-size: px2rem(12);
        color: #999;
        &.tab-is-selected {
          color: $color-blue;
        }
      }
    }
  }
}
</style>