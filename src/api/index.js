import Taro from '@tarojs/taro'

const requst = require('./request.js')
/**
 可以使用拦截器在请求发出前或发出后做一些额外操作。
 在调用 Taro.request 发起请求之前，调用 Taro.addInterceptor 方法为请求添加拦截器，
 拦截器的调用顺序遵循洋葱模型。
 拦截器是一个函数，接受 chain 对象作为参数。chain 对象中含有 requestParmas 属性，
 代表请求参数。拦截器内最后需要调用 chain.proceed(requestParams) 以调用下一个拦截器或发起请求。
 */
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  data.token = 'token'
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
    })
}

Taro.addInterceptor(interceptor)
Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)


export default requst