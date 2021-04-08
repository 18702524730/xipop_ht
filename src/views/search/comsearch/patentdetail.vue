<template>
    <div class="commonWidth cwidth" v-loading='loading'>
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
      <div class="patentdetails">
          <div class="top">
              <h3 v-if='detailInfo.baseInfo'>{{detailInfo.baseInfo.title}}</h3>
              <!-- <p>{{id}}</p> -->
              <p>{{id}} <span class="collects" @click="addCollect" v-if="detailInfo.isCollect==0"><i class="el-icon-star-off"></i>收藏</span>
              <span class="collect" @click="cancelCollect" v-if="detailInfo.isCollect==1"><i class="el-icon-star-on"></i>取消收藏</span></p>
          </div>
          <div class="cont clearfix">
              <ul class="labelbox">
                  <li v-for="(item,key) in label" :key="key" :class="{active: current==key}" @click="changelabel(key)">{{item}}</li>
              </ul>
              <div class="allcont" id="contbox">
                  
                  <div class="basic" v-if="current==0&&detailInfo.baseInfo">
                      <h3 class="commontitle">著录项目</h3>
                      <div class="clearfix" v-if="this.query.country=='CN'">
                      <ul class="every">
                          <li><span class="itemname">发明名称：</span><span class="itemcont">{{detailInfo.baseInfo.title}}</span></li>
                          <li><span class="itemname">申请号/专利号：</span><span class="itemcont">{{detailInfo.baseInfo.applicationDocNum}}</span></li>
                          <li><span class="itemname">申请人：</span><span class="itemcont">{{detailInfo.baseInfo.applicant}}</span></li>
                          <li><span class="itemname">发明人/设计人：</span><span class="itemcont">{{detailInfo.baseInfo.inventor}}</span></li>
                          <li><span class="itemname">公开号/公告号：</span><span class="itemcont">{{detailInfo.baseInfo.publicationDocNum}}</span></li>
                          <li><span class="itemname">优先权号：</span><span class="itemcont">{{detailInfo.baseInfo.priorityDocNum}}</span></li>
                          <li><span class="itemname">代理人：</span><span class="itemcont">{{detailInfo.baseInfo.agentPersonName}}</span></li>
                          <li><span class="itemname">PCT申请号：</span><span class="itemcont">{{detailInfo.baseInfo.pctDocNum}}</span></li>
                          <li><span class="itemname">PCT进入国家阶段日：</span><span class="itemcont">{{detailInfo.baseInfo.pctImportDate}}</span></li>
                      </ul>
                      <ul class="every">
                          <li><span class="itemname">申请日：</span><span class="itemcont">{{detailInfo.baseInfo.applicationDate}}</span></li>
                          <li><span class="itemname">专利权人：</span><span class="itemcont">{{detailInfo.baseInfo.assignee}}</span></li>
                          <li><span class="itemname">分类号：</span><span class="itemcont">{{detailInfo.baseInfo.ipcList}}</span></li>
                          <li><span class="itemname">公开日/公告日：</span><span class="itemcont">{{detailInfo.baseInfo.publicationDate}}</span></li>
                          <li><span class="itemname">优先权日：</span><span class="itemcont">{{detailInfo.baseInfo.priorityDate}}</span></li>
                          <li><span class="itemname">代理机构：</span><span class="itemcont">{{detailInfo.baseInfo.agentName}}</span></li>
                          <li><span class="itemname">PCT申请日：</span><span class="itemcont">{{detailInfo.baseInfo.pctDate}}</span></li>
                          <li><span class="itemname">生物保藏信息：</span><span class="itemcont">{{detailInfo.baseInfo.biologicalInfo}}</span></li>
                      </ul>
                      </div>
                      <div class="clearfix" v-else>
                      <ul class="every">
                          <li><span class="itemname">发明名称：</span><span class="itemcont">{{detailInfo.baseInfo.title}}</span></li>
                          <li><span class="itemname">申请号/专利号：</span><span class="itemcont">{{detailInfo.baseInfo.applicationDocNum}}</span></li>
                          <li><span class="itemname">公开号/公告号：</span><span class="itemcont">{{detailInfo.baseInfo.publicationDocNum}}</span></li>
                          <li><span class="itemname">优先权号：</span><span class="itemcont">{{detailInfo.baseInfo.priorityDocNum}}</span></li>
                          <!-- <li><span class="itemname">代理人：</span><span class="itemcont">{{detailInfo.baseInfo.agentPersonName}}</span></li> -->
                          <li><span class="itemname">PCT申请号：</span><span class="itemcont">{{detailInfo.baseInfo.pctDocNum}}</span></li>
                          <li><span class="itemname">申请人：</span><span class="itemcont">{{detailInfo.baseInfo.applicant}}</span></li>
                          <li><span class="itemname">专利权人：</span><span class="itemcont">{{detailInfo.baseInfo.assignee}}</span></li>
                          <!-- <li><span class="itemname">PCT进入国家阶段日：</span><span class="itemcont">{{detailInfo.baseInfo.pctImportDate}}</span></li> -->
                      </ul>
                      <ul class="every">
                          <li><span class="itemname">申请日：</span><span class="itemcont">{{detailInfo.baseInfo.applicationDate}}</span></li>
                          <li><span class="itemname">公开日/公告日：</span><span class="itemcont">{{detailInfo.baseInfo.publicationDate}}</span></li>
                          <li><span class="itemname">优先权日：</span><span class="itemcont">{{detailInfo.baseInfo.priorityDate}}</span></li>
                          <!-- <li><span class="itemname">代理机构：</span><span class="itemcont">{{detailInfo.baseInfo.agentName}}</span></li> -->
                          <li><span class="itemname">PCT申请日：</span><span class="itemcont">{{detailInfo.baseInfo.pctDate}}</span></li>
                          <!-- <li><span class="itemname">生物保藏信息：</span><span class="itemcont">{{detailInfo.baseInfo.biologicalInfo}}</span></li> -->
                          <li><span class="itemname">发明人/设计人：</span><span class="itemcont">{{detailInfo.baseInfo.inventor}}</span></li>
                          <li><span class="itemname">分类号：</span><span class="itemcont">{{detailInfo.baseInfo.ipcList}}</span></li>
                      </ul>
                      </div>
                      <div class="displayflex zy">
                          <span>摘要：</span><div class="zycont" v-html="detailInfo.baseInfo.abstractDesc"></div>
                      </div>
                      <div class="displayflex zyft">
                          <span>摘要附图：</span>
                          <div class="zyftimg">
                              <img :src="detailInfo.baseInfo.abstractFigure" alt="">
                          </div>
                      </div>
                  </div>
                  <div class="audit" v-if="current==1">
                      <div v-if="detailInfo.auditInfo">
                        <h3 class="commontitle">通知书信息</h3>
                        <div class="tablebox">
                            <table class="itemtable three">
                                <thead>
                                    <th>通知书发出时间</th>
                                    <th>通知书名称</th>
                                    <th>查看</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,key) in detailInfo.auditInfo.zlNotice" :key="key">
                                        <td>{{item.zlNoticeDate}}</td>
                                        <td>{{item.zlNoticeName}}</td>
                                        <td><span class="attachment"><a :href="it" target="_blank" v-for="(it,k) in item.zlNoticeUrl" :key="k">查看</a> </span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 class="commontitle">中间文件信息</h3>
                        <div class="tablebox">
                            <table class="itemtable three">
                                <thead>
                                    <th>中间文件发出时间</th>
                                    <th>中间文件名称</th>
                                    <th>查看</th>
                                </thead>
                                <tbody>
                                    <tr  v-for="(item,key) in detailInfo.auditInfo.zlIntermediate" :key="key">
                                        <td>{{item.zlIntermediateDate}}</td>
                                        <td>{{item.zlIntermediateName}}</td>
                                        <td><span class="attachment"><a :href="it" target="_blank" v-for="(it,k) in item.zlIntermediateUrl" :key="k">查看</a></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      </div>
                      <div v-else>暂无数据</div>
                  </div>
                  <div class="announcement" v-if="current ==2">
                      <div class="tablebox" v-if="detailInfo.lawStateInfo">
                          <table class="itemtable two">
                              <thead>
                                  <th>事务公告日</th>
                                  <th>事务公告</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item,key) in detailInfo.lawStateInfo" :key="key">
                                      <td>{{item.date}}</td>
                                      <td>{{item.lawStatusDetail}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div v-else>暂无数据</div>
                  </div>
                  <div class="citation" v-if="current==3">
                      <div v-if="detailInfo.referInfo">
                        <h3 class="commontitle">引用专利</h3>
                        <div class="tablebox">
                            <table class="itemtable six">
                                <thead>
                                    <th>公开号</th>
                                    <th>公开日</th>
                                    <th>申请(专利)号</th>
                                    <th>专利名称</th>
                                    <th>申请日期</th>
                                    <th>申请人</th>
                                </thead>
                                <tbody v-if="detailInfo.referInfo.refer">
                                    <tr v-for="(item,key) in detailInfo.referInfo.refer" :key="key">
                                        <td>{{item.publicationDocNum}}</td>
                                        <td>{{item.publicationDate}}</td>
                                        <td>{{item.applicationDocNum}}</td>
                                        <td>{{item.title}}</td>
                                        <td>{{item.applicationDate}}</td>
                                        <td>
                                            <div v-if="item.applicant&&item.applicant.length">
                                                <span v-for="(i,k) in item.applicant" :key="k">{{i}}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 class="commontitle">被引用专利</h3>
                        <div class="tablebox">
                            <table class="itemtable six">
                                <thead>
                                    <th>公开号</th>
                                    <th>公开日</th>
                                    <th>申请(专利)号</th>
                                    <th>专利名称</th>
                                    <th>申请日期</th>
                                    <th>申请人</th>
                                </thead>
                                <tbody v-if="detailInfo.referInfo.referred">
                                    <tr v-for="(item,key) in detailInfo.referInfo.referred" :key="key">
                                        <td>{{item.publicationDocNum}}</td>
                                        <td>{{item.publicationDate}}</td>
                                        <td>{{item.applicationDocNum}}</td>
                                        <td>{{item.title}}</td>
                                        <td>{{item.applicationDate}}</td>
                                        <td>
                                            <div v-if="item.applicant&&item.applicant.length">
                                                <span v-for="(i,k) in item.applicant" :key="k">{{i}}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="treebox">
                            <div id='lefttree'></div>
                        </div>
                      </div>
                      <div v-else>暂无数据</div>
                  </div>
                  
                  <div class="fee" v-if="current==4">
                        <h3 class="commontitle" v-if='detailInfo.costInfo.zlPaidInfo'>已缴费信息</h3>
                        <div class="tablebox" v-if='detailInfo.costInfo.zlPaidInfo'>
                            <table class="itemtable five" >
                                <thead>
                                    <th>缴费种类</th>
                                    <th>缴费金额</th>
                                    <th>缴费日期</th>
                                    <th>缴费人姓名</th>
                                    <th>收据号</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,key) in detailInfo.costInfo.zlPaidInfo" :key="key">
                                        <td>{{item.zlType}}</td>
                                        <td>{{item.zlPaidAmount}}</td>
                                        <td>{{item.zlDate}}</td>
                                        <td>{{item.zlPayer}}</td>
                                        <td>{{item.zlReceiptNum}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 class="commontitle" v-if='detailInfo.costInfo.zlRefundInfo'>退费信息</h3>
                        <div class="tablebox" v-if='detailInfo.costInfo.zlRefundInfo'>
                            <table class="itemtable three" >
                                <thead>
                                    <th>退费时间</th>
                                    <th>退费金额</th>
                                    <th>备注</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{detailInfo.costInfo.zlRefundInfo}}</td>
                                        <td>{{detailInfo.costInfo.zlRefundInfo}}</td>
                                        <td>{{detailInfo.costInfo.zlRefundInfo}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 class="commontitle" v-if='detailInfo.costInfo.zlShouldPayInfo'>应缴费信息</h3>
                        <div class="tablebox" v-if='detailInfo.costInfo.zlShouldPayInfo'>
                            <table class="itemtable three" >
                                <thead>
                                    <th>应缴年度</th>
                                    <th>应缴金额</th>
                                    <th>缴费截止日</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,key) in detailInfo.costInfo.zlShouldPayInfo" :key="key">
                                        <td>{{item.zlYear}}</td>
                                        <td>{{item.zlAmount}}</td>
                                        <td>{{item.zlDeadline}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      <div v-if="!detailInfo.costInfo.zlPaidInfo&&!detailInfo.costInfo.zlRefundInfo&&!detailInfo.costInfo.zlShouldPayInfo">暂无数据</div>
                  </div>
                  <div class="quanli" v-if="current==5">
                      <div class="pagebox" v-if="detailInfo.claim">
                        <p v-for="(page,k) in detailInfo.claim" :key="k" v-html="page"></p>
                      </div>
                      <div v-else>暂无数据</div>
                  </div>
                  <div class="intr" v-if="current==6">
                      <h3 class="othertitle" v-if="detailInfo.description">说明书</h3>
                      <ul class="introduce" v-if="detailInfo.description">
                          <li v-for="(item,key) in detailInfo.description" :key="key" v-html="item"></li>
                      </ul>
                      <h3 class="othertitle" v-if="detailInfo.descriptionFigure">说明书附图</h3>
                      <div class="intrimg" v-if="detailInfo.descriptionFigure">
                          <img :src="img" alt="" v-for="(img,k) in detailInfo.descriptionFigure" :key='k'>
                      </div>
                      <div v-if="!detailInfo.description&&!detailInfo.descriptionFigure">暂无数据</div>
                  </div>
                  <div class="quanwen" v-if="current==7">
                      <div v-if="detailInfo.pdfList&&detailInfo.pdfList.length">
                        <object :data='item' type="application/pdf" v-for="(item,key) in detailInfo.pdfList" :key="key" style="width:900px;height:600px;">
                                <strong>返回内容：</strong>该浏览器不支持PDFS <a :href="item" target='_blank' >点击查看</a>
                        </object>
                        <!-- <embed  :src="item" type="application/pdf" style="overflow: auto; width: 100%; height: 600px;"  v-for='(item,key) in detailInfo.pdfList' :key= key > -->
                      </div>
                      <div v-else>暂无数据</div>
                        
                  </div>
                  <div class="citation" v-if="current==8&&detailInfo.pledgeTransferPermit">
                      <h3 class="commontitle" v-if='detailInfo.pledgeTransferPermit.patentPledge'>专利权的质押、保全及其解除</h3>
                      <div class="tablebox" v-if='detailInfo.pledgeTransferPermit.patentPledge'>
                          <table class="itemtable eight" >
                              <thead>
                                  <th>序号</th>
                                  <th>法律状态</th>
                                  <th>法律状态公告日</th>
                                  <th>合同状态	</th>
                                  <th>出质人</th>
                                  <th>质权人</th>
                                  <th>当前质权人</th>
                                  <th>操作</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item,key) in detailInfo.pledgeTransferPermit.patentPledge" :key="key">
                                      <td>{{key+1}}</td>
                                      <td>{{item.lawStatus}}</td>
                                      <td>{{item.lawStatusDate}}</td>
                                      <td>{{item.recordStage}}</td>
                                      <td>{{item.transferor}}</td>
                                      <td>{{item.acceptor}}</td>
                                      <td>{{item.currentAcceptor}}</td>
                                      <td></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <h3 class="commontitle" v-if='detailInfo.pledgeTransferPermit.patentTransfer'>中国专利申请权、申请权的转移</h3>
                      <div class="tablebox" v-if='detailInfo.pledgeTransferPermit.patentTransfer'>
                          <table class="itemtable" >
                              <thead>
                                  <th>序号</th>
                                  <th>法律状态</th>
                                  <th>法律状态公告日</th>
                                  <th>转移类型</th>
                                  <th>变更前权利人</th>
                                  <th>变更后权利人</th>
                                  <th>当前权利人</th>
                                  <th>操作</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item,key) in detailInfo.pledgeTransferPermit.patentTransfer" :key="key">
                                      <td>{{key+1}}</td>
                                      <td>{{item.lawStatus}}</td>
                                      <td>{{item.lawStatusDate}}</td>
                                      <td>{{item.transType}}</td>
                                      <td>{{item.patentOwnerBefore}}</td>
                                      <td>{{item.patentOwnerAfter}}</td>
                                      <td>{{item.patentOwnerCurrent}}</td>
                                      <td></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <h3 class="commontitle" v-if='detailInfo.pledgeTransferPermit.patentLicense'>中国专利实施许可合同的备案</h3>
                      <div class="tablebox"  v-if='detailInfo.pledgeTransferPermit.patentLicense'>
                          <table class="itemtable">
                              <thead>
                                  <th>序号</th>
                                  <th>法律状态</th>
                                  <th>法律状态公告日</th>
                                  <th>备案阶段</th>
                                  <th>让与人</th>
                                  <th>受让人</th>
                                  <th>许可种类</th>
                                  <th>更多</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item,key) in detailInfo.pledgeTransferPermit.patentLicense" :key="key">
                                      <td>{{key+1}}</td>
                                      <td>{{item.lawStatus}}</td>
                                      <td>{{item.lawStatusDate}}</td>
                                      <td>{{item.recordStage}}</td>
                                      <td>{{item.transferor}}</td>
                                      <td>{{item.acceptor}}</td>
                                      <td>{{item.authorType}}</td>
                                      <td></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div v-if='!detailInfo.pledgeTransferPermit.patentPledge&&!detailInfo.pledgeTransferPermit.patentTransfer&&!detailInfo.pledgeTransferPermit.patentLicense'>暂无数据</div>
                  </div>
                  <div class="kin" v-if="current==9">
                      <div class="tablebox" v-if="detailInfo.homdogy&&detailInfo.homdogy.length">
                          <table class="itemtable six">
                              <thead>
                                  <th>公开号</th>
                                  <th>公开日</th>
                                  <th>申请(专利)号</th>
                                  <th>专利名称</th>
                                  <th>申请日期</th>
                                  <th>申请人</th>
                              </thead>
                              <tbody>
                                  <tr v-for="(item,key) in detailInfo.homdogy" :key="key">
                                      <td>{{item.publicationDocNum}}</td>
                                      <td>{{item.publicationDate}}</td>
                                      <td>{{item.applicationDocNum}}</td>
                                      <td>{{item.title}}</td>
                                      <td>{{item.applicationDate}}</td>
                                      <td>{{item.applicant}}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div v-else>暂无数据</div>
                  </div>
              </div>
          </div>
      </div>
    </div>  
