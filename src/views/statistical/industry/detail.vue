<template>
      <div class="industry-box">
        <div v-if="loading" v-loading.fullscreen.lock='loading' element-loading-background="rgba(51, 51, 51,0.6)" ></div>
        <div class="commonWidth clearfix">
            <div class="leftcondition">
                <div class="picbox">
                    <img :src="info.coverUrl" alt="">
                </div>
                <h3>{{info.title}}</h3>
                <p>更新时间：{{info.updateTime | dateFormat}}</p>
                <div class="shortintr">
                    简介：
                    <p>
                        {{info.brief}}
                    </p>
                </div>
            </div>
            <div class="right-content">
                <!-- <div class="searchbox">
                    <el-row>
                        <el-col :span="3">
                            <el-select v-model="selected" placeholder="请选择">
                                <el-option value='0' label="全部">全部</el-option>
                                <el-option value='1' label="申请号">申请号</el-option>
                                <el-option value='2' label="发明名称">发明名称</el-option>
                                <el-option value='3' label="申请日">申请日</el-option>
                                <el-option value='4' label="公开日">公开日</el-option>
                                <el-option value='5' label="申请人">申请人</el-option>
                                <el-option value='6' label="发明人">发明人</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="title" placeholder="专题库内检索"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <span class='search-btn'>搜索</span>
                        </el-col>
                    </el-row>
                </div> -->
                <div class="top clearfix">
                    <div class="counts fl">共<span class="color-blue">{{total}}</span>项专利</div>
                    <!-- <div class="sortlist fr">
                        <span>综合排序</span>
                        <span>时间排序</span>
                    </div> -->
                </div>
                <ul class="rightlist">
                    <li v-for="(item,key) in dataList" :key="key" @click ='toinfo(item)'>
                        <div class="topcont clearfix">
                            <div class="picbox fl">
                                <img :src="item.abstractFigure" alt="">
                            </div>
                            <div class="intr fr">
                                <h3>【{{item.typeName}}】{{item.title}}</h3>
                                <ul class="info">
                                    <li>申请号：{{item.applicationDocNum}}</li>
                                    <li>申请日：{{item.applicationDate}}</li>
                                    <li>公开/公告号：{{item.publicationDocNum}}</li>
                                    <li>公开/公告日：{{item.publicationDate}}</li>
                                    <li>申请人：{{item.applicant}}</li>
                                    <li>发明人：{{item.inventor}}</li>
                                    <li>代理人：{{item.agentPersonName}}</li>
                                    <li>分类号：{{item.ipcList.join(',')}}</li>
                                    <li>代理机构：{{item.agentName}}</li>
                                </ul>
                            </div>
                        </div>
                        <p>
                            摘要：{{item.abstractDesc}}
                        </p>
                    </li>
                    
                </ul>
                <div class="mypagination" v-if="dataList.length">
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
    </div>
</template>

