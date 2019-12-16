import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input ,Image, Swiper, SwiperItem } from '@tarojs/components'
import log from '../../static/img/default.jpg'
import './photoshow.scss'


export default class Photoshow extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      ImageList:[
        {
        authorName:'001',
        authorName:'name',
        authorHeader:'../../static/img/default.jpg',
        authorFrom:'来自哪里',
        authorWorks:'../../static/img/default.jpg',
        worksId:'001',
        worksType:'photo',
        publihTime: '2019-12-12'
        },
        {
          authorName:'001',
          authorName:'name',
          authorHeader:'../../static/img/default.jpg',
          authorFrom:'来自哪里',
          authorWorks:'../../static/img/default.jpg',
          worksId:'001',
          worksType:'photo',
          publihTime: '2019-12-12'
        },
        {
          authorName:'001',
          authorName:'name',
          authorHeader:'../../static/img/default.jpg',
          authorFrom:'来自哪里',
          authorWorks:'../../static/img/default.jpg',
          worksId:'001',
          worksType:'photo',
          publihTime: '2019-12-12'
        },
        {
          authorName:'001',
          authorName:'name',
          authorHeader:'../../static/img/default.jpg',
          authorFrom:'来自哪里',
          authorWorks:'../../static/img/default.jpg',
          worksId:'001',
          worksType:'photo',
          publihTime: '2019-12-12'
        }
      ],
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
        this.state.ImageList.map((item)=>{
          return (
            <View className='itemBox' taroKey={String(item.worksId)}>
            <Image src={item.authorWorks} mode='aspectFit' />
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
