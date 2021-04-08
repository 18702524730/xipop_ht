<template>
    <div class="trademarkdetail">
      <!-- <div class="commonWidth ordinary-search-trademarkdetail" >
            <div class="search-select">
                <span v-for="(item,index) in search" :key="index" @click="xuanze(item)" :class="{active: now==item.id}">{{item.name}}</span>
            </div>
        <div class="search-box">
            <div class="left-search">
                <el-input placeholder="请输入要查询的专利名称/申请号" v-model="patent" v-if="now==1">
                    <el-button slot="append" @click="onSearch(1)"><i class="el-icon-search"></i></el-button>
                </el-input>
                <el-input placeholder="请输入要查询的商标名称、申请号、申请人等信息" v-model="mark" v-if="now==2">
                    <el-button slot="append" @click="onSearch(2)"><i class="el-icon-search"></i></el-button>
                </el-input>
                <el-input placeholder="请输入内容" v-model="cont" v-if="now==3">
                    <el-select v-model="selected" slot="prepend" placeholder="请选择">
                        <el-option value='1' label="裁判文书">裁判文书</el-option>
                        <el-option value='2' label="复审无效">复审无效</el-option>
                    </el-select>
                    <el-button slot="append" @click="onSearch(3)"><i class="el-icon-search"></i></el-button>
                </el-input>
            </div>
            <p class="senior" @click="tosenior">
                高级搜索
            </p>
        </div>
        <div class="areas" v-if="now==1">
            <el-row>
                <el-checkbox-group v-model="checkedCities">
                    <el-col :span='4'><el-checkbox  label="1" key="1">国内</el-checkbox></el-col>
                    <el-col :span='6'><el-checkbox  label="2" key="2">国外及港澳台地区</el-checkbox></el-col>
                </el-checkbox-group>
            </el-row>
        </div>
      </div> -->
      <div class="commonWidth pdb10">
        <div class='combox'>
                <div class="xlogobox">
                    <div class="logobox">
                        <div class="logo">
                            <a :href="homeUrl" target="_blank"><img src="~assets/img/logoa.png" alt=""></a>
                        </div>
                        <div class="textbox">
                            <p>厦门知识产权</p>
                            <p>运营公共服务平台</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div class="banner">
          <div class="markcontent clearfix">
              <div class="logoboxs">
                  <img :src="detailInfo.logoUrl" alt="">
              </div>
              <div class="mark">
                  <h3>{{detailInfo.name}}</h3>
                  <div class="intr">
                    当前状态：<span style="color: #F08B2F;">{{detailInfo.processName}}</span> 商品类别：<span>{{detailInfo.typeCodeName}}</span> 申请号：<span>{{detailInfo.dataId}}</span>
                  </div>
              </div>
              <span class="collects" @click="addCollect" v-if="detailInfo.isCollect==0"><i class="el-icon-star-off"></i>收藏</span>
              <span class="collect" @click="cancelCollect" v-if="detailInfo.isCollect==1"><i class="el-icon-star-on"></i>取消收藏</span>
          </div>
          
      </div>
        <div class="commonWidth">
            <ul class="displayflex tradesteps">
                <li :class="{active:thestep>0}">
                    <h3>商标申请</h3>
                    <h3 class="date">{{detailInfo.createDate}}</h3>
                    <div class="circlebox">
                        <span class="circle"></span>
                        <div class="line linefirst">
                        </div>
                    </div>
                </li>
                <li :class="{active:thestep>1}">
                    <h3>初审公告</h3>
                    <h3 class="date">{{detailInfo.noticeDate||'--'}}</h3>
                    <div class="circlebox">
                        <span class="circle"></span>
                        <div class="line linecenter">
                        </div>
                    </div>
                </li>
                <li :class="{active:thestep>2}">
                    <h3>已注册</h3>
                    <h3 class="date">{{detailInfo.registerDate||'--'}}</h3>
                    <div class="circlebox">
                        <span class="circle"></span>
                        <div class="line linecenter">
                        </div>
                    </div>
                </li>
                <li :class="{active:thestep>3}">
                    <h3>终止</h3>
                    <h3 class="date">{{detailInfo.trademarkStopDate||'--'}}</h3>
                    <div class="circlebox">
                        <span class="circle"></span>
                        <div class="line linelast">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="commonWidth">
            <div class="tablebox">
                <table>
                    <tbody>
                        <tr>
                            <td class="leftname">商标名称</td>
                            <td class="rightcont" colspan="3">{{detailInfo.name}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">法律状态</td>
                            <td class="rightpart" style="color:#379dea;">{{detailInfo.processName}}</td>
                            <td class="leftname">申请号</td>
                            <td>{{detailInfo.dataId}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">商品类别</td>
                            <td class="rightpart">{{detailInfo.typeCodeName}}</td>
                            <td class="leftname">申请日期</td>
                            <td>{{detailInfo.createDate}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">申请人名称</td>
                            <td class="rightcont" colspan="3">{{detailInfo.applicant}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">申请人地址</td>
                            <td class="rightcont" colspan="3">{{detailInfo.adress}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">申请人名称（英文）</td>
                            <td class="rightcont" colspan="3">{{detailInfo.applicantEn}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">申请人地址（英文）</td>
                            <td class="rightcont" colspan="3">{{detailInfo.enAdress}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">商品图片</td>
                            <td class="rightpart"><div class="pic"><img :src="detailInfo.logoUrl" alt=""></div></td>
                            <td class="leftname">图片要素</td>
                            <td>
                                <ul v-if="detailInfo.imageElement">
                                    <li v-for="(item,key) in detailInfo.imageElement" :key="key">{{item}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="leftname">商品/服务项目</td>
                            <td class="rightcont" colspan="3">
                                <ul class="product" v-if="detailInfo.productService">
                                    <li v-for="(item,key) in detailInfo.productService" :key="key">{{item}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="leftname">初审公告期号</td>
                            <td class="rightpart">{{detailInfo.noticeIssue}}</td>
                            <td class="leftname">初审公告日期</td>
                            <td>{{detailInfo.noticeDate}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">注册公告期号</td>
                            <td class="rightpart">{{detailInfo.registerIssue}}</td>
                            <td class="leftname">注册公告日期</td>
                            <td>{{detailInfo.registerDate}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">专用权期限</td>
                            <td class="rightpart">{{detailInfo.privateStartDate}}至{{detailInfo.privateEndDate}}</td>
                            <td class="leftname">是否共有商标</td>
                            <td>{{detailInfo.ifShareTrademark}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">后期制定日期</td>
                            <td class="rightpart">{{detailInfo.hqzdrqDate}}</td>
                            <td class="leftname">国际注册日期</td>
                            <td>{{detailInfo.gjzcrqDate}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">优先权日期</td>
                            <td class="rightpart">{{detailInfo.yxqrqDate}}</td>
                            <td class="leftname">代理人名称</td>
                            <td>{{detailInfo.agency}}</td>
                        </tr>
                        <tr>
                            <td class="leftname">商标状态</td>
                            <td class="rightcont" colspan="3">
                                <ul class="trademarks" v-if="detailInfo.trademarkState">
                                    <li v-for="(item,key) in detailInfo.trademarkState" :key="key">{{item}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="leftname">商标公告</td>
                            <td class="rightcont" colspan="3">
                                <ul class="trademarks" v-if="detailInfo.trademarkNotice">
                                    <li v-for="(item,key) in detailInfo.trademarkNotice" :key="key">{{item}}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="tips">
                    *商标查询信息仅供参考，实际以国家商标局为准
                </div>
            </div>
            
        </div>
    </div>  
</template>

<script>
const detailUrl = './api/findTrademarkDetail/{dataId}'
const homeUrl = CONFIG.homeUrl
const addCollectUrl ='./api/addMyCollect'
const cancelCollectUrl ='./api/cancelMyCollect'
import $ from 'jquery'
export default {
    data(){
        return {
            homeUrl:homeUrl,
            allshow: true,
            thestep: 4,
            time:'2017-08-09',
            label:['普通搜索','高级搜索'],
            checkedCities:['1','2'],
            checkedTypes:[],
            checkedCountries:[],
            types:[{name:'发明专利',id:11,num:250},{name:'实用新型',id:12,num:256}],
            conditions:[],
            now:1,
            patent:'',
            mark:'',
            cont:'',
            selected:'',
            current:0,
            world: false,
            all:false,
            china:false,
            search:[{name:'专利检索',id:1},{name:'商标检索',id:2}],
            detailInfo:{},
            loading: false,
            detailId:''
        }
    },
    mounted(){
        window.scrollTo(0,0)
        // let url = window.location.href 
        // this.detailId = url.split('detailId=')[1]
        let that = this;
        window.addEventListener('message',function(event){
            if(event.data.type=='userId'){
                let uid= event.data.userId;
                localStorage.setItem('userId',uid);
                // that.getDetail()
            }
            if(event.data.type=='logout'){
                localStorage.removeItem('userId');
            }
        })
        this.detailId = this.$route.params.id;
        this.getDetail()
    },
    updated(){
         let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods:{
        addCollect(){
            let uid = localStorage.getItem('userId')
            if(uid){
                let data = {
                    collectType: 2,
                    processName: this.detailInfo.processName,
                    logoUrl: this.detailInfo.logoUrl,
                    typeCodeName: this.detailInfo.typeCodeName,
                    createDate: this.detailInfo.createDate,
                    applicant: this.detailInfo.applicant,
                    detailId: this.detailId,
                    name: this.detailInfo.name,
                }
                this.$http.post(addCollectUrl,data).then(res=>{
                    this.detailInfo.isCollect = 1
                    this.$message.success('收藏成功');
                }).catch(err=>{
                    this.$message(err.response.data.msg)
                })
            }else{
                window.parent.postMessage('login','*')
            }
        },
        cancelCollect(){
            let data = {
                collectType: 2,
                collectItemUuid: this.detailId,
            }
            this.$http.put(cancelCollectUrl,data).then(res=>{
                this.detailInfo.isCollect = 0
                this.$message('取消收藏成功');
            }).catch(err=>{
                this.$message(err.response.data.msg)
            })
        },
        onSearch(num){
            let re = {}
            if(num==1){
                if(!this.patent){
                    this.$message('请输入内容查询');
                    return
                }
                re.all = this.patent;
                if(this.checkedCities.length==0 || this.checkedCities.length==2){
                    re.category = ''
                }else{
                    re.category = this.checkedCities[0]
                }
                // re.searchType =1
                // this.$store.dispatch('set_patent',re)
                // this.$nextTick(()=>{
                //     this.$router.push({name:'patentsearch'})
                // })
                
                this.$router.push({path:'/search/patentsearch',query: re})
            }
            if(num==2){
                if(!this.mark){
                    this.$message('请输入内容查询');
                    return
                }
                re.q = this.mark;
                // this.$store.dispatch('set_trademark',re)
                // this.$nextTick(()=>{
                //     this.$router.push({name:'trademarksearch'})
                // })
                
                this.$router.push({path:'/search/trademarksearch',query: re})
            }
            if(num==3){
                if(!this.cont){
                    this.$message('请输入内容查询');
                    return
                }
                re.searchtype = this.selected;
                // this.$store.dispatch('set_trademark',re)
                // this.$nextTick(()=>{
                //     this.$router.push({name:'trademarksearch'})
                // })
                if(this.selected==1){
                    this.$router.push({path:'panli',query: re})
                }
                if(this.selected==2){
                    this.$router.push({path:'fushen',query: re})
                }
            }
        },
        tosenior(){
            this.$router.push({name:'seniorsearch'});
        },
       xuanze(it){
           this.now  = it.id
       },
        getDetail(){
            this.loading = true;
            this.$http.get(detailUrl.replace('{dataId}',this.detailId))
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                this.detailInfo = data;
                this.thestep = data.trademarkFlowState
            })
            .catch((err) => {
                this.loading = false;
                this.$message.error(err.response.data.msg)
            });
        },
    }
}
</script>

<style lang ='less'>
.color-red{
    color: red;
}
.trademarkdetail{
    .pdb10{
        padding-bottom: 20px;
    }
    .banner{
        height: 150px;
        background-color: #000;
        padding: 20px 0;
    }
    .logoboxs{
        float: left;
        width: 110px;
        height: 110px;
        margin-right: 20px;
        border-radius: 4px;
        background-color: #379dea;
        margin-bottom: 10px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .mark{
        float: left;
        padding: 30px 0;
        color:#fff;
        h3{
            /* height: 16px; */
            font-size: 16px;
            margin-bottom: 10px;
        }
        span{
            margin-right: 30px;
        }
        
    }
    .markcontent{
        width: 1200px;
        margin: 0 auto;
        padding: 0 100px;

    }
    .collects{
        float: right;
        height: 24px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        i{
            width: 16px;
            height: 16px;
        }
    }
    .collect{
        float: right;
        height: 24px;
        color: #379dea;
        cursor: pointer;
        font-size: 14px;
        i{
            width: 16px;
            height: 16px;
        }
    }
    .mysteps{
        padding: 30px 50px 30px 250px;
    }
    .tradesteps{
        background-color: #fff;
        padding: 20px 0;
        >li{
            width: 25%;
            text-align: center;
            color: #ccc;
            font-size: 14px;
            
            .date{
                font-weight: normal;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
            }
            &.active{
                color: #379dea;
            }
        }
        .circlebox{
            position: relative;
            height: 30px;
            overflow: hidden;
            .line{
                position: absolute;
                width: 100%;
                
                border-bottom: 2px solid #ccc;
            }
            .linefirst{
                top:14px;
                left: 50%;
            }
            .linelast{
                top:14px;
                right: 50%;
            }
            .linecenter{
                top:14px;
                left: 0;
            }
        }
        .circle{
            position: absolute;
            top: 5px;
            left: 50%;
            margin-left: -8px;
            width: 20px;
            border: 2px solid #fff;
            height: 20px;
            border-radius: 50%;
            background-color: #ccc;
            z-index: 2;
        }
        .active .circlebox .line{
            border-bottom: 2px solid #379dea;
        }
        .active .circlebox .circle{
            background-color: #379dea;
        }
    }
    .tablebox{
        padding: 20px 50px;
        background-color: #fff;
        table{
            border: 1px solid #ccc;
            border-collapse: collapse;
            font-weight: bold;
            font-size: 14px;
            td{
                padding: 10px 15px;
                border: 1px solid #ccc;
            }
            .leftname{
                background-color: #eee;
                width: 200px;
                color:#666;
            }
            .rightcont{
                width: 900px;
            }
        }
        .rightpart{
            width: 300px;
        }
        .pic{
            /* width: 100px;
            height: 100px; */
            /* background-color: #eee; */
            img{
                vertical-align: middle;
            }
        }
    }
    .product{
        overflow: hidden;
        >li{
            float: left;
            width: 50%;
            word-break: break-all;
        }
    }
    .trademarks{
        line-height: 30px;
    }
    .tips{
        padding: 10px 15px;
        font-size: 14px;
        color: #999;
    }
}
.ordinary-search-trademarkdetail{
    padding-top: 20px;
    min-height: 170px;
    padding-bottom: 30px;
    background-color: #fff;
    .el-select .el-input {
        width: 100px;
        height: 40px;
    }
    .el-input	.el-input__inner{
        height: 40px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    
}
.search-box{
    display:flex;
    width:700px;
    
    margin: 0 auto;
    justify-content: space-between;
    .senior{
        line-height: 40px;
        color:  #379dea;
        cursor: pointer;
        font-size: 16px;
    }
}
.left-search{
    width: 600px;
    
}
.search-select{
    width: 700px;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    /* margin-bottom: 10px; */
    font-size: 0;
    span{
        float: left;
        width: 102px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border:1px solid #eee;
        font-size: 14px;
        cursor: pointer;
    }
    span.active{
        border:none;
        background-color: #379dea;
        color: #fff;
    }
}
.areas{
    width: 700px;
    padding-top: 10px;
    margin: 0 auto;
    .ant-checkbox-group{
        width:100%;
    }
}
</style>