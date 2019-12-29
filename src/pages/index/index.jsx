import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import log from '../../static/images/cover/default.jpg'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '欢迎来到娜娜影视圈'
  }

  handlerChange(e) {
    if (e.detail.current === 3) {
      setTimeout(() => {
        // 去搜全页面
        Taro.switchTab({
          url: '/pages/home/home'
        })
      }, 1000);
    }
  }


  render() {
    return (
      <View className='index'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333' 
          indicatorDots
          autoplay={false}
          onChange={this.handlerChange.bind(this)}
        >
          <SwiperItem>
            <View className='swiper-item'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>
              <Image class='showImge' src={log} mode='aspectFit' />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item lastItem'>
              <Image class='showImge' src={log} mode='aspectFit' style=' height: 80%;' />
              <Text style='margin-left: 4%;'>宝贝~您来啦！</Text>
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
