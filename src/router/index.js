import VueRouter from 'vue-router';

import GoodsHomeComponent from '../component/goods/GoodsHome.vue';
import GoodsDetailComponent from '../component/goods/detail/GoodsDetail.vue';
import GoodsMoreComponent from '../component/goods/more/GoodsMore.vue';

// 路由配置对象
const routerConfig = [
    // 默认访问商品首页
    { path: '/', redirect: '/goods' },

    // 商品模块
    { path: '/goods', component: GoodsHomeComponent },
    { path: '/goods/detail/:id', component: GoodsDetailComponent },
    { path: '/goods/more', component: GoodsMoreComponent }
];

// 对外导出配置好的路由实例
export default new VueRouter({
    routes: routerConfig
});
