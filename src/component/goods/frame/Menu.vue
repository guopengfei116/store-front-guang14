<template>
    <p>
        <a v-for="item in menu" :key="item.id">
            {{ item.title }}
            <!-- 这里判断item是否还有子级数据, 如果有那么递归调用自己进行数据的渲染, 如果没有递归结束 -->
            <app-menu v-if="item.subcates && item.subcates.length != 0" :menu="item.subcates"></app-menu>
        </a>
    </p>
</template>

<script>
    export default {
        // 定义组件的默认名称, 这样在组件这里可以调用自己, 不然无法找到自己
        name: 'app-menu',

        // 接收到的menu是一个数组[ { title, subcates }, { title, subcates } ]
        // 数组的每个对象可能会含有subcates属性, 值又是同样的数组, 
        // 需要递归的调用自己进行深层遍历, 把所有的subcates都遍历出来
        props: ['menu']
    }
</script>

<style scoped>

</style>