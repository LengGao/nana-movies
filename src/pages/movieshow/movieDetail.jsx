import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Video } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea } from 'taro-ui'
import api from '@/api/'
import './movieDetail.scss'


export default class MovieDetail extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      // 视频
      VidemoDetail: {
        authorId: '001',
        authorName: '娜娜',
        authorHeader: '../../static/images/cover/default.jpg',
        authorFrom: '四川师范大学',
        worksLink: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        worksId: '001',
        coverLink: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
        worksType: ' movie',
        publishTime: '2019-12-12'
      },
      // 弹幕
      danmuList: [
        { text: "1", color: '#ff00ff', time: 1 }, //time表示弹幕出现得秒数
        { text: "2", color: '#ff00ff', time: 2 },
        { text: "3", color: '#ff00ff', time: 3 }
      ],
      // 弹幕
      value: "",
      // 作者寄语
      authorMessage: ""
    }
  }

  handleChange2 (event) {
    this.setState({
      value2: event.target.value
    })
  }

  handleChange (value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  //发送弹幕
  handlerPushDanmu () {
    let danmu = {
      text: this.state.value
    }
    console.log(danmu)
    api.saveDanmu('all.json', { id: 1, danmu: danmu })
  }

  ininData () {
    api.findWorksDetail('/findWorksDetail', { worksId: '001' })
    // api.findDanmuList('all.json', { worksId: 1 })
    // api.findAuthorMessage('all.json', { worksId: 1 })
  }

  componentWillMount () {
    return this.ininData()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Video
          className='video-component'
          src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
          controls
          autoplay={false}
          initialTime='0'
          id='video'
          loop={false}
          muted={false}
          danmuList={this.state.danmuList}
          danmuBtn
          enableDanmu
          enableProgressGesture
          vslideGesture
          showMuteBtn
        ></Video>
        {/* <video></video> */}
        <View className='danmu-box'>
          <AtInput
            className='danmu- input'
            name='value'
            type='text'
            placeholder='输入弹幕'
            border
            maxLength={100}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton className='danmu-button' type='primary' onClick={this.handlerPushDanmu.bind(this)}>添加弹幕</AtButton>
        </View>
        <View className='author'>
          <Image src={this.state.VidemoDetail.authorHeader} mode='aspectFit' />
          <View className='info'>
            <View className='name'><Text>作者：{this.state.VidemoDetail.authorName}</Text></View>
            <View className='from'><Text>源自：{this.state.VidemoDetail.authorFrom}</Text></View>
          </View>
        </View>
        <View className='author-message'>
          <AtTextarea
            value={this.state.authorMessage}
            maxLength={1000}
            disabled
            placeholder='暂无寄语'
          />
        </View>
      </View>
    )
  }
}
