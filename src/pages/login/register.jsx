import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import log from '../../static/images/cover/default.jpg'
import './login.scss'


export default class Register extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  onSubmit (event) {
    console.log(this.state.value, event)
  }
  onReset (event) {
    console.log(this.state.value, event)
    this.setState({
      value: '',
    })
  }

  // 第三方登录
  handlerOtherLogin () {
    Taro.navigateTo({
      url: './authorization'
    })
  }

  componentWillMount () {
  }
  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src={log} />
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='文本'
            type='text'
            placeholder='单行文本'
            value={this.state.value}
            onChange={this.handleChange.bind(this, 'value')}
          />
          <AtButton formType='submit'><Text>提交</Text></AtButton>
          <AtButton formType='reset'><Text>重置</Text></AtButton>
        </AtForm>
        <View className='other-login'>
          <Image src={log} onClick={this.handlerOtherLogin.bind(this)}></Image>
        </View>
      </View>
    )
  }
}
