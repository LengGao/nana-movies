import storage from './package/storage';
import navigate from './package/navigate';
import toast from './package/toast';
import * as format from './package/format';
import other from './package/other';

class Utils {
  static toast = toast
  static navigate = navigate
  static storage = storage
  static format = format
  static other = other
}

// 用 import {...} from '...' 引用  require 动态引入会引入所有内容会检查属性 import() 也是动态加载  inclide是静态加载

export { default as navigate } from './package/navigate';
export { default as toast } from './package/toast';
export { default as storage } from './package/storage';
export { default as format } from './package/format';
export { default as other } from './package/other';

export default Utils