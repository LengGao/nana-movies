import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem, Video } from '@tarojs/components'
import api from '@/api/'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '欢迎来到娜娜影视圈'
  }
  constructor() {
    super(...arguments)
    this.state = {
      swiperList: [
        { id: '1', coverLink: '../../static/images/cover/default.jpg' },
        { id: '2', coverLink: '../../static/images/cover/default.jpg' },
        { id: '3', coverLink: '../../static/images/cover/default.jpg' }
      ]
    }
  }

  handlerChange (e) {
    let lastindex = this.state.swiperList.length - 1
    if (e.detail.current === lastindex) {
      setTimeout(() => {
        // 去搜全页面
        Taro.switchTab({
          // url: '/pages/home/home'
          url: '/pages/photoshow/photoshow'
        })
      }, 1000);
    }
  }
  componentWillMount () {
    // return api.getHomeImages().then(res => {
    //   this.setState({
    //     swiperList: res.data
    //   })
    // })
  }

  render () {
    const len = this.state.swiperList.length - 1
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
          {
            this.state.swiperList.map((item, index, arr) => {
              if (index !== len) {
                console.log("len", len)
                return (
                  <SwiperItem>
                    <View className='swiper-item'>
                      <Image class='showImge' src={item.coverLink} mode='aspectFit' />
                    </View>
                  </SwiperItem>
                )
              }
              return (
                <SwiperItem>
                  <View className='swiper-item lastItem'>
                    <Image class='showImge' src={item.coverLink} mode='aspectFit' style=' height: 80%;' />
                    <Text style='margin-left: 4%;'>宝贝~您来啦！</Text>
                  </View>
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}

/**
 * 腾讯视频解析不步骤
 * 取腾讯视频vid  https://v.qq.com/txp/iframe/player.html?vid=x0033sww2ap  或者取其Bid
 * 拼接请求发送   http://vv.video.qq.com/getinfo?vid=x0033sww2ap&platform=101001&charge=0&otype=json
 * charge=0表示不付费，otype=json表示保存脚本为json
 * 取vi.vi中 ui对象中的ul数组中的url一般选第一个url, 中的fn , 中的fvkey
 * 取vi对象中的vi数组中第一项的url,fn,fvkey --- url:为ui对象中的ul数组中某字段一般取第一个url，fn:为fn对象，fvkey:为fvkey对象
 * 拼接渠道的字段 url+/+fn+'?vkey='+fvkey
 * 得到 http://vhotwsh.video.qq.com/uwMROfz2r5zAoaQXGdGnC2dfiMVaprY8QrbK21CByPIM2CdQ/x0033sww2ap.m1.mp4?vkey=E602F4F1BC85FA46321C99D63DE957429E091E6D883AF36E3740CCF5948A58BE42634AFB6D670710F3C670AC0E0B4DE19686A357EDA7F8871C9BECB3D0F44E4D2AF537A57DBD3BFA83B56D7EA52DE3E4F5CAC084D89066BAD8DE835293443F8DD9FBA10B5A3850BDFEEEFD91FB4A1804
 */