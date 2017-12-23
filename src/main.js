// 1.1 导入第三方包
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Filters from './filter';
import 'element-ui/lib/theme-chalk/index.css'
import './css/style.css';

// 1.2 启用vue插件
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Filters);

// 1.3 把axios和api配置对象注入到Vue原型中, 这样组件实例就可以直接访问
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 导入根组件
import AppComponent from './component/App.vue';

// 导入路由实例, 因为路由使用了一个单独的文件进行管理
import router from './router';

// 导入store配置项
import storeConfog from './store';

new Vue({
    el: '#app',
    render: c => c(AppComponent),  // es6简写语法
    router,    // es6简写语法 
    store: new Vuex.Store(storeConfog)
});
