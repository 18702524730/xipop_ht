<template>
<div class="industrydatabox">


  <div class="industrydata">
        <ul class="latest clearfix">
            <li v-for="(item,index) in datas" :key="index" @click="todetail(item)">
                <div class="picbox">
                    <img :src="item.coverUrl" alt="">
                    <div class="titlebox">
                        <h3 class="title">{{item.title}}</h3>
                    </div>
                </div>
            </li>
        </ul>
        <h2>最新专题库<span class="english">LIBRARY</span> </h2>
        <ul class="cont">
            <li v-for="(item,index) in dataList" :key="index" @click="todetail(item)">
                <div class="leftpic">
                    <img :src="item.coverUrl" alt="">
                </div>
                <div class="rightcont">
                        <h3>{{item.title}}</h3>
                        <p>{{item.brief}}</p>
                        <p class="time">更新时间：{{item.updateTime | dateFormat}}</p>
                </div>
                <div class="result" >
                    共<span class="count">{{item.patentCount}}</span> 项专利
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
import $ from 'jquery'
import { filters } from 'utils/'
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
    methods:{
        todetail(it){
            this.$router.push({name:'industrydetail',params:{id:it.number}})
        },
        getRecom(){
            let data ={
            type: 1
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
            this.query.type=1
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
    mounted(){
        this.getRecom();
        this.searchpage()
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
    },
}
</script>

<style lang='less'>
@media screen and (min-width: 768px){
.industrydatabox{
    padding-top: 30px;
    padding-bottom: 50px;
    background-color: #F5F6F7;
    .el-pager li{
        background-color: #F5F6F7;
    }
    .el-pagination .btn-prev ,.btn-next{
        background-color: #F5F6F7;
    }
    .el-pagination button:disabled{
        background-color: #F5F6F7;
    }
}
.industrydata{
    max-width: 1200px;
    margin: 0 auto;
    
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
                box-shadow: 4px 4px 13px 4px #ccc;
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
            .titlebox{
                height: 48px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 14px 20px;
                background-color: #000;
                opacity: 0.6;
            }
            .title{
                color: #fff;
                font-size: 14px;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
            .leftpic{
                float: left;
                width: 100px;
                height: 100px;
                margin-right: 20px;
                // background-color: #ccc;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .rightcont{
                float: left;
                max-width: 800px;
                h3{
                    padding-top: 10px;
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #333;
                    line-height: 22px;
                    font-weight: 600;
                    &:hover{
                        color: #2F72D1;
                    }
                }
                p{
                    line-height: 20px;
                    font-size: 14px;
                    height: 20px;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // display: -webkit-box;
                    // overflow: hidden;  
                    // -webkit-line-clamp: 2;
                    // -webkit-box-orient: vertical;
                }
                .time{
                    color: #999;
                }
                
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
}
@media screen and (max-width: 768px){
    .industrydatabox{
    padding-top: 30px;
    padding-bottom: 50px;
    background-color: #F5F6F7;
    .el-pager li{
        background-color: #F5F6F7;
    }
    .el-pagination .btn-prev ,.btn-next{
        background-color: #F5F6F7;
    }
}
.industrydata{
    max-width: 1200px;
    margin: 0 auto;
    
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
                box-shadow: 6px 6px 6px  #666;
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
            .titlebox{
                height: 48px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: 14px 20px;
                background-color: #000;
                opacity: 0.6;
            }
            .title{
                color: #fff;
                font-size: 14px;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
            .leftpic{
                float: left;
                width: 100px;
                height: 100px;
                margin-right: 20px;
                // background-color: #ccc;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .rightcont{
                float: left;
                max-width: 220px;
                h3{
                    padding-top: 10px;
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #333;
                    line-height: 22px;
                    font-weight: 600;
                    &:hover{
                        color: #2F72D1;
                    }
                }
                p{
                    line-height: 20px;
                    font-size: 14px;
                    height: 20px;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // display: -webkit-box;
                    // overflow: hidden;  
                    // -webkit-line-clamp: 2;
                    // -webkit-box-orient: vertical;
                }
                .time{
                    color: #999;
                }
                
            }
            .result{
                display: none;
                // float: right;
                // max-width: 60px;
                // font-size: 14px;
                // padding-top: 36px;
            }
            .count{
                color:#2F72D1;
                font-size: 16px;
                font-weight: 300;
                
                // word-break: break-all;
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
}
</style>