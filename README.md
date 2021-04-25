# 常用js工具库
### 一.使用方法
##### 1.原生js中使用
```javascript
1.引入模块
2.调用模块抛出的方法
<script type="module">
	import tools from "./tools.js"
	tools.typeOf("123")
</script>
```

##### 2.在vue中使用
```javascript
1.main中引入模块
2.挂载在vue的原型链上
import p from './libs/tools.js';
Vue.prototype.p=p;

组件中使用
this.p.typeOf("123")


```

### 二.包含方法
|  序号 | 方法名  | 描述  |
| ------------ | ------------ | ------------ |
| 1 |   <a href="#ajax_text">Ajax</a>  | 原生封装ajax请求，内部封装promise  |
| 2  |  <a href='#typeof_text'>typeOf</a> | 返回数据类型  |
| 3  |  <a href="#setcookie_text">setCookie</a> | 设置cookies值  |
| 4  |  <a href="#getcookie_text">getCookie</a> | 获取cookies值  |
| 5  |  <a href='#delcookie_text'>delCookie</a> | 删除cookies值  |
| 6  |  <a href="#isphonenumber_text">isPhoneNumber</a> | 判断是否电话号码（包括手机号和固话）  |
| 7  |  <a href='#ismobileuseragent_text'>isMobileUserAgent</a> | 判断是否移动端设备  |
| 8  |  <a href='#isandroidmobiledevice_text'>isAndroidMobileDevice</a> | 判断是否安卓设备  |
| 9  |  <a href='#isapplemobiledevice_text'>isAppleMobileDevice</a> | 判断是否ios设备  |
| 10  |  <a href='#uniqueid_text'>uniqueId</a> | 随机数时间戳  |
| 11  |  <a href='#timeformat_text'>timeFormat</a> | 时间个性化输出  |
| 12  |  <a href='#transform_text'>transform</a> | 金额大写装换  |
| 13  |  <a href='#getquerystring_text'>getQueryString</a> | 提取URL参数  |
| 14  |  <a href='#websocket_text'>websocket</a> | 使用websocket  |


### 三.方法例子
## <span id='ajax_text'>Ajax</span>
```javascript
Ajax(method, url, data, flag)
method:方法（"post"/"get"）
url:请求地址
data：请求数据

```
```javascript
this.p.Ajax("post","http://192.168.2.2/api/login",{
	"user_name":"admin",
	"user_password":"123",
}).then(function(data){
	//成功返回值
	console.log(data)
}).catch(function(err){
	//错误返回值
	console.log(err)
})
```


## <span id='typeof_text'>typeOf</span>

```javascript
this.p.typeOf("123")
```



## <span id='setcookie_text'>setCookie</span>
```javascript
setCookie(name, value, Hours)
name:cookies名称
value:cookies值
Hours：有效时间（单位：小时）
```

```javascript
this.p.setCookie("name","abc",3)
```



## <span id='getcookie_text'>getCookie</span>
```javascript
getCookie(name)
name:cookies名称
```

```javascript
this.p.getCookie("name")
```



## <span id='delcookie_text'>delCookie</span>
```javascript
delCookie(name)
name:cookies名称
```

```javascript
this.p.delCookie("name")
```

## <span id='isphonenumber_text'>isPhoneNumber</span>
```javascript
isPhoneNumber(v,t)
v:号码
t:标识（"phone":检测手机格式，"tel":检测固话格式，无则符合手机号或固话即可）
```

```javascript
this.p.isPhoneNumber("13248979","phone")
```


## <span id='ismobileuseragent_text'>isMobileUserAgent</span>


```javascript
this.p.isMobileUserAgent()
```


## <span id='isandroidmobiledevice_text'>isAndroidMobileDevice</span>


```javascript
this.p.isAndroidMobileDevice()
```


## <span id='isapplemobiledevice_text'>isAppleMobileDevice</span>


```javascript
this.p.isAppleMobileDevice()
```


## <span id='uniqueid_text'>uniqueId</span>

```javascript
this.p.uniqueId()
```


## <span id='timeformat_text'>timeFormat</span>
```javascript
timeFormat(time)
time:时间戳
```

```javascript
this.p.timeFormat(1619321487923)
```


## <span id='transform_text'>transform</span>
```javascript
transform(tranvalue)
tranvalue:数值字符串
```

```javascript
this.p.transform("120.5")
```

## <span id='getquerystring_text'>getQueryString</span>
```javascript
getQueryString(url, param)
url:url地址
param：参数名
```

```javascript
this.p.getQueryString("http://192.xxxxx","name")
```

## <span id='websocket_text'>websocket</span>


```javascript
let ws = new WebSocket("ws://xxxxxx");
this.p.setWs(ws);
this.p.ws.onopen = function() {
	 console.log("打开websocket")
}
this.p.ws.onerror = function(ev) {

}
this.p.ws.onclose = function(ev) {
	 // 关闭 websocket
	console.log("连接已关闭...");
}
this.p.ws.onmessage = function(res) {
	console.log("App.vue收到服务器内容", res.data);
}

//发送消息时
if(this.p.ws.readyState == 1){
	console.log('发送keepalve')
	this.p.sendMsg({
		"type":"keepalive"
	})
}
```



