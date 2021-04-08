<template>
    <div class="commonWidth" >
        <!-- <div class='combox'>
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
        </div> -->
      <div class="panlidetail" v-if="type==3">
          <div class="top">
              <h3>{{detailInfo.inventionTitle}} </h3>
              <!-- <p>{{detailInfo.applicationDocNum}}</p> -->
              <p>{{detailInfo.applicationDocNum}} <span class="collects" @click="addCollect" v-if="detailInfo.isCollect==0"><i class="el-icon-star-off"></i>收藏</span>
              <span class="collect" @click="cancelCollect" v-if="detailInfo.isCollect==1"><i class="el-icon-star-on"></i>取消收藏</span></p>
          </div>
          <div class="cont">
              <div class="allcont">
                  <div class="basic">
                      <h3 class="commontitle">基础信息</h3>
                      <ul>
                          <li><span class="itemname">法庭：</span><span class="itemcont" v-html="detailInfo.courtHouse"></span></li>
                          <li><span class="itemname">专利申请号：</span><span class="itemcont" v-html="detailInfo.applicationDocNum"></span></li>
                          <li><span class="itemname">专利权人：</span><span class="itemcont" v-html="detailInfo.assigneeName"></span></li>
                          <li><span class="itemname">发明名称：</span><span class="itemcont" v-html="detailInfo.inventionTitle"></span></li>
                          <li><span class="itemname">被告：</span><span class="itemcont" v-html="detailInfo.defendant"></span></li>
                          <li><span class="itemname">被告委托代理人：</span><span class="itemcont">{{detailInfo.defendantRepresentative|delnull}}</span></li>
                          <li><span class="itemname">被告法定代表人：</span><span class="itemcont">{{detailInfo.defendantAttorney|delnull}}</span></li>
                          <li><span class="itemname">第三方委托代理人：</span><span class="itemcont">{{detailInfo.thirdPartyRepresentative|delnull}}</span></li>
                          <li><span class="itemname">审判员：</span><span class="itemcont">{{detailInfo.judgeChief|delnull}}</span></li>
                          <li><span class="itemname">法官：</span><span class="itemcont">{{detailInfo.judgeDeputy|delnull}}</span></li>
                          <li><span class="itemname">法官助理：</span><span class="itemcont">{{detailInfo.judgeAssistant|delnull}}</span></li>
                          <li><span class="itemname">书记员信息：</span><span class="itemcont" v-html="detailInfo.courtReporter"></span></li>
                          <li><span class="itemname">原告意见：</span><span class="itemcont" v-html="detailInfo.complainantOpinion"></span></li>
                          <li><span class="itemname">司法判决事实认定：</span><span class="itemcont" v-html="detailInfo.factCognizance"></span></li>
                          <li><span class="itemname">判决理由：</span><span class="itemcont" v-html="detailInfo.verdictReasoning"></span></li>
                          <li><span class="itemname">判决内容：</span><span class="itemcont" v-html="detailInfo.verdictHolding"></span></li>
                          <li><span class="itemname">判决日期：</span><span class="itemcont" v-html="detailInfo.verdictDate"></span></li>
                          <li><span class="itemname">公告信息：</span><span class="itemcont" v-html="detailInfo.publicationInformation"></span></li>
                          <li><span class="itemname">决定号：</span><span class="itemcont" v-html="detailInfo.decisionNumberl"></span></li>
                          <li><span class="itemname">原告：</span><span class="itemcont" v-html="detailInfo.plaintiff"></span></li>
                          <li><span class="itemname">原告法定代表人：</span><span class="itemcont" v-html="detailInfo.plaintiffAttorney"></span></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <div class="panlidetail" v-if="type==4">
          <div class="top">
              <h3>{{detailInfo.inventionTitle}}</h3>
              <!-- <p>{{detailInfo.applicationDocNum}}</p> -->
              <p>{{detailInfo.applicationDocNum}}<span class="collects" @click="addCollect" v-if="detailInfo.isCollect==0"><i class="el-icon-star-off"></i>收藏</span>
              <span class="collect" @click="cancelCollect"  v-if="detailInfo.isCollect==1"><i class="el-icon-star-on"></i>取消收藏</span></p>
          </div>
          <div class="cont">
              <div class="allcont">
                  <div class="basic">
                      <h3 class="commontitle">基础信息</h3>
                      <ul>
                          <li><span class="itemname">复审审查决定-代号：</span><span class="itemcont" v-html="detailInfo.docId"></span></li>
                          <li><span class="itemname">决定号：</span><span class="itemcont" v-html="detailInfo.decisionNumber"></span></li>
                          <li><span class="itemname">决定日期：</span><span class="itemcont" v-html="detailInfo.decisionDate"></span></li>
                          <li><span class="itemname">申请号：</span><span class="itemcont" v-html="detailInfo.applicationDocNum"></span></li>
                          <li><span class="itemname">申请日期：</span><span class="itemcont" v-html="detailInfo.applicationDate"></span></li>
                          <li><span class="itemname">请求人：</span><span class="itemcont" v-html="detailInfo.appellant"></span></li>
                          <li><span class="itemname">专利权人：</span><span class="itemcont" v-html="detailInfo.assignee"></span></li>
                          <li><span class="itemname">发明标题：</span><span class="itemcont" v-html="detailInfo.inventionTitle"></span></li>
                          <li><span class="itemname">首席法官：</span><span class="itemcont" v-html="detailInfo.chiefExaminer"></span></li>
                          <li><span class="itemname">审判长：</span><span class="itemcont" v-html="detailInfo.leaderExaminer"></span></li>
                          <li><span class="itemname">陪审员：</span><span class="itemcont" v-html="detailInfo.memberExaminer"></span></li>
                          <li><span class="itemname">法律依据：</span><span class="itemcont" v-html="detailInfo.lawReference"></span></li>
                      </ul>
                  </div>
                  <div class="basic">
                      <h3 class="commontitle">判决信息</h3>
                      <h3 class="itemtit">{{detailInfo.decisionCaseIssueHeading}}</h3>
                      <div v-html="detailInfo.decisionCaseIssueParagraphs">

                      </div>
                      <h3 class="itemtit">{{detailInfo.reasoningHeading}}</h3>
                      <div v-html="detailInfo.reasoningParagraphs">

                      </div>
                      <h3 class="itemtit">{{detailInfo.finalDecisionHeading}}</h3>
                      <div v-html="detailInfo.finalDecisionParagraphs">

                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>  
