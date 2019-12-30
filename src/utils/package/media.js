import Taro from '@tarojs/taro'

const media = {
  /**
   * 图片预览
   * @param {*} imgUrl //需要预览的图片http链接列表，注意是数组
   * @param {*} current // 当前显示图片的http链接，默认是第一个
   */
  previewImage (imgUrl, current = '') {
    return Taro.previewImage({
      urls: [imgUrl],
      current: current,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    })
  }
}
export default media