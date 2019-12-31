import Taro from '@tarojs/taro'
import ValidateList from './ValidateList'
// 往后验证方法过多时，酱验证方法再抽象放进一个文件，然后导入在在_initMethod() 初始化，记得把验证方面需要的相关方法也在另外一个未见写一份

class Validator {

  constructor() {
    this.__initData() // 初始化数据
    this.__initMessage() // 初始化默认提示消息
    this.__initMethods() // 初始化默认验证方法
    this.__getRules() // 获取要验证的内容 
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
      // 将
      for (const i in arr) {
        arr[i].id = this.useDefault(arr[i].id, arr[i].name);
        var id = arr[i].id;
        var fieldname = arr[i].dataset.fieldname;
        var validate = this.trim(arr[i].dataset.validate);
        rules[id] = this.useDefault(rules[id], {});
        messages[id] = this.useDefault(messages[id], {})
        messages[id].top = arr[i].top;
        messages[id].left = arr[i].left;
        messages[id].width = arr[i].width;
        that.__FormatValidate(rules[id], messages[id], id, validate);
      }
    });
    // data 
    Object.assign(this, { rules, messages, data: {} })
  }

  // 格式化校验器 校验的主方法
  __FormatValidate (rule = {}, message = {}, id, validate) {
    const str = this.matchString('[0]设置的验证有错误，请修改 ：[1]', new Array(id, validate));
    if (this.isEmpty(id) || this.isEmpty(validate)) {
      this.alert('提示1', str)
      return false;
    }
    const arr = validate.split("|");
    for (var i in arr) {
      let validateKey = this.trim(arr[i]);
      console.log("validateKey", validateKey)
      let s = validateKey;
      let value = true;
      let m = validateKey.indexOf("[");
      m = m < 0 ? validateKey.indexOf("(") : m;
      if (m > 0) {
        value = validateKey.substring(m + 1, validateKey.length - 1);
        validateKey = this.trim(validateKey.substring(0, m));
      }

      //[1,5] 
      var reg = /\[\-?\d+(\.\d+)?,\-?\d+(\.\d+)?\]$/;
      switch (validateKey) {
        case "size":
          var regMin = /\[\d+\]$/; //[4]
          let regMax = /\[,\d+\]$/; //[,10]            
          if (reg.test(s)) {
            rule[validateKey] = value.split(",");
            message[validateKey] = this.matchString("请输入长度在 [0] 到 [1] 之间的字符！", rule[validateKey]);
          } else if (regMin.test(s)) {
            rule.minSize = value;
            message.minSize = this.matchString("最少要输入[0]个字符！", rule.minSize);
          } else if (regMax.test(s)) {
            rule.maxSize = value.replace(",", "");
            message.maxSize = this.matchString("最多能输入]0]个字符！", rule.maxSize);
          } else {
            this.alert('提示3', str);
          }
          break;
        case "range":
          var reg1 = /[\[|\(](\-?\d+(\.\d+)?)?(,\-?\d+(\.\d+)?)?[\]|\)]$/;
          if (!reg1.test(s) || this.isEmpty(value)) {
            this.alert('提示3', str);
          } else {
            if (reg.test(s)) {
              rule[validateKey] = value.split(",");
              message[validateKey] = this.matchString("必须在[0]-[1]之间！", rule[validateKey]);
            } else {
              let arrRangeValue = value.split(",");
              if (s.indexOf("[") > -1) {
                //[5]                
                if (!this.isEmpty(arrRangeValue[0])) {
                  rule.min = arrRangeValue[0];
                  message.min = this.matchString("请输入不小于 [0] 的数值！", rule.min);
                }
              } else if (s.indexOf("(") > -1) {
                if (!this.isEmpty(arrRangeValue[0])) {
                  rule.minLt = arrRangeValue[0];
                  message.minLt = this.matchString("请输入大于 [0] 的数值！", rule.minLt);
                }
              }
              if (s.indexOf("]") > -1) {
                //[5]                
                if (arrRangeValue.length == 2 && !this.isEmpty(arrRangeValue[1])) {
                  rule.max = arrRangeValue[1];
                  message.max = this.matchString("请输入不大于 [0] 的数值！", rule.max);
                }
              } else if (s.indexOf(")") > -1) {
                if (arrRangeValue.length == 2 && !this.isEmpty(arrRangeValue[1])) {
                  rule.maxGt = arrRangeValue[1];
                  message.maxGt = this.matchtString("请输入小于 [0] 的数值！", rule.maxGt);
                }
              }
            }
          }
          break;
        case "equals":
          let arrEqualValue = value.split(",");
          rule[validateKey] = arrEqualValue[0];
          let msg = "请输入与上面相同的密码!"
          if (arrEqualValue.length == 2 && !this.isEmpty(arrEqualValue[1])) {
            msg = this.matchString("输入值必须和[0]相同！", arrEqualValue[1]);
          }
          message[validateKey] = msg;
          break;
        case "requrie":
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
          message[validateKey] = this.messages[validateKey];
          break;
        default:
          this.alert('提示2', str);
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
    if (process.env.TARO_ENV === 'h5') this.site.errorTextWidth = Math.ceil((400 * screenWidth) / 750);
    this.form = {} // 盛放表单
    this.errorList = [] // 盛放错误信息
  }

  // 初始化默认提示信息
  __initMessage () {
    this.messages = {
      requrie: '此项不能为空！',
      email: '请输入有效的电子邮件地址！',
      phone: '请输入11位的手机号码！',
      tel: '请输入有效的电话号码',
      url: '请输入有效的网址！',
      date: '请输入有效的日期！',
      dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22！',
      number: '请输入有效的数字！',
      int: '只能输入正整数！',
      idcard: '请输入有效身份证！',
      contains: this.matchString('输入值必须包含 [0]！')
    }
  }

  // 初始化默认验证方法
  __initMethods (alert) {
    this.alert = alert || this.alert
    console.log("ValidateList", ValidateList)
    for (const key in ValidateList) {
      console.log("key", key)
      if (ValidateList.hasOwnProperty(key)) {
        this.__proto__[key] = ValidateList[key]
      }
    }
  }

  /**
   * 若是空则返回true
   * @param {*} validateObj 要验证的对象 /空值使用第二个方法
   */
  isEmpty (validateObj) {
    return validateObj == "" || validateObj == undefined || validateObj == null || validateObj == "null" || Object.getOwnPropertyNames(validateObj).length == 0;
  }

  isEmptyValue (validateObj) {
    return validateObj == "" || validateObj == undefined || validateObj == null || validateObj == "null";
  }

  /**
   * 
   * @param {*} value 传入的值
   */
  isRequrie (value, param) {
    if (!this.depend(param)) {
      return 'nomatch'
    } else if (typeof value === 'number') {
      value = value.toString()
    } else if (typeof value === 'boolean') {
      return !0
    }
    return value.length > 0 && !this.isEmpty(value)
  }

  /**
   * 是否取默认值方法 !!
   * @param {*} obj 若存在的对象
   * @param {*} defaultObj 默认返回的对象
   */
  useDefault (obj, defaultObj) {
    return this.isEmpty(obj) ? defaultObj : obj;
  }

  /**
   *  字符串去除指定内容，默认为去空
   * @param {'eAe'/' A '} str 被操作的字符穿  
   * @param {*} delStr 可选参数 左右去除的字符
   */
  trim (str, delStr) {
    if (this.isEmpty(str)) {
      str = "";
    } else {
      delStr = this.useDefault(delStr, "\\s");
      str += "";
      var trimLeft = new RegExp("^" + delStr + "+", "gim");
      var trimRight = new RegExp(delStr + "+$", "gim");
      str = str.replace(trimLeft, "").replace(trimRight, "");
    }
    return str;
  }

  /**
   * 警告消息提醒模态框
   * @param {*} title 标题
   * @param {*} content 内容
   */
  alert (title, content, option) {
    title = this.useDefault(title, '提示')
    Taro.showModal({
      title: title,
      content: content,
      showCancel: false,
      ...option
    })
  }

  /**
   * 判断规则依赖是否存在
   * @param {true | requrie | function} param 传过来的规则
   */
  depend (param) {
    switch (typeof param) {
      case 'boolean':
        param = param
        break
      case 'string':
        param = !!param.length
        break
      case 'function':
        param = param()
      default:
        param = !0
    }
    return param
  }

  /**
   * 匹配提示消息中的 [number] 字符，格式化提醒输入长度消息文本 
   * @param {'请输入长度在[0]到[1]之间的内容'} source 传入的提示消息一个[1]则表示最大最小值。 String
   * @param {'[1,2]'} params 长度约束参数，若匹配最大最小值params参数应该为一个‘[1]’ String || Array
   */
  matchString (source, params) {
    if (this.isEmpty(params) || params.length == 0) {
      return source
    } else if (typeof params === 'string') {
      params = params.match(/\d+/g)
      params.forEach(function (n, i) {
        source = source.replace(new RegExp("\\[" + i + "\\]", "g"), function () {
          return n
        })
      })
    } else if (typeof params == 'array') {
      params.forEach(function (n, i) {
        source = source.replace(new RegExp("\\[" + i + "\\]", "g"), function () {
          return n
        })
      })
    } else {
      throw new Error("请输入[1]、[1,2]的格式字符或者数组")
    }
    return source
  }

  /**
   * 校验身份证号码
   * @param {430481...} identityCard 
   */
  idCard (identityCard) {
    /*--- 初始化校验规则 start--*/
    let errors = [
      "验证通过",
      "身份证号码位数不对",
      "身份证含有非法字符",
      "身份证号码校验错误",
      "身份证地区非法"
    ];
    //身份号码位数及格式检验
    let regExp;
    let len = identityCard.length;
    //身份证位数检验
    if (len != 15 && len != 18) {
      return errors[1];
    }
    else if (len == 15) {
      regExp = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    }
    else {
      regExp = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/);
    }
    // 身份证地区代号
    let area = {
      11: "北京", 12: "天津", 13: "河北", 14: "山西",
      15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海",
      32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
      37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
      45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
      53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海",
      64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门",
      91: "国外"
    }
    /*--- 初始化校验规则 end--*/

    // 逐位校验
    let identityCard_array = identityCard.split("");

    //地区检验
    if (area[parseInt(identityCard.substr(0, 2))] == null) {
      return errors[4];
    }
    //出生日期正确性检验
    let birth = identityCard.match(regExp);
    let flag;

    if (birth != null) {
      if (len == 15) {
        let date = new Date("19" + birth[3] + "/" + birth[4] + "/" + birth[5]);
        flag = date.getYear() == birth[3] && (date.getMonth() + 1) == birth[4] && date.getDate() == birth[5];
      }
      else if (len == 18) {
        let date = new Date(birth[3] + "/" + birth[4] + "/" + birth[5]);
        flag = date.getFullYear() == birth[3] && (date.getMonth() + 1) == birth[4] && date.getDate() == birth[5];
      }

      if (!flag) {
        return "身份证出生日期不对！";
      }

      //检验校验位
      if (len == 18) {
        let S = (parseInt(identityCard_array[0]) + parseInt(identityCard_array[10])) * 7
          + (parseInt(identityCard_array[1]) + parseInt(identityCard_array[11])) * 9
          + (parseInt(identityCard_array[2]) + parseInt(identityCard_array[12])) * 10
          + (parseInt(identityCard_array[3]) + parseInt(identityCard_array[13])) * 5
          + (parseInt(identityCard_array[4]) + parseInt(identityCard_array[14])) * 8
          + (parseInt(identityCard_array[5]) + parseInt(identityCard_array[15])) * 4
          + (parseInt(identityCard_array[6]) + parseInt(identityCard_array[16])) * 2
          + parseInt(identityCard_array[7]) * 1
          + parseInt(identityCard_array[8]) * 6
          + parseInt(identityCard_array[9]) * 3;

        let Y = S % 11;
        let M = "F";
        let JYM = "10X98765432";
        M = JYM.substr(Y, 1);//判断校验位

        //检测ID的校验位
        if (M == identityCard_array[17]) {
          return "";
        }
        else {
          return errors[3];
        }
      }
    }
    else {
      return errors[2];
    }
    return "";
  }

  /**
   * 验证电子邮箱格式
   */
  email (value) {
    return this.isRequrie(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
  }
  /**
   * 验证手机格式
   */
  tel (value) {
    return this.isRequrie(value) || /^1[34578]\d{9}$/.test(value)
  }
  /**
   * 验证URL格式
   */
  url (value) {
    return this.isRequrie(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
  }
  /**
   * 验证日期格式
   */
  date (value) {
    return this.isRequrie(value) || !/Invalid|NaN/.test(new Date(value).toString())
  }
  /**
   * 验证ISO类型的日期格式
   */
  dateISO (value) {
    return this.isRequrie(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
  }
  /**
   * 验证十进制数字
   */
  number (value) {
    return this.isRequrie(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
  }
  /**
   * 验证整数
   */
  digits (value) {
    return this.isRequrie(value) || /^\d+$/.test(value)
  }
  /**
   * 验证身份证号码
   */
  idcard (value) {
    return this.isRequrie(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
  }
  /**
   * 验证两个输入框的内容是否相同
   */
  equalTo (value, param) {
    return this.isRequrie(value) || value === this.data[param]
  }
  /**
   * 验证是否包含某个值
   */
  contains (value, param) {
    return this.isRequrie(value) || value.indexOf(param) >= 0
  }
  /**
   * 验证最小长度
   */
  minlength (value, param) {
    return this.isRequrie(value) || value.length >= param
  }
  /**
   * 验证最大长度
   */
  maxlength (value, param) {
    return this.isRequrie(value) || value.length <= param
  }
  /**
   * 验证一个长度范围[min, max]
   */
  rangelength (value, param) {
    return this.isRequrie(value) || (value.length >= param[0] && value.length <= param[1])
  }
  /**
   * 验证最小值
   */
  min (value, param) {
    return this.isRequrie(value) || value >= param
  }
  /**
   * 验证最大值
   */
  max (value, param) {
    return this.isRequrie(value) || value <= param
  }
  /**
   * 验证一个值范围[min, max]
   */
  range (value, param) {
    return this.isRequrie(value) || (value >= param[0] && value <= param[1])
  }

  /**
* 添加自定义验证方法
* @param {String} name 方法名
* @param {Function} method 函数体，接收两个参数(value, param)，value表示元素的值，param表示参数
* @param {String} message 提示信息
*/
  addMethod (name, method, message) {
    this[name] = method
    this.messages[name] = message !== undefined ? message : this.messages[name]
  }

  /**
   * 判断验证方法是否存在
   */
  isValidMethod (value) {
    let methods = []
    for (let method in this) {
      if (method && typeof this[method] === 'function') {
        methods.push(method)
      }
    }
    return methods.indexOf(value) !== -1
  }

  /**
   * 获取自定义字段的提示信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   */
  customMessage (param, rule) {
    const params = this.messages[param]
    const isObject = typeof params === 'object'
    if (params && isObject) return params[rule.method]
  }

  /**
   * 获取某个指定字段的提示信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   */
  defaultMessage (param, rule) {
    let message = this.customMessage(param, rule) || this.messages[rule.method]
    let type = typeof message

    if (type === 'undefined') {
      message = `Warning: No message defined for ${rule.method}.`
    } else if (type === 'function') {
      message = message.call(this, rule.parameters)
    }

    return message
  }

  /**
   * 缓存错误信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   * @param {String} value 元素的值
   */
  formatTplAndAdd (param, rule, value) {
    let msg = this.defaultMessage(param, rule)

    this.errorList.push({
      param: param,
      msg: msg,
      value: value,
    })
  }

  /**
   * 验证某个指定字段的规则
   * @param {String} param 字段名
   * @param {Object} rules 规则
   * @param {Object} data 需要验证的数据对象
   */
  checkParam (param, rules, data) {

    // 缓存数据对象
    this.data = data

    // 缓存字段对应的值
    const value = data[param] !== null && data[param] !== undefined ? data[param] : ''

    // 遍历某个指定字段的所有规则，依次验证规则，否则缓存错误信息
    for (let method in rules) {

      // 判断验证方法是否存在
      if (this.isValidMethod(method)) {

        // 缓存规则的属性及值
        const rule = {
          method: method,
          parameters: rules[method]
        }

        // 调用验证方法
        const result = this[method](value, rule.parameters)

        // 若result返回值为nomatch，则说明该字段的值为空或非必填字段
        if (result === 'nomatch') {
          continue
        }

        this.setValue(param, method, result, value)

        // 判断是否通过验证，否则缓存错误信息，跳出循环
        if (!result) {
          this.formatTplAndAdd(param, rule, value)
          break
        }
      }
    }
  }

  /**
   * 设置字段的默认验证值
   * @param {String} param 字段名
   */
  setView (param) {
    this.form[param] = {
      $name: param,
      $valid: true,
      $invalid: false,
      $error: {},
      $success: {},
      $viewValue: ``,
    }
  }

  /**
   * 设置字段的验证值
   * @param {String} param 字段名
   * @param {String} method 字段的方法
   * @param {Boolean} result 是否通过验证
   * @param {String} value 字段的值
   */
  setValue (param, method, result, value) {
    const params = this.form[param]
    params.$valid = result
    params.$invalid = !result
    params.$error[method] = !result
    params.$success[method] = result
    params.$viewValue = value
  }

  /**
   * 验证所有字段的规则，返回验证是否通过
   * @param {Object} data 需要验证数据对象
   */
  checkForm (data) {
    this.__initData()

    for (let param in this.rules) {
      this.setView(param)
      this.checkParam(param, this.rules[param], data)
    }
    return this.valid()
  }

  /**
   * 返回验证是否通过
   */
  valid () {
    return this.size() === 0
  }

  /**
   * 返回错误信息的个数
   */
  size () {
    return this.errorList.length
  }

  /**
   * 返回所有错误信息
   */
  validationErrors () {
    return this.errorList
  }

  /**
   * 隐藏出错的组件
   * @param {*} event 事件对象
   * @param {*} ownerInstance 
   */
  hiddenValidateError (event, ownerInstance) {
    var index = event.target.dataset.index;
    var instance = ownerInstance.selectComponent('.validateText' + index) // 返回组件的实例
    instance.setStyle({
      "visibility": "hidden"
    })
  }

}

export default Validator