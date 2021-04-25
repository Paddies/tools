
//对字符串类型添加去重方法
String.prototype.unique=function(){
	let obj={},
		str='',
		len=this.length;
	for(let i=0;i<len;i++){
		if(!obj[this[i]]){
			str+=this[i];
			obj[this[i]]=true;
		}
	}
	return str
}

//原生封装ajax
function Ajax(method, url, data, flag) {
	return new Promise(function(resolve,reject){
		var xhr;
		flag = flag || true;
		method = method.toUpperCase();
		if (window.XMLHttpRequest) {
		 	xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject('Microsoft.XMLHttp');
		}
		if (method == 'GET') {
	        var params = [];
			for(var key in data) {
				params.push(key + '=' + data[key]);
			}
			var postData = params.join('&');
	        xhr.open('GET', url + '?' + postData, flag);
	        xhr.send()
	    } else if (method == 'POST') {
	        xhr.open('POST', url, flag);
//	        xhr.setRequestHeader('Content-Type', 'application/json');
//	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        xhr.send(JSON.stringify(data));
	    }
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	            resolve(xhr.responseText)
	        }else if(xhr.readyState == 4 && xhr.status == 0){
	        	reject(new Error(xhr.statusText))
	        }
	    }
	    
	})

}

//提取URL参数的方法
function getQueryString(url, param) {
	var reg = new RegExp("(^|&|[\?])" + param + "=([^&]*)(&|$)");
	var r = url.match(reg); //search,查询？后面的参数，并匹配正则
	if(r != null) return decodeURI(r[2]);
	return null;
};

//判断是否是安卓设备
function isAndroidMobileDevice() {
  return /android/i.test(navigator.userAgent.toLowerCase());
}

//判断是否是ios设备
function isAppleMobileDevice() {
  return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
}

//判断是否是移动设备访问
function isMobileUserAgent() {
  return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
    window.navigator.userAgent.toLowerCase()
  );
}

//判断是否电话号码(包含手机号和固话)
function isPhoneNumber(v,t){
	let isTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //手机号码正则
	let isPhone =/^1[3456789]\d{9}$/;
	if(t == 'phone') {
		return isPhone.test(v) ? true : false
	} else if(t == 'tel') {
		return isTel.test(v) ? true : false
	} else{
		return(isPhone.test(v) || isTel.test(v)) ? true : false
	} 
}

//设置cookie值
function setCookie(name, value, Hours) {
//	var Days = 30;
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + d.getTimezoneOffset() * 60000;
	var nd = utc + 3600000 * offset;
	var exp = new Date();
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null){
		console.log("shanchu")
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+ ";path=/";
	}
//		window.location.reload();
}

 //时间个性化输出功能
 /*
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
*/
function timeFormat(time) {
  var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;

  if (year < curYear) {
    timeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
  } else {
    var pastTime = curDate - date,
      pastH = pastTime / 3600000;

    if (pastH > curHour) {
      timeStr = month + "月" + day + "日 " + hour + ":" + minute;
    } else if (pastH >= 1) {
      timeStr = "今天 " + hour + ":" + minute + "分";
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + "分钟前";
      } else {
        timeStr = "刚刚";
      }
    }
  }
  return timeStr;
}
 
 //随机数时间戳
 function uniqueId() {
  var a = Math.random,
    b = parseInt;
  return (
    Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a())
  );
}
 
 //金额大写转换函数
 function transform(tranvalue) {
  try {
    var i = 1;
    var dw2 = new Array("", "万", "亿"); //大单位
    var dw1 = new Array("拾", "佰", "仟"); //小单位
    var dw = new Array(
      "零",
      "壹",
      "贰",
      "叁",
      "肆",
      "伍",
      "陆",
      "柒",
      "捌",
      "玖"
    ); 
    //整数部分用
    //以下是小写转换成大写显示在合计大写的文本框中
    //分离整数与小数
    var source = splits(tranvalue);
    var num = source[0];
    var dig = source[1] || "";
    //转换整数部分
    var k1 = 0; //计小单位
    var k2 = 0; //计大单位
    var sum = 0;
    var str = "";
    var len = source[0].length; //整数的长度
    for (i = 1; i <= len; i++) {
      var n = source[0].charAt(len - i); //取得某个位数上的数字
      var bn = 0;
      if (len - i - 1 >= 0) {
        bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
      }
      sum = sum + Number(n);
      if (sum != 0) {
        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
        if (n == "0") sum = 0;
      }
      if (len - i - 1 >= 0) {
        //在数字范围内
        if (k1 != 3) {
          //加小单位
          if (bn != 0) {
            str = dw1[k1].concat(str);
          }
          k1++;
        } else {
          //不加小单位，加大单位
          k1 = 0;
          var temp = str.charAt(0);
          if (temp == "万" || temp == "亿")
            //若大单位前没有数字则舍去大单位
            str = str.substr(1, str.length - 1);
          str = dw2[k2].concat(str);
          sum = 0;
        }
      }
      if (k1 == 3) {
        //小单位到千则大单位进一
        k2++;
      }
    }
    //转换小数部分
    var strdig = "";
    if (dig != "") {
      var n = dig.charAt(0);
      if (n != 0) {
        strdig += dw[Number(n)] + "角"; //加数字
      }
      var n = dig.charAt(1);
      if (n != 0) {
        strdig += dw[Number(n)] + "分"; //加数字
      }
    }
    str += "元" + strdig;
  } catch (e) {
  	console.log(e)
    return "0元";
  }
  return str;
}

//拆分整数与小数
function splits(tranvalue) {
  var value = new Array("", "");
  var temp = tranvalue.split(".");
  for (var i = 0; i < temp.length; i++) {
    value = temp;
  }
  return value;
}
 
//返回数据类型
function typeOf(para) {
    return Object.prototype.toString.call(para)
}


export default {
	
	ws: {},//websocket对象
    delay:500,//重连延迟
    //设置websocket对象方法
    setWs: function(newWs) {
        this.ws = newWs
    },
    //设置延迟方法
    setDelay:function(newDelay){
    	 this.delay = newDelay
    },
    //发送websocket信息方法
    sendMsg:function(message){
    	this.ws.send(JSON.stringify(message))
    },
	
	
	
	
	typeOf,
	Ajax,
	uniqueId,
	transform,
	timeFormat,
	isAndroidMobileDevice,
	isAppleMobileDevice,
	isMobileUserAgent,
	isPhoneNumber,
	setCookie,
	getCookie,
	delCookie,
	getQueryString
//	unique1,
//	unique2,
//	unique3
}
