// 这里注册所有的全局自定义过滤器, 使用vue插件的方式来写
// Vue插件编写非常简单, 只需要一个函数即可, 这个函数在Vue.use(函数)的时候, 会接收到Vue对象
export default function(Vue) {

    // 日期格式化过滤器
    // 过滤器函数在调用时, 会自动接收到来自模版的数据, 要求我们数据处理后返回, 返回什么最终渲染什么
    Vue.filter('date', function(tplData) {
        let date = new Date(tplData);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });

};


// // Vue插件还有第二种写法, 是提供一个对象, 对象里面必须含有一个install方法
// export default {

//     // Vue.use(该对象)的时候, 会自动调用install方法
//     install(Vue) {
//         // 这里可以定义全局过滤器
//         // 这里可以定义全局组件
//         // 这里可以给原型进行扩展
//     }

// };
