import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar, AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import WorksBox from '@/components/worksBox'
import { toast } from '../../utils/index'
import utils from '@/utils/'
import api from '../../api'
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
        { id: '', imageUrl: '../../static/images/cover/default.jpg', link: '', upDate: '', },
        { id: '', imageUrl: '../../static/images/cover/default.jpg', link: '', upDate: '', }
      ],
      // 人气作评数据
      popularitys: [
        {
          category: '搞笑',
          list: [{
            authorId: 'p001', type: 'phone', workName: '您的名字1', coverLink: '../../static/images/cover/default.jpg', workLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ],
      // 新秀作品数据
      newProducts: [
        {
          category: '搞笑',
          list: [{
            authorId: 'p001', type: 'phone', workName: '您的名字', coverLink: '../../static/images/cover/default.jpg', workLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ],
      // 预告作品数据
      notices: [
        {
          category: '搞笑',
          list: [{
            authorId: 'p001', type: 'phone', workName: '您的名字', coverLink: '../../static/images/cover/default.jpg', workLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ]

    }
    this.pageSize = 10
    this.total = 1
    this.currentPage = 1
    this.offset = (this.currentPage - 1) * this.pageSize
  }
  // swiper
  handlerChange (e) {
    console.log("x", e.detail.current)
  }
  handleSwiperItem (e) {
    console.log("handleSwiperItem", e)
  }
  // noticebar
  handlerNoticebar () {
  }
  handlerGotoMore () {
    console.log("handlerGotoMore")
  }
  // tabs
  handleClick (index) {
    this.setState({
      current: index
    })
  }
  // pagechage
  handlerPageChange (e) {
    this.offset = e.current
  }
  // 数据初始化
  initData () {
    api.noticeB1arText('all.json').then(res => {
      if (res.data) {
        this.setState({
          noticeB1arText: ''
        })
      }
    })
    api.swiperList('all.json').then(res => {
      if (res.data) {
        this.setState({
          swiperList: []
        })
      }
    })
    api.popularitysList('all.json').then(res => {
      this.setState({
        popularitys: []
      })
    })
    api.newProductsList('all.josn').then(res => {
      this.setState({
        newProducts: []
      })
    })
    api.noticesList('all.json').then(res => {
      this.setState({
        noticesList: []
      })
    })
  }
  // 数据获取
  getData () {

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
    // return this.initData()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // SwperItem 函数组件
  SwiperItem (props) {
    return props.map((item, index) => {
      return (
        <SwiperItem className='swiper-item' taroKey={String('s' + index)}>
          <View className='swiper-content' onClick={this.handleSwiperItem.bind(this, item.id)}>
            <Image class='showImge' src={item.imageUrl.toString()} />
          </View>
        </SwiperItem>
      );
    })
  }

  render () {
    const tabList = [{ title: '人气' }, { title: '新秀' }, { title: '预告' }]
    let AtTabsPaneOne = this.state.popularitys.map((group, index) => {
      console.log('group', group);
      return <WorksBox dataObject={group} taroKey={String(index)} />
    })
    let AtTabsPaneTow = this.state.newProducts.map((group, index) => {
      return (
        <WorksBox dataObject={group} taroKey={String(index)} />
      )
    })
    let AtTabsPaneThird = this.state.notices.map((group, index) => {
      return (
        <WorksBox dataObject={group} taroKey={String(index)} />
      )
    })

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
          {this.SwiperItem(this.state.swiperList)}
        </Swiper>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            {AtTabsPaneOne}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {AtTabsPaneTow}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {AtTabsPaneThird}
          </AtTabsPane>
        </AtTabs>
        <AtPagination
          icon
          total={this.total}
          pageSize={this.pageSize}
          current={this.currentPage}
          onPageChange={this.handlerPageChange.bind(this)}
        >
        </AtPagination>
      </View>
    )
  }
}
