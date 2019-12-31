import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import { media } from '@/utils/index'
import './css/worksbox.scss'

export default class WorksBox extends Component {
  static defaultProps = {
    dataObject: {
      category: '',
      list: [{
        authorId: 'p001', type: 'phone', worksId: '001', worksName: '您的名字', coverLink: '../../static/images/cover/default.jpg', worksLink: '', authorName: '娜娜', authorFrom: '四川师范学院', publishDate: '2019-12-31'
      }]
    },
    handleClick: () => { }
  }
  constructor(props) {
    super(props)
    // 作品数据对象  作品点击事件
    this.props.property = ["dataObject", 'handleClick']
  }

  previewImage (url, e) {
    e.stopPropagation()
    return media.previewImage(url)
  }

  render () {
    // console.log("props", this.props);
    return (
      <View className='worksbox'>
        <View className='at-article__h1' style=" text-align: center;"><Text>{this.props.dataObject.category}</Text></View>
        {this.props.dataObject.list.map(item => {
          return (
            <View style='background-color: #FAFBFC;' taroKey={String('V1' + item.id)}>
              <View className='content-box' onClick={this.props.handleClick.bind(this, item.worksId)}>
                <View className='cover'>
                  <Image src={item.coverLink.indexOf("/static") != -1 ? '../' + item.coverLink : item.coverLink} mode='aspectFill' onClick={this.previewImage.bind(this, item.coverLink)} />
                </View>
                <View className='describe'>
                  <View clas sName='work-name'><Text className='at-article__p'>作品名：{item.worksName}</Text></View>
                  <View className='author'><Text className='at-article__p'>作者：{item.authorName}</Text></View>
                  <View className='from'><Text className='at-article__p'>源自：{item.authorFrom}</Text></View>
                  <View className='pulish-date'><Text className='at-article__p'>发布时间：{item.publishDate}</Text></View>
                </View>
              </View>
              {/* 间隔元素 */}
              <View style='height:1px;'></View>
            </View>
          )
        })}
      </View>
    )
  }
}
WorksBox.propTypes = {
  dataObject: PropTypes.object,
  handleClick: PropTypes.func
};