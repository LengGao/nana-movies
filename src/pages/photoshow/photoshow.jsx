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
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay={false}
          onChange={this.handlerChange.bind(this)}
        >
          <SwiperItem>
            <View className='demo-text'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text lastItem'>
              <Image class='showImge' src={log} mode='aspectFit' style=' height: 80%;' />
              <Text style='margin-left: 4%;'>宝贝~您来啦！</Text>
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
