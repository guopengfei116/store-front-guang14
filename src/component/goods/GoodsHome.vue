<template>
    <div>
        <app-breadcumd></app-breadcumd>
        <app-top></app-top>
        <app-list></app-list>
    </div>
</template>

<script>
    import BreadcumdComponent from './frame/Breadcumd.vue';
    import TopComponent from './frame/Top.vue';
    import ListComponent from './frame/List.vue';

    export default {
        components: {
            appBreadcumd: BreadcumdComponent,
            appTop: TopComponent,
            appList: ListComponent,
        }
    };
</script>

<style scoped>

</style>