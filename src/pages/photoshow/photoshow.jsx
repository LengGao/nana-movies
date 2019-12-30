import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtPagination } from 'taro-ui'
import toast from '../../utils/index'
import log from '../../static/images/cover/default.jpg'
import './photoshow.scss'


export default class Photoshow extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      ImageList: [
        {
          authorId: '001',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          workLink: '../../static/img/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '002',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          workLink: '../../static/img/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '003',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          workLink: '../../static/img/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        },
        {
          authorId: '004',
          authorName: 'name',
          authorHeader: '../../static/img/default.jpg',
          authorFrom: '来自哪里',
          workLink: '../../static/img/default.jpg',
          worksId: '001',
          worksType: 'photo',
          publihTime: '2019-12-12'
        }
      ],
    }
    this.offset = 1;
    this.pageSize = 10;
    this.total = 0;
  }

  handlerChange(e) {
    if (e.detail.current === 3) {
      setTimeout(() => {
        // 去搜全页面
        console.log("start", e)
      }, 1000);
    }
  }

  // 分页
  // 分页数据初始化
  initPage() {
    this.offset = 0;
    this.pageSize = 10;
    this.total = 0;
  }
  handlerPageChange(e) {
    this.offset = e.current
  }

  initData() {

  }

  getDate() {

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


  componentWillMount() {
    return this.initData()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (
      <View className='index'>
        {
          this.state.ImageList.map((item) => {
            return (
              <View className='itemBox' taroKey={String(item.authorId + item.worksId)}>
                <Image src={item.workLink} mode='aspectFit' />
                <View className='author'>
                  <Image src={item.authorHeader} mode='aspectFit' />
                  <View className='info'>
                    <View className='name'><Text>{item.authorName}</Text></View>
                    <View className='from'><Text>{item.authorFrom}</Text></View>
                  </View>
                </View>
              </View>)
          })
        }
        <View className='pagination'>
          <AtPagination
            className='pagination'
            icon
            total={this.total}
            pageSize={this.pageSize}
            current={this.offset}
            onPageChange={this.handlerPageChange.bind(this)}
          >
          </AtPagination>
        </View>
      </View>
    )
  }
}
