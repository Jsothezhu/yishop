(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{a5c1:function(n,e,t){"use strict";var o=t("f02a"),r=t.n(o);r.a},c41e:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){t.e("components/my/myOrder").then(function(){return resolve(t("5afe"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/my/setList").then(function(){return resolve(t("5a07"))}.bind(null,t)).catch(t.oe)},u={components:{myOrder:o,setList:r},data:function(){return{userInfo:{},list:[{name:"通用设置",url:""},{name:"收货地址",url:"../address/address"},{name:"退出"}]}},methods:{login:function(){n.navigateTo({url:"/pages/login/login"})},intoMyOrder:function(){n.navigateTo({url:"/pages/myorder/myorder?status=all"})}},onShow:function(){n.getStorageSync("userInfo")&&(console.log(1),this.userInfo=JSON.parse(n.getStorageSync("userInfo"))),console.log(this.userInfo)}};e.default=u}).call(this,t("543d")["default"])},c756:function(n,e,t){"use strict";t.r(e);var o=t("e85f"),r=t("cbf6");for(var u in r)"default"!==u&&function(n){t.d(e,n,(function(){return r[n]}))}(u);t("a5c1");var c,a=t("f0c5"),s=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,"a1710c4e",null,!1,o["a"],c);e["default"]=s.exports},cbf6:function(n,e,t){"use strict";t.r(e);var o=t("c41e"),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},d6d1:function(n,e,t){"use strict";(function(n){t("f224");o(t("66fd"));var e=o(t("c756"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},e85f:function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var r=function(){var n=this,e=n.$createElement,t=(n._self._c,Object.keys(this.userInfo));n.$mp.data=Object.assign({},{$root:{g0:t}})},u=[]},f02a:function(n,e,t){}},[["d6d1","common/runtime","common/vendor"]]]);