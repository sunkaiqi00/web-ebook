<template>
  <!-- 动态路由组件 -->
  <div class="ebook-render">
    <div id="read"></div>
  </div>
</template>
<script>
// 引入 epubjs
import Epub from 'epubjs'
global.ePub = Epub

import { ebookMixin } from '@/utils/mixin'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation,
} from '@/utils/localStorage'

export default {
  mixins: [ebookMixin],
  methods: {
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 切换 底部底部菜单显示
    toggleTitleAndMenu() {
      this.setMenuVisible(!this.menuVisible)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      // 隐藏设置控件
      this.setSettingVisible(-1)
      // 隐藏 字体选择
      this.setFontFamilyVisible(false)
    },
    // 初始化字体
    initFontFamily() {
      // 初次判断 是否有字体 没有设置默认字体
      let fontFamily = getFontFamily(this.fileName)
      if (!fontFamily) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        // 如果获取到了  设置为默认字体
        this.rendition.themes.font(fontFamily)
        // 更新vuex中保存的字体
        this.setDefaultFontFamily(fontFamily)
      }
    },
    // 初始化字体大小
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    // 初始化主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        // defaultTheme = {}
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach((theme) => {
        // 注册所有样式
        this.rendition.themes.register(theme.name, theme.style)
      })
      // 选择默认样式
      this.rendition.themes.select(defaultTheme)
    },
    // 初始化 book的rendition对象
    initRenition() {
      // 2. 生成Rendition 通过Book.renderTo  绑定一个DOM
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        // 微信兼容
        method: 'default',
      })
      let location = getLocation(this.fileName)
      // 3. 通过Rendition.display 渲染电子书及相关设置信息
      this.display(location, () => {
        this.initTheme()
        this.initFontFamily()
        this.initFontSize()
        // 全局样式设置
        this.initGlobalStyle()
        this.refreshLocation()
      })
      // 给 epub 注入字体  (iframe来显示电子书 DOM不继承)
      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            // 环境变量
            `${process.env.VUE_APP_RES_URL}/webfonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/webfonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/webfonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/webfonts/tangerine.css`
          ),
        ]).then(() => {
          // console.log('字体加载完毕...')
        })
      })
    },
    // 手势操作
    initGesture() {
      // 电子书通过 iframe 实现   给iframe绑定事件 通过手指滑动距离和时间 判断上一页或下一页
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    initEpub() {
      // 拼接路径 访问 nginx 静态资源
      const url =
        process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      // console.log(url)
      // 1. 通过url 生成Book对象
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRenition()
      this.initGesture()
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * getFontSize(this.fileName / 16)
          )
        })
        .then((locations) => {
          // console.log(locations)
          this.setBookAvailable(true)
          this.refreshLocation()
        })
    },
  },
  mounted() {
    // 通过路由参数 动态获取访问电子书的分类和书名
    const bookUrl = this.$route.params.fileName.split('|').join('/')
    // console.log(bookUrl)
    // 异步修改 vuex中book模块保存的电子书的分类和书名
    this.setFileName(bookUrl)
      .then(() => {
        this.initEpub()
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
}
</script>
<style scoped>
</style>