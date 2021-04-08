<template>
  <div class="statbgbox">
    <div class="topbox">
      <span class="left"></span>
      <span class="center">厦门各区知产统计</span>
      <span class="right"></span>
    </div>
    <div class="statbox clearfix">
      <div class="right-statistical">
        <div class="overview clearfix" v-show="tabnum === 0">
          <div class="effectTitle">
            <div>发明专利持有构成</div>
            <div>各区当前有效专利量<span @click.stop="quanbuFn">全部</span></div>
          </div>
          <div class="cityLf">
            <div class="effectiveInventions">
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
              <div class="Invenstyle" :class="{'Invention1':inAnimation===true}" @animationend='inAnimation=false'>
                <div class="inres">
                  <div class="inre1" v-if="xipopList.validPatentCount"><animated-number class="fmliang" :value="xipopList.validPatentCount" :formatValue="formatToPrice" :duration="500"/><span>件</span></div>
                  <div>有效发明量</div>
                </div>
              </div>
              <div class="Invention2">
                <img src="../../../assets/img/Invention2.png" alt="">
              </div>
              <div class="invenlist">
                <div v-if="xipopList.patentEnterpriseCount">
                  <span class="tit">企业拥有量</span>
                  <div>
                    <span>
                      <animated-number
                        :value="xipopList.patentEnterpriseCount"
                        :formatValue="formatToPrice"
                        :duration="500"
                      />
                    </span>
                    <span>件</span>
                  </div>
                </div>
                <div v-if="xipopList.patentCollegeCount"><span class="tit">大专院校拥有量</span><div><span><animated-number :value="xipopList.patentCollegeCount" :formatValue="formatToPrice" :duration="500"/></span><span>件</span></div></div>
                <div v-if="xipopList.patentInstitutionCount"><span class="tit">科研机构拥有量</span><div><span><animated-number :value="xipopList.patentInstitutionCount" :formatValue="formatToPrice" :duration="500"/></span><span>件</span></div></div>
              </div>
            </div>
            <div class="trademarkNum">
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
              <div class="Invenstyle faguang" :class="{'Invention1':inAnimation===true}" @animationend='inAnimation=false'>
                <img src="../../../assets/img/faguang.png" alt="">
              </div>
              <div class="goucheng2">
                <div v-if="xipopList.patentPrizeCount"><span>专利奖</span><span><animated-number :value="xipopList.patentPrizeCount" :formatValue="formatToPrice" :duration="500"/></span><span>个</span></div>
                <div v-if="xipopList.patentInsuranceCount"><span>专利保险</span><span><animated-number :value="xipopList.patentInsuranceCount" :formatValue="formatToPrice" :duration="500"/></span><span>个</span></div>
                <div v-if="xipopList.wellKnown"><span>驰名商标</span><span><animated-number :value="xipopList.wellKnown" :formatValue="formatToPrice" :duration="500"/></span><span>个</span></div>
                <div v-if="xipopList.geographical"><span>地理标志商标</span><span><animated-number :value="xipopList.geographical" :formatValue="formatToPrice" :duration="500"/></span><span>个</span></div>
              </div>
            </div>
            <div class="peopleNum">
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
              <div>
                <div class="peopletitle">发明人数量</div>
                <div class="renshu" :class="{'renshu2':inAnimation===true}" v-if="xipopList.inventorCount"><span><animated-number :value="xipopList.inventorCount" :formatValue="formatToPrice" :duration="500"/></span><span>人</span></div>
              </div>
              <div>
                <div class="peopletitle">执业专利代理师</div>
                <div class="renshu" :class="{'renshu2':inAnimation===true}" v-if="xipopList.practicePatentAgent"><span><animated-number :value="xipopList.practicePatentAgent" :formatValue="formatToPrice" :duration="500"/></span><span>人</span></div>
              </div>
              <div>
                <div class="peopletitle">专利代理机构</div>
                <div class="renshu" :class="{'renshu2':inAnimation===true}" v-if="xipopList.patentAgency"><span><animated-number :value="xipopList.patentAgency" :formatValue="formatToPrice" :duration="500"/></span><span>人</span></div>
              </div>
              <div>
                <div class="peopletitle">商标代理机构</div>
                <div class="renshu" :class="{'renshu2':inAnimation===true}" v-if="xipopList.trademarkAgency"><span><animated-number :value="xipopList.trademarkAgency" :formatValue="formatToPrice" :duration="500"/></span><span>人</span></div>
              </div>
            </div>
          </div>
          <div class="citychart">
            <div class="mapbox">
              <div class="mains">
                <div id="main"></div>
              </div>
              <div class="maps">
                <div class="map">
                  <div class="tongan addr" id="tongs">
                    <span v-if="validRegionPatentCount.ta.length>0"><animated-number :value="validRegionPatentCount.ta[0] + validRegionPatentCount.ta[1] + validRegionPatentCount.ta[2]" :formatValue="formatToPrice" :duration="1000"/></span>
                    <span class="yuan point2" :class="focus===4?'point':'point2'"></span>
                    <div id="tonganchart" class="smallchart"></div>
                  </div>
                  <div class="jimei addr" id="meis">
                    <span v-if="validRegionPatentCount.jm.length>0"><animated-number :value="validRegionPatentCount.jm[0] + validRegionPatentCount.jm[1] + validRegionPatentCount.jm[2]" :formatValue="formatToPrice" :duration="1000"/> </span>
                    <span class="yuan point2" :class="focus===3?'point':'point2'"></span>
                    <div id="jimeichart" class="smallchart"></div>
                  </div>
                  <div class="haicang addr" id="hais">
                    <span v-if="validRegionPatentCount.hc.length>0"><animated-number :value="validRegionPatentCount.hc[0] + validRegionPatentCount.hc[1] + validRegionPatentCount.hc[2]" :formatValue="formatToPrice" :duration="1000"/></span> 
                    <span class="yuan point2" :class="focus===1?'point':'point2'"></span>
                    <div id="haicangchart" class="smallchart"></div>
                  </div>
                  <div class="xiangan addr" id="xiangs">
                    <span v-if="validRegionPatentCount.xa.length>0"><animated-number :value="validRegionPatentCount.xa[0] + validRegionPatentCount.xa[1] + validRegionPatentCount.xa[2]" :formatValue="formatToPrice" :duration="1000"/> </span>
                    <span class="yuan point2" :class="focus===5?'point':'point2'"></span>
                    <div id="xianganchart" class="smallchart"></div>
                  </div>
                  <div class="huli addr" id="hus">
                    <span v-if="validRegionPatentCount.hl.length>0"><animated-number :value="validRegionPatentCount.hl[0] + validRegionPatentCount.hl[1] + validRegionPatentCount.hl[2]" :formatValue="formatToPrice" :duration="1000"/> </span>
                    <span class="yuan hlyuan point2" :class="focus===2?'point':'point2'"></span>
                    <div id="hulichart" class="smallchart"></div>
                  </div>
                  <div class="siming addr" id="sis">
                    <span v-if="validRegionPatentCount.sm.length>0"><animated-number :value="validRegionPatentCount.sm[0] + validRegionPatentCount.sm[1] + validRegionPatentCount.sm[2]" :formatValue="formatToPrice" :duration="1000"/> </span>
                    <span class="yuan point2" :class="focus===0?'point':'point2'"></span>
                    <div id="simingchart" class="smallchart"></div>
                  </div>
                  <div class="huoju addr" id="huos">
                    <span class="resultnum" v-if="validRegionPatentCount.hj.length>0"><animated-number :value="validRegionPatentCount.hj[0] + validRegionPatentCount.hj[1] + validRegionPatentCount.hj[2]" :formatValue="formatToPrice" :duration="1000"/></span>
                    <span class="addHj">火炬</span>
                    <span class="yuan point2" :class="focus===6?'point':'point2'"></span>
                    <div id="huojuchart" class="smallchart"></div>
										<div class="hjk" :class="{'hjact':focus===6}"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="rhbts">
              <div class="investment">
                <div class="investTitle">R&D投入与发明授权产出</div>
                <div class="investCon">
                  <div id="investEch" class="investEch"></div>
                  <span class="tl"></span>
                  <span class="tr"></span>
                  <span class="bl"></span>
                  <span class="br"></span>
                </div>
              </div>
              <div class="inventions">
                <div class="investTitle">万人有效发明/商标</div>
                <div class="inventCon">
                  <div id="inventCon"></div>
                  <span class="tl"></span>
                  <span class="tr"></span>
                  <span class="bl"></span>
                  <span class="br"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="akeys">
            <div>
              <div class="akeyTitle">重点产业有效发明专利</div>
              <div class="akeyUls">
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd1.png" alt=""></div>
                  <div class="akeyNum">
                    <div>软件和信息服务</div>
                    <div v-if="xipopList.softwareInformation"><span><animated-number :value="xipopList.softwareInformation" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd2.png" alt=""></div>
                  <div class="akeyNum">
                    <div>新能源汽车</div>
                    <div v-if="xipopList.newEnergyVehicles"><span><animated-number :value="xipopList.newEnergyVehicles" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd3.png" alt=""></div>
                  <div class="akeyNum">
                    <div>新医药与生命健康</div>
                    <div v-if="xipopList.newMedicineLife"><span><animated-number :value="xipopList.newMedicineLife" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd4.png" alt=""></div>
                  <div class="akeyNum">
                    <div>人工智能</div>
                    <div v-if="xipopList.artificialIntelligence"><span><animated-number :value="xipopList.artificialIntelligence" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd5.png" alt=""></div>
                  <div class="akeyNum">
                    <div>智能电网</div>
                    <div v-if="xipopList.smartGrid"><span><animated-number :value="xipopList.smartGrid" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd6.png" alt=""></div>
                  <div class="akeyNum">
                    <div>轨道交通</div>
                    <div v-if="xipopList.railTransit"><span><animated-number :value="xipopList.railTransit" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd7.png" alt=""></div>
                  <div class="akeyNum">
                    <div>集成电路</div>
                    <div v-if="xipopList.integrateCircuit"><span><animated-number :value="xipopList.integrateCircuit" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="akeyLi">
                  <div class="akeyImg"><img src="../../../assets/img/zd8.png" alt=""></div>
                  <div class="akeyNum">
                    <div>智能制造设备</div>
                    <div v-if="xipopList.intelligentManufacturing"><span><animated-number :value="xipopList.intelligentManufacturing" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="akeyTitle">知识产权重点企业数量/全市占比</div>
              <div class="ProportionUl">
                <div>
                  <div class="Proportitle">高新企业</div>
                  <div id="gxqy" class="gxqy"></div>
                </div>
                <div>
                  <div class="Proportitle">科技小巨人</div>
                  <div id="kjxjr" class="gxqy"></div>
                </div>
                <div>
                  <div class="Proportitle">知识产权示范/优势企业</div>
                  <div id="sfqy" class="gxqy"></div>
                </div>
                <div>
                  <div class="Proportitle">贯标</div>
                  <div id="guanbiao" class="gxqy"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="yearNums">
            <div>
              <div class="yearTab">
                <span class="liTab" :class="thisYear==1?'active':''" @click="thisYear=1">本年度<span></span></span>
                <span>/</span>
                <span class="liTab" :class="thisYear==1?'':'active'" @click="thisYear=2">上一年度<span></span></span>
              </div>
              <div class="yearUl">
                <div v-if="xipopList">
                  <div class="yearList">
                    <p>专利授权量</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.authorizeCount:xipopList.lastyearAuthorizeCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList">
                    <p>发明授权量</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.inventionCount:xipopList.lastyearInventionCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList">
                    <p>商标申请量</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.trademarkCount:xipopList.lastyearTrademarkCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList">
                    <p>马德里申请</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.mdlCount:xipopList.lastyearMdlCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList">
                    <p>PCT申请</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.pctCount:xipopList.lastyearPctCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList">
                    <p>专利保险</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.insuranceCount:xipopList.lastyearInsuranceCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                  <div class="yearList currs" @mousemove="ispled=true" @mouseout="ispled=false">
                    <p>质押融资金额<span></span></p>
                    <div><span><animated-number :value="thisYear==1?xipopList.zhiya:xipopList.lastyearZhiya" :formatValue="formatToPrice" :duration="500"/></span>元</div>
                    <ul class="pledges" v-show="ispled">
                      <div>
                        <p>专利质押数量</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.zhiyaCount:xipopList.lastyearZhiyaCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                      </div>
                      <div>
                        <p>专利质押金额</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.patentZhiya:xipopList.lastyearPatentZhiya" :formatValue="formatToPrice" :duration="500"/></span>元</div>
                      </div>
                      <div>
                        <p>商标质押数量</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.trademarkZhiyaCount:xipopList.lastyearTrademarkZhiyaCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                      </div>
                      <div>
                        <p>商标质押金额</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.trademarkZhiya:xipopList.lastyearTrademarkZhiya" :formatValue="formatToPrice" :duration="500"/></span>元</div>
                      </div>
                      <div>
                        <p>专利质押笔数</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.patentZhiyaBishu:xipopList.lastyearPatentZhiyaBishu" :formatValue="formatToPrice" :duration="500"/></span>笔</div>
                      </div>
                      <div>
                        <p>商标质押笔数</p>
                        <div><span><animated-number :value="thisYear==1?xipopList.trademarkZhiyaBishu:xipopList.lastyearTrademarkZhiyaBishu" :formatValue="formatToPrice" :duration="500"/></span>笔</div>
                      </div>
                    </ul>
                  </div>
                  <div class="yearList">
                    <p>实施许可合同备案</p>
                    <div><span><animated-number :value="thisYear==1?xipopList.shishixukebeianCount:xipopList.lastyearShishixukebeianCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                  </div>
                </div>
                <div class="noLi" v-if="!xipopList">
                  暂无数据
                </div>
              </div>
            </div>
            <div>
              <div class="topTitle">创新企业专利有效量TOP10</div>
              <div>
                <div class="topUl">
                  <div class="topLi" v-for="(item,key) in enterpriseTop10" :key="key" v-if="key<10">
                    <h4 :class="{'colred':key<3}">TOP{{key+1}}</h4>
                    <p :title="item.enterpriseName">{{item.enterpriseName}}</p>
                    <div v-if="item.patentCount"><span><animated-number :value="item.patentCount" :formatValue="formatToPrice" :duration="500"/></span>件</div>
                    <span class="tl"></span>
                    <span class="tr"></span>
                    <span class="bl"></span>
                    <span class="br"></span>
                  </div>
                  <div class="noLi" v-if="enterpriseTop10.length<=0">
                    暂无数据
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cityComparison">
            <h1>副省级城市对比</h1>
            <div>
              <div class="comparisonTab">
                <div :class="{'active':mapkey===1}" @click="fushengAddr(1)">上年度万人有效发明专利</div>
                <div :class="{'active':mapkey===2}" @click="fushengAddr(2)">有效发明</div>
                <div :class="{'active':mapkey===3}" @click="fushengAddr(3)">PCT</div>
                <div :class="{'active':mapkey===4}" @click="fushengAddr(4)">商标持有量</div>
                <div :class="{'active':mapkey===5}" @click="fushengAddr(5)">高新技术企业数量</div>
              </div>
              <div class="cityMap"></div>
              <div id="comparisonData" class="comparisonData">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import AnimatedNumber from "animated-number-vue"
