<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item,index) in fontFamiltList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div class="ebook-popup-item-text" :class="{'isSelected': selected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check">
            <span class="icon-check" v-if="selected(item)"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { FONT_FAMILY } from '@/utils/book'
import { saveFontFamily } from '@/utils/localStorage'
export default {
  data() {
    return {
      fontFamiltList: FONT_FAMILY,
    }
  },
  mixins: [ebookMixin],
  methods: {
    selected(item) {
      return this.defaultFontFamily === item.font
    },
    hide() {
      // 点击字体列表 下箭头 隐藏
      this.setFontFamilyVisible(false)
    },
    // 设置字体
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      // 离线存储 字体
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        // 设置默认字体
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 150;
  width: 100%;
  background: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.15);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(16);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(16);
      top: 0;
      height: 100%;
      font-weight: bold;
      @include center;
      font-size: px2rem(18);
    }
    .ebook-popup-title-text {
      @include center;
      font-size: px2rem(14);
      font-weight: 500;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(12) px2rem(15);
      color: #95a5a6;
      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.isSelected {
          color: #3498db;
          font-weight: 600;
        }
      }
    }
    .ebook-popup-item-check {
      flex: 1;
      font-size: px2rem(14);
      text-align: right;
      .icon-check {
        color: #3498db;
        font-weight: bold;
      }
    }
  }
}
</style>