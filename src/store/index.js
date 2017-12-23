import Vue from 'vue';

export default {
    state: {
        // 存储购物车商品购买记录, 初始化值应该从本地localStorage里面取, 没有则为空对象
        shopcartData: JSON.parse(localStorage.getItem('shopcartData')) || {},
    },

    // 获取状态, 记住以属性的方式使用
    getters: {
        // 取原值
        getShopcartData(state) {
            return state.shopcartData;
        },

        // 获取商品总数
        // 1 先取出所有商品的购买数量, 对象中每个元素的value即购买数量
        // 2 通过reduce方法把数量累加起来
        // 3 返回累加结果
        getShopcartTotal(state) {
            return Object.values(state.shopcartData).reduce((s, v) => s + v, 0);
        },

        // 获取所以的商品ID
        // 1 先取出所有商品的ID, 对象中每个元素的key即为商品ID
        // 2 通过join方法把所有ID通过 , 号连接成字符串
        // 3 返回字符串结果
        getShopcartIDS(state) {
            return Object.keys(state.shopcartData).join(',');
        }
    },

    // 修改状态, 记住要commit方法调用
    mutations: {
        // 添加或修改数据
        // 1 通过params.id得到要修改的商品ID, 
        // 2 然后通过这个ID直接赋值, 如果之前没有记录, 就是新增, 有就是修改
        // @params1 第一个参数固定为state
        // @params2 第二个参数为调用时传递过来的值
        // @params2 我们这里要求params为一个对象, 拥有id与val两个属性
        upShopcartData(state, params) {
            // 这样写, 对于新增的数据不能触发视图刷新
            // state.shopcartData[params.id] = params.val; 

            // 因为这里有可能是修改, 也有可能是新增, 为了保证让视图一定刷新, 所以改用Vue.set
            Vue.set(state.shopcartData, params.id, params.val);
            localStorage.setItem('shopcartData', JSON.stringify(state.shopcartData));
        },

        // 在原有的基础上累加购买数量
        // 1 先判断原先有没有该ID的购买记录
        // 2 如果有, 那么累加
        // 3 如果没有, 就直接赋值当做新增
        addShopcartData(state, params) {
            if(state.shopcartData[params.id]) {
                state.shopcartData[params.id] += params.val;
            }else {
                // state.shopcartData[params.id] = params.val; 
                Vue.set(state.shopcartData, params.id, params.val);
            }
            localStorage.setItem('shopcartData', JSON.stringify(state.shopcartData));
        },

        // 删除一条购买记录
        // 通过Vue提供的delete方法删除指定商品ID的数据
        delShopcartData(state, params) {
            Vue.delete(state.shopcartData, params.id);
            localStorage.setItem('shopcartData', JSON.stringify(state.shopcartData));
        }
    }
}
