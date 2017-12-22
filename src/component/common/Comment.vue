<template>
    <!-- 对所有页面开发的公共评论组件 -->
    <div class="comment-box">

        <!--发表评论, 监听提交事件, 并阻止默认的浏览器刷新提交, 转为ajax手动提交 -->
        <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="subComment">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea v-model="commentContent" id="txtContent" name="txtContent" sucmsg=" " 
                        datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <button id="btnSubmit" name="submit" type="submit" class="submit">提交评论</button>
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>

        <!-- 评论列表 -->
        <ul id="commentList" class="list-box">
            <!-- 没有评论时的提示信息 -->
            <p v-if="!commentList.length" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">
                暂无评论，快来抢沙发吧！
            </p>

            <!-- 具体评论 -->
            <li v-for="item in commentList" :key="item.add_time">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{ item.user_name }}</span>
                        <span>{{ item.user_ip }}</span>
                        <span>{{ item.add_time | date }}</span>
                    </div>
                    <p>{{ item.content }}</p>
                </div>
            </li>
        </ul>

        <!--放置页码-->
        <div class="page-box" style="margin:5px 0 0 62px">
            <div id="pagination" class="digg">
                <span class="disabled">« 上一页</span>
                <span class="current">1</span>
                <span class="disabled">下一页 »</span>
            </div>
        </div>
        <!--/放置页码-->
    </div>
</template>

<script>
    export default {
        // 获取评论列表时所需的 模块名称 与 文字ID
        props: ['tablename', 'artID'],

        data() {
            return {
                // 关联表单的评论文本
                commentContent: '',

                // 评论列表数据
                commentList: [],

                // 获取评论列表时所需的查询字符串, 将来通过elementUI的分页组件来动态控制它们的值
                query: {
                    pageIndex: 1,
                    pageSize: 5
                }
            }
        },

        methods: {
            // 获取评论列表
            getCommentList() {
                // 记得加上参数与查询, 其中get的第二个参数为一个配置对象, 可以设置请求头等信息
                this.$http.get(
                    this.$api.commentList + this.tablename + '/' + this.artID,
                    { params: this.query }
                ).then(rsp => this.commentList = rsp.data.message);
            },

            // 提交评论
            subComment() {
                // 记得加上参数与查询, 其中post的第二个参数为提交的数据
                this.$http.post(
                    this.$api.comment + this.tablename + '/' + this.artID,
                    { commenttxt: this.commentContent } 
                ).then(rsp => {

                    // 评论成功的提示
                    this.$message({
                        message: '恭喜你，发表成功',
                        type: 'success'
                    });

                    // 评论成功后应该更新整个评论列表, 我们这里直接手动创建一条评论对象,
                    // unshift到评论列表的最前面, 这样省去了一个接口的请求
                    this.commentList.unshift({
                        user_name: '匿名用户',
                        user_ip: '127.0.0.1',
                        add_time: new Date(),
                        content: this.commentContent
                    });
                    this.commentContent = '';
                });
            }
        },

        created() {
            this.getCommentList();
        }
    };
</script>

<style scoped>

</style>