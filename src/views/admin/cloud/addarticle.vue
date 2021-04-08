<template>
  <div class="articleconts">
      <div class="fromadmin">
          <h3>文章预览 <span @click="toback"><i class="el-icon-close"></i> 关闭</span></h3>
      </div>
      <div class="article commonWidth">
          <h3>{{info.articleTitle}}</h3>
          <div class="source">
              <span>这里是主办信息</span>
              <!-- <span>{{info.itemName}}</span> -->
              <span>{{info.journalIssue}}</span>
          </div>
          <div class="cont" id="contbox" v-html="info.content">
          </div>
      </div>
  </div>
</template>

<script>
const detailUrl ='./api/pictorial/articleDetail'
const infoUrl = './api/pictorial/selectJournalInfo'
import $ from 'jquery'
export default {
    data(){
        return{
            id:'',
            info:{},
            zb:'',
            from:''
        }
    },
    methods:{
        toback(){
            this.$router.go(-1)
        },
        pagerefresh(){
            window.location.reload()
        },
        getinfo(){
            let data = {
                id: this.id
            }
            this.$http.get(infoUrl,{params:data}).then(res=>{
                this.zb = res.data.info
            })
        },
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
    mounted(){
        // window.scrollTo(0,0)
        let data= localStorage.getItem('nowarticlecont')
        this.info = JSON.parse(data)
        // this.id = this.$route.params.lmid;
        // this.getinfo()
        
    }
}
</script>

<style lang='less'>
.haspd{
    padding-top: 30px;
}
.articleconts{
    background-color: #F5F6F7;
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
    .article{
        min-height: 800px;
        background-color: #fff;
        padding: 60px 90px; 
        
        >h3{
            font-size: 22px;
            color: #333;
            line-height: 30px;
            margin-bottom: 10px;
            text-align: center;
        }
        .source{
            text-align: center;
            font-size: 16px;
            color: #999;
            line-height: 22px;
            margin-bottom: 30px;
            >span:first-child{
                margin-right: 20px;
            }
        }
        .cont{
            text-indent: 2em;
            font-size: 16px;
            color:#333;
            line-height: 28px;
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