</template>

<script>
import $ from 'jquery'
import {store} from 'utils/'
const addCollectUrl ='./api/addMyCollect'
const cancelCollectUrl ='./api/cancelMyCollect'
const bsOrderListUrl = './api/findLawCaseSearchDetail/{collectItemUuid}'
const homeUrl = CONFIG.homeUrl
export default {
    data(){
        return {
            detailInfo:{},
            type:'',
            homeUrl: homeUrl,
            query:{}
        }
    },
    filters:{
        delnull:function(inputs){
            if(inputs=='"null"'){
                return ''
            }
            return inputs
        }
    },
    mounted(){
        this.type = this.$route.params.type;
        let local = this.$route.params.islocal;
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
        if(local==1){
            if(this.type ==3){
                let info = store.get('chaijuexinxi')
                if(info){
                    this.detailInfo = info
                }
            }
            if(this.type ==4){
                let info = store.get('fushenxinxi')
                if(info){
                    this.detailInfo = info
                }
            }
        }else{
            let url = window.location.href
            if(url.indexOf("?")==-1){
                this.$message('请传入参数')
            }else{
                let str = url.split('?')[1];
                let arr = str.split("&")
                arr.forEach(item=>{
                    let re = item.split('=');
                    this.query[re[0]] = re[1]
                })
                if(!this.query.cid){
                    this.$message('请传入正确的参数')
                }else{
                    console.log(this.query)
                    this.$http.get(bsOrderListUrl.replace('{collectItemUuid}',this.query.cid),{params:{collectType: this.type}}).then(res=>{
                        console.log(res.data)
                        this.detailInfo = res.data
                    }).catch(err=>{
                        this.$message(err.response.data.msg)
                    })
                }
            }
        }
        
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
            let data = {}
            if(this.type==3){
                data = {
                    collectType: 3,
                    courtHouse: this.detailInfo.courtHouse,
                    applicationDocNum: this.detailInfo.applicationDocNum,
                    assigneeName: this.detailInfo.assigneeName,
                    inventionTitle: this.detailInfo.inventionTitle,
                    defendant: this.detailInfo.defendant,
                    defendantRepresentative: this.detailInfo.defendantRepresentative,
                    defendantAttorney: this.detailInfo.defendantAttorney,
                    thirdPartyRepresentative: this.detailInfo.thirdPartyRepresentative,
                    judgeChief: this.detailInfo.judgeChief,
                    judgeDeputy: this.detailInfo.judgeDeputy,
                    judgeAssistant: this.detailInfo.judgeAssistant,
                    courtReporter: this.detailInfo.courtReporter,
                    complainantOpinion: this.detailInfo.complainantOpinion,
                    factCognizance: this.detailInfo.factCognizance,
                    verdictReasoning: this.detailInfo.verdictReasoning,
                    verdictHolding: this.detailInfo.verdictHolding,
                    verdictDate: this.detailInfo.verdictDate,
                    publicationInformation: this.detailInfo.publicationInformation,
                    decisionNumberl: this.detailInfo.decisionNumberl,
                    plaintiff: this.detailInfo.plaintiff,
                    plaintiffAttorney: this.detailInfo.plaintiffAttorney,

                }
            }
            if(this.type==4){
                data = {
                    collectType: 4,
                    docId: this.detailInfo.docId,
                    decisionNumber:this.detailInfo.decisionNumber,
                    decisionDate:this.detailInfo.decisionDate,
                    applicationDocNum:this.detailInfo.applicationDocNum,
                    applicationDate:this.detailInfo.applicationDate,
                    appellant:this.detailInfo.appellant,
                    assignee:this.detailInfo.assignee,
                    inventionTitle:this.detailInfo.inventionTitle,
                    chiefExaminer:this.detailInfo.chiefExaminer,
                    leaderExaminer:this.detailInfo.leaderExaminer,
                    memberExaminer:this.detailInfo.memberExaminer,
                    lawReference:this.detailInfo.lawReference,
                    decisionCaseIssueHeading:this.detailInfo.decisionCaseIssueHeading,
                    decisionCaseIssueParagraphs:this.detailInfo.decisionCaseIssueParagraphs,
                    reasoningHeading: this.detailInfo.reasoningHeading,
                    reasoningParagraphs:this.detailInfo.reasoningParagraphs,
                    finalDecisionHeading:this.detailInfo.finalDecisionHeading,
                    finalDecisionParagraphs: this.detailInfo.finalDecisionParagraphs
                }
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
            let data = {}
            if(this.type==3){
                data={
                    collectType: 3,
                    collectItemUuid: this.detailInfo.decisionNumberl,
                }
            }
            if(this.type==4){
                data={
                    collectType: 4,
                    collectItemUuid: this.detailInfo.decisionNumber,
                }
            }
            this.$http.put(cancelCollectUrl,data).then(res=>{
                this.detailInfo.isCollect = 0
                this.$message('取消收藏成功');
            }).catch(err=>{
                this.$message(err.response.data.msg)
            })
        },
    }
}
</script>

