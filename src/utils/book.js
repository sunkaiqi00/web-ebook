export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
];
export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
];

export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece'
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6'
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9'
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000'
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        }
      }
    }
  ];
}

// 动态添加link标签引入css 改全局主题
export function addCss(href) {
  let link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', href);
  document.getElementsByTagName('head')[0].appendChild(link);
}

// 删除link标签 重复引入相同css文件过于消耗
export function removeCss(href) {
  let links = document.getElementsByTagName('link');
  for (let i = links.length; i > 0; i--) {
    let _link = links[i];
    if (_link && _link.getAttribute('href') && _link.getAttribute('href') === href) {
      _link.parentNode.removeChild(_link);
    }
  }
}

// 清楚全部主题css
export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
}
