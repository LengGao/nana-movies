import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem, Input, Button } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import log from '../../static/img/default.jpg'
import Vv from '../../validator/WxValidate'
import './index.scss'

export default class Index extends Component {

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
        Taro.switchTab({
          url: '/pages/home/home'
        })
      }, 1000);
    }
  }
  xxx () {
    var xx = new Vv()
    console.log("xx", xx)
  }

  componentWillMount () { }

  componentDidMount () { }

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
        <AtInput data-name='validate' id='validate' className='wxvalidate' data-validate='email' type='text' placeholder='asd' />
        <AtInput data-name='validate' id='validate' className='wxvalidate' data-validate='email[0,2]' type='text' placeholder='asd' />
        <AtButton onClick={this.xxx.bind(this)}>anniu</AtButton>
      </View>
    )
  }
}
