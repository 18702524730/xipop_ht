<template>
  <div class="patentreport">
    <div class="commonWidth">
        <ul class="latest clearfix">
            <li v-for="(item,index) in datas" :key="index" @click="todetail(item)">
                <div class="picbox">
                    <img :src="item.coverUrl" alt="">
                    <div class="intr">
                        <h3 class="title">{{item.title}}</h3>
                        <div class="source">
                            <span class="date">{{item.publishTime|dateFormat}}</span>
                            <span class="author">作者：{{item.author}}</span>
                            <!-- <span>{{item.source}}</span> -->
                        </div>
                    </div>
                </div>
                
            </li>
        </ul>
        <ul class="cont" v-loading='loading'>
            <li v-for="(item,index) in dataList" :key="index" @click="todetail(item)">
                <div class="leftpic">
                    <img :src="item.coverUrl" alt="">
                </div>
                <div class="rightcont">
                    <h3>{{item.title}}</h3>
                    <p>{{item.brief}}</p>
                    <p class="btm">
                        <span class="date">{{item.publishTime|dateFormat}}</span>
                        <span class="author">作者：{{item.author}}</span>
                        <!-- <span>{{item.source}}</span> -->
                    </p>
                </div>
            </li>
        </ul>
        <div class="mypagination" v-if="dataList.length&&!loading">
            <el-pagination
                @current-change='handleCurrentChange'
                :page-size="pgCount"
                :current-page.sync="pgIndex"
                layout="total,prev, pager, next"
                :total="total"
                class="fr"
                >
            </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
const  recomUrl ='./api/findRecommend'
const  listUrl ='./api/findPatentArticleList'
import { filters } from 'utils/'
import $ from 'jquery'
export default {
    data(){
        return {
            datas:[
            ],
            dataList:[
            ],
            pgIndex:1,
            pgCount:10,
            total: 0,
            loading: false,
            query:{}
        }
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
    },
    methods:{
        todetail(it){
            let url = CONFIG.indexUrl+'/#/statistical/patentbox/patent/'+it.number+'?userId='+localStorage.getItem('userId')
            window.parent.postMessage(
                'openTab' + url,
                '*'
            );
                // this.$router.push({name:'reportdetail',params:{id: it['number']}})
        },
        getRecom(){
            let data ={
            type: 2
            }
            this.$http.get(recomUrl,{params:data}).then(res=>{
            this.datas= res.data
            })
        },
        getquery(){
                var re ={};
                if(this.$route.query){
                    var q = this.$route.query;
                    for(var k in q){
                        if(q.hasOwnProperty(k)){
                            if(q[k]){
                                re[k]= q[k]
                            }
                        }
                    }
                }
                this.query = re;
        },
        handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.query.sortType = 2;
            this.query.type=2
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(listUrl, {params: paramsData})
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                var dataList = data.elements;
                this.dataList = dataList;
                this.pg_index = data.pageNo || 1;
                this.total = data.totalElements;
            })
            .catch((err) => {
                this.loading = false;
                this.$message(err.response.data.msg)
            });
        },
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    mounted(){
        this.getRecom()
        this.searchpage()
    }
}
</script>

<style lang='less'>
.patentreport{
    background-color: #F5F6F7;
    padding-top: 30px;
    padding-bottom: 50px;
    .el-pager li{
        background-color: #F5F6F7;
    }
    .el-pagination .btn-prev ,.btn-next{
        background-color: #F5F6F7;
    }
    .el-pagination button:disabled{
        background-color: #F5F6F7;
    }
    .latest{
        margin-bottom: 20px;
        >li{
            float: left;
            width: 285px;
            height: 285px;
            // background-color: #ccc;
            margin-right: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            &:last-child{
                margin-right: 0;
            }
            &:hover{
                box-shadow: 6px 6px 8px #ccc;
            }
        }
        .picbox{
            position: relative;
            width: 285px;
            height: 285px;
            // background-color: #ccc;
            img{
                width:100%;
                height: 100%;
                vertical-align: top
            }
            .intr{
                height: 69px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 14px 20px;
                background-color: #000;
                opacity: 0.6;
                color:#fff;
            }
            .title{
                color: #fff;
                font-size: 14px;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-family:PingFangSC-Regular,PingFang SC;
            }
            .source{
                height:17px;
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:17px;
            }
        }
    }
    h2{
        height: 28px;
        margin-bottom: 20px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 600;
        color: #333;
        font-family:'PingFangSC-Semibold','PingFang SC';
        .english{
            font-size: 14px;
            line-height: 20px;
            color:  #999;
            font-weight: 600;
            padding-left: 10px;
        }
    }
    .cont{
        margin-bottom: 30px;
        >li{
            height: 120px;
            padding: 10px;
            margin-bottom: 20px;
            background-color: #fff;
            cursor: pointer;
            &:hover{
                box-shadow: 0 0 8px #ccc;
            }
            .leftpic{
                float: left;
                width: 100px;
                height: 100px;
                margin-right: 20px;
                background-color: #ccc;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .rightcont{
                float: left;
                max-width: 800px;
                >h3{
                    margin-top: 10px;
                    margin-bottom: 10px;
                    height:22px;
                    font-size:16px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    color:#333;
                    line-height:22px;
                    &:hover{
                        color: #2F72D1;
                    }
                }
                p{
                    line-height: 20px;
                    font-size: 14px;
                    max-width: 800px;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    color:#333;
                    // display: -webkit-box;
                    // overflow: hidden;  
                    // -webkit-line-clamp: 2;
                    // -webkit-box-orient: vertical;
                }
                .btm{
                    height:20px;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:#999;
                    line-height:20px;
                }
                .time{
                    color: #999;
                }
                .result{
                    float: right;
                    padding-top: 36px;
                }
                .count{
                    color:#2F72D1;
                    font-size: 20px;
                    font-weight: 300;
                }
            }
        }
    }
    .date{
        margin-right: 20px;
    }
    .author{
        margin-right: 10px;
    }
}
.mypagination{
    position: relative;
    padding-top: 20px;
}
</style>