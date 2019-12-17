import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import log from '../../static/img/default.jpg'
import './authorization.scss'


export default class Authorization extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {

    }
  }
  handleGetUserInfo (e) {
    console.log('e', e)
    Taro.switchTab({
      url: '/pages/home/home'
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
        <Image src={log} />
        <Button type='primary' open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)}>
          <Text>微信授权登录</Text>
        </Button>
      </View>
    )
  }
}
