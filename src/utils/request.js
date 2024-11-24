import axios from 'axios';


const http = axios.create({
  baseURL: 'https://v3pz.itndedu.com/v3pz',
  timeout: 10000,
  headers:{'terminal':'h5'}
});

// 添加请求拦截器
http.interceptors.request.use( 
    (config) => {
    //在发送请求之前做什么
    const token = localStorage.getItem('h5_token');
    //不需要添加token的接口
    const noTokenUrls = ['/login'];
    if (token && !noTokenUrls.includes(config.url)) {
      config.headers['h-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code === -1) {
    }
    if (response.data && response.data.code === -2) {
      localStorage.removeItem('h5_token');
      localStorage.removeItem('h5_userInfo');
      window.location.href = window.location.origin;
    }
    return response;
  },
  (error) => {
    return Promise.reject({
      ...error,
      message: error.response ? error.response.data.message : '网络请求失败'
    });
  }
);

export default http;