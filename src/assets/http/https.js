import axios from "axios";
import QS from "qs";
import { Message } from "element-ui";
import { getCookie, clearAllCookie } from "../js/utils/cookie";
import router from "../../router/index.js";
// import Router from 'vue-router'
// const cancelToken = axios.CancelToken;

// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://hw-gz39.heyqiwu.cn:50000"; //开发环境
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "http://hw-gz74.heyqiwu.cn:50000"; //测试环境
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "http://hw-gz74.heyqiwu.cn:50000"; //生产环境
}

//请求超时时间设置
axios.defaults.timeout = 10000;

//post请求头的设置
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }

    //     const token = getCookie("dToken"); //token
    //     const tokenTime =atob( window.localStorage.getItem("timeOut")); //获取登录过期时间
    //     const nowTime = new Date().getTime(); //当前时间
    //     //判断当前是否为登录页面
    //     if (router.currentRoute.fullPath === "/") {
    //       config.headers.Authorization =
    //         "Basic " + btoa(token + ":" + "s00pers3cret");
    //     } //非登录页面处理
    //     else if (token) {
    //       //判断登录时间是否过期
    //       if (nowTime < tokenTime) {
    //         config.headers.Authorization =
    //           "Basic " + btoa(token + ":" + "s00pers3cret");
    //       } //过期时间处理
    //       else {
    //         Message({
    //           message: "登录过期，请重新登录",
    //         });
    //         setTimeout(() => {
    //           router.replace({
    //             path: "/",
    //             redirect: "/",
    //           });
    //         }, 500);
    //         //清除缓存
    //         window.localStorage.clear();
    //         clearAllCookie();
    //         //取消当前请求
    //         let url = config.baseURL + config.url + "&" + config.method;
    //         let cancel;
    //         config.CancelToken = new cancelToken((c) => {
    //           cancel = c;
    //         });
    //         url.cancel();
    //       }
    //     }

    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.retcode !== 0) {
        Message({ type: "warning", message: response.data.payload });
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    console.log(error.response, "000");
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     // 401: 未登录
    //     // 未登录则跳转登录页面，并携带当前页面的路径
    //     // 在登录成功后返回当前页面，这一步需要在登录页操作。
    //     case 401:
    //       router.replace({
    //         path: "/",
    //         query: {
    //           redirect: "/",
    //         },
    //       });
    //       break;

    //     // 403 token过期
    //     // 登录过期对用户进行提示
    //     // 清除本地token
    //     // 跳转登录页面
    //     case 403:
    //       Message({
    //         message: "403 登录过期，请重新登录",
    //       });
    //       // 清除token
    //        window.localStorage.clear();
    //        clearAllCookie();
    //       // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
    //       setTimeout(() => {
    //         router.replace({
    //           path: "/",
    //           query: {
    //             redirect: '/',
    //           },
    //         });
    //       }, 1000);
    //       break;

    //     // 404请求不存在
    //     case 404:
    //       Message({
    //         message: "请求网络不存在",
    //         type: "warning",
    //       });
    //       break;
    //     // 404请求不存在
    //     case 500:
    //       Message({
    //         message: "服务器出错",
    //         type: "warning",
    //       });
    //       break;
    //     // 其他错误，直接抛出错误提示
    //     default:
    //       Message({
    //         message: error.response.data.msg,
    //         type: "warning",
    //       });
    //   }
    return Promise.reject(error);
    // }
  }
);

//get请求封装
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//post请求封装
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
//put 请求封装
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//DELETE 请求封装
export function DELETE(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { params: params })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
