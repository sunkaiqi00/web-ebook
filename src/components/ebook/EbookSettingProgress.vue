<template>
  <transition name="slide-up">
    <!-- 设置字体大写 -->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===2">
      <!-- 进度条 -->
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection">
            <span class="icon-back"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
            :style="{'background-size':`${progress}% 100% !important`}"
          />
          <div class="progress-icon-wrapper" @click="nextSection">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span class="progress-section-precentage">({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName() {
      // if (this.section) {
      //   let sectionInfo = this.currentBook.section(this.section)
      //   {
      //     if (
      //       sectionInfo &&
      //       sectionInfo.href &&
      //       this.currentBook &&
      //       this.currentBook.navigation
      //     ) {
      //       return this.currentBook.navigation.get(sectionInfo.href).label
      //     }
      //   }
      // }
      return this.section ? this.navigation[this.section].label : ''
    },
  },
  methods: {
    onProgressChange(progress) {
      // 进度条百分比 页面的切换随着 拖动进度条一起切换
      this.setProgress(progress)
        .then(() => {
          this.disPlayProgress()
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    onProgressInput(progress) {
      this.setProgress(progress)
        .then(() => {
          this.disPlayProgress()
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    // 上一章
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 下一章
    nextSection() {
      // this.currentBook.spine 当前书的章节总数
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    disPlayProgress() {
      // 进度条的百分比 查找 cfi 通过cfi渲染对应页面
      let cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      )
      this.display(cfi)
    },
    displaySection() {
      // 通过章节渲染对应页面
      let sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
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
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      font-size: px2rem(12);
      @include center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(20);
      box-sizing: border-box;
      .progress-icon-wrapper {
        font-size: px2rem(20);
      }
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        margin: 0 px2rem(15);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      padding: 0 px2rem(25);
      box-sizing: border-box;
      display: flex;
      .progress-section-text {
        flex: 5;
        @include ellipsis;
        box-sizing: border-box;
      }
      .progress-section-precentage {
        flex: 1;
        @include right;
      }
    }
  }
}
</style>