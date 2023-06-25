import axios from "axios";

// 统一配置请求路径
const baseURL = 'http://10.0.2.2:3000';

//创建axios实例
const service = axios.create({
  timeout: 10000 // 10秒超时时间
})

//添加request拦截器
service.interceptors.request.use(config => {
  // 设置请求头设置token值 ...
  return config;
}, error => {
  Promise.reject(error);
})

//添加response拦截器
service.interceptors.response.use(response => {
  if (!response.data) {
    console.log('哎呀,出错啦!');
  }  
  return response;
}, error => {
  // 请求出错，统一反馈
  console.log('系统开小差了~');
  return Promise.reject(error.response)
}
)

const API = {
  //封装get接口
  // params={} 是设置默认值
  get(url: string, params = {t: ''}) {
    params.t = `${new Date().getTime()}`; //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
      url: baseURL + url,
      method: 'get',
      headers: {
      },
      params
    })
  },

  //封装post请求
  post(url: string, data = {}) {
    //默认配置
    let sendObject = {
      url: baseURL + url,
      method: "post",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: data
    };
    sendObject.data = JSON.stringify(data);
    return service(sendObject)
  },

  //封装post请求: 表单提交
  postFrom(url: string, data = {}) {
    //默认配置
    let sendObject = {
      url: baseURL + url,
      method: "post",
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data
    };
    sendObject.data = data;
    return service(sendObject)
  },


  //删除方法(resfulAPI常用)
  deletes(url: string) {
    return service({
      url: url,
      method: 'delete',
      headers: {}
    })
  },

  //patch方法(resfulAPI常用)
  patch(url: string) {
    return service({
      url: url,
      method: 'patch',
      headers: {}
    })
  }
}
export default API;