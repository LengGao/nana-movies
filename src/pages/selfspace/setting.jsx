import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import log from '../../static/img/default.jpg'
import './selfspace.scss'


export default class Setting extends Component {

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

  componentWillMount () {
  }
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <Image src={log} />
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
      </View>
    )
  }
}