import Taro from '@tarojs/taro'

// 数据缓存
const storage = {
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

export default storage