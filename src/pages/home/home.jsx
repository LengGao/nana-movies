import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar, AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import log from '../../static/img/default.jpg'
import toast from '../../utils/index'
import './home.scss'

export default class Home extends Component {

  config = {
    navigationBarTitleText: '娜微原创影视'
  }
  constructor() {
    super(...arguments)
    this.state = {
      //通告文本
      noticeB1arText: "这是 NoticeB1ar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏",
      // tabBar 当前所处index
      current: 0,
      // 轮播图链表 link = '广告链接'，上传时间
      swiperList: [
        { id: '', imageUrl: '', link: '', upDate: '', },
      ],
      // 人气作评数据
      Popularitys:{
        defalut: {
          category:'',
          list:[{
            id:'',type:'',workName:'',overLink:'',workLink:'',author:'',from:'',pulishDate:''
          }]
        }
      },
      // 新秀作品数据
      NewProducts:{
        default:{
          category:'',
        },
        list:[{
          id:'',type:'',workName:'',coverLink:'',workLink:'',author:'',from:'',pulishDate:''
        }]
      },
      // 预告作品数据
      Notices:{
        defalut: {
          category:'',
          list:[{
            id:'',type:'',workName:'',overLink:'',workLink:'',author:'',from:'',pulishDate:''
          }]
        } 
      }

    }
    this.offset = 0;
    this.pageSize = 10;
    this.total = 0;
  }
  // swiper
  handlerChange(e) {
    console.log("x", e.detail.current)
  }
  handleSwiperItem(e){
    console.log("handleSwiperItem",e)
  }
  // noticebar
  handlerNoticebar() {
  }
  handlerGotoMore() {
    console.log("handlerGotoMore")
  }
  // tabs
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  // pagechage
  handlerPageChange(e) {
    this.offset = e.current
  }

  // 数据初始化
  initData() {
  }
  // 数据获取
  getData() {
  }


  // 分页数据初始化
  initPage() {
    this.offset = 0;
    this.pageSize = 10;
    this.total = 0;
  }

  //上拉加载
  onReachBottom() {
    if ((this.offset * this.pageSize) < this.total) {
      this.pageSize = this.pageSize + 10
      this.getData();
    } else {
      toast.success_Short("到底了请翻页")
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // SwperItem 函数组件
  SwiperItem () {
    return (
        <SwiperItem>
        <View className='demo-text'>
          <Image class='showImge' src={log} onClick={this.handleSwiperItem.bind(this)} />
        </View>
      </SwiperItem>
    )
  }

  // 函数组件 tab AtTabsPane
  AtTabsPaneOne() {
    return (
      <View style='background-color: #FAFBFC;' title='标签页一的内容'>
        <View className='content-box'>
          <View className='cover'>
            <Image src={log} mode='aspectFill' />
          </View>
          <View className='describe'>
            <View clas sName='work-name'><Text className='at-article__p'>作品名：</Text></View>
            <View className='author'><Text className='at-article__p'>作者：</Text></View>
            <View className='from'><Text className='at-article__p'>四川师范学院：</Text></View>
            <View className='pulish-date'><Text className='at-article__p'>发布时间：</Text></View>
          </View>
        </View>
        {/* 间隔元素 */}
        <View style='height:1px;'></View>
      </View>
    )
  }
  AtTabsPaneTow(){
    return(
      <View style='background-color: #FAFBFC;' title='标签页一的内容'>
      <View className='content-box'>
        <View className='cover'>
          <Image src={log} mode='aspectFill' />
        </View>
        <View className='describe'>
          <View clas sName='work-name'><Text className='at-article__p'>作品名：</Text></View>
          <View className='author'><Text className='at-article__p'>作者：</Text></View>
          <View className='from'><Text className='at-article__p'>四川师范学院：</Text></View>
          <View className='pulish-date'><Text className='at-article__p'>发布时间：</Text></View>
        </View>
      </View>
       {/* 间隔元素 */}
      <View style='height:1px;'></View>
    </View>
    )
  }
  AtTabsPaneThird(){
    return(
      <View style='background-color: #FAFBFC;' title='标签页一的内容'>
      <View className='content-box'>
        <View className='cover'>
          <Image src={log} mode='aspectFill' />
        </View>
        <View className='describe'>
          <View clas sName='work-name'><Text className='at-article__p'>作品名：</Text></View>
          <View className='author'><Text className='at-article__p'>作者：</Text></View>
          <View className='from'><Text className='at-article__p'>四川师范学院：</Text></View>
          <View className='pulish-date'><Text className='at-article__p'>发布时间：</Text></View>
        </View>
      </View>
       {/* 间隔元素 */}
      <View style='height:1px;'></View>
    </View>
    )
  }


  render() {
    const tabList = [{ title: '人气' }, { title: '新秀' }, { title: '预告' }]
    return (
      <View className='index'>
        <AtNoticebar marquee showMore moreText='查看跟多' onClose={this.handlerNoticebar.bind(this)}
          onGotoMore={this.handlerGotoMore.bind(this)}>
          <Text onClick={this.handlerGotoMore.bind(this)}>{this.state.noticeB1arText}</Text>
        </AtNoticebar>
        <Swiper
          className='swper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {this.SwiperItem()}
        </Swiper>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className='at-article__h1' style=" text-align: center;"><Text>搞笑</Text></View>
            {this.AtTabsPaneOne()}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className='at-article__h1' style=" text-align: center;"><Text>搞笑</Text></View>
            {this.AtTabsPaneTow()}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View className='at-article__h1' style=" text-align: center;"><Text>搞笑</Text></View>
            {this.AtTabsPaneThird()}
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
