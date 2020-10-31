<template>
  <transition name="slide-up">
    <!-- 设置主题 -->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item,index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="previw"
            :style="{background: item.style.body.background}"
            :class="{'select-border': previwSelected(item.name)}"
          ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    // 设置主题
    setTheme(index) {
      let theme = this.themeList[index]
      // .then 是因为异步提交commit 返回promise  改变主题
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        // 全局样式切换
        this.initGlobalStyle()
      })
      saveTheme(this.fileName, theme.name)
    },
    previwSelected(name) {
      return name === this.defaultTheme
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
  z-index: 165;
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(8);
      box-sizing: border-box;
      .previw {
        flex: 1;
        box-sizing: border-box;
        &.select-border {
          box-shadow: 0 px2rem(4) px2rem(6) rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(22);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>