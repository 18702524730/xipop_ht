<template>
<div>
    <!-- <div class="searchtabbox">
        <ul class="searchtab">
            <li v-for="(item,k) in list" :key="k" @click="topage(item)" :class="{active:nowtab==item.path}">{{item.name}}</li>
        </ul>
    </div> -->
    <div class="commonWidth">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {name:'专利',path:'zlsearch'},
                {name:'商标',path:'sbsearch'},
                {name:'法律文书',path:'cjsearch'},
            ],
            nowtab: 'zlsearch'
        }
    },
    mounted(){
        // this.change()
    },
    watch:{
        // $route(){
        //     this.change()
        // }
    },
    methods:{
        // topage(it){
        //     this.nowtab = it.path;
        //     this.$router.replace({name: it.path})
        // },
        // change(){
        //     let nowroute = this.$route.matched[2].name;
        //     this.nowtab  = nowroute;
        //     console.log(nowroute)
        // }
    }
}
</script>
<style lang="less">
.searchtabbox{
    background-color: #f5f5f5;
    .searchtab{
        height: 60px;
        max-width: 1200px;
        margin: 0 auto;
        >li{
            float: left;
            width: 100px;
            height: 60px;
            line-height: 60px;
            color:#333;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            margin-right: 40px;
            cursor: pointer;
            &.active{
                border-bottom: 2px solid #379dea;
                color:#379dea;
            }
        }
    }
    
}
</style>
