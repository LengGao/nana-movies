import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar, AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import WorksBox from '@/components/worksBox'
import { toast, navigate } from '../../utils/index'
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
      noticeB1arText: { id: '001', link: '', content: '这是 NoticeB1ar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏' },
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
            authorId: 'p001', type: 'phone', worksId: '001', worksName: '您的名字', coverLink: '../../static/images/cover/default.jpg', worksLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ],
      // 新秀作品数据
      newProducts: [
        {
          category: '搞笑',
          list: [{
            authorId: 'p001', type: 'phone', worksId: '001', worksName: '您的名字', coverLink: '../../static/images/cover/default.jpg', worksLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ],
      // 预告作品数据
      notices: [
        {
          category: '搞笑',
          list: [{
            authorId: 'p001', type: 'phone', worksId: '001', worksName: '您的名字', coverLink: '../../static/images/cover/default.jpg', worksLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
          }]
        }
      ]
    }
    this.pageSize = 10
    this.total = 1
    this.currentPage = 1
    this.tota1l = 1
    this.currentPage1 = 1
    this.offset = (this.currentPage - 1) * this.pageSize
    this.total2 = 1
    this.currentPage2 = 1
    this.offset2 = (this.currentPage2 - 1) * this.pageSize2
    this.total3 = 1
    this.currentPage3 = 1
    this.offset3 = (this.currentPage3 - 1) * this.pageSize
    // 储存分页记录的对象
    this.pageLoger = {
      popularitys: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      newProducts: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      notices: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      }
    }
  }

  // noticebar
  handlerNoticebar () {
  }
  // 点击尾部会触发
  handlerGotoMore () {
    console.log("handlerGotoMore")
  }

  // swiper
  handlerChange (e) {
    // console.log("x", e.detail.current)
  }
  handleSwiperItem (data, e) {
    console.log("handleSwiperItem", e)
    return Taro.navigateTo({
      url: `../movieshow/movieDetail?id=${data}`
    })
  }

  // tabs
  handleClick (index) {
    this.setState({
      current: index
    })
  }
  // 作品点击事件
  handleWorksClick (data, e) {
    e.preventDefault()
    return Taro.navigateTo({
      url: `../movieshow/movieDetail?id=${data}`
    })
  }

  // pagechage 分页
  handlerPageChange (e) {
    this.currentPage = e.current
    let key = this.state.current
    switch (key) {
      case 0:
        this.tota1l = this.total
        this.currentPage1 = this.currentPage
        break;
      case 1:
        this.tota12 = this.total
        this.currentPage2 = this.currentPage
        break;
      case 2:
        this.tota13 = this.total
        this.currentPage3 = this.currentPage
        break;
      default:
        console.log("exception");
        break;
    }
    console.log("pagesize", this.currentPage, this.total);
    this.getData(key)
  }
  // 数据获取
  getData (key) {
    let query = {}
    switch (key) {
      case 0:
        query = {
          total: this.total1,
          currentPage: this.currentPage1,
          offset: this.offset1
        }
        api.findPopularitysList('all.json', query).then(res => {
          this.setState({
            popularitys: []
          })
        })
        break;
      case 1:
        query = {
          total: this.total2,
          currentPage: this.currentPage,
          offset: this.offset2
        }
        api.findNewProductsList('all.josn', query).then(res => {
          this.setState({
            newProducts: []
          })
        })
        break;
      case 2:
        query = {
          total: this.total3,
          currentPage: this.currentPage3,
          offset: this.offset3
        }
        api.findNoticesList('all.json', query).then(res => {
          this.setState({
            noticesList: []
          })
        })
        break;
      default:
        console.log("getData储物", key, typeof key);
        break;
    }
  }

  // offset : (currentPage - 1) * pageSize
  // 数据初始化
  initData () {
    api.findNoticeB1arText('all.json').then(res => {
      if (res.data) {
        this.setState({
          noticeB1arText: ''
        })
      }
    })
    api.findSwiperList('all.json').then(res => {
      if (res.data) {
        this.setState({
          swiperList: []
        })
      }
    })
    api.findPopularitysList('all.json').then(res => {
      this.setState({
        popularitys: []
      })
    })
    api.findNewProductsList('all.josn').then(res => {
      this.setState({
        newProducts: []
      })
    })
    api.findNoticesList('all.json').then(res => {
      this.setState({
        noticesList: []
      })
    })
    // 初始分页对象
    let object = this.pageLoger
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        let currentPage = object[key].currentPage
        let pageSize = object[key].pageSize
        let offset = (currentPage - 1) * pageSize
        console.log("object", currentPage, pageSize, offset);
        object.offset = offset
      }
    }
    // console.log("pageLoger", this.pageLoger);
  }

  //上拉加载 :start=(currentPage-1)*pageSize  totalPage = (total + pageSize - 1)/pageSize;
  // onReachBottom () {
  //   if ((this.offset + this.pageSize) < this.total) {
  //     this.currentPage + 1
  //     this.getData();
  //   } else {
  //     toast.success_Short("到底了请翻页")
  //   }
  // }

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
      // console.log('group', group);
      return <WorksBox dataObject={group} taroKey={String(index)} handleClick={this.handleWorksClick} />
    })
    let AtTabsPaneTow = this.state.newProducts.map((group, index) => {
      return (
        <WorksBox dataObject={group} taroKey={String(index)} handleClick={this.handleWorksClick} />
      )
    })
    let AtTabsPaneThird = this.state.notices.map((group, index) => {
      return (
        <WorksBox dataObject={group} taroKey={String(index)} handleClick={this.handleWorksClick} />
      )
    })

    return (
      <View className='index'>
        <AtNoticebar marquee showMore moreText='查看跟多' onClose={this.handlerNoticebar.bind(this)}
          onGotoMore={this.handlerGotoMore.bind(this)}>
          <Text onClick={this.handlerGotoMore.bind(this)}>{this.state.noticeB1arText.content}</Text>
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
