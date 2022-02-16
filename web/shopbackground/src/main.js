import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
//import devtools from '@vue/devtools'


const app = createApp(App);
app.config.productionTip = false;


app.use(Antd);
app.use(router);
/*if (process.env.NODE_ENV === 'development') {
    devtools.connect('http://localhost:3000')

}*/


app.mount('#app')
