import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { media, toast } from '../../utils/index'
import './photoshow.scss'
import api from '@/api/'


export default class Photoshow extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }
  constructor() {
    super(...arguments)
    this.state = {
      ImageList: [
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksLink: '../../static/images/cover/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksLink: '../../static/images/cover/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksLink: '../../static/images/cover/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/images/cover/default.jpg',
          authorFrom: '来自哪里',
          worksLink: '../../static/images/cover/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
      ],
    }
    this.pageSize = 10
    this.total = 1
    this.currentPage = 1
    this.offset = (this.currentPage - 1) * this.pageSize
  }

  previewImage (data) {
    return media.previewImage(data)
  }


  /**
   * 初始化摄影作品数据
   * @param {*} frequency 次数
   */
  initData () {
    api.findPhotoList()
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
          this.state.ImageList.map((item) => {
            return (
              <View className='itemBox' taroKey={String(item.authorId + item.worksId)}>
                <Image src={item.worksLink} mode='aspectFit' onClick={this.previewImage.bind(this, item.worksLink)} />
                <View className='author'>
                  <Image src={item.authorHeader} mode='aspectFit' />
                  <View className='info'>
                    <View className='name'><Text>{item.authorName}</Text></View>
                    <View className='from'><Text>{item.authorFrom}</Text></View>
                  </View>
                </View>
              </View>)
          })
        }
      </View>
    )
  }
}
