<template>
<div class="hasbgbox">
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
        this.getdetail()
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
        getdetail(){
            this.$http.get(detailUrl.replace('{number}',this.$route.params.id)).then(res=>{
                this.info = res.data;
            }).catch(err=>{
                this.$message(err.response.data.msg)
            })
        }
    }
}
</script>

<style lang='less'>
.hasbgbox{
    background-color: #F5F6F7;
    padding-top: 30px;
    padding-bottom: 50px;
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
            // margin-bottom: 10px;
        }
    }
}
</style>