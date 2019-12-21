import Taro from '@tarojs/taro'

export default {
    hello: hello
}

function hello(params) {
    return 'Validator'
}

// /**
//  * 验证身份证号码
//  */
// idcard(value) {
//     return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
// },