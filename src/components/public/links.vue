<template>
  <div class="recommended">
        <ul class="links">
            <li v-for="(item,key) in links" :key="key" @click="tolink(item)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            links:[
                {name:'推荐链接1',link:'https://www.baidu.com'},
                {name:'推荐链接2',link:'https://www.baidu.com'},
                {name:'推荐链接3',link:'https://www.baidu.com'},
                {name:'推荐链接4',link:'https://www.baidu.com'},
                {name:'推荐链接5',link:'https://www.baidu.com'}
            ],
        }
    },
    methods:{
        tolink(it){
            window.location.href = it.link
        }
    }
}
</script>

<style lang='less'>
.recommended{
    border-top: 1px solid #ddd;
    background-color: #fff;
    .links{
        display:flex;
        width: 1200px;
        margin: 0 auto;
        padding: 30px 80px;
        justify-content: space-between;
        li{
            width:200px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 16px;
            cursor: pointer;
            border: 1px solid #eee;
            border-radius: 2px;
        }
    }
}
</style>