<style lang ='less'>
.combox{
    padding:20px 50px 0;
}
.ordinary-search-patentdetail{
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    margin-bottom: 10px;
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
    .logobox{
        width: 160px;
        margin: 0 auto 50px;
        p{
            font-size: 18px;
            color: #999;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
        }
    }
    .logo{
        width: 160px;
        height: 160px;
        border-radius: 4px;
        background-color: #379dea;
        margin-bottom: 10px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
}
.panlidetail{
    background-color: #fff;
    padding: 20px  50px;
    .collects{
        float: right;
        height: 24px;
        color: #999;
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
    .top{
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        color: #666;
        h3{
            max-width: 300px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: normal;
            font-size: 16px;
        }
        p{
            font-size: 14px;
        }
    }
    .cont{
        .labelbox{
            height: 60px;
            border: 1px solid #e1e1e1;
            background-color: #efefef;
            line-height: 60px;
            >li{
                float: left;
                height: 100%;
                padding: 0 10px;
                font-size: 16px;
                font-weight: bold;
                color: #444;
                cursor: pointer;
                &.active{
                    background-color: #fff;
                    border-left: 1px solid #e1e1e1;
                    border-right: 1px solid #e1e1e1;
                    border-top: 2px solid #379dea;
                }
            }
        }
        .allcont{
            border: 1px solid #eee;
            border-top: none;
            padding: 20px;
            .commontitle{
                font-size: 16px;
                color: #666;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            .othertitle{
                font-size: 16px;
                color: #333;
                padding-bottom: 10px;
                font-weight: normal;
            }
            .introduce{
                padding-left: 20px;
                color: #999;
                font-size: 14px;
                margin-bottom: 20px;
                /* line-height:24px; */
            }
            .intrimg{
                padding: 20px;
                img{
                    max-width: 100%;
                }
            }
            .basic{
                font-size: 14px;
                color:#666;
                .itemtit{
                    padding: 15px 0;
                    color:#666;
                }
                .itemname{
                    color:#999;
                }
                .itemcont{
                    color:#666;
                }
                ul{
                    padding: 10px 0 5px;
                    li{
                        line-height: 24px;
                        margin-bottom: 10px;
                        /* overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap; */
                    }
                }
                .zy{
                    padding: 10px 0;
                }
                .zycont{
                    text-indent: 2em;
                    max-width: 1000px;
                    word-break: break-all;
                    line-height: 20px;
                    color: #666;
                }
                .zyftimg{
                    padding: 20px;
                    img{
                        max-width: 100%;
                    }
                }
            }
            
        }
    }
}
</style>