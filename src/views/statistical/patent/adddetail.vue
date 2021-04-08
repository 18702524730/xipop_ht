<template>
<div class="hasbgbox">
    <div class="fromadmin">
        <h3>文章预览 <span @click="toback"><i class="el-icon-close"></i> 关闭</span></h3>
    </div>
  <div class="detailbox">
      <h3>{{info.title}}</h3>
      <div class="intr">
          <span>{{info.publishTime|dateFormat}}</span>
          <span>{{info.author}}</span>
          <!-- <span>国际商报</span> -->
          
      </div>
    <div class="cont" id="contbox" v-html="info.content">
    </div>
  </div>
</div>
</template>

<script>
const detailUrl = './api/findPatentArticleDetail/{number}'
import { filters } from 'utils/'
import $ from 'jquery'
export default {
    data(){
        return {
            info:{},
            // cont:''
        }
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
    },
    mounted(){
        let data = localStorage.getItem('patentdetailcont')
        this.info = JSON.parse(data)
        console.log(data)
    },
    updated(){
        let height = $('#app').height()
        window.parent.postMessage(
            height + 'px',
            '*'
        );
        var box = document.getElementById('contbox')
        var imgs = box.getElementsByTagName('img')
        if(imgs){
            for(var i=0;i<imgs.length;i++){
                imgs[i].onload = function(){
                    let height = $('#app').height()
                    window.parent.postMessage(
                        height + 'px',
                        '*'
                    );
                    console.log(height)
                }
            }
        }
        var parr = box.getElementsByTagName('p');
        for(var j=0;j<parr.length;j++){
            if(parr[j].innerText ==parr[j].innerHTML){
                parr[j].style.justifyContent = 'flex-start'
            }
        }
    },
    // watch:{
    //     info(){
    //         setTimeout(function(){
    //             let height = $('#app').height()
    //             window.parent.postMessage(
    //                 height + 'px',
    //                 '*'
    //             );
    //             console.log(height)
    //         },50)
    //     }
    // },
    methods:{
        toback(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang='less'>
.hasbgbox{
    background-color: #F5F6F7;
    padding-top: 30px;
    padding-bottom: 50px;
    .fromadmin{
        height: 60px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        >h3{
            max-width: 1200px;
            padding: 15px 0;
            margin: 0 auto;
            line-height: 30px;
            font-size: 14px;
            span{
                float: right;
                margin-left: 10px;
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border: 1px solid #ccc;
                color: #999;
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
    .detailbox{
    max-width:1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 4rem 6rem;
    
    h3{
        text-align: center;
        color:#333;
        margin-bottom: 10px;
        // height:30px;
        font-size:22px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        line-height:30px;
    }
    .intr{
        text-align: center;
        margin-bottom: 30px;
        color: #999;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        line-height:22px;
        span{
            margin-right: 10px;
        }
    }
    .cont{
        text-indent: 2em;
        color: #999;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:28px;
        p{
            display: -webkit-flex;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        img{
            max-width: 100%;
        }
    }
}
}

</style>