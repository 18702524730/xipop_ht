<template>
    <div class="commonWidth">
        <div v-if="loading" v-loading.fullscreen.lock='loading' element-loading-background="rgba(51, 51, 51,0.6)" ></div>
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
      <div>
          
          <div class="patent-search-result" >
              <div class="bread" v-if="ptype">
                  <span>专利检索</span><span> &gt; {{ptype}}</span><span class="gaojicondition" v-if="nowconditions" :title="nowconditions"> &gt; {{nowconditions}}</span>
              </div>
              <div class="screeningbox">
                    <strong>筛选条件：</strong>
                    <div class="clearfix">
                        <span :title="item.title" v-for="(item,index) in conditions" :key="index"><i class="itemconditon">筛选{{item.name}}：{{item.title}}</i> <i class="icon el-icon-close" @click="remove(item,index)"></i> </span>
                    </div>
                </div>
                <div class="top clearfix">
                    <div class="counts fl">共计<span class="color-red">{{total}}</span>个结果</div>
                    <div class="sortlist fr">
                        <span @click="sortfns('ad')">申请日 <i class='el-icon-sort-down' :class="{active: adnum =='desc'}" ></i><i class="el-icon-sort-up" :class="{active: adnum =='asc'}"></i></span>
                        <span @click="sortfns('pd')">公开/公告日 <i class='el-icon-sort-down' :class="{active: pdnum =='desc'}" ></i><i class="el-icon-sort-up" :class="{active: pdnum =='asc'}"></i></span>
                        <span @click="sortfns('quotedNum')">被引数量 <i class='el-icon-sort-down' :class="{active: quotedNumnum =='desc'}"></i><i class="el-icon-sort-up" :class="{active: quotedNumnum =='asc'}"></i></span>
                        <span class="exportbtn" @click="isvisible=true"><img src="~assets/img/daochu-2.png" alt=""> 导出</span>
                        <el-dialog :visible.sync="isvisible" title="批量导出" width='30%'>
                        <div class="exportbtnbox">
                            <div class="itembox">
                                <span class="left">导出方式：</span>
                                <span>
                                    <el-radio label="1" v-model="radios">EXCEL</el-radio>
                                    <el-radio label="2" v-model="radios">全文PDF</el-radio>
                                </span>
                            </div>
                            <div class="itembox itempadd">
                                <span class="left">导出条数：</span>
                                <span class="exportcount">
                                    <input type="text" maxlength="10" v-model="startnum" @keyup="putcheck(1)" > -
                                    <input type="text" maxlength="10" v-model="endnum" @keyup="putcheck(2)" > 条
                                </span>
                            </div>
                            <p class="redcolor">导出条数从1开始</p>
                            <p>备注：每次最多导出100条，每日最多可导出500条</p>
                        </div>
                        <div class="confirmbox">
                            <span class="no" @click="quxiao">取消</span>
                            <span class="yes" @click="queding">确定</span>
                        </div>
                    </el-dialog>
                    </div>
                </div>
                <div class="middle clearfix">
                    <div class="leftcondition fl">
                        <div class="search-area" v-if="list.length>0 && allshow">
                            <div class="all">
                                <el-checkbox v-model="all" >全部国家和地区</el-checkbox>
                            </div>
                            
                            <div class="china" v-for="(item,index) in list" :key="index">
                                <el-checkbox v-model="item.ischeck" @change="dosome(item)"><span class="countryiconbox"><img :src="item.icon" alt=""></span><span class="labelbox" :title="item.valueName">{{item.valueName}}</span><span class="itemcount">({{item.count}})</span></el-checkbox>
                                <div style="padding-left: 20px;" v-if="item.list">
                                    <el-checkbox-group v-model="item.checked"  @change="check(item)">
                                        <el-checkbox v-for="(t,key) in item.list" :label="t.value" :key="t.value">{{t.valueName}}({{t.count}})</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div style="padding-left: 10px;">
                                <span class="screening"  @click="changetype">筛选</span>
                            </div>
                        </div>
                        <ul class="search-conditons">
                            <li v-if="is_effect" @click="changeitem('effect')">
                                专利有效性
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!effect_show"></i><i v-if="effect_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="effect_show" @click.stop>
                                    <el-checkbox-group v-model="effect_checked">
                                            <el-checkbox v-for="(item,key) in effect" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.count}}</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('effect')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_category" @click="changeitem('category')">
                                IPC分类号
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!category_show"></i><i v-if="category_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="category_show" @click.stop>
                                    <el-radio-group v-model="whichcategory" @change="getfield('category')">
                                        <el-radio :label="1">部</el-radio>
                                        <el-radio :label="2">大类</el-radio>
                                        <el-radio :label="3">小类</el-radio>
                                    </el-radio-group>
                                    <el-checkbox-group v-model="category_checked" v-loading='categoryLoading'>
                                            <el-checkbox v-for="(item,key) in category" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('category')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_apply" @click="changeitem('apply')">
                                中国申请人类型
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!apply_show"></i><i v-if="apply_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="apply_show" @click.stop>
                                    <el-checkbox-group v-model="apply_checked">
                                            <el-checkbox v-for="(item,key) in apply" :label="item.value" :key="item.value"><span class="labelbox" :title="item.valueName">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('apply')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_province" @click="changeitem('province')">
                                中国省市
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!province_show"></i><i v-if="province_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="province_show" @click.stop>
                                    <el-checkbox-group v-model="province_checked">
                                            <el-checkbox v-for="(item,key) in province" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('province')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_public" @click="changeitem('public')">
                                公开(公告日)
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!public_show"></i><i v-if="public_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="public_show" @click.stop>
                                    <el-checkbox-group v-model="public_checked">
                                            <el-checkbox v-for="(item,key) in public" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('public')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_applyer" @click="changeitem('applyer')">
                                申请人(TOP10)
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!applyer_show"></i><i v-if="applyer_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="applyer_show" @click.stop>
                                    <el-checkbox-group v-model="applyer_checked">
                                            <el-checkbox v-for="(item,key) in applyer" :label="item.value" :key="item.value"><span class="labelbox" :title="item.valueName">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('applyer')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_applyday" @click="changeitem('applyday')">
                                申请日(年)
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!applyday_show"></i><i v-if="applyday_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="applyday_show" @click.stop>
                                    <el-checkbox-group v-model="applyday_checked">
                                            <el-checkbox v-for="(item,key) in applyday" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('applyday')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_agent" @click="changeitem('agent')">
                                代理机构
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!agent_show"></i><i v-if="agent_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="agent_show" @click.stop>
                                    <el-checkbox-group v-model="agent_checked">
                                            <el-checkbox v-for="(item,key) in agent" :label="item.value" :key="item.value"><span class="labelbox" :title="item.valueName">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('agent')">筛选</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="is_years" @click="changeitem('years')">
                                维持年限
                                <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!years_show"></i><i v-if="years_show" class="el-icon-arrow-down"></i></span>
                                <div class="itembox" v-if="years_show" @click.stop>
                                    <el-checkbox-group v-model="years_checked">
                                            <el-checkbox v-for="(item,key) in years" :label="item.value" :key="item.value"><span class="labelbox" >{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                    </el-checkbox-group>
                                    <div >
                                        <span class="screening"  @click="add('years')">筛选</span>
                                    </div>
                                </div>
                            </li>
                                <li v-if="is_hangye && hangyechecked" @click="changeitem('hangye')">
                                    国民经济行业分类
                                    <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!hangye_show"></i><i v-if="hangye_show" class="el-icon-arrow-down"></i></span>
                                    <div class="itembox" v-if="hangye_show" @click.stop>
                                        <el-radio-group v-model="hangye" @change="getfield('hangye')">
                                            <el-radio :label="1">部</el-radio>
                                            <el-radio :label="2">大类</el-radio>
                                            <el-radio :label="3">小类</el-radio>
                                        </el-radio-group>
                                        <el-checkbox-group v-model="hangye_checked" v-loading='hangyeLoading'>
                                                <el-checkbox v-for="(item,key) in hangyearr" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                        </el-checkbox-group>
                                        <div >
                                            <span class="screening"  @click="add('hangye')">筛选</span>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="is_zhufenlei && zhufenleichecked" @click="changeitem('zhufenlei')">
                                    IPC主分类号
                                    <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!zhufenlei_show"></i><i v-if="zhufenlei_show" class="el-icon-arrow-down"></i></span>
                                    <div class="itembox" v-if="zhufenlei_show" @click.stop>
                                        <el-radio-group v-model="zhufenlei" @change="getfield('zhufenlei')">
                                            <el-radio :label="1">部</el-radio>
                                            <el-radio :label="2">大类</el-radio>
                                            <el-radio :label="3">小类</el-radio>
                                        </el-radio-group>
                                        <el-checkbox-group v-model="zhufenlei_checked" v-loading='zhufenleiLoading'>
                                                <el-checkbox v-for="(item,key) in zhufenleiarr" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                        </el-checkbox-group>
                                        <div >
                                            <span class="screening"  @click="add('zhufenlei')">筛选</span>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="is_fenlei && fenleichecked" @click="changeitem('fenlei')">
                                    CPC分类号
                                    <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!fenlei_show"></i><i v-if="fenlei_show" class="el-icon-arrow-down"></i></span>
                                    <div class="itembox" v-if="fenlei_show" @click.stop>
                                        <el-radio-group v-model="fenlei" @change="getfield('fenlei')">
                                            <el-radio :label="1">部</el-radio>
                                            <el-radio :label="2">大类</el-radio>
                                            <el-radio :label="3">小类</el-radio>
                                        </el-radio-group>
                                        <el-checkbox-group v-model="fenlei_checked" v-loading='fenleiLoading'>
                                                <el-checkbox v-for="(item,key) in fenleiarr" :label="item.value" :key="item.value"><span class="labelbox">{{item.valueName}}</span> <span class="itemcount">{{item.percent}}%</span> </el-checkbox>   
                                        </el-checkbox-group>
                                        <div >
                                            <span class="screening"  @click="add('fenlei')">筛选</span>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="is_faming && famingchecked" @click="changeitem('faming')">
                                    发明/设计人
                                    <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!faming_show"></i><i v-if="faming_show" class="el-icon-arrow-down"></i></span>
                                    <div class="itembox" v-if="faming_show" @click.stop>
                                        <el-checkbox-group v-model="faming_checked">
                                                <el-checkbox v-for="(item,key) in famingarr" :label="item.value" :key="item.value"><span class="labelbox" :title="item.valueName">{{item.valueName}}</span> <span class="itemcount">{{item.count}}</span> </el-checkbox>   
                                        </el-checkbox-group>
                                        <div >
                                            <span class="screening"  @click="add('faming')">筛选</span>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="is_zhuanli && zhuanlichecked" @click="changeitem('zhuanli')">
                                    当前专利权/人
                                    <span class="iconbox" ><i class="el-icon-arrow-right" v-if="!zhuanli_show"></i><i v-if="zhuanli_show" class="el-icon-arrow-down"></i></span>
                                    <div class="itembox" v-if="zhuanli_show" @click.stop>
                                        <el-checkbox-group v-model="zhuanli_checked">
                                                <el-checkbox v-for="(item,key) in zhuanliarr" :label="item.value" :key="item.value"><span class="labelbox" :title="item.valueName">{{item.valueName}}</span><span class="itemcount">{{item.percent}}%</span> </el-checkbox>
                                        </el-checkbox-group>
                                        <div >
                                            <span class="screening"  @click="add('zhuanli')">筛选</span>
                                        </div>
                                    </div>
                                </li>
                        </ul>
                        <div  style="text-align:right; padding:5px 10px;">
                            <span style="cursor:pointer;color:#666;" @click="dialogVisible=true">更多>></span>
                        </div>
                          <el-dialog
                            :visible.sync="dialogVisible"
                            title="统计字段"
                            width="40%"
                            >
                            <div class="clearfix">
                                <div class="fl fenlei">
                                    <h3>分类</h3>
                                    <ul>
                                        <li>
                                            <el-row><el-checkbox v-model="hangyechecked" @change="addcond('hangye')">国民经济行业分类</el-checkbox></el-row>
                                            <el-row><el-checkbox v-model="zhufenleichecked" @change="addcond('zhufenlei')">IPC主分类号</el-checkbox></el-row>
                                            <el-row><el-checkbox v-model="fenleichecked" @change="addcond('fenlei')">CPC分类</el-checkbox></el-row>
                                        </li>
                                    </ul>
                                </div>
                                <div class="fl fenlei">
                                    <h3>公司/人</h3>
                                    <ul>
                                        <li>
                                            <el-row><el-checkbox v-model="famingchecked" @change="addcond('faming')">发明/设计人</el-checkbox></el-row>
                                            <el-row><el-checkbox v-model="zhuanlichecked" @change="addcond('zhuanli')">当前专利权/人</el-checkbox></el-row>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </el-dialog>
                    </div>
                    <ul class="rightlist fr" v-show="dataList.length">
                        <li v-for="(item,index) in dataList" :key ='index' >
                            <div class="topcont clearfix">
                                <div class="picbox fl">
                                    <img :src="item.abstractFigure" alt="" v-if='item.abstractFigure'>
                                    <img src="~assets/img/logo.png" alt="" v-else>
                                </div>
                                <div class="intr fr">
                                    <h3><span class="state" >{{item.validateName}}</span> <span class="tit" @click="topatentinfo(item)">【{{item.typeName}}】<span v-html="item.title"></span></span> <span class="collect" v-if="item.isCollect==1" @click.stop='cancelCollect(item)'><i class="el-icon-star-on shou"></i> 取消收藏</span> <span class="collect" v-if="item.isCollect==0" @click.stop="addCollect(item)"><i class="el-icon-star-off"></i> 收藏</span></h3>
                                    <ul class="info">
                                        <li><span>申请号：</span>{{item.applicationDocNum}}</li>
                                        <li><span>申请日：</span>{{item.applicationDate}}</li>
                                        <li><span>公开/公告号：</span>{{item.publicationDocNum}}</li>
                                        <li><span>公开/公告日：</span>{{item.publicationDate}}</li>
                                        <li><span>申请人：</span>{{item.applicant}}</li>
                                        <li><span>发明人：</span>{{item.inventor}}</li>
                                        <li><span>代理人：</span>{{item.agentPersonName}}</li>
                                        <li><span>分类号：</span>{{item.ipcList | tostrFormat}}</li>
                                        <li><span>代理机构：</span>{{item.agentName}}</li>
                                    </ul>
                                </div>
                            </div>
                            <p>
                                <span>摘要：</span> <span v-html="item.abstractDesc"></span>
                            </p>
                        </li>
                    </ul>
                    <ul class="nodata fr" v-show="!loading&&!dataList.length">
                        <li>
                            没有搜索到你要的结果
                        </li>
                    </ul>
                </div>
                <!-- <div class="my_loading" v-show="loading" v-loading="loading">
		        </div> -->
                <div class="mypagination" v-show="!loading && dataList.length">
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
import VueCookie from 'vue-cookie'
import $ from 'jquery'
import filters from 'utils/filters'
const addCollectUrl ='./api/addMyCollect'
const cancelCollectUrl ='./api/cancelMyCollect'
//专利检索接口
const patentUrl = './api/queryByKeyword'
// 筛选条件接口
const queryUrl ='./api/queryAndStatistic'
const homeUrl = CONFIG.homeUrl
import { mapGetters } from 'vuex'
//排序 sortField: 申请日 ad 公开日 pd 被引数量 quotedNum sortType:升序 asc  降序 desc
export default {
    data(){
        return {
            homeUrl: homeUrl,
            nowconditions:'',
            cslist:[
                {icon:'',checked:[],ischeck:false,value:'中国',valueName:"中国",count:'212154',list:[{value:'发明壮丽',count:'212154',valueName:'发明专利'}]}
            ],
            quotedNumnum:'',
            adnum:'',
            pdnum:'',
            radios: '1',
            startnum: '',
            endnum:'',
            isvisible: false,
            dialogVisible:false,
            is_effect: true,
            effect_show: false,
            effect_checked:[],
            is_category: true,
            category_show: false,
            category_checked:[],
            whichcategory: 1,
            is_apply: true,
            apply_show: false,
            apply_checked:[],
            is_province: true,
            province_show: false,
            province_checked:[],
            is_public: true,
            public_show: false,
            public_checked:[],
            is_applyer: true,
            applyer_show: false,
            applyer_checked:[],
            is_applyday: true,
            applyday_show: false,
            applyday_checked:[],
            is_agent: true,
            agent_show: false,
            agent_checked:[],
            is_years: true,
            years_show: false,
            years_checked:[],

            is_hangye: true,
            hangye_show: false,
            hangye_checked:[],
            hangyechecked:false,
            hangye:1,
            is_zhufenlei: true,
            zhufenlei_show: false,
            zhufenlei_checked:[],
            zhufenleichecked:false,
            zhufenlei: 1,
            is_fenlei: true,
            fenlei_show: false,
            fenlei_checked:[],
            fenleichecked:false,
            fenlei: 1,
            is_faming: true,
            faming_show: false,
            faming_checked:[],
            famingchecked:false,
            is_zhuanli: true,
            zhuanli_show: false,
            zhuanli_checked:[],
            zhuanlichecked:false,
            list:[],
            allshow: true,
            label:['普通搜索','高级搜索'],
            checkedCities:['cn','docdb'],
            checkedTypes:[],
            checkedCountries:[],
            types:[{name:'发明专利',id:11,num:250},{name:'实用新型',id:12,num:256}],
            conditions:[],
            now:1,
            patent:'',
            mark:'',
            cont:'',
            selected:'2',
            current:0,
            world: false,
            all:false,
            china:false,
            ptype: '',
            search:[{name:'专利检索',id:1},{name:'商标检索',id:2},{name:'判例检索',id:3}],
            effect:[],
            category:[],
            apply:[],
            province:[],
            public:[],
            applyer:[],
            applyday:[],
            agent:[],
            years:[],
            hangyearr:[],
            zhufenleiarr:[],
            fenleiarr:[],
            famingarr:[],
            zhuanliarr:[],
            addconditions:[],
            pgIndex:1,
            pgCount:10,
            total: 0,
            dataList:[],
            loading: false,
            query:{},
            selectedField:[],
            categoryevery:'',
            categoryLoading: false,
            hangyeevery:'',
            hangyeLoading: false,
            zhufenleievery:'',
            zhufenleiLoading: false,
            fenleievery:'',
            fenleiLoading: false,
        }
    },
    filters:{
        tostrFormat: function(arr){
            if(arr && arr.length){
                return arr.join(',')
            }
            return arr
        }
    },
    watch:{
        all(){
            this.list.forEach(item=>{
                item.ischeck = this.all;
                if(item.ischeck){
                    let arr = [];
                    if(item.list){
                        item.list.forEach(it=>{
                            if(this.all){
                                arr.push(it.value)
                            }
                        })
                    }
                    item.checked = arr
                }else{
                    item.checked = []
                }
            })
        },
    },
    methods:{
        addCollect(it){
            let uid = localStorage.getItem('userId')
                // let data = {
                //     collectType: 1,
                //     title: it.title,
                //     abstractFigure: it.abstractFigure,
                //     applicant: it.applicant,
                //     applicationDocNum: it.applicationDocNum,
                //     publicationDocNum: it.publicationDocNum,
                //     country: it.country,
                //     type: it.type
                // }
                // this.$http.post(addCollectUrl,data).then(res=>{
                //     it.isCollect =1
                //     this.$message.success('收藏成功');
                // }).catch(err=>{
                //     this.$message(err.response.data.msg)
                // })
            if(uid){
                let data = {
                    collectType: 1,
                    title: it.title,
                    abstractFigure: it.abstractFigure,
                    applicant: it.applicant,
                    applicationDocNum: it.applicationDocNum,
                    publicationDocNum: it.publicationDocNum,
                    country: it.country,
                    type: it.type
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
                collectType: 1,
                collectItemUuid: it.publicationDocNum,
            }
            this.$http.put(cancelCollectUrl,data).then(res=>{
                it.isCollect = 0
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
            if(this.endnum-this.startnum>99){
                this.$message('每次最多导出100条');
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
                exportType: this.radios,
                startLine: this.startnum,
                endLine: this.endnum,
                userId: userId
            }
            var urldata = Object.assign({},this.query,count)
            urldata.pgCount = 100
            console.log(urldata)
            this.quxiao()
            // window.location = CONFIG.rootUrl + '/api/exportQueryByKeyword?'+$.param(urldata)

            var openurl = CONFIG.rootUrl + '/api/exportQueryByKeyword?' + $.param(urldata)
            window.open(openurl)
            
            // this.loading = true;
            // this.$http.get(CONFIG.rootUrl + '/api/exportQueryByKeyword', { params: urldata }).then(response => {
            //     this.loading = false
            //     if (response.status !== 200) {
            //         this.$message("导出失败，" + response.data.desc)
            //     } else {
            //         let namefie = response.headers['content-disposition']
            //         console.log(namefie)
            //         const content = response.data  
            //         var blob
            //         if (namefie.indexOf("xls") !== -1){
            //         namefie = namefie.split("=")[1].split("-")[0] + '-专利查询结果导出.xls'
            //         blob = new Blob([content], { type: "application/octet-stream" })
            //         } else {
            //         namefie = '专利查询结果导出.zip'
            //         blob = new Blob([content], { type: "application/zip" })
            //         }
            //         const elink = document.createElement('a')
            //         elink.download = namefie
            //         elink.style.display = 'none'
            //         elink.href = URL.createObjectURL(blob)
            //         document.body.appendChild(elink)
            //         elink.click()
            //         URL.revokeObjectURL(elink.href) // 释放URL 对象
            //         document.body.removeChild(elink)
            //     }
            //     }).catch(err => {
            //     this.loading = false
            //     if (err && err.response && err.response.data && err.response.data.msg){
            //         this.$message.error(err.response.data.desc)
            //     } else {
            //         console.log(err.response)
            //         this.$message.error('系统繁忙，请稍后再试')
            //     }
            // })
            // this.isvisible = false;
        },
        // ...mapGetters(['getPatentQuery']),
        sortfn(name,type){
            let obj = {}
            this.quotedNumnum='';
            this.adnum ='';
            this.pdnum ='';
            this.query['sortField'] =name
            this.query['sortType'] =type
            this[name+'num']=type
            let data = Object.assign({},this.query,obj)
            this.$router.replace({query:this.query})
            this.getOrderList(this.query)
        },
        sortfns(name){
            let obj = {}
            // this.quotedNumnum='';
            // this.adnum ='';
            // this.pdnum ='';
            this.query['sortField'] =name
            switch(name){
                case 'pd':
                    this.adnum = '';
                    this.quotedNumnum ='';
                break;
                case 'ad':
                    this.pdnum ='';
                    this.quotedNumnum ='';
                    break;
                case 'quotedNum':
                    this.adnum='';
                    this.pdnum ='';
                    break;
            }
            if(this[name+'num']=='desc'){
                this[name+'num']='asc'
                this.query['sortType'] ='asc'
            }else{
                this[name+'num']='desc'
                this.query['sortType'] ='desc'
            }
            this.searchpage()
        },
        async getfield(type){
            switch(type){
                case 'category':
                    if(this.whichcategory==1){
                        this.categoryevery = 'ipc-section-list'
                    }
                    if(this.whichcategory==2){
                        this.categoryevery = 'ipc-class-list'
                    }
                    if(this.whichcategory==3){
                        this.categoryevery = 'ipc-subclass-list'
                    }
                    try{
                        this.categoryLoading = true;
                        this.query['staticField']=this.categoryevery
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.category = response.data;
                        this.categoryLoading = false
                    }catch(err){
                        this.categoryLoading= false;
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'hangye':
                    if(this.hangye==1){
                        this.hangyeevery = 'nation-catclass'
                    }
                    if(this.hangye==2){
                        this.hangyeevery = 'nation-mainclass'
                    }
                    if(this.hangye==3){
                        this.hangyeevery = 'nation-subclass'
                    }
                    try{
                        this.hangyeLoading = true;
                        this.query['staticField']=this.hangyeevery
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.hangyearr = response.data;
                        this.hangyeLoading = false
                    }catch(err){
                        this.hangyeLoading= false;
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'zhufenlei':
                    if(this.zhufenlei==1){
                        this.zhufenleievery = 'ipc-section'
                    }
                    if(this.zhufenlei==2){
                        this.zhufenleievery = 'ipc-class'
                    }
                    if(this.zhufenlei==3){
                        this.zhufenleievery = 'ipc-subclass'
                    }
                    try{
                        this.zhufenleiLoading = true;
                        this.query['staticField']=this.zhufenleievery
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.zhufenleiarr = response.data;
                        this.zhufenleiLoading = false
                    }catch(err){
                        this.zhufenleiLoading= false;
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'fenlei':
                    if(this.fenlei==1){
                        this.zhufenleievery = 'cpc-section'
                    }
                    if(this.fenlei==2){
                        this.fenleievery = 'cpc-class'
                    }
                    if(this.fenlei==3){
                        this.fenleievery = 'cpc-subclass'
                    }
                    try{
                        this.fenleiLoading = true;
                        this.query['staticField']=this.fenleievery
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.fenleiarr = response.data;
                        this.fenleiLoading = false
                    }catch(err){
                        this.fenleiLoading= false;
                        this.$message.error(err.response.data.msg)
                    }
                    break;
            }
        },
        async getStatistic(param){
            let data = param || {};
            return await this.$http.get(queryUrl,{params: data})
        },
        topatentinfo(it){
            let url = CONFIG.indexUrl+'/#/search/patentdetail/'+it.applicationDocNum+'/'+it.country+'/'+it.publicationDocNum+'/'+it.type+'?userId='+localStorage.getItem('userId')
            window.parent.postMessage(
                'openTab' + url,
                '*'
            );
            // console.log(url)
            // window.open(url)
            // this.$router.push({name:'patentdetail',params:{id:it.applicationDocNum,country: it.country,num:it.publicationDocNum,tp:it.type}})
        },
        check(it){
            if(it['checked'].length>0){
                it['ischeck'] = true;
            }else{
                it['ischeck'] = false;
            }
        },
        dosome(it){
            if(it.ischeck){
                let arr = []
                if(it['list']&&it['list'].length>0){
                    it['list'].forEach(w=>{
                        arr.push(w['value'])
                    })
                }
                it.checked = arr
            }else{
                it.checked = []
            }
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
            if(re.all){
                this.patent = re.all
            }
            this.query = re
            if(this.query['dac']){
                this.checkedCountries = this.query['dac'].split(',')
            }
            if(this.query['fKind']){
                this.checkedTypes = this.query['fKind'].split(',')
            }
            console.log(this.checkedCountries,this.checkedTypes)
            if(re['searchType'] ==1){
                this.ptype = '普通搜索'
                this.nowconditions = ""
            }
            if(re['searchType'] ==2){
                this.ptype = '高级搜索'
                let str = '';
                if(re['in']){
                    str += "发明人:"+re['in']+" "
                }
                if(re['an']){
                    str += "申请号:"+re['an']+"  "
                }
                if(re['pn']){
                    str += "公开(公告)号:"+re['pn']+"  "
                }
                if(re['applicantSearch']){
                    str += "申请人/专利权人:"+re['applicantSearch']+"  "
                }
                if(re['ti']){
                    str += "名称:"+re['ti']+"  "
                }
                if(re['ab']){
                    str += "摘要:"+re['ab']+"  "
                }
                if(re['cl']){
                    str += "权利要求:"+re['cl']+"  "
                }
                if(re['ic']){
                    str += "IPC分类号:"+re['ic']+"  "
                }
                if(re['agentOrgSearch']){
                    str += "代理机构:"+re['agentOrgSearch']+"  "
                }
                if(re['agentSearch']){
                    str += "代理人名称:"+re['agentSearch']+"  "
                }
                if(re['dz']){
                    str += "申请人地址:"+re['ic']+"  "
                }
                if(re['applicationDateStart']&&re['applicationDateEnd']){
                    let start = filters.formatDate.datesFormat(re['applicationDateStart']) 
                    let end = filters.formatDate.datesFormat(re['applicationDateEnd'])
                    str += "申请日期:"+start+"至"+end+"  "
                }
                if(re['publishDateStart']&&re['publishDateEnd']){
                    let start = filters.formatDate.datesFormat(re['publishDateStart']) 
                    let end = filters.formatDate.datesFormat(re['publishDateEnd'])
                    str += "公开日期:"+start+"至"+end+"  "
                }
                if(re['apProvince']||re['apCity']){
                    let p = re['apProvince'] || ''
                    let c = re['apCity'] || ''
                    str += "申请人所在省份:"+p+" "+c+"  "
                }
                if(re['fKind']){
                    str += "专利类型:"+re['fKind']+"  "
                }
                if(re['dac']){
                    str += "国家:"+re['dac']+"  "
                }
                this.nowconditions = str
            }
            if(!re['searchType']){
                this.ptype=''
            }
        },
        // 国家地区筛选
        changetype(){
            this.checkedCountries = [];
            this.checkedTypes = []
            this.list.forEach(item=>{
                if(item.ischeck){
                    this.checkedCountries.push(item.value)
                    if(item.checked&&item.checked.length>0){
                        this.checkedTypes = [...item.checked]
                    }
                }
                
            })
            if(this.checkedTypes.length==0 && this.checkedCountries.length==0){
                this.$message('请选择一个地区')
                return
            }
            // let qobj ={};
            // let query = this.getquery();
            // delete query.searchType;
            // this.ptype =''
            let tit = ''
            let d,f
            if(this.checkedTypes.length>0){
                this.query['fKind'] = this.checkedTypes.join(',')
                f = this.checkedTypes.join(',')
            }
            if(this.checkedCountries.length>0){
                this.query['dac'] = this.checkedCountries.join(',')
                d = this.checkedCountries.join(' or ')
            }
            tit = d +' 专利类型： '+f
            this.conditions.push({name:'国家地区',char:1,title: tit})
            this.allshow = false;
            this.searchpage()
            // this.$router.replace({path:'patentsearch',query:this.query})
            // this.getOrderList(this.query)
            console.log(this.checkedTypes,this.checkedCountries)
        },
        onSearch(num){
            let re = {}
            if(num==1){
                if(!this.patent){
                    this.$message('请输入内容查询');
                    return
                }
                re.all = this.patent;
                re.searchType = 1;
                // re.staticField='dac,f-kind'
                if(this.checkedCities.length==0 || this.checkedCities.length==2){
                    re.category = ''
                }else{
                    re.category = this.checkedCities[0]
                }
                var pg = {
                    pgIndex: this.pgIndex,
                    pgCount: this.pgCount
                };
                this.quotedNumnum ='';
                this.adnum = '';
                this.pdnum='';
                var data = Object.assign({},pg,re);
                this.$router.replace({query: data})
                this.getquery()
                this.resets()
                this.getarea()
                this.getOrderList(data)
                // re.searchType =1
                // this.$store.dispatch('set_patent',re)
                // this.$nextTick(()=>{
                //     this.$router.push({name:'patentsearch'})
                // })
            }
            if(num==2){
                if(!this.mark){
                    this.$message('请输入要查询的商标名称、申请号、申请人等信息');
                    return
                }
                re.q = this.mark;
                // this.$store.dispatch('set_trademark',re)
                // this.$nextTick(()=>{
                //     this.$router.push({name:'trademarksearch'})
                // })
                
                this.$router.push({path:'trademarksearch',query: re})
            }
            if(num==3){
                if(!this.cont){
                    this.$message('请输入要查询的专利申请号');
                    return
                }
                re.applicationDocNum = this.cont
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
    //    删除选项
       remove(item,k){
           if(item.char){
               this.list.forEach(item=>{
                   item.ischeck = false;
                   item.checked = []
                })
                this.checkedTypes =[];
                this.checkedCountries =[]
               this.allshow = true;
               this.all = false;
               delete this.query['dac']
               delete this.query['fKind']
           }else{
                this['is_'+item.type]= true;
                this[item.type+'_show'] =false;
                this[item.type+'_checked']= [];
                switch(item.type){
                    case 'effect':
                        delete this.query['status']
                        break;
                    case 'category':
                        delete this.query['ipcSectionList']
                        delete this.query['ipcClassList']
                        delete this.query['ipcSubclassList']
                    break;
                    case 'apply':
                        delete this.query['apType']
                        break;
                    case 'province':
                        delete this.query['apProvince']
                        break;
                    case 'public':
                        delete this.query['pdYear']
                    break;
                    case 'applyer':
                        delete this.query['pa']
                    break;
                    case 'applyday':
                        delete this.query['adYear']
                        break;
                    case 'agent':
                        delete this.query['ag']
                        break;
                    case 'years':
                        delete this.query['maintenedYear']
                        break;
                    case 'hangye':
                        delete this.query['nationCatclass']
                        delete this.query['nationMainclass']
                        delete this.query['nationSubclass']
                    break;
                    case 'zhufenlei':
                        delete this.query['ipcSection']
                        delete this.query['ipcClass']
                        delete this.query['ipcSubclass']
                    break;
                    case 'fenlei':
                        delete this.query['cpcSection']
                        delete this.query['cpcClass']
                        delete this.query['cpcSubclass']
                    break;
                    case 'faming':
                        delete this.query['in']
                        break;
                    case 'zhuanli':
                        delete this.query['patentee']
                        break;
                }
           }
           delete this.query['staticField']
           delete this.query['specialView']
           this.conditions.splice(k,1);
        //    this.$router.replace({path:'patentsearch',query:this.query})
        //    this.getOrderList(this.query);
           this.searchpage()
           this.getarea()
       },
    //    打开筛选项
       async changeitem(it){
           this[it+'_show'] = !this[it+'_show'];
           if(!this[it+'_show']){
               return false;
           }
           this.query['specialView'] = false
           switch(it){
                case 'effect':
                   try{
                        this.query['staticField']= 'status';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.effect = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    } 
                   break;
                case 'category':
                    this.whichcategory =1
                   this.categoryevery = 'ipc-section-list'
                   try{
                       this.categoryLoading = true;
                        this.query['staticField']= this.categoryevery;
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.category = response.data;
                        this.categoryLoading = false
                    }catch(err){
                        this.categoryLoading = false
                        console.log(err)
                        this.$message.error(err.response.data.msg)
                    } 
                   break;
                case 'apply':
                    try{
                        this.query['staticField']= 'ap-type';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.apply = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'province':
                    try{
                        this.query['staticField']= 'ap-province';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.province = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'public':
                    try{
                        this.query['staticField']= 'pd-year';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.public = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                   break;
                case 'applyer':
                    try{
                        this.query['staticField']= 'pa';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.applyer = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                   break;
                case 'applyday':
                    try{
                        this.query['staticField']= 'ad-year';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.applyday = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'agent':
                    try{
                        this.query['staticField']= 'ag';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.agent = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'years':
                    try{
                        this.query['staticField']= 'valid-year';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.years = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'hangye':
                    try{
                        this.hangye =1
                        this.query['staticField']= 'nation-catclass';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.hangyearr = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                   break;
                case 'zhufenlei':
                    try{
                        this.zhufenlei =1
                        this.query['staticField']= 'ipc-section';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.zhufenleiarr = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                   break;
                case 'fenlei':
                    try{
                        this.fenlei =1
                        this.query['staticField']= 'cpc-section';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.fenleiarr = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                   break;
                case 'faming':
                    try{
                        this.query['staticField']= 'in';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.famingarr = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
                case 'zhuanli':
                    try{
                        this.query['staticField']= 'patentee';
                        let data = Object.assign({},this.query)
                        let response = await this.getStatistic(data)
                        this.zhuanliarr = response.data;
                    }catch(err){
                        this.$message.error(err.response.data.msg)
                    }
                    break;
           }
           
       },
    //    筛选
       async add(it){
           let arr = this[it+'_checked'];
           if(arr.length<1){
                this.$message('请选择一个筛选条件');
                return
            }
        //    let qobj ={};
        //     let query = this.getquery();
        //     delete query.searchType;
        //     this.ptype =''
            let data ={};
            let titarr= [];
            let tit = '';
           switch(it){
                case 'effect':
                    this.effect.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['status'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '专利有效性',
                        type: 'effect',
                        title:tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'category':
                    this.category.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    if(this.whichcategory==1){
                        this.query['ipcSectionList'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    if(this.whichcategory==2){
                        this.query['ipcClassList'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    if(this.whichcategory==3){
                        this.query['ipcSubclassList'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: 'IPC分类号',
                        type: 'category',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'apply':
                    this.apply.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['apType'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '中国申请人类型',
                        type: 'apply',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'province':
                    this.province.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['apProvince'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '中国省市',
                        type: 'province',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'public':
                    this.public.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['pdYear'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '公开(公告日)',
                        type: 'public',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'applyer':
                    this.applyer.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['pa'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '申请人(TOP10)',
                        type: 'applyer',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'applyday':
                    this.applyday.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['adYear'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '申请日(年)',
                        type: 'applyday',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'agent':
                    this.agent.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['ag'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '代理机构',
                        type: 'agent',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'years':
                    this.years.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['maintenedYear'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '维持年限',
                        type: 'years',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'hangye':
                    this.hangyearr.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    
                    if(this.hangye==1){
                        this.query['nationCatclass'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    if(this.hangye==2){
                        this.query['nationMainclass'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    if(this.hangye==3){
                        this.query['nationSubclass'] = arr.join(',')
                        tit = `${titarr.join(' or ')}`
                    }
                    data = Object.assign({},this.query)
                    console.log(data)
                    this.conditions.push({
                        name: '国民经济行业分类',
                        type: 'hangye',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'zhufenlei':
                    this.zhufenleiarr.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    if(this.zhufenlei==1){
                        this.query['ipcSection'] = arr.join(',')
                    }
                    if(this.zhufenlei==2){
                        this.query['ipcClass'] = arr.join(',')
                    }
                    if(this.zhufenlei==3){
                        this.query['ipcSubclass'] = arr.join(',')
                    }
                    data = Object.assign({},this.query)
                    console.log(data)
                    this.conditions.push({
                        name: 'IPC主分类号',
                        type: 'zhufenlei',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'fenlei':
                    this.fenleiarr.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    if(this.fenlei==1){
                        this.query['cpcSection'] = arr.join(',')
                    }
                    if(this.fenlei==2){
                        this.query['cpcClass'] = arr.join(',')
                    }
                    if(this.fenlei==3){
                        this.query['cpcSubclass'] = arr.join(',')
                    }
                    data = Object.assign({},this.query)
                    console.log(data)
                    this.conditions.push({
                        name: 'CPC分类号',
                        type: 'fenlei',
                        title: tit
                    })
                    this['is_'+it] = false;
                   break;
                case 'faming':
                    this.famingarr.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['in'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '发明设计人',
                        type: 'faming',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
                case 'zhuanli':
                    this.zhuanliarr.forEach(item=>{
                        for(let i=0;i<arr.length;i++){
                            if(item['value']==arr[i]){
                                titarr.push(item['valueName'])
                            }
                        }
                    })
                    tit = `${titarr.join(' or ')}`
                    this.query['patentee'] = arr.join(',');
                    data = Object.assign({},this.query)
                    this.conditions.push({
                        name: '当前专利权/人',
                        type: 'zhuanli',
                        title: tit
                    })
                    this['is_'+it] = false;
                    break;
           }
           
        //    this.$router.replace({query:this.query})
        //    this.getOrderList(this.query);
            delete this.query['specialView']
            this.searchpage()
            this.getarea()
       },
       addcond(type){
           let t = this[type+'checked']
           if(t){
               switch(type){
                   case 'hangye':
                   this.addconditions.push({
                       name: '国民经济行业分类',
                       type: type
                   })
                   break;
               }
           }
       },
       handleCurrentChange(i){
            this.pgIndex = i;
		    // this.query.pgIndex = i;
            // this.query.pgCount = this.pgCount;
            // this.$router.replace({query: this.query})
            // this.getOrderList(this.query);
            this.searchpage()
        },
        searchpage(){
            // delete ret.searchType
            // var pg = {
            //     pgIndex: this.pgIndex,
            //     pgCount: this.pgCount
            // };
            // var data = Object.assign({},this.query,pg);
            // this.$router.replace({query: data})
            // this.getOrderList(data)

            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(patentUrl, {params: paramsData})
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                var dataList = data.elements;
                // if(this.patent){
                //     dataList.forEach(item=>{
                        
                //         item.abstractDesc = item.abstractDesc.replace(this.patent,'<span style="color:red">'+this.patent+'</span>')
                //         item.title = item.abstractDesc.replace(this.title,'<span style="color:red">'+this.patent+'</span>')
                //         item.abstractDesc = item.abstractDesc.replace(this.patent,'<span style="color:red">'+this.patent+'</span>')
                //     })
                // }
                this.dataList = dataList;
                this.pgIndex = data.pageNum || 1;
                this.total = data.totalElements;
            })
            .catch((err) => {
                this.loading = false;
                this.$message.error(err.response.data.msg)
            });
        },
        getarea(){
            let query = {
                staticField:'dac,f-kind',
                specialView: true
            }
            let data = Object.assign({},this.query,query)
            this.$http.get(queryUrl,{params: data}).then(response=>{
                let arr =[];
                if(response&&response.data &&response.data.length){
                    response.data.forEach(item=>{
                        item.checked = [];
                        item.ischeck = false;
                        if(item.value =='WO'){
                            item.list = null
                        }
                        arr.push(item)
                    })
                }
                this.list = arr;
            })
        },
        resets(){
            this.checkedTypes = [];
            this.checkedCountries = []
            this.conditions = []
            if(this.query.searchType==1){
                delete this.query['dac']
                delete this.query['fKind']
            }
            this.is_effect= true
            this.is_category= true
            this.is_apply=true
            this.is_province= true
            this.is_public= true
            this.is_applyer=true
            this.is_applyday=true
            this.is_agent=true
            this.is_years=true
            this.is_hangye=true
            this.is_zhufenlei= true
            this.is_fenlei=true
            this.is_faming=true
            this.is_zhuanli=true
            this.allshow=true
            this.effect_show= false
            this.category_show= false
            this.apply_show=false
            this.province_show= false
            this.public_show= false
            this.applyer_show=false
            this.applyday_show=false
            this.agent_show=false
            this.years_show=false
            this.hangye_show=false
            this.zhufenlei_show= false
            this.fenlei_show=false
            this.faming_show=false
            this.zhuanli_show=false

            this.effect_checked= []
            this.category_checked= []
            this.apply_checked=[]
            this.province_checked= []
            this.public_checked= []
            this.applyer_checked=[]
            this.applyday_checked=[]
            this.agent_checked=[]
            this.years_checked=[]
            this.hangye_checked=[]
            this.zhufenlei_checked= []
            this.fenlei_checked=[]
            this.faming_checked=[]
            this.zhuanli_checked=[]
            delete this.query['status']
            delete this.query['ipcSectionList']
            delete this.query['ipcClassList']
            delete this.query['ipcSubclassList']
            delete this.query['apType']
            delete this.query['apProvince']
            delete this.query['pdYear']
            delete this.query['pa']
            delete this.query['adYear']
            delete this.query['ag']
            delete this.query['maintenedYear']
            delete this.query['nationCatclass']
            delete this.query['nationMainclass']
            delete this.query['nationSubclass']
            delete this.query['ipcSection']
            delete this.query['ipcClass']
            delete this.query['ipcSubclass']
            delete this.query['cpcSection']
            delete this.query['cpcClass']
            delete this.query['cpcSubclass']
            if(this.query.searchType!=2){
                delete this.query['in']
            }
            
            delete this.query['patentee']
            delete this.query['staticField']
            delete this.query['specialView']
        }
    },
    updated(){
        // let height = document.documentElement.scrollHeight
         let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
        console.log(height)
        // this.$nextTick(()=>{
        //     alert(document.documentElement.scrollHeight)
        // })
        
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
        this.resets()
        this.searchpage()
        this.getarea()
        // window.parent.postMessage(
        //     document.documentElement.scrollHeight + 'px',
        //     '*'
        // );
        // console.log(document.documentElement.scrollHeight)
    }
}
</script>

<style lang ='less'>
.color-red{
    color: red;
    
}
.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}

.patent-search-result{
    padding-bottom: 50px;
    background-color: #fff;
    .top{
        padding: 20px 0 10px;
        border-bottom: 1px solid #eee;
    }
    .middle{
        padding-top: 10px;
    }
    .counts{
        padding-top: 16px;
        font-size: 16px;
    }
    .sortlist{
        color: #999;
        >span{
            display: inline-block;
            font-size: 14px;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #eee;
            margin-left: 10px;
            border-radius: 2px;
            cursor: pointer;
            i{
                display:inline-block;
                width: 6px;
            }
            .active{
                color: red;
            }
        }
        .totop{
            width: 14px;
            height: 14px;
            color: #ccc;
        }
        .todown{
            width: 14px;
            height: 14px;
            color: #ccc;
        }
        .exportbtn{
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
            .itempadd{
                margin-bottom: 0;
            }
            .redcolor{
                color: red;
                margin-bottom: 8px;
                margin-left: 6px;
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
    .leftcondition{
        width: 200px;
        padding-right: 5px;
        .el-dialog__header{
            background-color: #379dea;
            padding-bottom: 20px;
        }
        .el-radio{
            margin-right: 8px;
        }
        .el-dialog .el-dialog__title{
            color:#fff;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color:#fff;
        }
        .fenlei{
            width: 40%;
            padding: 20px;
            h3{
                margin-bottom: 10px;
            }
        }
        .countryiconbox{
            float: left;
            width:20px;
            height: 18px;
            padding: 0;
            margin: 0;
            margin-right: 5px;
            vertical-align: middle;
            img{
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
        
    }
    .rightlist{
        width: 1000px;
        >li{
            padding:10px 20px;
            border: 1px solid #eee;
            margin-bottom: 5px;
        }
        p{
            font-size: 14px;
            color: #999;
            display: -webkit-box;
            overflow: hidden;  
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .topcont{
            /* margin-bottom: 10px; */
            color: #666;
            .picbox{
                width:160px;
                height: 160px;
                /* background-color: #ccc; */
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                }
            }
            .intr{
                width:770px;
                h3{
                    margin-bottom: 10px;
                }
                .info{
                    height: 140px;
                    >li{
                        float: left;
                        width:50%;
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        margin-bottom: 5px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
                .state{
                    display: inline-block;
                    padding: 0 10px;
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
    .bread{
        padding: 10px 0;
        color:  #333;
        font-size: 14px;
        span{
            vertical-align: middle;
        }
        .gaojicondition{
            display: inline-block;
            max-width:300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
        }
    }
    .screening{
        display: inline-block;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #379dea;
        color: #379dea;
        font-size: 14px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .screeningbox{
        padding-left: 15px;
        padding-top: 5px;
        background-color: #f5f5f5;
        border: 1px solid #eee;
        >strong{
            display: block;
            font-weight: bold;
            color: #000;
            line-height: 30px;
            font-size: 16px;
        }
        span{
            float: left;
            padding: 5px 10px;
            line-height: 20px;
            margin-bottom: 5px;
            height: 30px;
            background-color: #fff;
            color: #999;
            border: 1px solid #eee;
            font-size: 12px;
            position: relative;
            margin-right: 10px;
            .itemconditon{
                width: 173px;
                float: left;
                font-style: normal;
                vertical-align: middle;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .icon{
                float: right;
                padding:3px;
                margin-left: 10px;
                font-size: 14px;
                /* margin-left: 10px; */
                text-align: center;
                overflow: hidden;
                color:#ccc;
                font-weight: normal;
                cursor: pointer;
            }
        }
    }
}

.ordinary-search-patent{
    padding-top: 20px;
    min-height: 170px;
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
.search-area{
    border: 1px solid #eee;
    font-size: 14px;
    .all{
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
    .china{
        padding: 5px 5px 5px 15px;
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
            .labelbox{
                float: left;
                max-width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .itemcount{
                float: left;
                vertical-align: middle;
            }
            .el-checkbox{
                width: 170px;
                overflow: hidden;
                /* text-overflow: ellipsis; */
                .el-checkbox__label {
                    width: 170px;
                    line-height: 18px;
                    vertical-align: middle;
                }
            }
    }
    .world{
        padding: 5px 5px 5px 15px;
    }
}
.search-conditons{
    font-size: 12px;
    .el-checkbox+.el-checkbox {
        margin-left: 0;
    }
    .itemcount{
        float: right;
        /* margin-left: 30px; */
    }
    >li{
        
        padding-right: 5px;
        line-height: 30px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        .itembox{
            padding-left: 15px;
            .labelbox{
                float: left;
                max-width: 78px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .el-checkbox{
                width: 170px;
                overflow: hidden;
                /* text-overflow: ellipsis; */
                .el-checkbox__label {
                    width: 150px;
                    line-height: 18px;
                    vertical-align: middle;
                }
            }
        }
        .iconbox{
            float: right;
            width: 14px;
            height: 14px;
            color: #999;
            cursor: pointer;
        }
    }
    .nodata{
        width: 980px;
        border: 1px solid #eee;
        text-align: center;
        line-height: 300px;
        font-size: 16px;
    } 
} 
 
</style>