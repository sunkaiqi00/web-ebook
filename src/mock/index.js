import Mock from 'mockjs';
import BookHomeApi from './bookHome';
import BookShelfApi from './bookShelf';
import BookHomeList from './bookList';
import BookFlatList from './bookFlatList';

// 拦截请求路径
Mock.mock(/\/book\/home/, 'get', BookHomeApi);
Mock.mock(/\/book\/shelf/, 'get', BookShelfApi);
Mock.mock(/\/book\/list/, 'get', BookHomeList);
Mock.mock(/\/book\/flat-list/, 'get', BookFlatList);
