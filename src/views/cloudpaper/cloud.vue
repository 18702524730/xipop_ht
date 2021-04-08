<template>
    <div id='scrollbox'>
        <div class="bannerbox" v-if="blist&&blist.length">
            <el-carousel trigger="click" height="450px" arrow="never" interval="5000">
                <el-carousel-item v-for="(item,key) in blist" :key="key">
                    <a v-if="item.bannerUrl" :href='item.bannerUrl' target='_blank'> <img :src="item.bannerPic" alt=""></a>
                    <img v-else :src="item.bannerPic" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="commonWidth" style="padding-bottom: 50px;">
            <!-- <div class="tuijian" v-if="list&&list.length">
                <h3 class="title">推荐画报</h3>
                <div class="totalbox">
                    <span class="prev" v-if="list.length>4" @click="checknext('prev')"><i class="el-icon-arrow-left"></i></span>
                    <span class="next" v-if="list.length>4" @click="checknext('next')"><i class="el-icon-arrow-right"></i></span>
                    <div class="illustratedbox">
                        <ul class="illustrated" id="illustrated">
                            <li v-for="(item,key) in list" :key="key" @click="toinfo(item)">
                                <div class="imgbox">
                                    <img :src="item.journalCover" alt="">
                                </div>
                                <p>{{item.journalName}}</p>
                                <span>{{item.journalIssue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div> -->
            <ul class="yearbox" v-if="years&&years.length">
                <li v-for="(item,key) in years" :key="key" :class="{active: current==key}" @click="changeyear(item,key)">{{item}}</li>
            </ul>
            <div class="itemyearbox">
                <ul class="itemyear">
                    <li v-for="(item,key) in dataList" :key="key" @click="toinfo(item)">
                        <div class="imgbox">
                            <img :src="item.journalCover" alt="">
                        </div>
                        <p>{{item.journalName}}</p>
                        <span>{{item.journalIssue}}</span>
                    </li>
                </ul>
            </div>
            <div class="mypagination" v-if="dataList.length>8">
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
const listUrl = './api/pictorial/bannerList'
const tlistUrl = './api/pictorial/journalList'
const yearlist = './api/pictorial/journalYearList'
import $ from 'jquery'
export default {
    data(){
        return {
            list:[
            ],
            banners:[
            ],
            blist:[],
            years:[
            ],
            current: 0,
            hasnext: false,
            hasprev: false,
            pgIndex:1,
            pgCount:8,
            total: 0,
            dataList:[],
            loading: false,
            nowindex:0,
            nowyear: '',
            query:{}
        }
    },
    methods:{
        changeyear(it,key){
            this.current = key;
            this.nowyear = it;
            this.searchpage()
        },
        checknext(type){

            var oul = document.getElementById('illustrated');
            if(oul){
            var ali = oul.getElementsByTagName('li')
            var ow = ali[0].offsetWidth
            var long  = (ow + 20) * ali.length
            oul.style.width = long +'px';
            var off = long -1200 -20;
            var left =oul.offsetLeft;
            if(type=='prev'){
                this.nowindex--;
                if(this.nowindex<=-1){
                    this.hasprev = false;
                    this.hasnext = true;
                    this.nowindex =0
                    return
                }
                
                left += (ow + 20)
                oul.style.left =left +'px'
            }
            if(type=='next'){
                this.nowindex++;
                if(this.nowindex>=(this.list.length-3)){
                    this.hasprev = true;
                    this.hasnext = false;
                    this.nowindex = this.list.length-4
                    return
                }
                left -= (ow + 20)
                oul.style.left =left +'px'
            }
            if(this.nowindex<=0){
                this.hasnext = true;
                this.hasprev = false
            }
            if(this.nowindex>0&&this.nowindex<(this.list.length-4)){
                this.hasnext = true;
                this.hasprev = true;
            }
            if(this.nowindex>=(this.list.length-4)){
                this.hasnext = false;
                this.hasprev = true;
            }
            }
        },
        toinfo(it){
            this.$router.push({name:'cloudlist',params:{id:it.id,year:it.journalYear}})
        },
        getbanner(){
            let data = {
                isTime:1,
                from: 2,
            }
            this.$http.get(listUrl,{params:data}).then(res=>{
                this.blist = res.data.elements
            })
        },
        getrecom(){
            let tdata = {
                isRecommend: 1
            }
            this.$http.get(tlistUrl,{params:tdata}).then(res=>{
                this.list = res.data.elements;
                if(this.list&&this.list.length){
                    this.$nextTick(()=>{
                        this.checknext()
                    })
                }
            })
        },
        getyears(){
            this.$http.get(yearlist).then(res=>{
                this.years = res.data;
                this.nowyear = this.years[0];
                this.searchpage()
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
            this.query = re
        },
        handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
                this.query.journalYear= this.nowyear,
                this.query.pgIndex=this.pgIndex,
                this.query.pgCount= this.pgCount
            
            this.$router.replace({query:this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(tlistUrl, {params: paramsData})
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                var dataList = data.elements;
                this.dataList = dataList;
                this.pgIndex = data.pageNum || 1;
                this.total = data.totalElements;
            })
            .catch((err) => {
                this.loading = false;
                this.$message.error(err.response.data.msg)
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
        this.getquery()
        this.getbanner()
        // this.getrecom()
        this.getyears()
        // console.log(navigator)
        // this.checknext();
    }
}
</script>

<style lang='less'>
.bannerbox{
    height: 450px;
    margin: 0 auto;
    img{
        height: 100%;
        width: 100%;
    }
    .el-carousel__button{
        width:10px;
        height: 10px;
        border-radius: 50%;
    }
}
.tuijian{
    margin-bottom: 20px;
    padding-top: 40px;
    .title{
        font-size: 20px;
        font-weight: bold;
        color: #333;
        height: 28px;
        line-height: 28px;
        margin-bottom: 20px;
    }
    .imgbox{
        height: 385px;
        width: 100%;
        margin-bottom: 20px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .totalbox{
        position: relative;
        >span{
            position: absolute;
            width: 24px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            background-color: #eee;
            color:#999;
            z-index: 999;
            font-size: 24px;
            &:hover{
                background-color: #2F72D1;
                color: #fff;
                cursor: pointer;
            }
        }
        .prev{
            left: -24px;
            top: 150px;
        }
        .next{
            right: -24px;
            top: 150px;
        }
    }
    .illustratedbox{
        width: 1200px;
        height: 490px;
        overflow: hidden;
        position: relative;
        
    }
    .illustrated{
        position: absolute;
        left: 0;
        top: 0;
        width: 19000px;
        transition: left 0.5s linear;
        >li{
            float: left;
            width: 285px;
            height: 470px;
            border: 1px solid #eee;
            margin-right: 20px;
            
            background-color: #F5F6F7;
            cursor: pointer;
            >p{
                font-size: 14px;
                color:#333;
                font-weight: bold;
                line-height: 20px;
                margin-bottom: 5px;
                padding-left: 20px;
                padding-right: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            >span{
                padding-left: 20px;
                line-height: 20px;
                color: #999;
                font-size: 14px;
                margin-bottom: 20px;
            }
            &:hover{
                box-shadow: 0 6px 15px  #ccc;
                >p{
                    color: #2F72D1;
                }
            }
        }
    }
}
.itemyearbox{
    overflow: hidden;
    margin-right: -20px;
    .imgbox{
        height: 385px;
        width: 100%;
        margin-bottom: 20px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .itemyear{
        >li{
            float: left;
            width: 285px;
            height: 470px;
            border: 1px solid #eee;
            margin-right: 20px;
            margin-bottom: 20px;
            background-color: #F5F6F7;
            cursor: pointer;
            >p{
                font-size: 14px;
                color:#333;
                font-weight: bold;
                line-height: 20px;
                margin-bottom: 5px;
                padding-left: 20px;
                padding-right: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            >span{
                padding-left: 20px;
                line-height: 20px;
                color: #999;
                font-size: 14px;
                margin-bottom: 20px;
            }
        }
    }
}
.yearbox{
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    height: 40px;
    >li{
        float: left;
        width: 70px;
        height: 40px;
        padding-top: 10px;
        text-align: center;
        padding-bottom: 5px;
        font-size: 16px;
        color: #999;
        cursor: pointer;
        &.active{
            padding-top: 4px;
            font-size: 20px;
            color: #2F72D1;
            border-bottom: 2px solid #2F72D1;
        }
    }
}
</style>