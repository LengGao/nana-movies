import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index/index'
import './taro-ui.css'
import './custom-theme.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools')
// } 


class App extends Component {

  componentDidMount () {
  }

  config = {
    pages: [
      'pages/index/index', //首页 展示照片-介绍小程序作用
      'pages/home/home',//影评- 新品 - 人气
      'pages/photoshow/photoshow',//照片展示页  
      'pages/movieshow/movieshow',// 电影展示页码,
      'pages/movieshow/movieDetail', // 电影详情 播放
      'pages/selfspace/selfspace',//个人中心
      // 'pages/selfspace/setting',// 个人信息编辑
      'pages/login/authorization', // 微信授权登录
      // 'pages/login/login',//登录
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#000000',
      selectedColor: '#ff0000',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      position: 'bottom',
      custom: false,
      list: [
        {
          iconPath: './static/img/select.png',
          selectedIconPath: './static/img/selected.png',
          pagePath: 'pages/home/home',
          text: '推荐'
        },
        {
          iconPath: './static/img/select.png',
          selectedIconPath: './static/img/selected.png',
          pagePath: 'pages/photoshow/photoshow',
          text: '摄影作品'
        },
        {
          iconPath: './static/img/select.png',
          selectedIconPath: './static/img/selected.png',
          pagePath: 'pages/movieshow/movieshow',
          text: '影视作品'
        },
        {
          iconPath: './static/img/select.png',
          selectedIconPath: './static/img/selected.png',
          pagePath: 'pages/selfspace/selfspace',
          text: '个人中心'
        }
      ]
    }
  }

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

Taro.render(<App />, document.getElementById('app'))
