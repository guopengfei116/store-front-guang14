import VueRouter from 'vue-router';

import GoodsHomeComponent from '../component/goods/GoodsHome.vue';
import GoodsDetailComponent from '../component/goods/detail/GoodsDetail.vue';
import GoodsMoreComponent from '../component/goods/more/GoodsMore.vue';
import ShopcartComponent from '../component/shopcart/Shopcart.vue';

import LoginComponent from '../component/user/Login.vue';
import OrderAddComponent from '../component/order/OrderAdd.vue';

// 路由配置对象
const routerConfig = [
    // 默认访问商品首页
    { path: '/', redirect: '/goods' },

    // 商品模块
    { name: 'g', path: '/goods', component: GoodsHomeComponent },
    { name: 'gd', path: '/goods/detail/:id', component: GoodsDetailComponent },
    { name: 'gm', path: '/goods/more', component: GoodsMoreComponent },

    // 购物车模块
    { name: 's', path: '/shopcart', component: ShopcartComponent },

    // 账户管理
    { name: 'l', path: '/login', component: LoginComponent },

    // 订单模块
    { name: 'oa', path: '/order/add', component: OrderAddComponent },
];

// 对外导出配置好的路由实例
export default new VueRouter({
    routes: routerConfig
});
