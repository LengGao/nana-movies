import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTextarea, AtList, AtListItem, AtActionSheet, AtActionSheetItem, AtButton } from 'taro-ui'
import log from '../../static/images/cover/default.jpg'
import './selfspace.scss'
import { media, storage } from '@/utils/index'
import api from '@/api/'
import Validator from '@/validator/Validator'


export default class Selfspace extends Component {

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
      // 投稿
      isContribute: false,
      ContributeUrl: 'https://jdc.jd.com/img/200',
      // 反馈
      isFeedback: false,
      Feedback: '',
      // 关于以及责任说明
      isAbout: false,
      About: '这是关于信息',
    }
    this.range = `${this.state.userInfo.country} ${this.state.userInfo.province} ${this.state.userInfo.city}`
    this.touchStartTime = 0
    this.touchEndTime = 0
  }

  // 图片加载失败处理方法
  handleError () {
    let obj = Object.assign(this.state.userInfo)
    obj.userInfo = log
    this.setState({
      userInfo: obj
    })
  }
  /**
   *  预览图片
   * @param {*} url 
   */
  previewImage (url) {
    return media.previewImage(url)
  }

  // 长安事件
  handlerTouchStart (e) {
    this.touchStartTime = e.timeStamp
  }
  handlerOutTouchEnd (e) {
    this.touchEndTime = e.timeStamp
    if (this.touchEndTime - this.touchStartTime > 300) {
      return this.saveImage()
    }
  }
  // 保存图片
  saveImage () {
    console.log("e");
    let imgUrl = this.state.ContributeUrl
    return media.saveImage(imgUrl)
  }


  // 设置
  handlerSetting (userId) {
  }

  /**
   * 列表项点击
   * @param {*} number 
   */
  handlerList (key) {
    switch (key) {
      case 0:
        this.setState({
          isContribute: true
        })
        break;
      case 1:
        this.setState({
          isFeedback: true
        })
        break;
      case 2:
        this.setState({
          isAbout: true
        })
        break;
      default:
        console.log("exception", key, typeof key)
        this.handlerFlag();
        break;
    }
  }

  //活动面版 actionSheet开关控制
  handlerFlag () {
    this.setState({
      isContribute: false,
      isFeedback: false,
      isAbout: false
    })
  }

  // actionSheet 关闭 
  handlerActionClose () {
    return this.handlerFlag()
  }


  /**
   * 反馈信息
   * @param {*} e 事件对象
   */
  handleChange (e) {
    this.setState({
      Feedback: e.target.value
    })
  }
  // 反馈意见提交
  handlerSubmit () {
    let params = {
      content: this.state.Feedback
    }
    return api.saveFeedback('json', params)
  }

  isLogin () {
    // 检查是否有token
    let token = storage.getStorageSync('token')
    let validator = new Validator()
    console.log('token', token);

    return !validator.isEmptyValue(token)
  }

  ininData () {
    // api.findUserinfo()
    // api.findContributeUrl()
  }

  componentWillMount () {
    if (this.isLogin()) {
      return this.ininData()
    } else {
      return Taro.redirectTo({
        url: `/pages/login/authorization?message=0`
      })
    }
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
          <Image src={this.userInfo.avatarUrl ? this.userInfo.avatarUrl : log} onError={this.handleError.bind(this)} mode='aspectFit' className='user-head' onClick={this.previewImage.bind(this, this.userInfo.avatarUrl ? this.userInfo.avatarUrl : log)} />
          <View className='user-info'>
            <View className='nickname'><Text>{this.state.userInfo.nickName}</Text></View>
            <View className='region'><Text>{this.range}</Text></View>
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
              onClick={this.handlerList.bind(this, 0)}
            />
            <AtListItem
              title='反馈'
              note='描述信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
              onClick={this.handlerList.bind(this, 1)}
            />
            <AtListItem
              title='关于'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark', }}
              onClick={this.handlerList.bind(this, 2)}
            />
          </AtList>
        </View>
        <AtActionSheet isOpened={this.state.isContribute} cancelText='取消' title='十分欢迎您来投稿' onClose={this.handlerActionClose.bind(this, this.state.isContribute)} onCancel={this.handlerActionClose.bind(this, this.state.isContribute)}>
          <AtActionSheetItem>
            <View className='contribute'>
              <Text>投稿微信图: 请保存图片后使用微信扫码</Text>
              <Image src={this.state.ContributeUrl} mode='aspectFit' onTouchStart={this.handlerTouchStart.bind(this)} onTouchEnd={this.handlerOutTouchEnd.bind(this)} />
            </View>
          </AtActionSheetItem>
        </AtActionSheet>

        <AtActionSheet isOpened={this.state.isFeedback} cancelText='取消' title='十分欢迎您给我提意见' onClose={this.handlerActionClose.bind(this, this.state.isContribute)} onCancel={this.handlerActionClose.bind(this, this.state.isContribute)}>
          <AtActionSheetItem>
            <View>
              <AtTextarea type='text' placeholder='欢迎反馈您的宝贵意见' value={this.state.Feedback}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
              />
              <AtButton type='primary' onClick={this.handlerSubmit.bind(this)}>
                <Text>提交</Text>
              </AtButton>
            </View>
          </AtActionSheetItem>
        </AtActionSheet>
        <AtActionSheet isOpened={this.state.isAbout} cancelText='取消' title='关于以及责任说明' onClose={this.handlerActionClose.bind(this, this.state.isContribute)} onCancel={this.handlerActionClose.bind(this, this.state.isContribute)}>
          <AtActionSheetItem>
            <View><Text>{this.state.About}</Text></View>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}