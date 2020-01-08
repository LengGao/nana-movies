import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import log from '../../static/images/cover/default.jpg'
import './authorization.scss'
import api from '@/api/'


export default class Authorization extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      /** 用户信息 */
      userInfo: {
        /** 昵称 */
        nickName: 'zs',
        /** 头像 */
        avatarUrl: 'https://jdc.jd.com/img/200',
        /** 性别 `0`: 未知 `1`: 男- `2`: 女  */
        gender: 0 | 1 | 2,
        /** 省份，如：`Yunnan` */
        province: '湖南',
        /** 城市，如：`Dalian` */
        city: '耒阳',
        /** 国家，如：`China` */
        country: '中国',
      },
    }
  }
  handleGetUserInfo (e) {
    console.log(e);
    api.saveUserInfo(e.detail.userInfo)
    Taro.switchTab({
      // url: '/pages/home/home'
      url: '/pages/photoshow/photoshow'
    })
  }


  componentWillMount () {
    let currentPages = Taro.getCurrentPages()
    console.log('currentPages', currentPages)
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src={log} className='applog' />
        <Text className='.at-article__h2'>一个专为原创作者设计的平台</Text>
        <Button type='primary' className='login' open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)}>
          <Text>微信授权登录</Text>
        </Button>
      </View>
    )
  }
}
