import axios from 'axios'

// 公共配置
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000
})

let token = null

/**
 * 添加请求拦截器:post参数问题（需要序列化的参数）
 */
instance.interceptors.request.use(
  // 在发送请求之前做什么
  config => {
    token = sessionStorage.getItem('login')
    config.headers["Content-Type"] = 'application/json;charset=UTF-8';

    // 让每个请求携带自定义token 
    if (token) {
      // header添加token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  // 对请求错误做点什么
  error => Promise.reject(error)
)


/**
 * 添加响应拦截器
 */
instance.interceptors.response.use(
  // 对响应数据做点什么
  response => {
    response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    return response
  },
  // 对响应错误做点什么
  error => {
    const {
      response
    } = error;
    errorHandle(response.status, response.info)
  }
)


/**
 * 处理失败的方法
 * status: 状态码
 * ****  2xx ：成功  
 *       3xx : 请求的资源重定向到其他网页  
 *       4xx ： 客户端错误  
 *       5xx ： 服务器内部错误
 * info: 失败的信息
 */
const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log('语义有误，当前去请求无法被服务器理解！');
      break;
    case 401:
      // token
      console.log('服务器认证错误！当前请求需要用户验证。');
      break;
    case 403:
      console.log('服务器已经理解请求，但拒绝执行！');
      break;
    case 404:
      console.log('请检查网络请求地址');
      break;
    case 500:
      console.log('服务器遇到了一个未曾预料的状况，导致它无法完成对请求的处理。');
      break;
    case 502:
      console.log('作为网关或者代理的服务器尝试请求时，从上游服务器接收到无效的响应');
      break;
    default:
      console.log(info);
      break;
  }
}

export default instance;