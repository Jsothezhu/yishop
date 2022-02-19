import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log(to);
	if(to.path==="/pages/myorder/myorder"||to.path==="/pages/address/address"||to.path==="/pages/neworder/neworder"){
		if(uni.getStorageSync("userState")){
			next()
		}else{
			next("/pages/login/login")
			uni.showToast({
				icon:"none",
				title:"请先登录"
			})
		}
	}else{
		next()
	}
});


export {
	router,
	RouterMount
}




/* 
 /pages/myorder/myorder
 /pages/address/address
 /pages/neworder/neworder
 */