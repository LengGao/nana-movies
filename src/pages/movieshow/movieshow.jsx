import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigate } from '../../utils/index'
import './movieshow.scss'


export default class Movieshow extends Component {

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
      ]
    }
  }

  handlerChange (e) {
    if (e.detail.current === 3) {
      setTimeout(() => {
        // 去搜全页面
        console.log("start", e)
      }, 1000);
    }
  }
  // 封面
  handlerClick () {
    let query = {
      e: 1
    }
    navigate.navigateTo('./movieDetail', query)
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
        {
          this.state.VidemoList.map((item) => {
            return (
              <View className='itemBox' taroKey={String(item.worksId)}>
                <Image src={item.worksCover} mode='aspectFit' onClick={this.handlerClick.bind(this, item.worksId)} />
                <View className='author'>
                  <Image src={item.authorHeader} mode='aspectFit' />
                  <View className='info'>
                    <View className='name'>name</View>
                    <View className='from'>from</View>
                  </View>
                </View>
              </View>);
          })
        }
      </View>
    )
  }
}
