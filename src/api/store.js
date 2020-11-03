import axios from 'axios';
import { setLocalForage } from '../utils/localForage';
// axios.defaults.timeout = 10000;
// axios.interceptors.request.use(
//   config => {
//     return config;
//   },
//   err => {
//     throw new Error(err);
//   }
// );
// axios.interceptors.response.use(
//   res => {
//     return res.data;
//   },
//   err => {
//     throw new Error(err);
//   }
// );

// export function home() {
//   return new Promise((resolve, reject) => {
//     axios.get(`${process.env.VUE_APP_BASE_URL}/book/home`).then(
//       res => {
//         resolve(res);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// }
export function shelf() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  });
}

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  });
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  });
}

export function list() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  });
}

export function download(book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError;
    onError = null;
  }
  return axios
    .create({
      baseURL: process.env.VUE_APP_EPUB_URL,
      method: 'get',
      responseType: 'blob',
      timeout: 180 * 1000,
      onDownloadProgress: progressEvent => {
        if (onProgress) onProgress(progressEvent);
      }
    })
    .get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      let blob = new Blob([res.data]);
      setLocalForage(
        book.fileName,
        blob,
        () => {
          if (onSuccess) onSuccess(book);
        },
        err => {
          if (onError) onError(err);
        }
      );
    })
    .catch(err => {
      if (onError) onError(err);
    });
}
