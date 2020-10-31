import { mapGetters, mapActions } from 'vuex';
import { themeList, addCss, removeAllCss, getReadTimeToMinute } from '@/utils/book';
import { saveLocation, getBookmark } from '@/utils/localStorage';
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
