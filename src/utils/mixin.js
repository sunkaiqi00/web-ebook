import { mapGetters, mapActions } from 'vuex';
import { themeList, addCss, removeAllCss, getReadTimeToMinute } from '@/utils/book';
import { saveLocation, getBookmark, getBookShelf, saveBookShelf } from '@/utils/localStorage';
import { shelf } from '@/api/store';
import { appendAddToShelf, computedId, removeAddToShelf } from '@/utils/store';
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList() {
      return themeList(this);
    },
    // 获取章节名称
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
      return this.section ? this.navigation[this.section].label : '';
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    // 全局样式设置
    initGlobalStyle() {
      removeAllCss();
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
          break;
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
          break;
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
          break;
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
      }
    },
    // 切换章节 刷新进度条
    refreshLocation() {
      // 获取当前章节信息
      let currentLocation = this.currentBook.rendition.currentLocation();
      if (currentLocation && currentLocation.start.cfi) {
        let startCfi = currentLocation.start.cfi;
        // 通过 章节开始cfi 获取相对全书的比率
        let progress = this.currentBook.locations.percentageFromCfi(startCfi);
        // 刷新进度条
        this.setProgress(Math.floor(progress * 100));
        // 存储
        this.setSection(currentLocation.start.index);
        saveLocation(this.fileName, startCfi);
        const bookmark = getBookmark(this.fileName);
        // console.log(bookmark);
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true);
          } else {
            this.setIsBookmark(false);
          }
        } else {
          this.setIsBookmark(false);
        }
        // 关于分页
        // if (this.pagelist) {
        //   let totalPage = this.pagelist.length;
        //   let currentPage = currentLocation.start.location;
        //   if (currentPage && currentPage > 0) {
        //     this.setPaginate(currentPage + ' / ' + totalPage);
        //   } else {
        //     this.setPaginate('');
        //   }
        // } else {
        //   this.setPaginate('');
        // }
      }
    },
    display(target, callBack) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation();
          if (callBack) callBack();
        });
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation();
          if (callBack) callBack();
        });
      }
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      // 隐藏设置控件
      this.setSettingVisible(-1);
      // 隐藏 字体选择
      this.setFontFamilyVisible(false);
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeToMinute(this.fileName));
    }
  }
};

export const storeHomeMixin = {
  computed: {
    ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible'])
  },
  methods: {
    ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      });
    }
  }
};

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    // 书架 点击跳转到详情页
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      });
    },
    // 获取书架电子书
    getShelfList() {
      let shelfList = getBookShelf();
      if (!shelfList) {
        shelf().then(res => {
          if (res.status === 200 && res.data && res.data.bookList) {
            shelfList = appendAddToShelf(res.data.bookList);
            saveBookShelf(shelfList);
            return this.setShelfList(shelfList);
          }
        });
      } else {
        return this.setShelfList(shelfList);
      }
    },
    // 获取分类书  currentType=2
    getCategoryfList(title) {
      this.getShelfList().then(() => {
        let categoryList = this.shelfList.filter(book => {
          return book.type === 2 && book.title === title;
        })[0];
        this.setShelfCategory(categoryList);
      });
    },
    // 移除分组
    // moveOutOfGroup(cb) {
    //   this.setShelfList(
    //     this.shelfList.map(book => {
    //       if (book.type === 2 && book.itemList) {
    //         book.itemList = book.itemList.filter(subBook => !subBook.selected);
    //       }
    //       return book;
    //     })
    //   ).then(() => {
    //     let list = removeAddToShelf(this.shelfList);
    //     list = [].concat(list, ...this.shelfSelected);
    //     list = appendAddToShelf(list);
    //     list = computedId(list);
    //     this.setShelfList(list).then(() => {
    //       this.simpleToast(this.$t('shelf.moveBookOutSuccess'));
    //       if (cb) cb();
    //     });
    //   });
    // }
    moveOutOfGroup(f) {
      this.setShelfList(
        this.shelfList.map(book => {
          if (book.type === 2 && book.itemList) {
            book.itemList = book.itemList.filter(subBook => !subBook.selected);
          }
          return book;
        })
      ).then(() => {
        const list = computedId(
          appendAddToShelf([].concat(removeAddToShelf(this.shelfList), ...this.shelfSelected))
        );
        this.setShelfList(list).then(() => {
          this.simpleToast(this.$t('shelf.deleteGroup') + '成功');
          if (f) f();
          // 删除分组 bug toast不隐藏
          setTimeout(() => {
            this.$router.go(0);
          }, 600);
        });
      });
    }
  }
};
