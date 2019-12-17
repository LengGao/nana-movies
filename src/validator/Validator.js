import Taro from '@tarojs/taro'
import util from './util'

class Validator{

    constructor(){
        this._getRule() // 获取要验证的内容 
        this.__initData() // 初始化数据
        this.__initMethods() // 初始化默认验证方法
        this._initMessage() // 初始化默认提示消息
    }
    // 定义要验证的规则
    __getRules () {
        const that = this  // Taro api内this指向Taro
        const rules = {}; //
        const messages = {};
        const query = Taro.createSelectorQuery();
        query.selectAll('#validate').fields({
          id: true,
          size: true,
          dataset: true,
          rect: true,
          properties: ['name', 'validate', 'fieldname'],
          context: true
        }, function (res) {
          console.log("fields", res)
        }).exec(function (res) {
          console.log("exec", res)
          const arr = res[0];
          for (const i in arr) {
            //console.log(arr[i])
            arr[i].id = util.defaultIfEmpty(arr[i].id, arr[i].name);
            var id = arr[i].id;
            var fieldname = arr[i].dataset.fieldname;
            var validate = util.trim(arr[i].dataset.validate);
            rules[id] = util.defaultIfEmpty(rules[id], {});
            messages[id] = util.defaultIfEmpty(messages[id], {})
            messages[id].top = arr[i].top;
            messages[id].left = arr[i].left;
            messages[id].width = arr[i].width;
            that._FormatValidate(rules[id], messages[id], id, validate);
          }
        });
        // data 
        Object.assign(this,{rules,messages,data: {}})
    }
    // 格式化校验器 校验的主方法
    _FormatValidate (rule = {}, message = {}, id, validate) {
    const str = util.formatString('[{0}]设置的验证有错误，请修改 ：{1}', new Array(id, validate));
    if (util.isEmpty(id) || util.isEmpty(validate)) {
        util.alert('提示1', str)
        return false;
    }
    const arr = validate.split("|");
    for (var i in arr) {
        let validateKey = util.trim(arr[i]);
        let s = validateKey;
        let value = true;
        let m = validateKey.indexOf("[");
        m = m < 0 ? validateKey.indexOf("(") : m;
        if (m > 0) {
        value = validateKey.substring(m + 1, validateKey.length - 1);
        validateKey = util.trim(validateKey.substring(0, m));
        }

        //[1,5] 
        var reg = /\[\-?\d+(\.\d+)?,\-?\d+(\.\d+)?\]$/;
        switch (validateKey) {
        case "size":
            var regMin = /\[\d+\]$/; //[4]
            let regMax = /\[,\d+\]$/; //[,10]            
            if (reg.test(s)) {
            rule[validateKey] = value.split(",");
            message[validateKey] = util.formatString("请输入长度在 {0} 到 {1} 之间的字符！", rule[validateKey]);
            } else if (regMin.test(s)) {
            rule.minSize = value;
            message.minSize = util.formatString("最少要输入{0}个字符！", rule.minSize);
            } else if (regMax.test(s)) {
            rule.maxSize = value.replace(",", "");
            message.maxSize = util.formatString("最多能输入{0}个字符！", rule.maxSize);
            } else {
            util.alert('提示3', str);
            }
            break;
        case "range":
            var reg1 = /[\[|\(](\-?\d+(\.\d+)?)?(,\-?\d+(\.\d+)?)?[\]|\)]$/;
            if (!reg1.test(s) || util.isEmpty(value)) {
            util.alert('提示3', str);
            } else {
            if (reg.test(s)) {
                rule[validateKey] = value.split(",");
                message[validateKey] = util.formatString("必须在{0}-{1}之间！", rule[validateKey]);
            } else {
                let arrRangeValue = value.split(",");
                if (s.indexOf("[") > -1) {
                //[5]                
                if (!util.isEmpty(arrRangeValue[0])) {
                    rule.min = arrRangeValue[0];
                    message.min = util.formatString("请输入不小于 {0} 的数值！", rule.min);
                }
                } else if (s.indexOf("(") > -1) {
                if (!util.isEmpty(arrRangeValue[0])) {
                    rule.minLt = arrRangeValue[0];
                    message.minLt = util.formatString("请输入大于 {0} 的数值！", rule.minLt);
                }
                }
                if (s.indexOf("]") > -1) {
                //[5]                
                if (arrRangeValue.length == 2 && !util.isEmpty(arrRangeValue[1])) {
                    rule.max = arrRangeValue[1];
                    message.max = util.formatString("请输入不大于 {0} 的数值！", rule.max);
                }
                } else if (s.indexOf(")") > -1) {
                if (arrRangeValue.length == 2 && !util.isEmpty(arrRangeValue[1])) {
                    rule.maxGt = arrRangeValue[1];
                    message.maxGt = util.formatString("请输入小于 {0} 的数值！", rule.maxGt);
                }
                }
            }
            }
            break;
        case "equals":
            let arrEqualValue = value.split(",");
            rule[validateKey] = arrEqualValue[0];
            let msg = "请输入与上面相同的密码!"
            if (arrEqualValue.length == 2 && !util.isEmpty(arrEqualValue[1])) {
            msg = util.formatString("输入值必须和【{0}】相同！", arrEqualValue[1]);
            }
            message[validateKey] = msg;
            break;
        case "notEmpty":
        case "int":
        case "email":
        case "url":
        case "tel":
        case "phone":
        case "idcard":
        case "number":
        case "date":
        case "dateISO":
            rule[validateKey] = value;
            message[validateKey] = this.defaults.messages[validateKey];
            break;
        default:
            util.alert('提示2', str);
            break;
        }
    }

    }

