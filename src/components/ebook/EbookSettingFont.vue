<template>
  <transition name="slide-up">
    <!-- 设置字体大小 -->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===0">
      <div class="setting-font-size">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select">
          <div
            class="select-wrapper"
            v-for="(item,index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <!-- 当前字体大小与默认字体大小一致 为选中状态 -->
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview"
          :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
        >A</div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <div class="setting-font-family-text">{{defaultFontFamily}}</div>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { FONT_SIZE_LIST } from '@/utils/book'
import { ebookMixin } from '@/utils/mixin'
import { saveFontSize } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST,
    }
  },
  methods: {
    // 设置字体大小 同时改变 vuex中默认字体大小
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize)
      // 存储字体大小
      saveFontSize(this.fileName, fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    // 修改字体
    showFontFamilyPopup() {
      // 显示 字体列表
      this.setFontFamilyVisible(true)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(90);
  display: flex;
  flex-direction: column;
  z-index: 165;
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    flex: 2;
    height: 100%;
    display: flex;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select {
      flex: 1;
      display: flex;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid silver;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid silver;
          .point {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-37%, -37%);
            width: px2rem(16);
            height: px2rem(16);
            background: white;
            border-radius: 50%;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
              background: #2c3e50;
            }
          }
        }
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
  }
}
</style>