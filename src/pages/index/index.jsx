import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem, Input, Button } from '@tarojs/components'
import log from '../../static/img/default.jpg'
import './index.scss'
import WxValidate from '../../validator/WxValidate'



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
        console.log("start", e)
      }, 1000);
    }
  }
  xxx () {
    var Validate = new WxValidate();
    Validate.rules = {
      name: 'name'
    }
    let e = '132@163.com'
    console.log("试试2", Validate.methods.email(e))
    // api.demo("haha", "data")
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
        <Input placeholder="情书" data-validate="notEmpty" class='wxValidate' />
        <Button onClick={this.xxx.bind(this)}>我试试</Button>
      </View>
    )
  }
}
