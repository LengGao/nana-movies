import Taro from '@tarojs/taro'

// 提示
let toast = {
  success_Long (title = "成功") {
    Taro.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  },
  success_Short (title = "成功") {
    Taro.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  },
  error_Long (title = "失败") {
    Taro.showToast({
      title: title,
      icon: 'erro',
      duration: 2000
    })
  },
  error_Short (title = "失败") {
    Taro.showToast({
      title: title,
      icon: 'erro',
      duration: 1000
    })
  },
  common_Long (title) {
    Taro.showToast({
      title: title,
      duration: 1000
    })
  },
  common_Short (title) {
    Taro.showToast({
      title: title,
      duration: 1000
    })
  },
  showModal_Determine (title = '娜娜提示您', content = "请确认操作", showCancel = false, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3CC51F') {
    Taro.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor
    })
      .then(res => console.log(res.confirm, res.cancel))
  },
  showModal_Confirm (title = '娜娜提示您', content = "确认执行该操作吗?", showCancel = false, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3CC51F') {
    Taro.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor
    })
      .then(res => console.log(res.confirm, res.cancel))
  },
  showActionSheet (itemList = [], itemColor = '#000000', callback) {
    let a = 0;
    Taro.showActionSheet({
      itemList,
      itemColor,
    })
      .then(res => {
        /* tapIndex -> 0,1,2...*/
        console.log(res.errMsg, res.tapIndex)
        if (!!callback) {
          callback()
        }
        a = parseInt(res.tapIndex)
      })
      .catch(err => console.log(err))
    return a;
  }
}

// 路由
let router = {
  // 路由跳转 不能跳tabBar 页面栈最多10层
  navigateTo (url, event) {
    if (!events) {
      Taro.navigateTo({
        url
      })
    }
  },
  // 销毁当前页面
  redirectTo (url) {
    Taro.redirectTo({
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
    Taro.navigateBack({
      delta: delta
    })
  },
  // 关闭其他非tabBar页面
  switchTab (url) {
    Taro.switchTab({
      url
    })
  },
  // 关闭所有页面
  reLaunch (url) {
    Taro.reLaunch({
      url
    })
  }
}

// 数据缓存
let storage = {
  setStorageSync: function (key, data) {
    try {
      Taro.setStorageSync(key, data)
    } catch (e) {
      console.log(e)
    }
  },
  removeStorageSync: function (key) {
    Taro.removeStorageSync(key)
  },
  clearStorageSync: function () {
    Taro.clearStorageSync()
  },
  getStorageSync: function (key) {
    let value = Taro.getStorageSync(key)
    return value
  }
}

export default { toast, router, storage }