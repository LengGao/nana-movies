import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import './css/worksbox.scss'

export default class WorksBox extends Component {
  static defaultProps = {
    dataObject: {
      category: '',
      list: [{
        authorId: '', type: '', workName: '', coverLink: '', workLink: '', authorName: '', authorFrom: '', publishDate: ''
      }]
    }
  }
  constructor(props) {
    super(props)
    this.props.property = ["dataObject"]
  }

  render () {
    // console.log("props", this.props);
    return (
      <View className='worksbox'>
        <View className='at-article__h1' style=" text-align: center;"><Text>{this.props.dataObject.category}</Text></View>
        {this.props.dataObject.list.map(item => {
          return (
            <View style='background-color: #FAFBFC;' taroKey={String('V1' + item.id)}>
              <View className='content-box'>
                <View className='cover'>
                  <Image src={item.coverLink.indexOf("/static") != -1 ? '../' + item.coverLink : item.coverLink} mode='aspectFill' />
                </View>
                <View className='describe'>
                  <View clas sName='work-name'><Text className='at-article__p'>作品名：{item.workName}</Text></View>
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
  dataObject: PropTypes.object
};