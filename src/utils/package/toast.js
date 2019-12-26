import Taro from '@tarojs/taro'

// 提示
const toast = {
  success_Long (title = "成功") {
    return Taro.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  },
  success_Short (title = "成功") {
    return Taro.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  },

  loading (title = "加载中...", duration = 2000) {
    return Taro.showToast({
      title: title,
      icon: 'loading',
      duration: duration
    })
  },
  error_Long (title = "失败") {
    return Taro.showToast({
      title: title,
      icon: 'loading',
      duration: 2000
    })
  },
  error_Short (title = "失败") {
    return Taro.showToast({
      title: title,
      icon: 'loading',
      duration: 1000
    })
  },

  common_Long (title) {
    return Taro.showToast({
      title: title,
      duration: 1000
    })
  },
  common_Short (title) {
    return Taro.showToast({
      title: title,
      duration: 1000
    })
  },
  showModal_Determine (title = '娜娜提示您', content = "请确认操作", showCancel = false, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3CC51F') {
    return Taro.showModal({
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
    return Taro.showModal({
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
    return Taro.showActionSheet({
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
  },
  /**
   * 
   * @param {*} message String 必填 提示信息
   * @param {*} type String 	info，success，error，warnin
   * @param {*} duration number 持续时间
   */
  showMessage (message = '系统提示', type = 'info', duration = '') {
    return Taro.atMessage({
      message: message,
      type: type,
      duration: duration
    })
  }

}



export default toast 