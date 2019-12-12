import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index/index'
import './taro-ui.css'
import './custom-theme.scss'
import './app.scss'
import $ from './utils/format'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index', //首页 展示照片-介绍小程序作用
      'pages/login/authorization',//授权登录
      'pages/home/home',//影评- 新品 - 人气
      'pages/photoshow/photoshow',//照片展示页
      'pages/movieshow/movieshow',// 电影展示页码
      'pages/selfspace/selfspace',//个人中心
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    // tabBar: [
    // ]
  }

  componentDidMount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}
import { from } from '_array-flatten@2.1.2@array-flatten'

Taro.render(<App />, document.getElementById('app'))
