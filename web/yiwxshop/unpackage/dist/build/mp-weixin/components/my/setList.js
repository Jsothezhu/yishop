(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my/setList"],{"5a07":function(e,n,t){"use strict";t.r(n);var u=t("fe78"),o=t("9557");for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);var l,r=t("f0c5"),c=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],l);n["default"]=c.exports},9486:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={props:{list:{type:Array,default:[],require:!0}},methods:{toset:function(n){n?e.navigateTo({url:n}):(e.clearStorageSync(),this.$router.go(0))}}};n.default=t}).call(this,t("543d")["default"])},9557:function(e,n,t){"use strict";t.r(n);var u=t("9486"),o=t.n(u);for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);n["default"]=o.a},fe78:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return u}));var u={uList:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-list/u-list")]).then(t.bind(null,"539c"))},uListItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-list-item/u-list-item")]).then(t.bind(null,"de14"))},uCell:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-cell/u-cell")]).then(t.bind(null,"3d0f"))}},o=function(){var e=this,n=e.$createElement;e._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my/setList-create-component',
    {
        'components/my/setList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5a07"))
        })
    },
    [['components/my/setList-create-component']]
]);
