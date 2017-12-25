<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">

                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->

                    <!-- 大表单 -->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <form @submit.prevent="orderAdd" id="orderForm" name="orderForm">
                            <div class="form-box address-info">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input v-model="orderForm.accept_name" name="accept_name" id="accept_name" type="text" class="input" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <v-distpicker @selected="pickerChange"></v-distpicker>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input v-model="orderForm.address" name="address" id="address" type="text" class="input" value="" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input v-model="orderForm.mobile" name="mobile" id="mobile" type="text" class="input" value="" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input v-model="orderForm.email" name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input v-model="orderForm.post_code" name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                </dl>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!-- 我们后台只有一个支付方式, 在线支付, 是死的, 所以给它定死, 不能选 -->
                                <li>
                                    <label>
                                        <!-- 单选狂组件的label用来指定, 勾选该项时向后台提交的数据值 -->
                                        <el-radio disabled v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.express_id" label="1">顺丰</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.express_id" label="2">圆通</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.express_id" label="3">韵达</el-radio>
                                    </label>
                                </li>
                            </ul>

                            <!-- 商品列表 -->
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <router-link :to="{ name: 'gd', params: { id: item.id } }">
                                                <img :src="item.img_url" class="img">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="{ name: 'gd', params: { id: item.id } }">
                                                {{ item.title }}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price }}
                                            </span>
                                        </td>
                                        <td align="center">{{ item.buycount }}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price * item.buycount }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="orderForm.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{ orderForm.goosTotal }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{ orderForm.goodsAmount }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ orderForm.expressMoment }}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ orderForm.goodsAmount + orderForm.expressMoment }}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <input id="btnSubmit" name="btnSubmit" type="submit" value="确认提交" class="btn submit">
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        components: { VDistpicker },
        data() {
            return {
                // 商品列表数据
                goodsList: [],

                // 提交表单数据
                orderForm: {
                    "goodsAmount":4099
                    ,"expressMoment":20
                    ,"accept_name":"骁骁"
                    ,"area":{
                        "province":{"code":"140000","value":"山西省"}
                        ,"city":{"code":"140100","value":"太原市"}
                        ,"area":{"code":"140106","value":"迎泽区"}
                    }
                    ,"address":"城区"
                    ,"mobile":"18667654355"
                    ,"email":"ivanyb@qq.com"
                    ,"post_code":"516000"
                    ,"payment_id":"6"
                    ,"express_id":"1"
                    ,"message":"4K,白色"
                    ,"goodsids":"97,102"
                    ,"cargoodsobj":{"97":1,"102":1,"103":1}
                }
            }
        },

        methods: {
            // 页面需要展示商品总价等信息, 后台接口除了用户填写的表单数据外也需要这些信息, 一起计算
            // goodsids, 商品IDS
            // cargoodsobj, 商品对象, id为key, 数量为val
            // goodsAmount, 总价
            // expressMoment, 快递费
            // 该方法会把计算的结束存储到orderForm数据中
            init() {
                // goodsids, 商品IDS
                this.orderForm.goodsids = this.$route.query.selectedIDS;

                // cargoodsobj, 商品对象, id为key, 数量为val
                // 先把IDS通过split方法劈数组, 然后遍历通过reduce合并一个对象
                this.orderForm.cargoodsobj = this.$route.query.selectedIDS
                    .split(',').reduce((o, id) => { o[id] = this.$store.getters.getShopcartData[id]; return o }, {});
            
                // goodsAmount, 总价
                // 遍历商品, 累加他们的 单价 * 购买数量
                this.orderForm.goodsAmount = this.goodsList.reduce((s, v) => {
                    return s + v.sell_price * v.buycount;
                }, 0);
           
                // expressMoment, 快递费
                this.expressMoment = 20;

                // 总件数
                // 遍历商品, 累加他们的 购买数量
                this.orderForm.goosTotal = this.goodsList.reduce((s, v) => s + v.buycount, 0);
           },

             // 通过IDS获取商品列表
            getGoodsList() {
                this.$http.get(this.$api.shopcartGoods + this.$route.query.selectedIDS).then(rsp => {
                    rsp.data.message.forEach(goods => {
                        // 后台返回的buycount属性不正确, 我们给他修正一下
                        goods.buycount = this.$store.getters.getShopcartData[goods.id];
                    });
                    this.goodsList = rsp.data.message;
                     this.init();  
                });
            },

            // 提交表单
            // 后台接口除了用户填写的表单数据外
            // 还要一个goodsids, 商品IDS
            // 还要一个cargoodsobj, 商品对象, id为key, 数量为val
            // 还要一个goodsAmount, 总价
            // 还要一个expressMoment, 快递费
            orderAdd() {
                this.$http.post(this.$api.orderSubmit, this.orderForm).then(rsp => {
                    console.log('跳转到支付页面, 在支付页面开启定时器不断请求接口, 判断用户有没有支付, 如果支付了就给出购买成功提示')
                });
            },

            // 三级联动
            pickerChange(val) {
                this.orderForm.area = val;
            }
        },

        created() {
            this.getGoodsList();
        }
    };
</script>

<style scoped>

</style>