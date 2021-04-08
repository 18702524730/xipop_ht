<template>
    <div class="commonWidth">
      <div class="ordinary-search-trademark" >
          <!-- <div class="xlogobox fl">
            <div class="logobox">
                <div class="logo">
                    <a :href="homeUrl" target="_blank"><img src="~assets/img/logoa.png" alt=""></a>
                </div>
                <div class="textbox">
                    <p>厦门知识产权</p>
                    <p>运营公共服务平台</p>
                </div>
            </div>
          </div> -->
          <div class="xrightpart">
                <!-- <div class="search-select">
                    <span v-for="(item,index) in search" :key="index" @click="xuanze(item)" :class="{active: now==item.id}">{{item.name}}</span>
                </div> -->
                <div class="search-box">
                
                <div class="left-search">
                    <el-input placeholder="请输入要查询的内容，如申请号、公开公告号、申请（权利）人、发明人、关键字" v-model="patent" v-if="now==1" @keyup.enter.native="onSearch(1)">
                        <el-button slot="append" @click="onSearch(1)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                    <el-input placeholder="请输入要查询的商标名称、申请号、申请人等信息" v-model="mark" v-if="now==2" @keyup.enter.native="onSearch(2)">
                        <el-button slot="append" @click="onSearch(2)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                    <el-input placeholder="请输入要查询的专利申请号，示例：200930172778" v-model="cont" v-if="now==3" @keyup.enter.native="onSearch(3)">
                        <el-select v-model="selected" slot="prepend" placeholder="请选择" class='fl'>
                            <el-option value='2' label="复审无效">复审无效</el-option>
                            <el-option value='1' label="裁判文书">裁判文书</el-option>
                        </el-select>
                        <el-button slot="append" @click="onSearch(3)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                    <div class="areas" v-if="now==1">
                        <el-row>
                            <el-checkbox-group v-model="checkedCities">
                                <el-col :span='4'><el-checkbox  label="cn" key="cn">国内</el-checkbox></el-col>
                                <el-col :span='6'><el-checkbox  label="docdb" key="docdb">国外及港澳台地区</el-checkbox></el-col>
                            </el-checkbox-group>
                        </el-row>
                    </div>
                </div>
                <p class="senior" @click="tosenior" v-if="now==1">
                    高级搜索
                </p>
            </div>
        </div>
      </div>
      <div v-loading='loading'>
          
          <div class="panli-search-result">
              <div class="top">
                  共有<span class="color-red">{{this.total}}</span>个结果 <span class="exportbtn" @click="isvisible=true" ><img src="~assets/img/daochu-2.png" alt=""> 导出</span>
                  <el-dialog :visible.sync="isvisible" title="批量导出" width='30%'>
                        <div class="exportbtnbox">
                            <div class="itembox">
                                <span class="left">导出方式：</span>
                                <span>
                                    <el-radio label="1" v-model="radios">EXCEL</el-radio>
                                    <!-- <el-radio label="2" v-model="radios">全文PDF</el-radio> -->
                                </span>
                            </div>
                            <div class="itembox">
                                <span class="left">导出条数：</span>
                                <span class="exportcount">
                                    <input type="text" maxlength="10" v-model="startnum" @keyup="putcheck(1)" > -
                                    <input type="text" maxlength="10" v-model="endnum" @keyup="putcheck(2)"> 条
                                </span>
                            </div>
                            <p>备注：每次最多导出20条，每日最多可导出100条</p>
                        </div>
                        <div class="confirmbox">
                            <span class="no" @click="quxiao">取消</span>
                            <span class="yes" @click="queding">确定</span>
                        </div>
                    </el-dialog>
              </div>
                <div class="middle clearfix">
                    <ul class="rightlist">
                        <li v-for="(item,key) in dataList" :key="key" @click="todetail(item)">
                            <div class="topcont clearfix">
                                <div class="intr">
                                    <h3><span class="tit" @click="todetail(item)">{{item.inventionTitle}}</span> <span class="collect" v-if="item.isCollect==1" @click.stop='cancelCollect(item)'><i class="el-icon-star-on shou"></i> 取消收藏</span> <span class="collect" v-if="item.isCollect==0" @click.stop="addCollect(item)"><i class="el-icon-star-off"></i> 收藏</span></h3>
                                    <ul class="info">
                                        <li>申请号：<span>{{item.applicationDocNum}}</span></li>
                                        <li>申请日期：<span>{{item.applicationDate}}</span></li>
                                        <li>请求人：<span>{{item.appellant}}</span></li>
                                        <li>专利权人：<span>{{item.assignee}}</span></li>
                                        <li>决定号：<span>{{item.decisionNumber}}</span></li>
                                        <li>判决日期：<span>{{item.decisionDate}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mypagination">
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
const bsOrderListUrl = './api/lawCaseSearch'
const addCollectUrl ='./api/addMyCollect'
const cancelCollectUrl ='./api/cancelMyCollect'
const homeUrl = CONFIG.homeUrl
import VueCookie from 'vue-cookie'
import {store} from 'utils/'
import $ from 'jquery'
export default {
    data(){
        return {
            isvisible:false,
            homeUrl:homeUrl,
            startnum: '',
            endnum:'',
            radios: '1',
            checkedCities:['cn','docdb'],
            mark: 0,
            marknum: 0,
            now:3,
            patent:'',
            mark:'',
            cont:'',
            selected:'2',
            current:0,
            world: false,
            selectednum: [],
            all:false,
            china:false,
            search:[{name:'专利检索',id:1},{name:'商标检索',id:2},{name:'判例检索',id:3}],
            pgIndex:1,
            pgCount:5,
            dataList:[],
            total: 0,
            loading: false,
            query:{}
        }
    },
    mounted(){
        let that = this;
        window.addEventListener('message',function(event){
            if(event.data.type=='userId'){
                let uid= event.data.userId;
                localStorage.setItem('userId',uid);
                that.searchpage()
            }
            if(event.data.type=='logout'){
                localStorage.removeItem('userId');
            }
        })
        this.getquery();
        this.searchpage()
    },
    updated(){
        // let height = document.documentElement.scrollHeight
         let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
        console.log(height)
        //  window.parent.postMessage(
        //     document.documentElement.scrollHeight + 'px',
        //     '*'
        // );
        // console.log(document.documentElement.scrollHeight)
    },
    methods:{
        addCollect(it){
            let uid = localStorage.getItem('userId')
            if(uid){
                let data = {
                    collectType: 4,
                    docId: it.docId,
                    decisionNumber:it.decisionNumber,
                    decisionDate:it.decisionDate,
                    applicationDocNum:it.applicationDocNum,
                    applicationDate:it.applicationDate,
                    appellant:it.appellant,
                    assignee:it.assignee,
                    inventionTitle:it.inventionTitle,
                    chiefExaminer:it.chiefExaminer,
                    leaderExaminer:it.leaderExaminer,
                    memberExaminer:it.memberExaminer,
                    lawReference:it.lawReference,
                    decisionCaseIssueHeading:it.decisionCaseIssueHeading,
                    decisionCaseIssueParagraphs:it.decisionCaseIssueParagraphs,
                    reasoningHeading: it.reasoningHeading,
                    reasoningParagraphs:it.reasoningParagraphs,
                    finalDecisionHeading:it.finalDecisionHeading,
                    finalDecisionParagraphs: it.finalDecisionParagraphs
                }
                this.$http.post(addCollectUrl,data).then(res=>{
                    it.isCollect =1
                    this.$message.success('收藏成功');
                }).catch(err=>{
                    this.$message(err.response.data.msg)
                })
            }else{
                window.parent.postMessage('login','*')
            } 
            
        },
        cancelCollect(it){
            let data = {
                collectType: 4,
                collectItemUuid: it.decisionNumber,
            }
            this.$http.put(cancelCollectUrl,data).then(res=>{
                it.isCollect =0
                this.$message('取消收藏成功');
                
            }).catch(err=>{
                this.$message(err.response.data.msg)
            })
        },
        quxiao(){
            this.startnum = '';
            this.endnum ='';
            this.isvisible = false;
        },
        putcheck(i){
            let reg = /[^0-9]/g
            if(i==1){
                this.startnum=this.startnum.replace(reg,'')
            }
            if(i==2){
               this.endnum= this.endnum.replace(reg,'')
            }
        },
        queding(){
            if(!this.startnum){
                this.$message('请输入开始条数');
                return
            }
            if(!this.endnum){
                this.$message('请输入结束条数');
                return
            }
            if(this.endnum-this.startnum>19){
                this.$message('每次最多导出20条');
                return
            }
            if(this.endnum-this.startnum<0){
                this.$message('请输入正确的开始条数和结束条数');
                return
            }
            if(this.startnum>this.total || this.endnum>this.total){
                this.$message(`当前共${this.total}条数据，请输入有效的条数`);
                return
            }
            let userId = localStorage.getItem('userId')
            let count = {
                startLine: this.startnum,
                endLine: this.endnum,
                userId: userId
            }
            let urldata = Object.assign({},this.query,count)
            this.quxiao();
            window.open(CONFIG.rootUrl + '/api/exportLawCaseSearch?'+$.param(urldata))
            // window.location = CONFIG.rootUrl + '/api/exportBrandSearch?'+$.param(urldata)
            
        },
        onSearch(num){
            let re = {}
            if(num==1){
                if(!this.patent){
                    this.$message('请输入内容查询');
                    return
                }
                re.all = this.patent;
                re.searchType=1
                if(this.checkedCities.length==0 || this.checkedCities.length==2){
                    re.category = ''
                }else{
                    re.category = this.checkedCities[0]
                }
                this.$router.push({path:'patentsearch',query: re})
            }
            if(num==2){
                if(!this.mark){
                    this.$message('请输入内容查询');
                    return
                }
                re.q = this.mark;
                this.$router.push({path:'trademarksearch',query: re})
            }
            if(num==3){
                if(!this.cont){
                    this.$message('请输入内容查询');
                    return
                }
                re.applicationDocNum = this.cont
                if(this.selected==1){
                    this.$router.push({path:'panli',query: re})
                }
                if(this.selected==2){
                    this.searchpage()
                }
            }
        },
        tosenior(){
            this.$router.push({name:'seniorsearch',params:{type: 1}});
        },
       xuanze(it){
           this.now  = it.id
       },
        todetail(it){
            // let url = CONFIG.indexUrl+'/#/search/panlidetail/4/1/id/'+it.detailId+'?userId='+localStorage.getItem('userId')
            // window.parent.postMessage(
            //     'openTab' + url,
            //     '*'
            // );
            store.set('fushenxinxi',it)
            // window.open(CONFIG.indexUrl+'/#/search/panlidetail/4/1')
            this.$router.push({name:'panlidetail',params:{type: 4,islocal: 1}});
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
            if(re['applicationDocNum']){
                this.cont = re['applicationDocNum']
            }
            this.query = re;
        },
      
       handleCurrentChange(i){
            this.pgIndex = i;
		    this.searchpage();
        },
        searchpage(){
            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount
            this.query.type =2;
            this.query.applicationDocNum = this.cont
            this.$router.replace({query:this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(bsOrderListUrl, {params: paramsData})
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
                console.log(err);
            });
        },

    }
}
</script>

<style lang ='less'>
.color-red{
    color: red;
}
.panli-search-result{
    padding-bottom: 50px;
    background-color: #fff;
    .top{
        padding: 20px 0 10px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        .export{
            float: right;
            color: #666;
            cursor: pointer;
        }
        .exportbtn{
            float: right;
            padding: 0;
            img{
                vertical-align: middle;
                width: 16px;
                height: 16px;
            }
        }
        .confirmbox{
            padding: 10px 0;
            text-align: right;
            span{
                display: inline-block;
                width: 60px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                border-radius: 4px;
            }
            .no{
                margin-right: 20px;
                border: 1px solid #379dea;
                color:  #379dea;
            }
            .yes{
                background-color: #379dea;
                color: #fff;
            }
        }
        .exportbtnbox{
            padding-bottom: 30px;
            border-bottom: 1px solid #eee;
            p{
                font-size: 12px;
                color: #999;
                padding-left: 20px;
            }
            .itembox{
                margin-bottom: 20px;
                padding-left: 20px;
                .left{
                    margin-right: 20px;
                    line-height: 20px;
                }
                .left:before{
                    content: '*';
                    color: red;
                }
            }
            .exportcount{
                min-width: 220px;
                white-space: nowrap;
                line-height: 24px;
                input{
                    width: 100px;
                    height: 28px;
                    padding: 4px;
                    border: 1px solid #eee;
                }
            }
        }
    }
    .middle{
        padding-top: 10px;
    }
    .rightlist{
        >li{
            padding:10px 20px;
            border: 1px solid #eee;
            margin-bottom: 5px;
        }
        p{
            font-size: 14px;
            color: #999;
        }
        .topcont{
            color: #999;
            .picbox{
                width:100px;
                height: 100px;
                background-color: #ccc;
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                }
            }
            .intr{
                h3{
                    padding-top: 10px;
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .info{
                    >li{
                        float: left;
                        width:50%;
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 12px;
                        color:#999;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        span{
                            color: #666;
                            font-weight: bold;
                        }
                        span.status{
                            color:#379dea;
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
                    cursor: pointer;
                    color:#379dea;
                }
                .collect{
                    float: right;
                    vertical-align: middle;
                    line-height: 20px;
                    cursor: pointer;
                    .shou{
                        color: #379dea;
                    }
                }
            }
        }
    }
}

.ordinary-search-panli{
    padding-top: 20px;
    padding-bottom: 20px;
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

</style>