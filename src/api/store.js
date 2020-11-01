import axios from 'axios';
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

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  });
}
