import Taro from '@tarojs/taro'
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

Taro.request({
    url: 'http://localhost:8080/test',
    data: {
      foo: 'foo',
      bar: 10
    },
    header: {
      'content-type': 'application/json'
    }
 })

const requestTask = Taro.request({
    url: 'test.php', //仅为示例，并非真实的接口地址
    data: {
        x: '' ,
        y: ''
    },
    header: {
        'content-type': 'application/json'
    },
    success (res) {
        console.log(res.data)
    }
})
requestTask.abort() // 取消请求任务

export function get(url, data, callback) {
    Taro.request({
      url: this.apiUri + '/' + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      // mode:'cors',
    }).then(res => {
      callback(res)
    })
  }
  
export function post(url, data, callback) {
    data.token = this.getToken();
    Taro.request({
      url: this.apiUri + '/' + url,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      callback(res);
    });
  }