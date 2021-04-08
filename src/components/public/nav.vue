<template>
  <div class="navbox">
    <div class="top-nav">
    <div class="left-logo">
        <div class="logo">
        <img src="~assets/img/logo.jpg" alt="">
        </div>
    </div>
    <ul class='middle-tab fl'>
        <li v-for="(item,key) in mtabs" :key="key" :class="{active: middletab ==key}" @click="tolink(item,key)">{{item.title}}</li>
    </ul>
    <div class="right-tab">
        <ul class="top">
        <li v-for="(item,key) in topnav" :key="key" :class="{active: now==key}" @click="toitem(item,key)">{{item.name}}</li>
        </ul>
        <div class="bottom"> 
        <input type="text" placeholder="输入服务内容"><i class="el-icon-search"></i>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            topnav:[
                {name:'服务',link:'https://wwww.baidu.com'},
                {name:'服务需求',link:'https://wwww.baidu.com'},
                {name:'项目',link:'https://wwww.baidu.com'},
                {name:'咨询',link:'https://wwww.baidu.com'},
                {name:'公告',link:'https://wwww.baidu.com'}
            ],
            mtabs:[
                {title:'首页',link:'https://wwww.baidu.com'},
                {title:'知识产权搜索',link:'/search/commonsearch'},
                {title:'云服务',link:'https://wwww.baidu.com'},
                {title:'交易中心',link:'https://wwww.baidu.com'},
                {title:'云画报',link:'/cloudpaper/cloud'},
                {title:'创新服务',link:'/statistical/bigdata'},
                {title:'信息公开',link:'https://wwww.baidu.com'}
            ],
            middletab: 5,
            now: 0,
        }
    },
    methods:{
        toitem(it,k){
        this.now = k;
        },
        tolink(it,k){
        this.middletab = k;
        if(it.link.indexOf('http')==0){
            window.location.href = it.link
        }else{
            this.$router.push({path: it.link})
        }
        },
    }
}
</script>

<style lang='less'>
.navbox{
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .top-nav{
    width: 1200px;
    height: 90px;
    padding: 15px 0;
    margin: 0 auto;
    .left-logo{
      float: left;
      display: -webkit-box; 
      display: -moz-box;  
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      
      .logo{
        width: 240px;
        height: 60px;
        border-radius: 5px;
        margin-right: 40px;
        img{
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
    .new{
      font-size: 20px;
      color: #666;
      line-height: 60px;
      font-weight: 600;
    }
    .name{
      padding: 10px 0;
      margin-right: 30px;
    }
    h3{
      line-height: 30px;
      font-size: 18px;
      color: #999;
    }
    .middle-tab{
      padding-top: 20px;
      >li{
        float: left;
        margin-right: 10px;
        margin-left: 10px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        line-height: 40px;
        &.active{
          border-bottom: 2px solid #379dea;
        }
        
      }
    }
    .right-tab{
      // width: 50%;
      float: right;
      .top{
        display: -webkit-box; 
        display: -moz-box;  
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        padding-left: 20px;
        margin-bottom: 10px;
        li{
          height: 20px;
          line-height: 20px;
          margin-right: 20px;
          font-size: 14px;
          cursor: pointer;
          
        }
        .active{
          border-bottom: 1px solid #379dea;
        }
      }
      .bottom{
        width:300px;
        padding: 5px 10px 5px 20px;
        height: 28px;
        border-radius: 20px;
        line-height: 10px;
        border: 1px solid #eee;
        input{
          width: 240px;
        }
        i{
          float: right;
          font-size: 16px;
          line-height: 16px;
          cursor: pointer;
          color: #666;
        }
      }
    }
  }
  
</style>