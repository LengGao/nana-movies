  // 工具
//   /**
//    *  格式化日期
//    * @param {*} date = Date
//    * @param {*} fmt = 'yyyy-MM-dd hh:mm:ss' 
//    */
//   dateFormate(date, fmt) {
//     var o = {
//       "M+": date.getMonth() + 1, //月份 
//       "d+": date.getDate(), //日 
//       "h+": date.getHours(), //小时 
//       "m+": date.getMinutes(), //分 
//       "s+": date.getSeconds(), //秒 
//       "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
//       "S": date.getMilliseconds() //毫秒 
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
//   }
//   //解析返回的字符串对象
//   transObjStr: function (str) {
//     let arr = str.substr(1, str.length - 2).split(',');
//     let obj = {};
//     for (let val of arr) {
//       let sArr = val.split(':');
//       obj[sArr[0]] = sArr[1];
//     }
//     return obj;
//   }
//   // 是否为空
//   isEmpty: function (value) {
//     if (value !== 0 && !value) {
//       return true;
//     }
//     if ((value instanceof Array) && value.length <= 0) {
//       return true;
//     }
//     return false;
//   }
//   // 校验手机号
//   checkPoneFormat: function (value) {
//     return /^1\d{10}$/.test(value);
//   }
//   // 返回 'a' = b 的v
//   getQueryString(query, key) {
//     let arr = query.split('=');
//     return arr[1];
//   }
//   //判断图片路径是否是http开头
//   picturejudgment: function (src) {
//     if (src) {
//       if (src.substr(0, 4) === 'http') {
//         return src;
//       } else {
//         return this.imageUri + src;
//       }
//     }
//   }
//   getPath: function getPath(path) {
//     if (!path) {
//       return path;
//     }
//     if (path.indexOf('http://') != -1 || path.indexOf('https://') != -1) {
//       return path;
//     }
//     return this.imageUri + path;
//   }

//   // javascript中将Object转换为String函数代码 (json str)
//   objToStr: function obj2str(o) {
//     var r = [];
//     if (typeof o == "string") {
//       return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
//     }
//     if (typeof o == "object") {
//       if (!o.sort) {
//         for (var i in o)
//           r.push(i + ":" + obj2str(o[i]));
//         if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
//           r.push("toString:" + o.toString.toString());
//         }
//         r = "{" + r.join() + "}"
//       } else {
//         for (var i = 0; i < o.length; i++)
//           r.push(obj2str(o[i]))
//         r = "[" + r.join() + "]"
//       }
//       return r;
//     }
//     return o.toString();
//   }
export function hello(){
  console.log("say")
}

export function xxx (){
  console.log("xxx")
}

