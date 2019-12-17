import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtList, AtListItem } from 'taro-ui'
import log from '../../static/img/default.jpg'
import './selfspace.scss'


export default class Selfspace extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      userInfo: {
        userHead: 'https://jdc.jd.com/img/200',
        userName: 'nana',
        userRang: '中国'
      },
    }
  }
  // 图片加载失败
  handleError () {
    let obj = Object.assign(this.state.userInfo)
    obj.userInfo = log
    this.setState({
      userInfo: obj
    })
  }

  // 设置
  handlerSetting () {

  }

  // 列表
  handlerList (number) {
    console.log(number)
  }
  isLogin () {
    // 检查是否有token
    return false
  }

  componentWillMount () {
    Taro.redirectTo({
      url: `/pages/login/login?message=0`
    })
  }
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='page-header'>
          <View className='setting'>
            <AtIcon value='settings' size='30' color='#F00' onClick={this.handlerSetting.bind(this)}></AtIcon>
          </View>
          <Image src={log ? log : ''} onError={this.handleError.bind(this)} mode='aspectFit' className='user-head' />
          <View className='user-info'>
            <View className='nickname'><Text>昵称:</Text><Text>昵称:    {this.state.userInfo.userName}</Text></View>
            <View className='region'><Text>地区:</Text><Text>{this.state.userInfo.userRang}</Text></View>
          </View>
        </View>
        {/* 列表项目 */}
        <View className='container'>
          <AtList>
            <AtListItem
              title='标题文字'
              note='描述信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
              onClick={this.handlerList.bind(this, 0)}
            />
            <AtListItem
              title='标题文字'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark', }}
              onClick={this.handlerList.bind(this, 1)}
            />
          </AtList>
        </View>
      </View>
    )
  }
}