</template>

<script>
import $ from 'jquery'
const detailUrl = './api/findPatentDetail/{applicationDocNum}'
const addCollectUrl ='./api/addMyCollect'
const cancelCollectUrl ='./api/cancelMyCollect'
const homeUrl = CONFIG.homeUrl
import { filters } from 'utils/'
export default {
    data(){
        return {
            homeUrl:homeUrl,
            checkedCities:['cn','docdb'],
            label:[
                '基本信息','审查信息','事务公告','引证信息','费用信息','权利要求','说明书及附图','全文PDF','质押转移许可','同族信息'
            ],
            detailInfo:{
                baseInfo:{},
                auditInfo:{},
                lawStateInfo:{},
                referInfo:{},
                costInfo:{},
                claim:[],
                description:[],
                descriptionFigure:[],
                pdfList:[],
                pledgeTransferPermit:{},
                homdogy:{},
                isCollect:'',
            },
            mark: 0,
            now:1,
            patent:'',
            mark:'',
            cont:'',
            selected:'',
            current:0,
            search:[{name:'专利检索',id:1},{name:'商标检索',id:2}],
            loading: false,
            id:'',
            country:'',
            pubnum:'',
            tp:'',
            treedata1:[],
            treedata2:[],
            query: {
            }
        }
    },
    filters:{
        dateFormat: filters.formatDate.dateFormat,
        priceFormat: filters.priceformat
    },
    mounted(){
        window.scrollTo(0,0)
        this.id = this.$route.params.id;
        this.pubnum = this.$route.params.num
        this.country = this.$route.params.country
        this.tp = this.$route.params.tp
        let that = this;
        window.addEventListener('message',function(event){
            if(event.data.type=='userId'){
                let uid= event.data.userId;
                localStorage.setItem('userId',uid);
            }
            if(event.data.type=='logout'){
                localStorage.removeItem('userId');
            }
        })
        // let url = window.location.href;
        // let str=''
        this.getDetail()
        // if(url.indexOf('?')==-1){
        //     this.$message.error('参数错误')
        // }else{
        //     str = url.split('?')[1];
        //     let arr = str.split('&');
        //     arr.forEach(item=>{
        //         let sarr = item.split('=');
        //         this.query[sarr[0]] = sarr[1]
        //     })
        //     this.getDetail()
        // }
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
                    // console.log(height)
                }
            }
        }
    },
    watch:{
        current(){
            this.$nextTick(()=>{
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
                            // console.log(height)
                        }
                    }
                }
                console.log(height)
            })
        }
    },
    methods:{
        createtree(d1,d2){
            let mytree =echarts.init(document.getElementById('lefttree'),'shine') ;
            let option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    formatter:function(params){
                        return params.name
                    }
                },
                
                series:[
                    {
                        type: 'tree',
                        data: [d1],

                        top: '5%',
                        left: '20%',
                        bottom: '5%',
                        right: '58%',
                        orient:'RL',
                        symbolSize: 7,
                        
                        label: {
                            normal:{
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left',
                            }
                        },

                        leaves: {
                            label: {
                                normal:{
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right'
                                }
                            }
                        },

                        expandAndCollapse: true,

                        animationDuration: 550,
                        animationDurationUpdate: 750

                    },
                    {
                        type: 'tree',
                        data: [d2],

                        top: '5%',
                        left: '56%',
                        bottom: '5%',
                        right: '20%',

                        symbolSize: 7,
                        label: {
                            normal:{
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'right'
                            }
                        },

                        leaves: {
                            label: {
                                normal:{
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },

                        expandAndCollapse: true,

                        animationDuration: 550,
                        animationDurationUpdate: 750
                    }
                ]
            }
            mytree.setOption(option);
            mytree.on('click',function(param){
                if (typeof param.seriesIndex == 'undefined') {
                    return;
                }
                if (param.type == 'click') {
                    let re = param.data;
                    // window.open(CONFIG.indexUrl+'/#/search/patentdetail/'+re.applicationDocNum+'/'+re.country+'/'+re.publicationDocNum+'/'+re.type+'?userId='+localStorage.getItem('userId'))
                    console.log(param.data);
                }
            })
        },
        addCollect(){
            let uid = localStorage.getItem('userId')
                // let data = {
                //     collectType: 1,
                //     title: this.detailInfo.baseInfo.title,
                //     abstractFigure: this.detailInfo.baseInfo.abstractFigure,
                //     applicant: this.detailInfo.baseInfo.applicant,
                //     applicationDocNum: this.id,
                //     publicationDocNum: this.pubnum,
                //     country: this.country,
                //     type: this.tp
                // }
                // this.$http.post(addCollectUrl,data).then(res=>{
                //     this.detailInfo.isCollect = 1
                //     this.$message.success('收藏成功');
                // }).catch(err=>{
                //     this.$message(err.response.data.msg)
                // })
            if(uid){
                let data = {
                    collectType: 1,
                    title: this.detailInfo.baseInfo.title,
                    abstractFigure: this.detailInfo.baseInfo.abstractFigure,
                    applicant: this.detailInfo.baseInfo.applicant,
                    applicationDocNum: this.id,
                    publicationDocNum: this.pubnum,
                    country: this.country,
                    type: this.tp
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
                collectType: 1,
                collectItemUuid: this.pubnum,
            }
            this.$http.put(cancelCollectUrl,data).then(res=>{
                this.detailInfo.isCollect = 0
                this.$message('取消收藏成功');
            }).catch(err=>{
                this.$message(err.response.data.msg)
            })
        },
        changelabel(k){
            this.current = k;
            let self = this;
            if(k==3){
                let data1 = {
                    'name': self.id,
                    'children':self.treedata1
                }
                let data2 = {
                    'name': '',
                    'children':self.treedata2
                }
                console.log(data1,data2)
                this.$nextTick(()=>{
                    this.createtree(data1,data2)
                })
            }
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
            let data = {
                country: this.country,
                type: this.tp,
                publicationDocNum: this.pubnum
            }
            this.$http.get(detailUrl.replace('{applicationDocNum}',this.id),{params: data})
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                this.detailInfo = data
                // if(data.baseInfo){
                //     this.detaiInfo.baseInfo = data.baseInfo
                // }
                // if(data.auditInfo){
                //     this.detaiInfo.auditInfo = data.auditInfo
                // }
                // if(data.lawStateInfo){
                //     this.detaiInfo.lawStateInfo = data.lawStateInfo
                // }
                if(data.referInfo){
                    if(data.referInfo.refer){
                        data.referInfo.refer.forEach(item=>{
                            item.name = item.applicationDocNum;
                            item.value= 1
                            this.treedata1.push(item)
                        })
                    }
                    if(data.referInfo.referred){
                        data.referInfo.referred.forEach(item=>{
                            item.name = item.applicationDocNum;
                            item.value=1
                            this.treedata2.push(item)
                        })
                    }
                    console.log(this.treedata1,this.treedata2)
                }
                // if(data.costInfo){
                //     this.detaiInfo.costInfo = data.costInfo
                // }
                // if(data.claim){
                //     this.detaiInfo.claim = data.claim
                // }
                // if(data.description){
                //     this.detaiInfo.description = data.description
                // }
                // if(data.descriptionFigure){
                //     this.detaiInfo.descriptionFigure = data.descriptionFigure
                // }
                // if(data.pdfList){
                //     this.detaiInfo.pdfList = data.pdfList
                // }
                // if(data.pledgeTransferPermit){
                //     this.detaiInfo.pledgeTransferPermit = data.pledgeTransferPermit
                // }
                // if(data.homdogy){
                //     this.detaiInfo.homdogy = data.homdogy
                // }
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
.cwidth{
    width: 1200px;
}
.ordinary-search-patentdetail{
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 170px;
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
.patentdetails{
    background-color: #fff;
    padding: 20px  50px;
    .top{
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        color: #666;
        h3{
            /* max-width: 300px; */
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: normal;
            font-size: 16px;
        }
        p{
            font-size: 14px;
        }
        .collects{
            float: right;
            height: 24px;
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
    }
    
    .cont{
        padding: 10px 0 10px 120px;
        .labelbox{
            float: left;
            border: 1px solid #eee;
            border-right: none;
            margin-left: -120px;
            width: 120px;
            >li{
                float: left;
                width: 100%;
                padding-left: 10px;
                font-size: 16px;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
                color: #444;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                &:last-child{
                    border-bottom: none;
                }
                &.active{
                    background-color: #379dea;
                    color:  #fff;
                }
            }
        }
        .allcont{
            float: left;
            width: 100%;
            min-height: 648px;
            border: 1px solid #eee;
            padding: 20px;
            .quanwen{
                height: 600px;
                a{
                    color: #379dea;
                    margin-left: 10px;
                }
            }
            .commontitle{
                font-size: 16px;
                color: #666;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
                font-weight: normal;
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
                    max-width: 90%;
                }
            }
            .basic{
                font-size: 14px;
                color:#999;
                
                .itemname{
                    color:#999;
                }
                .itemcont{
                    color:#666;
                    word-break: break-all;
                }
                .every{
                    float: left;
                    width: 50%;
                    padding: 10px 0 5px;
                    li{
                        line-height: 30px;
                    }
                }
                .zy{
                    padding: 10px 0;
                    font-size: 14px;
                }
                .zycont{
                    max-width: 890px;
                    word-break: break-all;
                    line-height: 20px;
                    color: #666;
                    img{
                        max-width: 100%;
                    }
                }
                .zyftimg{
                    max-width: 980px;
                    padding: 20px;
                    img{
                        max-width: 100%;
                    }
                }
            }
            .tablebox{
                padding: 10px 0;
                margin-bottom: 20px;
            }
            .itemtable{
                width: 100%;
                border: 1px solid #ccc;
                border-collapse: collapse;
                thead{
                    background-color: #e1e1e1;
                    th{
                        height: 40px;
                        line-height: 40px;
                        border: 1px solid #ccc;
                        color: #444;
                    }
                }

                tbody{
                    td{
                        border: 1px solid #ccc;
                        padding: 5px;
                        text-align: center;
                        color: #666;
                    }
                }
                .attachment{
                    color: #379dea;
                    padding: 0 10px;
                    cursor: pointer;
                    a{
                        margin-right: 10px;
                        color:#379dea;
                    }
                }
            }
            .two thead th{
                width: 50%
            }
            .three thead th{
                width: 33%
            }
            .six thead th{
                width: 16%
            }
            .five thead th{
                width: 20%;
            }
            .quanli{
                .pagebox{
                    padding:10px 20px;
                }
                
                p{
                    font-size: 14px;
                    color: #666;
                    text-indent: 2em;
                    word-break: break-all;
                }
            }
        }
    }
}

.treebox{
        height: 500px;
        #lefttree{
            height: 500px;
            width:100%;
        }
    }
</style>