import '../../../../node_modules/echarts/map/js/china.js'
import $ from 'jquery'
const findOverviewOfXiamenNew = '/api/findOverviewOfXiamenNew'
export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      inAnimation: true,
      focus: '',
      citydata: {
        siming: '',
        huli: '',
        jimei: '',
        tongan: '',
        haicang: '',
        xiangan: '',
        huoju: ''
      },
      myxmChart: '',
      xmoption: '',
      tabnum: 0,
      thisYear: 1,
      ispled: false,
      colorList: [
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }])
      ],
      SHData: [
        { name: '广州',value: 70 },
        { name: '武汉',value: 70 },
        { name: '哈尔滨',value: 70 },
        { name: '沈阳',value: 70 },
        { name: '成都',value: 70 },
        { name: '南京',value: 70 },
        { name: '西安',value: 70 },
        { name: '长春',value: 70 },
        { name: '济南',value: 70 },
        { name: '杭州',value: 70 },
        { name: '大连',value: 70 },
        { name: '青岛',value: 70 },
        { name: '深圳',value: 70 },
        { name: '厦门',value: 70 },
        { name: '宁波',value: 70 }
      ],
      chinaoption: '',
      mychinaecharts: '',
      activeAddr: '',
      mapDcolor: ['#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda','#008dda'],
      mingcheng: ['','','','','','','','','','','','','','',''],
      cityList: '',
      cityVSres: '',
      mapkey: 1,
      mapcolor: ['#12235c','#12235c','#12235c','#12235c','#12235c','#12235c'],
      mapname: require("../../../assets/350200_full.json"),
      xiamendata: '',
      validRegionPatentCount: {
        ta: [],
        jm: [],
        hc: [],
        xa: [],
        hl: [],
        sm: [],
        hj: []
      },
      techRegDataSm: {},
      techRegDataHl: [],
      techRegDataHc: [],
      techRegDataJm: [],
      techRegDataTa: [],
      techRegDataXa: [],
      techRegDataHj: [],
      techRegDataZong: [],
      techRegMap: '',
      rdYearStatics: '',
      xipopList: '',
      enterpriseTop10: ''
    }
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed(0)}`
    },
    // 同安
    createsBarta(data) {  
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '-110%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '实用新型', '外观设计'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('tonganchart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var tongs = document.getElementById('tongs')
      tongs.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 4
        })
      }
      tongs.onclick = function(){
        console.log("同安4")
      }
      barChart.setOption(barChartOption)
    },
    // 集美
    createsBarjm(data) {
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '-110%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barCharta = echarts.init(document.getElementById('jimeichart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var meis = document.getElementById('meis')
      meis.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 3
        })
      }
      meis.onclick = function(){
        console.log("集美3")
      }
      barCharta.setOption(barChartOption)
    },
    // 海沧区
    createsBarhc(data) {
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '-110%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barChartb = echarts.init(document.getElementById('haicangchart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var hais = document.getElementById('hais')
      hais.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 1
        })
      }
      hais.onclick = function(){
        console.log("海沧1")
      }
      barChartb.setOption(barChartOption)
    },
    // 翔安区
    createsBarxa(data) {
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '-90%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barChartc = echarts.init(document.getElementById('xianganchart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var xiangs = document.getElementById('xiangs')
      xiangs.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 5
        })
      }
      xiangs.onclick = function(){
        console.log("翔安5")
      }
      barChartc.setOption(barChartOption)
    },
    // 湖里区
    createsBarhl(data) {
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          x: 0,
          left: '-110%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barChartd = echarts.init(document.getElementById('hulichart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var hus = document.getElementById('hus')
      hus.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 2
        })
      }
      hus.onclick = function(){
        console.log("湖里2")
      }
      barChartd.setOption(barChartOption)
    },
    // 思明区
    createsBarsm(data) {
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '-110%',
          right: '-2%',
          bottom: '-50%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            // data: [500, 300, 400]
            data: data
          }
        ]
      }
      var barCharte = echarts.init(document.getElementById('simingchart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var sis = document.getElementById('sis')
      sis.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        })
      }
      barCharte.setOption(barChartOption)
    },
    // 火炬区
    createsBarhj(data) {
      var that = this
      var barChartOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          bottom: '0%',
          top: '10%'
        },
        xAxis: {
          data: ['发明专利', '外观设计', '实用新型'],
          type: 'category',
          show: false,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          
          show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '9',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = ['blue', '#00DABE', '#ccc']
                  return colorList[params['dataIndex']]
                }
              }
            },
            data: data
            // data: data
          }
        ]
      }
      var barCharte = echarts.init(document.getElementById('huojuchart'), 'shine')
      var myChart = echarts.init(document.getElementById('main'))
      var sis = document.getElementById('huos')
      sis.onmousemove = function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 6
        })
      }
      sis.onclick = function(){
        that.mapcolor.forEach((i,v) => {
            that.mapcolor[v] = '#12235c'
        })
        that.focus = 6
        that.inAnimation = true
        that.mapcolor[6] = '#254EC9' // 点击时改变当前颜色
        that.myxmChart.setOption(that.xmoption)
        for (const item in that.techRegMap){
          for (const index in that.techRegMap[item]){
            if (item === '科技小巨人' && index.indexOf('火炬') !== -1){
              that.techRegDataHj['kjxjr'] = that.techRegMap[item][index]
            } else if (item === '高新企业' && index.indexOf('火炬') !== -1){
              that.techRegDataHj['gxqy'] = that.techRegMap[item][index]
            } else if (item === '知识产权优势示范企业' && index.indexOf('火炬') !== -1){
              that.techRegDataHj['zscqyssfqy'] = that.techRegMap[item][index]
            } else if (item === '知识产权贯标企业' && index.indexOf('火炬') !== -1){
              that.techRegDataHj['zscqgbqy'] = that.techRegMap[item][index]
            }
          }
        }
        that.xmaddlist('火炬','typeHj')
      }
      barCharte.setOption(barChartOption)
    },
    createsmallchart(data) {
      this.createsBarta(data['ta'])
      this.createsBarjm(data['jm'])
      this.createsBarhc(data['hc'])
      this.createsBarxa(data['xa'])
      this.createsBarhl(data['hl'])
      this.createsBarsm(data['sm'])
      this.createsBarhj(data['hj'])
    },
    fushengAddr(mapkey){ // 副省级城市对比
      this.mapkey = mapkey
      for (var mmp1 in this.cityVSres){
        for (var mmp2 in this.cityVSres[mmp1]){
            if (this.mapkey === parseInt(mmp2)){
              this.cityList = this.cityVSres[mmp1][mmp2]
            }
        }
      }
      this.colorList.forEach((i,v) => {
          this.colorList[v] = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }])
          this.mapDcolor[v] = '#008dda'
          this.mingcheng[v] = ''
          this.$set(this.SHData[v] , 'value' , 70) // 添加单个属性
      })
      this.comparisonFn()
      this.chinasMapFn()
		},
		quanbuFn(){
      this.mapcolor.forEach((i,v) => {
          this.mapcolor[v] = '#12235c'
      })
      this.focus = 99
      this.inAnimation = true
      this.myxmChart.setOption(this.xmoption)
      for (var item1 in this.xiamendata.xipopOverviewSetupList){
        for (var item2 in this.xiamendata.xipopOverviewSetupList[item1]){
          if (item2 === '总'){
            this.rdYearStatics = this.xiamendata.xipopOverviewSetupList[item1][item2].rdYearStatics
            this.xipopList = this.xiamendata.xipopOverviewSetupList[item1][item2]
          }
        }
      }
      for (var mmp in this.xiamendata.enterpriseTop10){
        if (mmp === '总'){
          this.enterpriseTop10 = this.xiamendata.enterpriseTop10[mmp]
        }
      }
      this.shujusFn('sfqy','zong')
      this.shujusFn('kjxjr','zong')
      this.shujusFn('gxqy','zong')
      this.shujusFn('guanbiao','zong')
      this.tradFun()
      this.investFun()
    },
    xiamenFn() { // 厦门数据接口调用
      this.$http
        .get(findOverviewOfXiamenNew)
        .then(res => {
          this.xiamendata = res.data
          for (var item1 in this.xiamendata.xipopOverviewSetupList){
            for (var item2 in this.xiamendata.xipopOverviewSetupList[item1]){
              if (item2 === '总'){
                this.rdYearStatics = this.xiamendata.xipopOverviewSetupList[item1][item2].rdYearStatics
                this.xipopList = this.xiamendata.xipopOverviewSetupList[item1][item2]
              }
            }
          }
          for (var mmp in this.xiamendata.enterpriseTop10){
            if (mmp === '总'){
              this.enterpriseTop10 = this.xiamendata.enterpriseTop10[mmp]
            }
          }
          this.cityVSres = this.xiamendata.cityList
          this.techRegMap = this.xiamendata.techRegMap
          for (var index in this.xiamendata.validRegionPatentCount){
            for (var index2 in this.xiamendata.validRegionPatentCount[index].fKindMap){
              if (this.xiamendata.validRegionPatentCount[index].countyName === '思明区'){
                this.validRegionPatentCount['sm'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName === '湖里区'){
                this.validRegionPatentCount['hl'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName === '海沧区'){
                this.validRegionPatentCount['hc'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName === '集美区'){
                this.validRegionPatentCount['jm'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName === '同安区'){
                this.validRegionPatentCount['ta'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName === '翔安区'){
                this.validRegionPatentCount['xa'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              } else if (this.xiamendata.validRegionPatentCount[index].countyName.indexOf('火炬') !== -1){
                this.validRegionPatentCount['hj'].push(this.xiamendata.validRegionPatentCount[index].fKindMap[index2])
              }
            }
          }
          this.fushengAddr(1)
          this.comparisonFn()
          this.chinasMapFn()
          this.tradFun()
          this.investFun()
          this.shujusFn('sfqy','zong')
          this.shujusFn('kjxjr','zong')
          this.shujusFn('gxqy','zong')
          this.shujusFn('guanbiao','zong')
          this.createsmallchart(this.validRegionPatentCount)
        })
        .catch(err => {
          if(err&&err.response&&err.response.data&&err.response.data.msg){
            this.$message.error(err.response.data.msg)
          }else{
            this.$message.error('系统繁忙，请稍后再试')
          }
        })
    },
    comparisonFn(){ // 城市对比
      var that = this
      var option = {
        tooltip: { // 悬停提示
            trigger: "axis",// 触发类型
            axisPointer: { // 指示器配置
                type: "shadow" // 指示器类型
            },
            formatter: '{b}：{c}件' // 提示内容
        },
        color: ['yellow'],
        grid: [
          {
            right: '30%',
            left: '20%',
            top: 8,
            bottom: '0%'
          }
        ],
        xAxis: [{
          type: "value",
          axisLine: { // 轴线
            lineStyle: { // 轴线样式
              color: '#33365E',
              shadowOffsetX: 140,// 轴线阴影
              shadowColor: '#33365E' // 轴线阴影颜色
            }
          },
          offset: 8,
          position: 'top',// 轴线位置
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: { show: false },// 分隔线
          axisLabel: { // 刻度标签
            margin: 8,// 刻度标签距离
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        }],
        yAxis: {
          type: "category",
          axisLabel: { // 刻度标签
            margin: 15,// 刻度标签距离
            show: true,
            color: "#fff"
          },
          axisPointer: false, // 坐标轴指示器
          axisLine: {
            lineStyle: {
              shadowOffsetY: -8,
              shadowColor: '#33365E'
            }
          },
          alignWithLabel: true,
          inverse: 'true',// 翻转
          splitLine: { show: false },// 分隔线
          axisTick: { show: false },// 取消刻度
          show: true,
          data: ["广州", "武汉", "哈尔滨", "沈阳", "成都", "南京", "西安","长春","济南","杭州","大连","青岛","深圳","厦门","宁波"]
        },
        series: {
          name: '',
          type: 'bar',// 柱状图
          barCategoryGap: 16,
          data: that.cityList,
          label: { // 标题头标
            show: true,
            color: '#fff',
            position: 'right',
            formatter: '{c}件',
            fontSize: 13,
            distance: 24 // 距离
          },
          emphasis: { // 高亮的图形样式和标签样式
            itemStyle: { // 高亮图形样式
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#FFD55C' },{ offset: 1, color: '#FFF6DA' }])
            }
          },
          itemStyle: { // 图形样式
            color: function (params){
                  const colorList = that.colorList
                  return colorList[params.dataIndex]
              }
          }
        }
        
      }
      var barChart = echarts.init(document.getElementById('comparisonData'), 'shine')
      barChart.off('click')
      barChart.on('click', function(e) {
        that.colorList.forEach((i,v) => {
            that.colorList[v] = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }])
        })
        that.colorList[e.dataIndex] = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#FFD55C' },{ offset: 1, color: '#FFF6DA' }]) // 点击时改变当前柱子的颜色
        barChart.setOption(option)
        
        that.activeAddr = e.name
        for (var item1 in that.SHData){
          that.mapDcolor[item1] = '#008dda'
          that.mingcheng[item1] = ''
          that.$set(that.SHData[item1] , 'value' , 70) // 添加单个属性
          if (that.activeAddr === that.SHData[item1].name){
            // that.SHData[item1].value = 140
            that.$set(that.SHData[item1] , 'value' , 140) // 添加单个属性
            that.mapDcolor[e.dataIndex] = '#FFD55C'
            that.mingcheng[e.dataIndex] = e.name
          }
        }
        that.chinasMapFn()
      })
      barChart.setOption(option)
    },
    // 中国地图
    chinasMapFn(){
      var that = this
      var geoCoordMap = {
        '新疆玛纳斯基地': [86.22, 44.30],
        '九江': [116.00, 29.70],
        '新乡': [116.402217, 35.311657],
        ' ': [79.92, 37.12],
        '  ': [86.85, 47.70],
        '若羌县': [88.17, 39.02],
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
      }
      that.chinaoption = {
        backgroundColor: '#090b39',
        title: {
            left: 'left',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        geo: {
            map: 'china',
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                  areaColor: '#090b39',
                  borderColor: 'rgba(188, 132, 255, 0.5)',
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 4,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  borderWidth: 1.5
                },
                emphasis: {
                    areaColor: '#254EC9'
                }
            }
        },
        series: {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
              brushType: 'stroke'
          },
          label: {
              normal: {
                  show: true,
                  position: 'right',
                  formatter: function (params){
                      return that.mingcheng[params.dataIndex]
                  }
              }
          },
          symbolSize: function (val) {
              return val[2] / 8
          },
          itemStyle: {
              normal: {
                  color: function (params){
                      return that.mapDcolor[params.dataIndex]
                  }
              }
          },
          data: that.SHData.map(function (dataItem) {
              return {
                name: dataItem.name,
                value: geoCoordMap[dataItem.name].concat([dataItem.value])
              }
          })
        }
      }
      that.mychinaecharts = echarts.init($('.cityMap')[0])
      that.mychinaecharts.off('click')
      that.mychinaecharts.on('click',function(e){
        that.activeAddr = e.name
        for (var item1 in that.SHData){
          that.$set(that.SHData[item1] , 'value' , 70) // 添加单个属性
          that.mapDcolor[item1] = '#008dda'
          that.mingcheng[item1] = ''
          if (e.name === that.SHData[item1].name){
            // that.SHData[item1].value = 140
            that.$set(that.SHData[item1] , 'value' , 140) // 添加单个属性
            that.colorList.forEach((i,v) => {
                that.colorList[v] = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#254EC9' },{ offset: 1, color: '#4C86E6' }])
            })
            that.colorList[e.dataIndex] = new echarts.graphic.LinearGradient(0, 0, 1, 0,[{ offset: 0, color: '#FFD55C' },{ offset: 1, color: '#FFF6DA' }]) // 点击时改变当前柱子的颜色
            that.mapDcolor[e.dataIndex] = '#FFD55C'
            that.mingcheng[e.dataIndex] = e.name
          }
        }
        that.chinasMapFn()
        that.comparisonFn()
      })
      that.mychinaecharts.setOption(that.chinaoption)
    },
    // 知识产权重点企业数量
    ProportionFn(domid,PropResto) {
      var ringOption = {
        color: ['#254EC9','#062449'],
        center: ['50%', '44%'],
        tooltip: {
            trigger: 'item',
            formatter: '{d}%'
        },
        legend: {
            orient: 'vertical',
            left: 10
        },
        title: {
          show: true,
          text: PropResto[0] + "家", // 主标题
          left: "center",
          top: "40%", 
          z: 0,
          zlevel: 100,
          textStyle: { // 设置主标题的 样式
            textAlign: "center",
            color: "#fff",
            fontSize: 19
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['72%', '92%'],
            avoidLabelOverlap: false,
            hoverOffset: 5,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: PropResto
          }
        ]
      }
      var ringCharts = echarts.init(document.getElementById(domid), 'shine')
      ringCharts.setOption(ringOption)
    },
    tradFun() { // 万人有效发明
      var investTime = []
      var wanrenValidPatnet = []
      var wanrenValidTrademark = []
      for (var item in this.rdYearStatics){
        investTime.push(item)
        wanrenValidPatnet.push(this.rdYearStatics[item].wanrenValidPatnet)
        wanrenValidTrademark.push(this.rdYearStatics[item].wanrenValidTrademark)
      }
      var option = {
        color: ["#254EC9",'#EEFF81'],
        tooltip: {
            trigger: "axis"
        },
        legend: [
          {
            data: ['万人有效发明','万人有效商标'],
            textStyle: {
              color: "#fff"
            },
            orient: 'vertical',
            align: 'right',
            top: 17
          }
        ],
        grid: [
          {
            top: '30%',
            left: '54',
            height: '56%',
            width: '76%'
          }
        ],
        xAxis: [{
          type: "category",
          axisLine: {
            lineStyle: {
              color: '#33365E'
            }
          },
          axisLabel: {
            margin: 8,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false // 取消刻度
          },
          data: investTime
        }],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#33365E',
                shadowOffsetY: -20,
                shadowColor: '#33365E'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: "#33365E"
              }
            },
            axisTick: {
              show: false // 取消刻度
            },
            show: true
          }
        ],
        series: [
          {
              name: "万人有效发明",
              type: "line",
              data: wanrenValidPatnet
          },{
              name: '万人有效商标',
              type: 'line',
              data: wanrenValidTrademark
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('inventCon'), 'shine')
      barChart.setOption(option)
    },
    investFun() { // 投入与发明授权产出
      var investTime = []
      var rdInvestment = []
      var inventionAuthorizeCount = []
      for (var item in this.rdYearStatics){
        investTime.push(item)
        rdInvestment.push(this.rdYearStatics[item].rdInvestment)
        inventionAuthorizeCount.push(this.rdYearStatics[item].inventionAuthorizeCount)
      }
      var option = {
        color: ["#254EC9",'#EEFF81'],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        legend: [
          {
            data: ['R&D投入','发明授权产出'],
            textStyle: {
              color: "#fff",
              width: 100
            },
            orient: 'vertical',
            align: 'right',
            top: 17
          }
        ],
        grid: [
          {
            top: '30%',
            height: '56%',
            left: '12%',
            right: '12%'
          }
        ],
        xAxis: [{
          type: "category",
          axisLine: {
            lineStyle: {
              color: '#33365E'
            }
          },
          axisTick: {
            show: false // 取消刻度
          },
          axisLabel: {
            margin: 8,
            textStyle: {
              color: '#fff'
            }
          },
          data: investTime
        }],
        yAxis: [
          {
            type: "value",
            yAxisIndex: 0,
            axisLine: { // 轴线
              lineStyle: { // 样式
                color: '#33365E',
                shadowOffsetY: -20,
                shadowColor: '#33365E'
              }
            },
            axisLabel: { // 轴线标注
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { // 分隔线
              lineStyle: {
                color: "#33365E"
              }
            },
            axisTick: {
              show: false // 取消刻度
            },
            show: true
          },{
            type: 'value',
            yAxisIndex: 1,
            splitLine: { // 分隔线
              show: false,
              lineStyle: {
                color: "#33365E"
              }
            },
            axisTick: {
              show: false // 取消刻度
            },
            axisLine: {
              show: false,// 取消坐标轴
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: { // 轴线标注
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            show: true
          }
        ],
        series: [
          {
              name: "R&D投入",
              type: "bar",
              barWidth: "15",
              yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              data: rdInvestment
          },{
              name: '发明授权产出',
              type: 'line',
              yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              data: inventionAuthorizeCount
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('investEch'), 'shine')
      barChart.setOption(option)
    },
    xmaddlist(qu,type){
      for (var item1 in this.xiamendata.xipopOverviewSetupList){
        for (var item2 in this.xiamendata.xipopOverviewSetupList[item1]){
          if (item2 === qu){
            this.rdYearStatics = this.xiamendata.xipopOverviewSetupList[item1][item2].rdYearStatics
            this.xipopList = this.xiamendata.xipopOverviewSetupList[item1][item2]
          }
        }
      }
      for (var index1 in this.xiamendata.enterpriseTop10){
        if (index1 === qu){
          this.enterpriseTop10 = this.xiamendata.enterpriseTop10[index1]
        }
      }
      this.tradFun()
      this.investFun()
      this.shujusFn('sfqy',type)
      this.shujusFn('kjxjr',type)
      this.shujusFn('gxqy',type)
      this.shujusFn('guanbiao',type)
    },
    mapInit() { // 厦门地图
        var that = this
        that.myxmChart = echarts.init(document.getElementById('main'))
        that.myxmChart.on('mousemove', function(e) {
            that.myxmChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: e.dataIndex
            })
        })
        that.myxmChart.on('mouseout', function(e) {
            that.myxmChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: e.dataIndex
            })
        })
        echarts.registerMap('hanzhou', this.mapname)
        that.myxmChart.on('click', function(e) {
					e.event.event.stopPropagation()
          that.mapcolor.forEach((i,v) => {
              that.mapcolor[v] = '#12235c'
          })
          that.mapcolor[e.dataIndex] = '#254EC9' // 点击时改变当前颜色
          that.myxmChart.setOption(that.xmoption)
          that.focus = e.dataIndex
          that.inAnimation = true
          // 0思明 1海沧 2湖里 3集美 4同安 5翔安
          if (e.dataIndex === 0){ // 思明
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '思明区'){
                  that.techRegDataSm['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '思明区'){
                  that.techRegDataSm['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '思明区'){
                  that.techRegDataSm['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '思明区'){
                  that.techRegDataSm['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('思明','typeSm')
          } else if (e.dataIndex === 1){
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '海沧区'){
                  that.techRegDataHc['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '海沧区'){
                  that.techRegDataHc['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '海沧区'){
                  that.techRegDataHc['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '海沧区'){
                  that.techRegDataHc['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('海沧','typeHc')
          } else if (e.dataIndex === 2){
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '湖里区'){
                  that.techRegDataHl['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '湖里区'){
                  that.techRegDataHl['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '湖里区'){
                  that.techRegDataHl['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '湖里区'){
                  that.techRegDataHl['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('湖里','typeHl')
          } else if (e.dataIndex === 3){
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '集美区'){
                  that.techRegDataJm['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '集美区'){
                  that.techRegDataJm['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '集美区'){
                  that.techRegDataJm['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '集美区'){
                  that.techRegDataJm['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('集美','typeJm')
          } else if (e.dataIndex === 4){
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '同安区'){
                  that.techRegDataTa['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '同安区'){
                  that.techRegDataTa['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '同安区'){
                  that.techRegDataTa['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '同安区'){
                  that.techRegDataTa['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('同安','typeTa')
          } else if (e.dataIndex === 5){
            for (const item in that.techRegMap){
              for (const index in that.techRegMap[item]){
                if (item === '科技小巨人' && index === '翔安区'){
                  that.techRegDataXa['kjxjr'] = that.techRegMap[item][index]
                } else if (item === '高新企业' && index === '翔安区'){
                  that.techRegDataXa['gxqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权优势示范企业' && index === '翔安区'){
                  that.techRegDataXa['zscqyssfqy'] = that.techRegMap[item][index]
                } else if (item === '知识产权贯标企业' && index === '翔安区'){
                  that.techRegDataXa['zscqgbqy'] = that.techRegMap[item][index]
                }
              }
            }
            that.xmaddlist('翔安','typeXa')
          }
        })
        that.xmoption = {
            backgroundColor: '#090b39',
            series: [{
                type: 'map',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 15
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(2,216,253, .8)',
                        borderWidth: 2,
                        color: function (params){
                            const mapcolor = that.mapcolor
                            return mapcolor[params.dataIndex]
                        },
                        shadowColor: 'rgba(2,245,253, 0.5)',
                        shadowBlur: 3,
                        shadowOffsetX: 4,
                        shadowOffsetY: 4
                    },
                    emphasis: {
                        areaColor: '#254EC9',
                        borderWidth: 2,
                        color: 'green'
                    }
                },
                zoom: 1.25,
                aspectScale: 1, 
                roam: false,
                // 使用
                map: 'hanzhou'
                // data: this.difficultData //热力图数据   不同区域 不同的底色
            }]
        }
        that.myxmChart.setOption(that.xmoption)
    },
    zongFn(){ // 总  全市占比
      var that = this
      for (const item in that.techRegMap){
        for (const index in that.techRegMap[item]){
          if (item === '科技小巨人' && index === '总'){
            that.techRegDataZong['kjxjr'] = that.techRegMap[item][index]
          } else if (item === '高新企业' && index === '总'){
            that.techRegDataZong['gxqy'] = that.techRegMap[item][index]
          } else if (item === '知识产权优势示范企业' && index === '总'){
            that.techRegDataZong['zscqyssfqy'] = that.techRegMap[item][index]
          } else if (item === '知识产权贯标企业' && index === '总'){
            that.techRegDataZong['zscqgbqy'] = that.techRegMap[item][index]
          }
        }
      }
    },
    shujusFn(domid,typeRes){ // 全市占比数据处理
      this.zongFn()
      var Propdata = ''
      if (typeRes === 'zong'){
        Propdata = this.techRegDataZong
      } else if (typeRes === 'typeSm'){
        Propdata = this.techRegDataSm
      } else if (typeRes === 'typeHl'){
        Propdata = this.techRegDataHl
      } else if (typeRes === 'typeHc'){
        Propdata = this.techRegDataHc
      } else if (typeRes === 'typeJm'){
        Propdata = this.techRegDataJm
      } else if (typeRes === 'typeTa'){
        Propdata = this.techRegDataTa
      } else if (typeRes === 'typeXa'){
        Propdata = this.techRegDataXa
      } else if (typeRes === 'typeHj'){
        Propdata = this.techRegDataHj
      } else {
        Propdata = []
      }
      var PropResto = []
      var regionCount,regionCountTotal
      if (domid === 'gxqy'){ // 高新企业
        for (const item in Propdata.gxqy){
          if (item === 'regionCount') {
            regionCount = Propdata.gxqy[item]
          }
          if (item === 'regionCountTotal'){
            regionCountTotal = Propdata.gxqy[item]
          }
        }
        if (Propdata.gxqy){
          PropResto.push(regionCount,regionCountTotal - regionCount)
        } else {
          PropResto.push(0,1)
        }
        this.ProportionFn(domid,PropResto)
      } else if (domid === 'sfqy'){ // 示范企业
        for (const item in Propdata.zscqyssfqy){
          if (item === 'regionCount') {
            regionCount = Propdata.zscqyssfqy[item]
          }
          if (item === 'regionCountTotal'){
            regionCountTotal = Propdata.zscqyssfqy[item]
          }
        }
        if (Propdata.zscqyssfqy){
          PropResto.push(regionCount,regionCountTotal - regionCount)
        } else {
          PropResto.push(0,1)
        }
        this.ProportionFn(domid,PropResto)
      } else if (domid === 'kjxjr'){ // 科技小巨人
        for (const item in Propdata.kjxjr){
          if (item === 'regionCount') {
            regionCount = Propdata.kjxjr[item]
          }
          if (item === 'regionCountTotal'){
            regionCountTotal = Propdata.kjxjr[item]
          }
        }
        if (Propdata.kjxjr){
          PropResto.push(regionCount,regionCountTotal - regionCount)
        } else {
          PropResto.push(0,1)
        }
        this.ProportionFn(domid,PropResto)
      } else if (domid === 'guanbiao'){ // 贯标
        for (const item in Propdata.zscqgbqy){
          if (item === 'regionCount') {
            regionCount = Propdata.zscqgbqy[item]
          }
          if (item === 'regionCountTotal'){
            regionCountTotal = Propdata.zscqgbqy[item]
          }
        }
        if (Propdata.zscqgbqy){
          PropResto.push(regionCount,regionCountTotal - regionCount)
        } else {
          PropResto.push(0,1)
        }
        this.ProportionFn(domid,PropResto)
      }
    }
  },
  mounted() {
    this.xiamenFn()
    this.mapInit()
  }
}
</script>

<style lang="less" scoped>
.statbgbox {
  padding-top: 33px;
  padding-bottom: 60px;
  background: rgba(9, 11, 57, 1);
  font-family: PingFangSC-Semibold, PingFang SC;
  ul, h3, p {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .topbox {
    max-width: 1200px;
    margin: 0 auto;
    height: 28px;
    line-height: 28px;
    margin-bottom: 20px;
    // text-align: center;
    > span {
      float: left;
    }
    .left,
    .right {
      // display: inline-block;
      width: 35%;
      height: 22px;
      margin-top: 3px;
      margin-bottom: 3px;
      background-size: 100%;
    }
    .left {
      background-image: url(../../../assets/img/left.png);
      background-position: left center;
      background-repeat: no-repeat;
    }
    .center {
      width: 30%;
      text-align: center;
      line-height: 28px;
      color: #fff;
      font-size: 20px;
      font-family: 'PingFangSC-Semibold,PingFang SC';
      font-weight: 600;
    }
    .right {
      background-image: url(../../../assets/img/right.png);
      background-position: right center;
      background-repeat: no-repeat;
    }
  }
  .bl,
  .br,
  .tl,
  .tr {
    position: absolute;
    width: 13px;
    height: 13px;
    background-position: left top;
    background-repeat: no-repeat;
  }
  .bl {
    left: -2px;
    bottom: -2px;
    background-image: url(../../../assets/img/bl.png);
  }
  .br {
    right: -2px;
    bottom: -2px;
    background-image: url(../../../assets/img/br.png);
  }
  .tl {
    left: -2px;
    top: -2px;
    background-image: url(../../../assets/img/tl.png);
  }
  .tr {
    right: -2px;
    top: -2px;
    background-image: url(../../../assets/img/tr.png);
  }
}
  .statbox {
    position: relative;
    max-width: 1200px;
    min-height: 840px;
    padding: 20px;
    margin: 0 auto;
    background: rgba(9, 11, 57, 1);
  }
  
  .right-statistical {
    width: 100%;
    .effectTitle{
      color: #fff;
      display: flex;
      font-size: 20px;
      margin-bottom: 27px;
      >div:first-child{
        width: 440px;
        text-align: center;
        margin-right: 21px;
      }
      >div:last-child{
        width: 687px;
        text-align: center;
        position: relative;
        >span{
          position: absolute;
          bottom: 0;
          height: 30px;
          width: 70px;
          line-height: 30px;
          background: #254EC9;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          left: 68%;
          top: 1px;
        }
      }
    }
    .cityLf{
      width: 440px;
      margin-right: 21px;
      float: left;
      .Invention2{
        position: absolute;
        top: 47px;
        left: 192px;
        width: 70px;
      }
      .Invenstyle{
        position: absolute;
        top: 21px;
        left: 31px;
        width: 171.66px;
        height: 172.13px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../../assets/img/Invention1.png") no-repeat;
        background-size: 100% 100%;
      }
      .Invention1::after,.Invention1::before{
        content: '';
        width: 171.66px;
        height: 172.13px;
        background: url("../../../assets/img/Invention1.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
      }
      .Invention1::after{
        animation: Invenanima1 2s;
      }
      .Invention1::before{
        animation: Invenanima2 2s;
      }
      @keyframes Invenanima1{
        0%{ 
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
          }
        100%{
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
        }
      }
      @-moz-keyframes Invenanima1{
        0%{ 
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
          }
        100%{
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
        }
      }
      @-webkit-keyframes Invenanima1{
        0%{ 
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
          }
        100%{
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
        }
      }
      @-o-keyframes Invenanima1{
        0%{ 
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
          }
        100%{
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
        }
      }
      @keyframes Invenanima2{
        0%{ 
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
          }
        100%{
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
        }
      }
      @-moz-keyframes Invenanima2{
        0%{ 
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
          }
        100%{
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
        }
      }
      @-webkit-keyframes Invenanima2{
        0%{ 
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
          }
        100%{
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
        }
      }
      @-o-keyframes Invenanima2{
        0%{ 
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
          }
        100%{
            transform:rotate(0);
            -ms-transform:rotate(0); /* IE 9 */
            -webkit-transform:rotate(0); /* Safari and Chrome */
        }
      }
      .effectiveInventions{
        height: 204px;
        position: relative;
        margin-top: 38px;
        box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
        border: 1px solid #143aac;
        .Invention1{
          position: absolute;
          top: 21px;
          left: 31px;
          width: 171.66px;
          height: 172.13px;
          background: url("../../../assets/img/Invention1.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .inres{
          width: 97.2px;
          text-align: center;
          .inre1{
            color: #FFD55C;
            .fmliang{
              font-size: 22px;
            }
            span{
              font-size: 12px;
              margin-left: 3px;
            }
          }
          >div{
            color: #fff;
          }
          .inre2{
            font-size: 12px;
            font-weight: 600;
            color: #FFFFFF;
          }
        }
        .invenlist{
          font-size: 14px;
          color: #FFFFFF;
          position: absolute;
          top: 9px;
          left: 266px;
          >div{
						display: flex;
						margin-top: 32px;
						.tit{
							display: inline-block;
							width: 106px;
						}
            >div{
              display: flex;
              >span:first-child{
                display: inline-block;
                margin-right: 4px;
              }
              >span:nth-child(1){
                color: #FFD55C;
              }
            }
          }
        }
      }
      .trademarkNum{
        margin-top: 20px;
        height: 205px;
        position: relative;
        box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
        border: 1px solid #143aac;
        .faguang{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .goucheng2{
          position: absolute;
          left: 236px;
          top: 11px;
          >div{
            width: 190px;
            height: 32px;
            line-height: 32px;
            background: linear-gradient(270deg, rgba(76, 134, 230, 0) 0%, #254EC9 100%);
            font-size: 14px;
            color: #fff;
            margin-top: 10px;
            padding-left: 8px;
            >span{
              display: inline-block;
            }
            >span:first-child{
              width: 90px;
            }
            >span:nth-child(2){
              color: #FFD55C;
              margin: 0 4px;
            }
          }
        }
      }
      .peopleNum{
        width: 440px;
        height: 442px;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
        border: 1px solid #143aac;
        position: relative;
        padding: 12px;
        >div{
          width: 50%;
          .peopletitle{
            text-align: center;
            color: #fff;
            font-size: 16px;
            margin: 24px 0 16px;
          }
          .renshu{
            background: url('../../../assets/img/renshu.png') no-repeat;
            background-size: 100% 100%;
            width: 136.66px;
            height: 136.34px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFD55C;
            font-size: 12px;
            margin: 0 auto;
            >span:first-child{
              font-size: 20px;
            }
            >span:last-child{
              margin-top: 5px;
            }
          }
          .renshu2::after,.renshu2::before{
            content: '';
            width: 136.66px;
            height: 136.34px;
            position: absolute;
            background: url("../../../assets/img/renshu.png") no-repeat;
            background-size: 100% 100%;
          }
          .renshu2::after{
            animation: Invenanima1 2s;
          }
          .renshu2::before{
            animation: Invenanima2 2s;
          }
        }
      }
    }
    .cityComparison{
      >h1{
        margin: 54px 0 30px;
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
      }
      >div{
        display: flex;
        .comparisonTab{
          margin-top: 50px;
          >div{
            cursor: pointer;
            width: 180px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            margin-bottom: 15px;
            background: #254EC9;
            box-shadow: 0px 1px 10px 0px rgba(0, 35, 255, 0.62);
            color: rgba(255, 255, 255, 0.5);
          }
          >div:hover{
            color: #fff;
            background: #008dda;
            box-shadow: 0px 1px 10px 0px rgba(147, 213, 255, 0.62) inset;
          }
          .active{
            color: #fff;
            background: #008dda;
            box-shadow: 0px 1px 10px 0px rgba(147, 213, 255, 0.62) inset;
          }
        }
        .cityMap{
          margin: 0 10px;
          width: 612px;
          height: 600px;
        }
        .comparisonData{
          width: 360px;
          height: 500px;
          margin-top: 20px;
        }
      }
    }
    .yearNums{
      display: flex;
      margin-top: 61px;
      .noLi{
        box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
        border: 1px solid #143aac;
        width: 100%;
        height: 145px;
        line-height: 145px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        display: block !important;
      }
      >div{
        width: 50%;
      }
      .topUl{
        margin-top: 31px;
        display: flex;
        flex-wrap: wrap;
        .topLi{
          width:114px;
          height: 72px;
          position: relative;
          box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
          border: 1px solid #143aac;
          padding: 8px;
          >h4{
            font-size: 10px;
            color: #FFFFFF;
            margin: 0;
          }
          .colred{
            color: #FF245F;
          }
          >p{
            font-size: 12px;
            color: #FFFFFF;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          >div{
            font-size: 12px;
            color: #048FDB;
            >span{
              font-size: 14px;
              margin-right: 8px;
            }
          }
        }
      }
      .topTitle{
        font-size: 20px;
        color: #FFFFFF;
      }
      .yearUl{
        margin-top: 29px;
        >div{
          display: flex;
          flex-wrap: wrap;
        }
        .currs{
          cursor: pointer;
          position: relative;
          .pledges{
            position: absolute;
            top: 66px;
            left: -1px;
            z-index: 1;
            width: 122px;
            box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
            border: 1px solid #143aac;
            background: #090b39;
            font-size: 10px;
            >div{
              border-bottom: 1px solid #143aac;
              padding: 14px 0 12px;
              >p{
                height: 17px;
                font-size: 12px;
                color: #FFFFFF;
                text-align: center;
              }
              >div{
                font-size: 12px;
                color: #048FDB;
                text-align: center;
                >span{
                  font-size: 16px;
                  margin-right: 5px;
                }
              }
            }
            >div:last-child{
              border: 0;
            }
          }
        }
        .yearList{
          box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
          border: 1px solid #143aac;
          width: 122px;
          height: 68px;
          padding: 14px 0 12px;
          margin-bottom: 8px;
          margin-right: 7px;
          >p{
            height: 17px;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            >span{
              width: 0;
              height: 0;
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
              border-top: 5px solid #fff;
              display: inline-block;
              margin-left: 5px;
            }
          }
          >div{
            font-size: 12px;
            color: #048FDB;
            text-align: center;
            >span{
              font-size: 16px;
              margin-right: 5px;
            }
          }
        }
      }
      .yearTab{
        font-size: 20px;
        color: #fff;
        display: flex;
        .liTab{
          cursor: pointer;
        }
        .active{
          color: #6198E7;
          >span{
            display: block;
            height: 1px;
            background: #6198E7;
          }
        }
      }
    }
    .akeys{
      display: flex;
      width: 100%;
      padding-top: 45px;
      >div{
        width: 50%;
      }
      .akeyTitle{
        font-size: 20px;
        color: #FFFFFF;
      }
      .ProportionUl{
        margin-top: 30px;
        display: flex;
        >div{
          width: 25%;
          .Proportitle{
            font-size: 14px;
            color: #FFFFFF;
            width: 91px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 0 auto;
          }
          .gxqy{
            width: 125px;
            height: 125px;
            margin: 0 auto;
          }
        }
      }
      .akeyUls{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .akeyLi{
          width: 33.333333333333333%;
          margin-top: 16px;
          display: flex;
          align-items: center;
          .akeyImg{
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }
          .akeyNum{
            >div:first-child{
              font-size: 14px;
              color: #FFFFFF;
            }
            >div:last-child{
              font-size: 18px;
              font-weight: 600;
              color: #048FDB;
              >span{
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
    .citychart {
      position: relative;
      float: left;
      width: 687px;
    }
    .mapbox {
      margin-bottom: 12px;
      width: 687px;
      height: 596px;
      position: relative;
      >div{
        position: absolute;
      }
      .mains{
        top: 0;
      }
      .maps{
        top: 0;
      }
      #main{
        width: 689px;
        height: 596px;
      }
      .map {
        position: relative;
        background-position: center center;
        background-repeat: no-repeat;
        > div {
          position: absolute;
          color: #ffd55c;
          font-size: 14px;
          height: 0;
          line-height: 0;
        }
        
        .jimei {
          top: 350px;
          left: 192px;
        }
        .addr{
          .yuan{
            display: inline-block;
            background: rgba(255,213,92,1);
            top: -25px;
            left: -30px;
            position: absolute;
            z-index: 2;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            span{
              width: 10px;
              height: 10px;
              display: inline-block;
              border-radius: 50%;
              margin-left: 10px;
              margin-top: 10px;
              background: rgba(255,213,92,1);
            }
          }
          // .point,.point::before,.point::after{ background-color: rgba(255,213,92,1);position: absolute;width: 12px; height: 12px; border-radius: 50%;content: ''; }
          // .point::before{animation: scale 2s infinite; }
          // .point::after{animation: scale2 2s infinite; }
          // @keyframes scale{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(6); opacity: 0;}}
          // @-moz-keyframes scale{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(6); opacity: 0;}}
          // @-webkit-keyframes scale{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(6); opacity: 0;}}
          // @-o-keyframes scale{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(6); opacity: 0;}}
          // @-moz-keyframes scale2{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(12);opacity:0;}}
          // @-webkit-keyframes scale2{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(12);opacity:0;}}
          // @-o-keyframes scale2{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(12);opacity:0;}}
					// @keyframes scale2{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(12);opacity:0;}}
					
					.point2,.point2::before,.point2::after{ background-color: rgba(255,213,92,1);position: absolute;width: 12px; height: 12px; border-radius: 50%;content: ''; }
          .point2::before{animation: scale3 2s infinite; }
          .point2::after{animation: scale4 2s infinite; }
          @keyframes scale3{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(2); opacity: 0;}}
          @-moz-keyframes scale3{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(2); opacity: 0;}}
          @-webkit-keyframes scale3{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(2); opacity: 0;}}
          @-o-keyframes scale3{0%{ transform: scale(1); opacity:.9}100%{ transform: scale(2); opacity: 0;}}
          @-moz-keyframes scale4{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(4);opacity:0;}}
          @-webkit-keyframes scale4{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(4);opacity:0;}}
          @-o-keyframes scale4{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(4);opacity:0;}}
          @keyframes scale4{0%{ transform: scale(1);opacity:.9;}100%{ transform: scale(4);opacity:0;}}
        }
        .tongan {
          top: 159px;
          left: 303px;
          position: relative;
        }
        .xiangan {
          top: 305px;
          left: 500px;
        }
        .haicang {
          top: 510px;
          left: 168px;
        }
        .huli {
          top: 486px;
          left: 325px;
          .hlyuan{
            top: -32px;
          }
        }
        .siming {
          top: 565px;
          left: 315px;
        }
        .huoju {
          top: 49px;
					left: 645px;
					cursor: pointer;
					.resultnum{
						z-index: 2;
						position: absolute;
					}
          .addHj{
            color: #fff;
            top: -39px;
            position: absolute;
            left: -38px;
						font-size: 15px;
						z-index: 2;
					}
					.hjk{
						width: 100px;
						height: 60px;
						background: #12235c;
						position: absolute;
						border: 2px solid rgba(2,245,253, 0.5);
						z-index: 1;
						top: -50px;
						left: -52px;
						border-radius: 5px;
						box-shadow: 4px 4px 4px rgba(2,245,253, 0.5);
					}
          .hjact{
            background: #254EC9;
          }
				}
				.huoju:hover{
					.hjk{
						background: #254EC9;
					}
				}
        .smallchart {
          position: absolute;
          left: -5px;
          bottom: 13px;
          width: 40px;
					height: 30px;
					z-index: 2;
        }
        .poin{
          pointer-events:none;
        }
      }
    }
    .rhbts{
      display: flex;
      justify-content: space-between;
      .investment{
        width: 349px;
        .investTitle{
          font-size: 20px;
          color: #fff;
          margin-bottom: 25px;
          text-align: center;
        }
        .investCon{
          padding: 0 10px;
          height: 268px;
          position: relative;
          box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
          border: 1px solid #143aac;
          .investEch{
            height: 266px;
          }
        }
      }
      .inventions{
        width: 308px;
        .investTitle{
          font-size: 20px;
          color: #fff;
          margin-bottom: 25px;
          text-align: center;
        }
        .inventCon{
          height: 268px;
          position: relative;
          box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
          border: 1px solid #143aac;
          >div{
            height: 268px;
          }
        }
      }
    }
  }
</style>
