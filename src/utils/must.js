import Taro from '@tarojs/taro'

const toast = {
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
  showActionSheet (itemList = [], itemColor = '#000000') {
    let a = 0;
    Taro.showActionSheet({
      itemList,
      itemColor,
      success (res) {
        a = res.tapIndex
      }
    })
      .then(res => {
        console.log(res.errMsg, res.tapIndex)
        a = parseInt(res.tapIndex)
      })
      .catch(err => console.log(err))
    return a;
  }
}

const router = {
  // 路由跳转
  navigateTo (params) {
    Taro.navigateTo(params).catch(err => {
      console.log("navigateTo", err)
    })
  }
}

export { toast, router }