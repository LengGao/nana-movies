import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Video } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea } from 'taro-ui'
import log from '../../static/img/default.jpg'
import './movieDetail.scss'


export default class MovieDetail extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      VidemoList: [
        {
          authorName: '001',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          authorWorks: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          worksId: '001',
          worksCover: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          publihTime: '2019-12-12'
        },
        {
          authorName: '001',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          authorWorks: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          worksId: '001',
          worksCover: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          publihTime: '2019-12-12'
        },
        {
          authorName: '001',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          authorWorks: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          worksId: '001',
          worksCover: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          publihTime: '2019-12-12'
        },
        {
          authorName: '001',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          authorWorks: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          worksId: '001',
          worksCover: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          publihTime: '2019-12-12'
        }
      ],
      danmuList: [
        { text: "cao", color: '#ff00ff', time: 3 },
        { text: "cao", color: '#ff00ff', time: 3 },
        { text: "cao", color: '#ff00ff', time: 3 }
      ],
      value: "",
      value2: ""
    }
    // 但谬
    this.danmuList = [
      { text: "cao", color: '#ff00ff', time: 3 },
      { text: "cao", color: '#ff00ff', time: 3 },
      { text: "cao", color: '#ff00ff', time: 3 }
    ]
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
    this.danmuList.push({ text: "gao", color: '#ff00ff', time: 3 })
    console.log(this.danmuList)
  }

  componentWillMount () {
  }
  componentDidMount () {
  }

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
          danmuList={this.danmuList}
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
          <Image src={log} mode='aspectFit' />
          <View className='info'>
            <View className='name'><Text>name</Text></View>
            <View className='from'><Text>from</Text></View>
          </View>
        </View>
        <View className='author-message'>
          <AtTextarea
            value={this.state.valu2}
            onChange={this.handleChange2.bind(this)}
            maxLength={1000}
            disabled
            placeholder='暂无寄语'
          />
        </View>
      </View>
    )
  }
}
