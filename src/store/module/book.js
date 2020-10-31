import getters from './getters';
import actions from './actions';
const book = {
  state: {
    // 电子书的分类和书名
    fileName: '',
    // 上下菜单显示隐藏
    menuVisible: false,
    // 底部菜单控件栏显示隐藏
    settingVisible: -1, // -1:不显示，0：字号，1：主题，：2：进度，3：目录
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    // 书是否加载完成
    bookAvailable: false,
    // 进度
    progress: 0,
    // 章节
    section: 0,
    isPaginating: true,
    // 电子书的book对象
    currentBook: null,
    // 目录
    navigation: null,
    // 电子书封面图片
    cover: null,
    // 电子书信息
    metadata: null,
    paginate: '',
    pagelist: null,
    // 书签偏移量
    offsetY: 0,
    // 是否为书签页
    isBookmark: null
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName;
    },
    SET_MENU_VISIBLE: (state, visible) => {
      state.menuVisible = visible;
    },
    SET_SETTING_VISIBLE: (state, visible) => {
      state.settingVisible = visible;
    },
    SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
      state.defaultFontSize = fontSize;
    },
    SET_DEFAULT_FONT_FAMILY: (state, font) => {
      state.defaultFontFamily = font;
    },
    SET_FONT_FAMILY_VISIBLE: (state, visible) => {
      state.fontFamilyVisible = visible;
    },
    SET_DEFAULT_THEME: (state, theme) => {
      state.defaultTheme = theme;
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable;
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress;
    },
    SET_SECTION: (state, section) => {
      state.section = section;
    },
    SET_IS_PAGINATING: (state, isPaginating) => {
      state.isPaginating = isPaginating;
    },
    SET_CURRENT_BOOK: (state, currentBook) => {
      state.currentBook = currentBook;
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation;
    },
    SET_COVER: (state, cover) => {
      state.cover = cover;
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata;
    },
    SET_PAGINATE: (state, paginate) => {
      state.paginate = paginate;
    },
    SET_PAGELIST: (state, pagelist) => {
      state.pagelist = pagelist;
    },
    SET_OFFSETY: (state, offsetY) => {
      state.offsetY = offsetY;
    },
    SET_IS_BOOKMARK: (state, isBookmark) => {
      state.isBookmark = isBookmark;
    }
  },
  actions,
  getters
};
export default book;
