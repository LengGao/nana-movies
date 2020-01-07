import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtPagination } from 'taro-ui'
import { navigate, toast } from '../../utils/index'
import './movieshow.scss'
import api from '@/api/'


export default class Movieshow extends Component {

  config = {
    navigationBarTitleText: '影视作品',
    enablePullDownRefresh: true
  }
  constructor() {
    super(...arguments)
    this.state = {
      VidemoList: [
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksId: '001',
          coverLink: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          worksLink: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          publishTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksId: '001',
          coverLink: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          worksLink: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          publishTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksId: '001',
          coverLink: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          worksLink: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          publishTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksId: '001',
          coverLink: 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
          worksType: ' movie',
          worksLink: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
          publishTime: '2019-12-12'
        }
      ]
    }
    this.pageSize = 10
    this.total = 1
    this.currentPage = 1
    this.offset = (this.currentPage - 1) * this.pageSize
  }

  // 封面点击
  handlerClick (data) {
    return navigate.navigateTo('./movieDetail', { id: data })
  }

  previewImage (data) {
    return media.previewImage(data)
  }

  initData () {
    api.findMovieList('/findMovieList')
  }

  getDate () {
  }

  onPullDownRefresh () {
    return this.initData()
  }

  //上拉加载 :start=(currentPage-1)*pageSize  totalPage = (total + pageSize - 1)/pageSize;
  onReachBottom () {
    if ((this.offset + this.pageSize) < this.total) {
      this.currentPage + 1
      this.getData();
    } else {
      toast.success_Short("到底了请翻页")
    }
  }

  componentWillMount () {
    return this.initData()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {
          this.state.VidemoList.map((item) => {
            return (
              <View className='itemBox' taroKey={String(item.authorId + item.worksId)}>
                <Image src={item.coverLink} mode='aspectFit' onClick={this.handlerClick.bind(this, item.worksId)} />
                <View className='author'>
                  <Image src={item.authorHeader} mode='aspectFit' />
                  <View className='info'>
                    <View className='name'>{item.authorName}</View>
                    <View className='from'>{item.authorFrom}</View>
                  </View>
                </View>
              </View>);
          })
        }
      </View>
    )
  }
}
