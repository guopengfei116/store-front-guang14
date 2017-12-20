<template>
    <div>
        <app-header></app-header>
    </div>
</template>

<script>
    // 导入头部与底部组件
    import HeaderComponent from './frame/Header.vue';
    import $ from 'jquery';

    export default {

        // 子组件注册
        components: {
            appHeader: HeaderComponent,
        },

        // 模版挂载到视图后执行, 这时候可以操作页面上的DOM了
        mounted() {
            $("#menu2 li a").wrapInner( '<span class="out"></span>' );
            $("#menu2 li a").each(function() {
                $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
            });

            $("#menu2 li a").hover(function() {
                $(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
                $(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

            }, function() {
                $(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
                $(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
            });
        }
    }
</script>

<style scoped>

</style>