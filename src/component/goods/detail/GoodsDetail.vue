<template>
    <div>
        <!-- 导航栏 -->
        <app-breadcumd></app-breadcumd>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <app-left-img :imglist="goodsDetail.imglist"></app-left-img>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <app-left-info :goodsinfo="goodsDetail.goodsinfo"></app-left-info>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">

                            <!--选项卡-->
                            <el-tabs type="border-card">
                                <!-- 商品介绍 -->
                                <el-tab-pane label="商品介绍">
                                    <div class="tab-content entry" v-html="goodsDetail.goodsinfo.content" style="display:block;">
                                    </div>
                                </el-tab-pane>

                                <!-- 评论 -->
                                <el-tab-pane label="商品评论">
                                    <div class="tab-content" style="display: block;">
                                        <!--网友评论, 获取商品模块下指定id的评论列表,与发布评论-->
                                        <app-comment tablename="goods" :artID="id"></app-comment>
                                        <!--/网友评论-->
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                            <!--/选项卡-->
                        </div>
                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <app-right :hotgoodslist="goodsDetail.hotgoodslist"></app-right>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentComponent from '../../common/Comment.vue';
    import BreadcumdComponent from './frame/Breadcumd.vue';
    import LeftImgComponent from './frame/LeftImg.vue';
    import LeftInfoComponent from './frame/LeftInfo.vue';
    import RightComponent from './frame/Right.vue';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                // 存放页面三个子组件所需的数据
                goodsDetail: {
                    goodsinfo: {},
                    imglist: [],
                    hotgoodslist: []
                }
            }
        },

        methods: {
            getGoodsDetail() {
                this.$http.get(this.$api.goodsDetail + this.id)
                    .then(rsp => this.goodsDetail = rsp.data.message);
            }
        },

        created() {
            this.getGoodsDetail();
        },

        components: {
            appComment: CommentComponent,
            appBreadcumd: BreadcumdComponent,
            appLeftImg: LeftImgComponent,
            appLeftInfo: LeftInfoComponent,
            appRight: RightComponent,
        }
    };
</script>

<style scoped>

</style>