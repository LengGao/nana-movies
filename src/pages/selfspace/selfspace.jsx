import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTextarea, AtList, AtListItem, AtActionSheet, AtActionSheetItem, AtButton } from 'taro-ui'
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
      isOpened: false,
      isOpened2: false,
      isOpened3: false,
      value: ''
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

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }
  // 提交按钮
  handlerSubmit () {

  }

  componentWillMount () {
    // Taro.redirectTo({
    //   url: `/pages/login/login?message=0`
    // })
  }
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='page-header'>
          {/*<View className='setting'>
            <AtIcon value='settings' size='30' color='#F00' onClick={this.handlerSetting.bind(this)}></AtIcon>
          </View>*/}
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
              title='投稿'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark', }}
              onClick={this.handlerList.bind(this, 1)}
            />
            <AtListItem
              title='反馈'
              note='描述信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
              onClick={this.handlerList.bind(this, 0)}
            />
            <AtListItem
              title='关于'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark', }}
              onClick={this.handlerList.bind(this, 1)}
            />
          </AtList>
        </View>
        <AtActionSheet isOpened cancelText='取消' title='头部标题可以用通过转义字符换行'>
          <AtActionSheetItem>
            <View><Text>投稿微信图 <Image src={log} /></Text></View>
          </AtActionSheetItem>
        </AtActionSheet>

        <AtActionSheet>
          <AtActionSheetItem>
            <View>
              <AtTextarea type='text' placeholder='欢迎反馈您的宝贵意见' value={this.state.value}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
              />
              <AtButton type='primary' onClick={this.handlerSubmit.bind(this)}>
                <Text>提交</Text>
              </AtButton>
            </View>
          </AtActionSheetItem>
        </AtActionSheet>
        <AtActionSheet>
          <AtActionSheetItem>
            <View><Text>这是关于信息</Text></View>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}