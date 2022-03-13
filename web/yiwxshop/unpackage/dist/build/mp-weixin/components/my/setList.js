(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my/setList"],{"5a07":function(n,e,t){"use strict";t.r(e);var u=t("f2c2"),o=t("9557");for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);var l,r=t("f0c5"),c=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],l);e["default"]=c.exports},9486:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={props:{list:{type:Array,default:[],require:!0}},methods:{toset:function(e){e?n.navigateTo({url:e}):(n.clearStorageSync(),this.$router.go(0))}}};e.default=t}).call(this,t("543d")["default"])},9557:function(n,e,t){"use strict";t.r(e);var u=t("9486"),o=t.n(u);for(var i in u)"default"!==i&&function(n){t.d(e,n,(function(){return u[n]}))}(i);e["default"]=o.a},f2c2:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return u}));var u={uList:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-list/u-list")]).then(t.bind(null,"539c"))},uListItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-list-item/u-list-item")]).then(t.bind(null,"de14"))},uCell:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-cell/u-cell")]).then(t.bind(null,"3d0f"))}},o=function(){var n=this,e=n.$createElement;n._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my/setList-create-component',
    {
        'components/my/setList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5a07"))
        })
    },
    [['components/my/setList-create-component']]
]);
