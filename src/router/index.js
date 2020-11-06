import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    component: () => import('@/views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('@/components/ebook/EbookRender.vue'),
        meta: {
          title: '阅读'
        }
      }
    ]
  },
  {
    path: '/store',
    component: () => import('@/views/store/index.vue'),
    meta: {
      title: '书城首页'
    },
    redirect: '/store/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/store/StoreHome.vue'),
        meta: {
          title: '书城首页'
        }
      },
      {
        path: 'list',
        component: () => import('@/views/store/StoreList.vue'),
        meta: {
          title: '列表'
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/store/StoreDetail.vue'),
        meta: {
          title: '详情信息'
        }
      },
      {
        path: 'speaking',
        component: () => import('@/views/store/StoreSpeaking.vue'),
        meta: {
          title: '听书'
        }
      },
      {
        path: 'shelf',
        component: () => import('@/views/store/StoreShelf.vue'),
        meta: {
          title: '书架'
        }
      },
      {
        path: 'category',
        component: () => import('@/views/store/StoreCategory.vue'),
        meta: {
          title: '分类'
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
