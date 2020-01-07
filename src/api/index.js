import Taro from '@tarojs/taro'

// const BASE_URL = 'https://snack.bayou-tech.cn//json/xiaodageng/'
// const BASE_URL =  'https://snack.bayou-tech.cn//json/hanyuhao/'
// const BASE_URL =  'https://snack.bayou-tech.cn//json/hanyuhao/'
// /home/www/snack.bayou-tech.cn/public/json/xiaodageng/
// const BASE_URL = '127.0.0.1 http://localhost:3000/'
const BASE_URL = 'http://localhost:80'
const BASE_IMAGE_URL = 'http://localhost/public/images/';

const api = require('./request.js')
/**
 可以使用拦截器在请求发出前或发出后做一些额外操作。
 在调用 Taro.request 发起请求之前，调用 Taro.addInterceptor 方法为请求添加拦截器，
 拦截器的调用顺序遵循洋葱模型。
 拦截器是一个函数，接受 chain 对象作为参数。chain 对象中含有 requestParmas 属性，
 代表请求参数。拦截器内最后需要调用 chain.proceed(requestParams) 以调用下一个拦截器或发起请求。
 */
const interceptor = function (chain) {
  let requestParams = chain.requestParams
  let { data, url } = requestParams
  // data = Object.assign({token:'token'},data)
  requestParams.data = data
  requestParams.url = BASE_URL + url
  Taro.showLoading({
    title: '执行中...',
    mask: true,
  })
  // console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      Taro.hideLoading()
      // console.log(`http <-- ${url} result:`, res)
      return res
    })
}

Taro.addInterceptor(interceptor)
Taro.addInterceptor(Taro.interceptors.logInterceptor) //打印请求相关信息
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor) //请求超时时抛出错误

export default api