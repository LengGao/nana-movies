import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Video, Button } from '@tarojs/components'
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
      danmuList : [
        { text: "cao", color: '#ff00ff', time: 3 },
        { text: "cao", color: '#ff00ff', time: 3 },
        { text: "cao", color: '#ff00ff', time: 3 }
      ]
    }
    // 但谬
    this.danmuList = [
      { text: "cao", color: '#ff00ff', time: 3 },
      { text: "cao", color: '#ff00ff', time: 3 },
      { text: "cao", color: '#ff00ff', time: 3 }
    ]
    // {id:'1',publishTime:'2012-10-11',text:"cao", color: '#ff00ff',time: 3}
  }

  handlerChange(e) {
    if (e.detail.current === 3) {
      setTimeout(() => {
        // 去搜全页面
        console.log("start", e)
      }, 1000);
    }
  }
  //发送弹幕
  handlerPushDanmu() {
    this.danmuList.push({ text: "gao", color: '#ff00ff', time: 3 })
    console.log(this.danmuList)
  }

  componentWillMount() {
  }
  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Video
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
        {/* 
                  controls={true}
          autoplay={false}
          poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
          initialTime='0'
          id='video'
          loop={false}
          muted={false} */}
        {/* <video src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'></video> */}
        
        {/* danmuList={this.state.danmuList}
                  danmuBtn
          enableDanmu
          
          enableProgressGesture
          vslideGesture
          showMuteBtn
           */}

        <Button onClick={this.handlerPushDanmu.bind(this)}>添加弹幕</Button>
        {/* <video></video> */}
        <View className='author'>
          <Image src={log} mode='aspectFit' />
          <View className='info'>
            <View className='name'>name</View>
            <View className='from'>from</View>
          </View>
        </View>
      </View>
    )
  }
}
