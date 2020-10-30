<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          v-model="searchText"
          @click="showSearchPage"
          @keyup.enter.exact="search"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata&&metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata&&metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      :top="156"
      :bottom="48"
      ref="scroll"
      v-show="!searchVisible"
    >
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{selected:section===index}"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href)"
        >{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item,index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi,true)"
      ></div>
    </scroll>
  </div>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import scroll from '../common/scroll'
import { px2rem } from '@/utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    scroll,
  },
  data() {
    return {
      searchVisible: false,
      searchList: [],
      searchText: '',
    }
  },
  methods: {
    // 点击目录跳转到对应页面  点击搜索结果跳转对应内容  （共用）
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        // 跳转到的页面 对应搜索关键字高亮显示
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    // 下级目录 缩进
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`,
      }
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchList = null
      this.searchText = ''
    },
    showSearchPage() {
      this.searchVisible = true
    },
    // 全文搜索
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map((section) =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then((results) => Promise.resolve([].concat.apply([], results)))
    },
    // 渲染搜索结果
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then((list) => {
          // 文字高亮显示
          this.searchList = list.map((item) => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class='content-search-text'>${this.searchText}</span>`
            )
            return item
          })
        })
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        width: px2rem(153.75);
        font-size: px2rem(13);
        line-height: px2rem(16);
        margin-top: px2rem(5);
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        width: px2rem(153.75);
        font-size: px2rem(12);
        line-height: px2rem(14);
        margin-top: px2rem(5);
        @include ellipsis;
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      display: flex;
      flex-direction: column;
      .slide-contents-book-progress {
        flex: 1;
        margin-top: px2rem(-5);
        box-sizing: border-box;
        .progress {
          font-size: px2rem(10);
        }
        .progress-text {
          font-size: px2rem(10);
        }
      }
      .slide-contents-book-time {
        flex: 1;
        font-size: px2rem(10);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(18) 0;
      box-sizing: border-box;
      font-size: px2rem(14);
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      .slide-contents-item-page {
        // flex: 0 0 px2rem(30);
        // font-size: px2rem(10);
        // @include right;
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>