<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}"
        v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <div class="icon-menu" @click="showSetting(3)"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-progress" @click="showSetting(2)"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-bright" @click="showSetting(1)"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-A" @click="showSetting(0)"></div>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
  </div>
</template>
<script>
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
  },
  methods: {
    showSetting(key) {
      this.setSettingVisible(key)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global.scss';
.menu-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(48);
  z-index: 102;
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  display: flex;
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    font-size: px2rem(21);
    .icon-progress {
      font-size: px2rem(24);
    }
  }
}
</style>