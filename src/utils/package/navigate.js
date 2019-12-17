import Taro from '@tarojs/taro'
// 路由
const navigate = {
  // 路由跳转 不能跳tabBar 页面栈最多10层
  navigateTo (url, query) {
    if (typeof query !== 'object') throw new Error("查询对象类型为Object,to")
    url = url + '?'
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        url = url + key + "=" + query[key] + "&"
      }
    }
    url = url.substr(0, url.length - 1)
    console.log('url', url)
    return Taro.navigateTo({
      url: url
    })
  },
  // 销毁当前页面
  redirectTo (url, query) {
    if (typeof query !== 'object') throw new Error("查询对象类型为Object,to")
    url = url + '?'
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        url = url + key + "=" + query[key] + "&"
      }
    }
    url = url.substr(0, url.length - 1)
    console.log('url', url)
    return Taro.redirectTo({
      url
    })
  },
  // 销毁当前页面
  navigateBack (params) {
    let delta = 1
    let flag = true
    let index = 0
    if (typeof params === 'number' && params !== undefined) {
      delta = params
    } else if (typeof params === 'string' && params !== undefined) {
      let currentPages = Taro.getCurrentPages()
      if (params.indexOf('/') == 0) {
        params = params.substr(1)
      }
      while (flag) {
        if (currentPages[index].route === params) {
          flag = false
          delta = currentPages.length - (currentPages.length - index)
        } else {
          index++;
        }
      }
    }
    return Taro.navigateBack({
      delta: delta
    })
  },
  // 关闭其他非tabBar页面
  switchTab (url, query) {
    if (typeof query !== 'object') throw new Error("查询对象类型为Object,to")
    url = url + '?'
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        url = url + key + "=" + query[key] + "&"
      }
    }
    url = url.substr(0, url.length - 1)
    console.log('url', url)
    return Taro.switchTab({
      url
    })
  },
  // 关闭所有页面
  reLaunch (url, query) {
    if (typeof query !== 'object') throw new Error("查询对象类型为Object,to")
    url = url + '?'
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        url = url + key + "=" + query[key] + "&"
      }
    }
    url = url.substr(0, url.length - 1)
    console.log('url', url)
    return Taro.reLaunch({
      url
    })
  }
}

export default navigate