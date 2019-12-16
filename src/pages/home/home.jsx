import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input ,Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar,AtTabs, AtTabsPane,AtPagination } from 'taro-ui'
import log from '../../static/img/default.jpg'
import './home.scss'

export default class Home extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handlerChange (e) {
  }
  // noticebar
  handlerNoticebar() {
  }
  handlerGotoMore(){
  }
  // tabs
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  // pagechage
  handlerPageChange(e){
    console.log("e",e)
  }


  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const tabList = [{ title: '人气' }, { title: '新秀' }, { title: '预告' }]
    return (
      <View className='index'>
        <AtNoticebar  marquee onClose={this.handlerNoticebar.bind(this)}
        onGotoMore={this.handlerGotoMore.bind(this)}>
          这是 NoticeB1ar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
        </AtNoticebar>
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
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
      <AtPagination 
        icon 
        total={50} 
        pageSize={10}
        current={1}
        onPageChange={this.handlerPageChange.bind(this)}
      >
      </AtPagination>
      </View>
    )
  }
}
