import must from './package/must'
import  * as format from './package/format'
import other from './package/other'

 class Utils {
  static must = must
  static format = format
  static other = other
}

// 用 import {...} from '...' 引用  require 动态引入会引入所有内容会检查属性 import() 也是动态加载  inclide是静态加载
module.exports.must = must
module.exports.router = must.router
module.exports.toast = must.toast
module.exports.storage = must.storage

module.exports.format = format
module.exports.other = other

export default Utils