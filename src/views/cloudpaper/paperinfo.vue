<template>
<div class="cloudpage">
  <div class="commonWidth clearfix">
      <div class="leftyearlist fl">
          <div class="itemyear" v-for="(item,index) in yearlist" :key="index">
              <h3 class="year" @click="openitem(item)">{{item.year}}年 <span class="iconbox"><i class="el-icon-arrow-down" v-if="!item.isopen"></i><i class="el-icon-arrow-up" v-if="item.isopen"></i></span></h3>
              <ul v-if="item.list&&item.isopen" class="itemlist" >
                  <li v-for="(v,k) in item.list" :key="k" :class="{active: v.id==nowid}" @click.stop="searchitem(v)">{{v.title}}</li>
              </ul>
          </div>
      </div>
      <div class="rightcontitem fr">
          <div class="topview clearfix">
              <div class="imgbox fl">
                  <img :src="detailInfo.xipopPictorialJournalVO.journalCover" alt="">
              </div>
              <ul class="intr fl">
                  <li>
                      画报刊号：{{detailInfo.xipopPictorialJournalVO.journalNo}}
                  </li>
                  <li>
                      主办信息：{{detailInfo.xipopPictorialJournalVO.info}}
                  </li>
                  <li>
                      画报期号：{{detailInfo.xipopPictorialJournalVO.journalIssue}}
                  </li>
              </ul>
          </div>
          <div class="bottomlist">
              <div class="mulu">
                  <h2>目录</h2>
              </div>
              <div class="artbox">
                <div v-for="(item,key) in articlelist" :key="key" class="article">
                    <h3>{{item.itemName}}</h3>
                    <ul v-if="item.xipopPictorialArticleVOList" class="titlelist">
                        <li v-for="(t,k) in item.xipopPictorialArticleVOList" :key="k" @click="toarticle(t)">{{t.articleTitle}}</li>
                    </ul>    
                </div>  
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
const detailUrl = './api/pictorial/articleDetail'
const infourl = './api/pictorial/journalAndarticleDetail/{id}'
const tlistUrl = './api/pictorial/journalList'
const yearlist = './api/pictorial/journalYearList'
import $ from 'jquery'
export default {
    data(){
        return {
            yearlist:[
                // {year: 2019,list:[{title:'总第一期',id:11},{title:'总第二期',id:12},{title:'总第三期',id:13},{title:'总第一期',id:11},{title:'总第二期',id:12},{title:'总第三期',id:13},{title:'总第一期',id:11},{title:'总第二期',id:12},{title:'总第三期',id:13},{title:'总第一期',id:11},{title:'总第二期',id:12},{title:'总第三期',id:13}],isopen: true,id:1},
                // {year: 2018,list:[{title:'总第一期',id:21},{title:'总第二期',id:22},{title:'总第三期',id:23}],isopen: false,id:2},
            ],
            articlelist:[
                {title:'卷首语',list:[{name:'文章标题',id:1}]},
                {title:'一个栏目',list:[{name:'文章标题',id:21},{name:'文章标题',id:22},{name:'文章标题',id:23},{name:'文章标题',id:24}]},
                {title:'二个栏目',list:[{name:'文章标题',id:32},{name:'文章标题',id:32}]},
                {title:'一个栏目',list:[{name:'文章标题',id:21},{name:'文章标题',id:22},{name:'文章标题',id:23},{name:'文章标题',id:24}]},
                {title:'二个栏目',list:[{name:'文章标题',id:32},{name:'文章标题',id:32}]},
            ],
            detailInfo:{
                xipopPictorialJournalVO:{},
                xipopPictorialArticleListVOList:[]
            },
            nowid: '',
            nowyear:''
        }
    },
    methods:{
        openitem(it){
            if(it.isopen){
                it.isopen = false;
            }else{
                this.yearlist.forEach(item=>{
                    item.isopen = false
                })
                it.isopen = true
                
                this.getlist(it.year)
            }
        },
        searchitem(it){
            this.nowid = it.id;
            this.$router.replace({name:'cloudlist',params:{id: this.nowid,year: this.nowyear}})
            this.getdetail(it.id)
        },
        async getyears(){
            return await this.$http.get(yearlist)
        },
        async getlist(year){
            let data = {
                journalYear: year,
                pgIndex: 1,
                pgCount: 12
            }
            let resp = await this.getyears();
            let years = resp.data;
            let arr =[]
            
            this.$http.get(tlistUrl, {params: data}).then(res=>{
                let datas = res.data.elements;
                let qarr = []
                datas.forEach(item=>{
                    qarr.push({
                        title: item['journalIssue'],
                        id: item['id']
                    })
                })
                years.forEach(item=>{
                    arr.push({
                        year: item,
                        list:[],
                        isopen: false
                    })
                })
                arr.forEach(item=>{
                    if(item['year']==year){
                        item['list']= qarr
                        item.isopen = true;
                    }
                })
                this.yearlist = arr;
                console.log(arr,qarr)
            })
        },
       getdetail(id){
            this.$http.get(infourl.replace('{id}',id)).then(res=>{
                this.detailInfo  = res.data;
                if(res.data.xipopPictorialArticleListVOList){
                    this.articlelist = res.data.xipopPictorialArticleListVOList
                }
                
            })
        },
        toarticle(it){
            console.log(it.id)
            this.$router.push({name:'article',params:{lmid:it.id,from:1}})
        }
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    mounted(){
        this.nowid = this.$route.params.id;
        this.nowyear = this.$route.params.year;
        this.getlist(this.nowyear)
        this.getdetail(this.nowid);
        window.scrollTo(0,0)
    }
}
</script>

<style lang='less'>
.cloudpage{
    background-color: #F5F6F7;
    padding: 30px 0 60px;
    .leftyearlist{
        width: 210px;
        background-color: #fff;
        color:#333;
        // .itemyear{
        //     border-bottom: 1px solid #eee;
        // }
        .year{
            height: 40px;
            line-height: 40px;
            padding:0 20px;
            border-bottom: 1px solid #eee;
            font-size: 16px;
            cursor: pointer;
            .iconbox{
                float: right;
            }
        }
        .itemlist{
            max-height: 566px;
            overflow-y: auto;
            cursor: pointer;
            
            >li{
                padding-left: 68px;
                height: 40px;
                font-size: 14px;
                line-height: 40px;
                margin: 6px 0;
                &:hover{
                    background-color: rgba(47,114,209,0.06);
                    color:#2F72D1;
                    border-right: 2px solid #2f72d1;
                }
                &.active{
                    background-color: rgba(47,114,209,0.06);
                    color:#2F72D1;
                    border-right: 2px solid #2f72d1;
                }
            }
            
        }
    }
    .rightcontitem{
        width: 980px;
        .topview{
            padding: 20px;
            margin-bottom: 10px;
            background-color: #fff;
            .imgbox{
                width: 228px;
                height: 308px;
                margin-right: 20px;
                // background-color: #ccc;
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                }
            }
            .intr{
                padding: 20px 0;
                font-size: 14px;
                color: #333;
                >li{
                    line-height: 20px;
                    margin-bottom: 10px;
                }
            }
        }
        .bottomlist{
            background-color: #fff;
            
            padding: 20px 0 0;
            .artbox{
                // max-height: 500px;
                padding-bottom: 20px;
                overflow-y: auto;
            }
            .mulu{
                padding-left: 20px;
                border-bottom: 1px solid #eee;
                >h2{
                    width: 60px;
                    text-align: center;
                    padding-bottom: 5px;
                    border-bottom: 3px solid #D8D8D8;
                    font-size: 16px;
                    color: #333;
                    line-height: 22px;
                }
                
            }
            .article{
                    padding-left: 20px;
                    padding-top: 20px;
                    >h3{
                        font-size: 16px;
                        color: #2F72D1;
                        line-height: 22px;
                        margin-bottom: 10px;
                    }
                    .titlelist{
                        li{
                            line-height: 20px;
                            margin-bottom: 10px;
                            font-size: 14px;
                            color: #333;
                            cursor: pointer;
                            &:hover{
                                color: #2F72D1;
                            }
                            &:last-child{
                                margin-bottom: 0;
                            }
                        }
                    }
                    
                }
        }
    }
}
.itemlist::-webkit-scrollbar{
    width: 4px;
    height: 4px;
}
.itemlist::-webkit-scrollbar-track{
    background: #eee;
    border-radius:2px;
}
.itemlist::-webkit-scrollbar-thumb{
    background: #D8D8D8;
    border-radius:2px;
}
// .artbox::-webkit-scrollbar{
//     width: 4px;
//     height: 4px;
// }
// .artbox::-webkit-scrollbar-track{
//     background: #eee;
//     border-radius:2px;
// }
// .artbox::-webkit-scrollbar-thumb{
//     background: #D8D8D8;
//     border-radius:2px;
// }
</style>