    // 初始化数据 主要是为后面错误信息显示找准位置，
    __initData () {
        //手机屏幕宽度
        const screenWidth = Taro.getSystemInfoSync().screenWidth;
        this.site = { screenWidth: screenWidth, errorTextWidth: 200 }
        //错误提示框转换为像素单位的宽度，400rpx=>px
        //this.site.errorTextWidth = Math.ceil((400*screenWidth)/750);    
        this.form = {}
        this.errorList = []
    }
    // 初始化默认提示信息
    _initMessage () {
        this.defaults = {
          messages: {
            notEmpty: '此项不能为空！',
            email: '请输入有效的电子邮件地址！',
            phone: '请输入11位的手机号码！',
            tel: '请输入有效的电话号码',
            url: '请输入有效的网址！',
            date: '请输入有效的日期！',
            dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22！',
            number: '请输入有效的数字！',
            int: '只能输入正整数！',
            idcard: '请输入有效身份证！',
            contains: this.formatTpl('输入值必须包含 {0}！')
          }
        }
      }
  
    // 初始化默认验证方法
   
  __initMethods () {
    const that = this
    that.methods = {
      /**
       * 验证必填元素
       */
      notEmpty (value, param) {
        if (!that.depend(param)) {
          return 'dependency-mismatch'
        } else if (typeof value === 'number') {
          value = value.toString()
        } else if (typeof value === 'boolean') {
          return !0
        }
        return value.length > 0 && !util.isEmpty(value)
      },
      /**
       * 验证电子邮箱格式
       */
      email (value) {
        return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      },
      /**
       * 验证手机格式
       */
      phone (value) {
        return that.optional(value) || /^1[3-9]\d{9}$/.test(value)
      },
      /**
       * 验证座机格式
       */
      tel (value) {
        return that.optional(value) || /^[0-9]{3,4}(\-)?[0-9]{6,8}(\-)?([0-9]{1,4})$/.test(value)
      },
      /**
       * 验证URL格式
       */
      url (value) {
        return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
      },
      /**
       * 验证日期格式
       */
      date (value) {
        return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString())
      },
      /**
       * 验证ISO类型的日期格式
       */
      dateISO (value) {
        return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
      },
      /**
       * 验证十进制数字
       */
      number (value) {
        return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
      },
      /**
       * 验证整数
       */
      int (value) {
        return that.optional(value) || /^\d+$/.test(value)
      },
      /**
       * 验证身份证号码
       */
      idcard (value) {
        return that.optional(value) || util.isEmpty(util.idCard(value))
      },
      /**
       * 验证两个输入框的内容是否相同
       */
      equals (value, param) {
        return that.optional(value) || value === that.data[param]
      },
      /**
       * 验证是否包含某个值
       */
      contains (value, param) {
        return that.optional(value) || value.indexOf(param) >= 0
      },
      /**
       * 验证最小长度
       */
      minSize (value, param) {
        return that.optional(value) || util.len(value) >= param
      },
      /**
       * 验证最大长度
       */
      maxSize (value, param) {
        return that.optional(value) || util.len(value) <= param
      },
      /**
       * 验证一个长度范围[min, max]
       */
      size (value, param) {
        const len = util.len(value);
        return that.optional(value) || (len >= param[0] && len <= param[1])
      },
      /**
       * 验证最小值，包含最小的值
       */
      min (value, param) {
        return that.optional(value) || value >= param
      },
      /**
       * 验证最小值，不包含最小的值
       */
      minLt (value, param) {
        return that.optional(value) || value > param
      },
      /**
       * 验证最大值，包含最大的值
       */
      max (value, param) {
        return that.optional(value) || value <= param
      },
      /**
       * 验证最大值，不包含最大的值
       */
      maxGt (value, param) {
        return that.optional(value) || value < param
      },
      /**
       * 验证一个值范围[min, max]
       */
      range (value, param) {
        const v = value * 1;
        return that.optional(value) || (v >= param[0] * 1 && v <= param[1] * 1)
      },
    }
  }

  /**
   * 判断输入值是否为空
   * @param {*} value  要判断的值
   */
  optional (value) {
    return !this.methods.notEmpty(value) && 'dependency-mismatch'
  }
}

export default Validator