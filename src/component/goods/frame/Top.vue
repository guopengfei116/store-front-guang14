<template>
    <!-- 商品顶部 -->
    <div class="section">
        <div class="wrapper">
            <div class="wrap-box">

                <!--类别菜单-->
                <div class="left-220" style="margin:0;">
                    <div class="banner-nav">
                        <ul>
                            <!--此处声明下面可重复循环-->
                            <li v-for="item in topData.catelist" :key="item.id">
                                <h3>
                                    <i class="iconfont icon-arrow-right"></i>
                                    <span>{{ item.title }}</span>
                                    <p>
                                        <span v-for="subitem in item.subcates" :key="subitem.id">
                                            {{ subitem.title }}
                                        </span>
                                    </p>
                                </h3>
                                <div class="item-box">
                                    <!--如有三级分类，此处可循环-->
                                    <dl>
                                        <dt>
                                            <router-link :to="{ name: 'gd', params: { id: item.id } }">{{ item.title }}</router-link>
                                        </dt>
                                        <dd>
                                            <router-link :to="{ name: 'gd', params: { id: item.id } }"
                                                v-for="subitem in item.subcates" :key="subitem.id">
                                                {{ subitem.title }}
                                            </router-link>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--/类别菜单-->

                <!--幻灯片-->
                <div class="left-705">
                    <div class="banner-img">
                        <el-carousel indicator-position="outside">
                            <el-carousel-item v-for="item in topData.sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <!--/幻灯片-->

                <!--推荐商品-->
                <div class="left-220">
                    <ul class="side-img-list">

                        <li>
                            <div class="img-box">
                                <label>1</label>
                                <img src="/upload/201504/20/thumb_201504200314272543.jpg">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
                                <span>2015-04-20</span>
                            </div>
                        </li>

                        <li>
                            <div class="img-box">
                                <label>2</label>
                                <img src="/upload/201504/20/thumb_201504200258403759.jpg">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-97.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                <span>2015-04-20</span>
                            </div>
                        </li>

                        <li>
                            <div class="img-box">
                                <label>3</label>
                                <img src="/upload/201504/20/thumb_201504200242250674.jpg">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-95.html">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</a>
                                <span>2015-04-20</span>
                            </div>
                        </li>

                        <li>
                            <div class="img-box">
                                <label>4</label>
                                <img src="/upload/201504/20/thumb_201504200239192345.jpg">
                            </div>
                            <div class="txt-box">
                                <a href="/goods/show-94.html">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                <span>2015-04-20</span>
                            </div>
                        </li>

                    </ul>
                </div>
                <!--/推荐商品-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                topData: {
                    catelist: [],
                    sliderlist: [],
                    toplist: []
                }
            }
        },

        methods: {
            // 获取商品首页顶部的数据
            getTopData() {
                this.$http.get(this.$api.goodsTop).then(rsp => {
                    this.topData = rsp.data.message;
                });
            },

            // 获取商品首页下面商品列表的数据
            getListData() {

            }
        },

        created() {
            this.getTopData();
        }

    };
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .banner-img img {
        width: 100%;
        height: 100%;
    }
</style>