(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0f8c":function(e,n,t){"use strict";(function(e){t("f224");o(t("66fd"));var n=o(t("9906"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},"2be9":function(e,n,t){"use strict";t.r(n);var o=t("da4e"),u=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},9906:function(e,n,t){"use strict";t.r(n);var o=t("b3c5"),u=t("2be9");for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);var i,s=t("f0c5"),c=Object(s["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=c.exports},b3c5:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var o={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"bc55"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"8559"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"fd42"))},uRow:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-row/u-row")]).then(t.bind(null,"49c3"))},uCol:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-col/u-col")]).then(t.bind(null,"dd1f"))}},u=function(){var e=this,n=e.$createElement;e._self._c},r=[]},da4e:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{userinfo:{username:"",password:"",code:""},rules:{username:{type:"string",required:!0,message:"请填写用户名"},password:{type:"string",required:!0,message:"请填写密码"},code:{type:"string",required:!0,message:"验证码不为空"}}}},methods:{submit:function(){var n=this;this.$refs.form1.validate().then((function(t){e.$u.http.post("/wxapp/login",n.userinfo).then((function(n){e.setStorage({key:"userInfo",data:JSON.stringify(n)}),e.setStorage({key:"userState",data:n.token,success:function(){setTimeout((function(){e.switchTab({url:"/pages/my/my"})}),800),e.$u.http.setConfig((function(n){return n.header.token=e.getStorageSync("userState"),n})),e.showToast({icon:"none",title:"登录成功",duration:2e3})}})})).catch((function(n){e.showToast({icon:"none",title:n.data.msg,duration:2e3})}))})).catch((function(n){e.showToast({icon:"none",title:"登录错误，请重新检查数据",duration:2e3}),console.log(n)}))},register:function(){e.navigateTo({url:"/pages/register/register"})}}};n.default=t}).call(this,t("543d")["default"])}},[["0f8c","common/runtime","common/vendor"]]]);