import Taro from '@tarojs/taro'

const media = {
  /**
   * 图片预览
   * @param {*} imgUrl //需要预览的图片http链接列表，注意是数组
   * @param {*} current // 当前显示图片的http链接，默认是第一个
   */
  previewImage (imgUrl, current) {
    return Taro.previewImage({
      urls: [imgUrl],
      current: current,
      success: function (res) {
        console.log("suc", res)
      },
      fail: function (res) {
        console.log("err", res)
      },
      complete: function (res) { }
    })
  },
  // 保存图片
  saveImage (imgUrl) {
    let that = this
    Taro.getSetting({
      success () {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',//访问照片
          success () {
            console.log("授权成功")
            Taro.startRecord()
            //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
            Taro.downloadFile({
              url: imgUrl,
              success (res) {
                // 下载成功后再保存到本地
                // 返回的临时文件路径，下载后的文件会存储到一个临时文件
                Taro.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success () {
                    Taro.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail () {
            Taro.openSetting({
              success (res) {
                console.log("成功打开设置")
                res.authSetting = {
                  "scope.writePhotosAlbum": true,
                }
                that.saveImage(imgUrl)
              }
            })
          }
        })
      }
    })
  }
}
export default media