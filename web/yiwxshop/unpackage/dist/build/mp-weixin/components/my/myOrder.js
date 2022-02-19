(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my/myOrder"],{"091f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{shop_status:[{name:"待付款",src:"../../static/common/image/order/daifukuan.png",status:"pay"},{name:"待收货",src:"../../static/common/image/order/daifahuo.png",status:"receivce"},{name:"退款中",src:"../../static/common/image/order/wodedaishouhuo.png",status:"refund"},{name:"已完成",src:"../../static/common/image/order/31daipingjia.png",status:"complete"}]}},methods:{intoMyOrder:function(e,n){t.navigateTo({url:"/pages/myorder/myorder?status="+e+"&selectItem="+n})}}};e.default=n}).call(this,n("543d")["default"])},"12e9":function(t,e,n){"use strict";n.r(e);var a=n("091f"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=r.a},"5afe":function(t,e,n){"use strict";n.r(e);var a=n("7c86"),r=n("12e9");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);var o,c=n("f0c5"),i=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=i.exports},"7c86":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my/myOrder-create-component',
    {
        'components/my/myOrder-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5afe"))
        })
    },
    [['components/my/myOrder-create-component']]
]);
