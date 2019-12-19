import Taro from '@tarojs/taro'
import util from './util'

class Validator {

  constructor() {
    this.__initData() // 初始化数据
    this._initMessage() // 初始化默认提示消息
    this.__initMethods() // 初始化默认验证方法
    this._getRule() // 获取要验证的内容 
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
    Object.assign(this, { rules, messages, data: {} })
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
      console.log("validateKey", validateKey)
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
    if (process.env.TARO_ENV === 'h5') this.site.errorTextWidth = Math.ceil((400 * screenWidth) / 750);
    this.form = {} // 盛放表单
    this.errorList = [] // 盛放错误信息
  }
  // 初始化默认提示信息
  _initMessage () {
    this.message = {
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

  // 初始化默认验证方法
  __initMethods () {

  }

  /**
   * 
   * @param {*} validateObj 要验证的对象
   */
  isEmpty (validateObj) {
    return validateObj == "" || validateObj == undefined || validateObj == null || validateObj == "null";
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
   * 
   * @param {*} identityCard 
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
        let M = JYM.substr(Y, 1);//判断校验位

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

}

export default Validator