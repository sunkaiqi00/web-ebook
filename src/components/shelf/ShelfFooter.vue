<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="item in tab" :key="item.index" @click="onTabClick">
      <div class="shelf-footer-tab" :class="{'is-selected' : isSelected}">
        <div class="icon-private tab-icon" v-if="item.index===1"></div>
        <div class="icon-download tab-icon" v-if="item.index===2"></div>
        <div class="icon-move tab-icon" v-if="item.index===3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index===4"></div>
        <div class="tab-text">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { storeShelfMixin } from '@/utils/mixin'
export default {
  mixins: [storeShelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    tab() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1,
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2,
        },
        {
          label: this.$t('shelf.move'),
          index: 3,
        },
        {
          label: this.$t('shelf.remove'),
          index: 4,
        },
      ]
    },
  },
  methods: {
    onTabClick() {
      console.log('click')
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.shelf-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(-2) px2rem(4) rgba(0, 0, 0, 0.1);
  background: #fff;
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;

    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      &.is-selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
      }
    }
  }
}
</style>