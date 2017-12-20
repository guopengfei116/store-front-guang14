// 1.1 导入第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import './css/style.css';

// 1.2 启用vue插件
Vue.use(VueRouter);

// 导入根组件
import AppComponent from './component/App.vue';

// 导入路由实例, 因为路由使用了一个单独的文件进行管理
import router from './router';

new Vue({
    el: '#app',
    render: c => c(AppComponent),  // es6简写语法
    router    // es6简写语法 
});