<script>
const detailUrl = './api/findPatentArticleDetail/{number}'
const listUrl = './api/findMatchPatentList'
import $ from 'jquery'
import { filters } from 'utils/'
export default {
    data(){
        return {
            pgIndex:1,
            pgCount:10,
            total: 0,
            loading: false,
            selected:'',
            title:'',
            dataList:[],
            query:{},
            info:{},
            number:'',
        }
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
    },
    mounted(){
        this.number = this.$route.params.id
        this.getDetail();
        this.searchpage()
       
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods:{
        toinfo(it){
            this.$router.push({name:'industrypatentdetail',params:{id:it.applicationDocNum,country: it.country,num:it.publicationDocNum,tp:it.type}})
            // window.open(CONFIG.indexUrl+'/#/search/patentdetail?id='+it.applicationDocNum+'&country='+it.country+'&userId='+localStorage.getItem('userId'))
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
        getDetail(){
            this.$http.get(detailUrl.replace('{number}',this.number)).then(res=>{
                this.info = res.data
            })
        },
        handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.query.number= this.number
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
    }
}
</script>

<style lang='less'>
@media screen and (min-width: 768px){
    

.industry-box{
    background-color: #F5F6F7;
    padding-top: 30px;
    padding-bottom: 50px;
    .top{
        padding-left: 20px;
        margin-top: 20px;
        height:20px;
        font-size:14px;
        font-family:'PingFangSC-Regular','PingFang SC';
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:20px;
        margin-bottom: 20px;
        .color-blue{
            padding: 0 5px;
            color: #2F72D1
        }
    }
    .middle{
        padding-top: 10px;
    }
    .counts{
        
        font-size: 14px;
    }
    .sortlist{
        color: #999;
        span{
            display: inline-block;
            font-size: 14px;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #eee;
            margin-left: 10px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
    .leftcondition{
        float: left;
        width: 210px;
        height: 900px;
        padding: 20px;
        background-color: #fff;
        color:#666;
        .shortintr{

            color:#333;
            >P{
                text-indent:2em;
                color:#666
            }
        }
        >h3{
            height:22px;
            font-size:16px;
            font-family:'PingFangSC-Semibold','PingFang SC';
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:22px;
            margin-bottom: 5px;
        }
        .picbox{
            width: 170px;
            height: 170px;
            margin-bottom: 15px;
            // background-color: #ccc;
            img{
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
        >p{
            height:17px;
            margin-bottom: 20px;
            font-size:12px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:17px;
        }
    }
    .right-content{
        max-width: 980px;
        float: right;
        background-color: #fff;
        .searchbox{
            .el-input__icon{
                line-height: 30px;
            }
            .search-btn{
                display: inline-block;
                width: 80px;
                height: 30px;
                margin-left: 20px;
                line-height: 30px;
                text-align: center;
                background-color: #379dea;
                color:#fff;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
    .rightlist{
        // width: 940px;
        border-bottom: 1px solid #eee;
        >li{
            padding:20px 20px;
            border-top: 1px solid #eee;
            cursor:pointer;
            &:hover{
                box-shadow: 0 0 6px 0 #ccc;
            }
        }
        >p{
            font-size: 13px;
            color: #333;
            line-height: 24px;
        }
        .topcont{
            // margin-bottom: 10px;
            color: #999;
            .picbox{
                width:152px;
                height: 152px;
                // background-color: #ccc;
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                }
            }
            .intr{
                max-width:770px;
                h3{
                    height:20px;
                    font-size:14px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    line-height:20px;
                    margin-bottom: 10px;
                    color: #333;
                }
                .info{
                    height: 140px;
                    >li{
                        float: left;
                        width:50%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-bottom: 6px;
                        height:18px;
                        font-size:13px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:18px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
                .state{
                    display: inline-block;
                    width: 60px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 12px;
                    color:#fff;
                    background-color: #379dea;
                    border-radius: 10px;
                    vertical-align: middle;
                }
                .tit{
                    display: inline-block;
                    max-width: 400px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 20px;
                    vertical-align: middle;
                }
                .collect{
                    float: right;
                    vertical-align: middle;
                    line-height: 20px;
                    i{
                        color: #379dea;
                    }
                }
            }
        }
    }
}
}

@media screen and (max-width: 768px) {
    
.industry-box{
    background-color: #F5F6F7;
    padding-top: 30px;
    padding-bottom: 50px;
    .top{
        padding-left: 20px;
        margin-top: 20px;
        height:20px;
        font-size:14px;
        font-family:'PingFangSC-Regular','PingFang SC';
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:20px;
        margin-bottom: 20px;
        .color-blue{
            padding: 0 5px;
            color: #2F72D1
        }
    }
    .middle{
        padding-top: 10px;
    }
    .counts{
        
        font-size: 14px;
    }
    .sortlist{
        color: #999;
        span{
            display: inline-block;
            font-size: 14px;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #eee;
            margin-left: 10px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
    .leftcondition{
        width: 100%;
        padding: 10px;
        background-color: #fff;
        color:#666;
        .shortintr{

            color:#333;
            >P{
                text-indent:2em;
                color:#666
            }
        }
        >h3{
            height:22px;
            font-size:16px;
            font-family:'PingFangSC-Semibold','PingFang SC';
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:22px;
            margin-bottom: 5px;
        }
        .picbox{
            width: 170px;
            height: 170px;
            margin-bottom: 15px;
            // background-color: #ccc;
            img{
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
        >p{
            height:17px;
            margin-bottom: 20px;
            font-size:12px;
            font-family:'PingFangSC-Regular','PingFang SC';
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:17px;
        }
    }
    .right-content{
        width: 100%;
        padding: 10px;
        background-color: #fff;
        .searchbox{
            .el-input__icon{
                line-height: 30px;
            }
            .search-btn{
                display: inline-block;
                width: 80px;
                height: 30px;
                margin-left: 20px;
                line-height: 30px;
                text-align: center;
                background-color: #379dea;
                color:#fff;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
    .rightlist{
        // width: 940px;
        border-bottom: 1px solid #eee;
        >li{
            padding-bottom:20px;
            border-top: 1px solid #eee;
        }
        >p{
            font-size: 14px;
            color: #333;
            line-height: 24px;
        }
        .topcont{
            // margin-bottom: 10px;
            color: #999;
            .picbox{
                width:152px;
                height: 152px;
                // background-color: #ccc;
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                }
            }
            .intr{
                // max-width:770px;
                width: 100%;
                h3{
                    // height:20px;
                    font-size:14px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    line-height:20px;
                    margin-bottom: 10px;
                    color: #333;
                }
                .info{
                    // height: 140px;
                    >li{
                        // float: left;
                        width:100%;
                        margin-bottom: 6px;
                        font-size:13px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:18px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
                .state{
                    display: inline-block;
                    width: 60px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 12px;
                    color:#fff;
                    background-color: #379dea;
                    border-radius: 10px;
                    vertical-align: middle;
                }
                .tit{
                    display: inline-block;
                    max-width: 400px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 20px;
                    vertical-align: middle;
                }
                .collect{
                    float: right;
                    vertical-align: middle;
                    line-height: 20px;
                    i{
                        color: #379dea;
                    }
                }
            }
        }
    }
}
}
</style>