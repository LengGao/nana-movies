import Taro from '@tarojs/taro'
/**
 * https://taro-docs.jd.com/taro/docs/apis/network/request/request.html
 * @param {*} method 
 * @param {*} header 
 * @param {*} dataType 返回的数据格式。为json则会尝试做JSON.parse
 * @param {*} responseType 
 * @param {*} jsonp 使用 jsonp，且使用此值作为回调函数名
 * @param {*} jsonpCache jsonp 请求 url 是否需要被缓存
 * @param {*} mode 是否允许跨域请求
 * @param {*} credentials 	是否携带 Cookie
 * @param {*} cache 缓存模式
 */

let GET_CONFIG = null;
let POST_CONFIG = null
if (process.env.TARO_ENV === 'h5') {
  GET_CONFIG = function (method = 'GET', header = { 'content-type': 'application/json' }, dataType = 'json', responseType = 'text', jsonp = false, jsonpCache = false, mode = 'same-origin', credentials = 'omit', cache = 'default') {
    return {
      method,
      header,
      header,
      dataType,
      responseType,
      jsonp,
      jsonpCache,
      mode,
      credentials,
      cache
    }
  }
  POST_CONFIG = function (method = 'GET', header = { 'content-type': 'application/json' }, dataType = 'json', responseType = 'text', jsonp = false, jsonpCache = false, mode = 'same-origin', credentials = 'omit', cache = 'default') {
    return {
      method,
      header,
      header,
      dataType,
      responseType,
      jsonp,
      jsonpCache,
      mode,
      credentials,
      cache
    }
  }
} else {
  GET_CONFIG = function (method = 'GET', header = { 'content-type': 'application/json;charset=utf-8' }, dataType = 'json', responseType = 'text') {
    return {
      method,
      header,
      header,
      dataType,
      responseType
    }
  }
  POST_CONFIG = function (method = 'POST', header = { 'content-type': 'application/json;charset=utf-8' }, dataType = 'json', responseType = 'text') {
    return {
      method,
      header,
      header,
      dataType,
      responseType
    }
  }
}

// 在此调用函数传入不同参数可获得不同配置对象
const get_config = GET_CONFIG();
const post_config = POST_CONFIG();

// console.log('GET_CONFIG :', get_config);
// console.log('GET_CONFIG :', demo);
// 请求 填写url + data 最后戴上相关配置

//
export function getHomeImages () {
  return Taro({
    url: '',
    ...get_config
  })
}

// home
export function findSwiperList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}
export function findNoticeB1arText (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}
/**
 * 人气
 * @param {*} url 
 * @param {*} data  {type,offset,pageSize,total} 
 */
export function findPopularitysList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}
/**
 * 新品
 * @param {*} url 
 * @param {*} data 
 */
export function findNewProductsList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}
/**
 * 预告
 * @param {*} url 
 * @param {*} data 
 */
export function findNoticesList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}

// photo 摄影作品
export function findPhotoList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}

// movies
export function findMovieList (url, data) {
  return Taro.request({
    url: url,
    data: data,
    ...get_config
  })
}

/**
 * @param {*} url
 * @param {*} data id: 1, danmu: danmu }
 */
export function saveDanmu (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}
/**
 * 
 * @param {*} url 
 * @param {id:id} data 
 */
export function findWorksDetail (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}
/**
 * 
 * @param {*} url 
 * @param {id:worksId} data 
 */
export function findDanmuList (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}
/**
 * 
 * @param {*} url 
 * @param {id:authorId} data 
 */
export function findAuthorMessage (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}

// selfspace
// 获取用户信息

export function findUserinfo (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}

export function findContributeUrl (url, data) {
  return Taro.request({
    url,
    data,
    ...get_config
  })
}
/**
 * //提交反馈意见
 * @param {*} url 
 * @param {content: this.state.Feedback} data 
 */
export function saveFeedback (url, data) {
  return Taro.request({
    url,
    data,
    ...post_config
  })
}

/**
 * 保存用户信息
 * @param {*} url 
 * @param {*} data 用户信息对象
 */
export function saveUserInfo (data) {
  return Taro.request({
    url: '/saveUserInfo',
    data,
    ...post_config
  })
}

export function authorizationLogin (data) {
  Taro.request({
    url: '/wxLogin',
    data,
    ...post_config
  })
}