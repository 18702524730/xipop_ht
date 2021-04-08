<template>
  <div class="xmcompanybox">
      <div>
        <h3 class="ptitle">
          企业列表
          
          <span class="addbtn2" @click='exportxls'>导出企业</span>
          <span class="addbtn1" @click='addreport'>导入企业</span>
          <span class="addbtn2" @click="export2xls">导出企业类型</span>
          <span class="addbtn1" @click='addTypereport'>导入企业类型</span>
        </h3>
        <div class='clearfix'>
            <div class="form_control control_flex"><span>企业名称:</span><el-input v-model='searchdata.enterpriseName' placeholder="企业名称"></el-input></div>
            <div class="form_control control_flex"><span>信用代码:</span><el-input v-model='searchdata.creditCode' placeholder="信用代码"></el-input></div>
            <div class="form_control control_flex"><span>行业:</span><el-input v-model='searchdata.industry' placeholder="行业"></el-input></div>
            <div class="form_control control_flex"><span>产品:</span><el-input v-model='searchdata.product' placeholder="产品"></el-input></div>
            <div class="form_control control_flex">
              <span>区域选择:</span>
              <el-select v-model="searchdata.region" clearable placeholder="区域选择">
                  <el-option :label="it.name" v-for="(it,key) in arealist" :key="key" :value="it.name">{{it.name}}</el-option>
              </el-select>
            </div>
            <div class="form_control control_flex">
              <span>标签选择:</span>
              <el-select v-model="tagIds" multiple collapse-tags clearable placeholder="标签选择">
                  <el-option :label="it.tagName" v-for="(it,key) in marklistarr" :key="key" :value="it.id">{{it.tagName}}</el-option>
              </el-select>
            </div>
            <div class="form_control control_flex">
              <span>企业类型:</span>
              <el-select v-model="searchdata.xipopEnterpriseType" clearable placeholder="企业类型">
                  <el-option :label="it" v-for="(it,key) in qytypeList" :key="key" :value="it">{{it}}</el-option>
              </el-select>
            </div>
            <div class="form_control control_flex form_control3">
              <span class="qylxsxsj">企业类型时效时间:</span>
              <el-date-picker v-model="searchdata.beginTime" type="month" placeholder="请选择开始时间"></el-date-picker><i>~</i>
              <el-date-picker v-model="searchdata.endTime" type="month" placeholder="请选择失效时间"></el-date-picker>
            </div>
            <div class="form_control control_flex"><span>曾用名:</span><el-input v-model='searchdata.enterpriseUsedName' placeholder="曾用名"></el-input></div>
            <div class="form_control2"><span @click='conditionsearch'>查询</span><span @click='resets'>重置</span></div>
        </div>
        <div class="result">
          <table class="result_type" v-if="total">
            <thead class="thead">
              <tr>
                <th class="minWidth">序号</th>
                <th class="comWidth">企业名称</th>
                <th class="comWidth">企业英文名</th>
                <th class="comWidth">曾用名</th>
                <th class="comWidth">信用代码</th>
                <th class="comWidth">法定代表人</th>
                <th class="comWidth">行业</th>
                <th class="minWidth">产品</th>
                <th class="comWidth">企业类型</th>
                <th class="minWidth">时效</th>
                <th class="comWidth">开始时间</th>
                <th class="comWidth">失效时间</th>
                <th class="comWidth">标签</th>
                <th class="minWidth">区域划分</th>
                <th class="minWidth">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in dataList" :key="key">
                <td>{{item.seqNo}}</td>
                <td>{{item.enterpriseName}}</td>
                <td>{{item.enterpriseEnName}}</td>
                <td>{{item.enterpriseUsedName}}</td>
                <td>{{item.creditCode}}</td>
                <td>{{item.legalPerson}}</td>
                <td>{{item.industry}}</td>
                <td>{{item.product}}</td>
                <td class="newTd">
                  <div v-for="(it2em,index) in item.xipopEnterpriseTypes?item.xipopEnterpriseTypes:'1'" :key="index">{{it2em.type?it2em.type:''}}</div>
                </td>
                <td class="newTd">
                  <div v-for="(it2em,index) in item.xipopEnterpriseTypes?item.xipopEnterpriseTypes:'1'" :key="index">{{it2em.prescription?it2em.prescription:''}}</div>
                </td>
                <td class="newTd">
                  <div v-for="(it2em,index) in item.xipopEnterpriseTypes?item.xipopEnterpriseTypes:'1'" :key="index">{{it2em.beginTime?it2em.beginTime:''}}</div>
                </td>
                <td class="newTd">
                  <div v-for="(it2em,index) in item.xipopEnterpriseTypes?item.xipopEnterpriseTypes:'1'" :key="index">{{it2em.endTime?it2em.endTime:''}}</div>
                </td>
                <td>{{item.tagNames}}</td>
                <td>{{item.region}}</td>
                <td>
                  <span class="del" @click="audititem(item)">更改</span>
                  <span class="del" @click="delitem(item)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="nodatas" v-if="!loading&&!total">
            暂无数据
          </div>
          
        </div>
        <div class="mypagination" v-show="!loading&&total">
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
      <el-dialog title="导入企业" width="800px" :visible.sync="importshow" top="0">
        <div class="importbox">
          <div class="clearfix mb25">
            <div class="labelname hasrequired">文件选择：</div>
            <div class="clearfix posbox">
                <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="false"  :url="adpic" :valueName="'adpic'" :extensions='"xls,xlsx"'></uploader>
                <div class="tipbox">
                <p v-if="adpic_name" class="filename">{{decodeURIComponent(adpic_name)}} <span class="del" @click="delfile">删除</span></p>
                <p><span class="download" @click="downfile">下载模板</span></p>
                <h3>请选择您所需添加的企业名录，支持格式：xlsx</h3>
                </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="labelname">选择标签：</div>
            <div class="clearfix posbox">
                <ul class="marklistbox clearfix">
                    <li v-for="item in marklistarr" :key="item.id" @click="select(item)" :class="{ selected: item.selected}">{{item.tagName}}</li>
                </ul>
            </div>
          </div>
          <div class="opbtnbox">
            <span class="qd" @click="daoru">确定</span>
            <span class="qx" @click="quxiao">取消</span>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="导入企业类型" width="800px" :visible.sync="importTypeshow" top="0">
        <div class="importbox">
          <div class="clearfix mb25">
            <div class="labelname hasrequired">文件选择：</div>
            <div class="clearfix posbox">
                <uploader @complete="setTypeUploaded2Material" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="false"  :url="adpic" :valueName="'adpic'" :extensions='"xls,xlsx"'></uploader>
                <div class="tipbox">
                <p v-if="adpic_name" class="filename">{{decodeURIComponent(adpic_name)}} <span class="del" @click="delfile">删除</span></p>
                <p><span class="download" @click="down2file">下载模板</span></p>
                <h3>请选择您所需添加的企业名录，支持格式：xlsx</h3>
                </div>
            </div>
          </div>
          <div class="opbtnbox">
            <span class="qd" @click="daoTyperu">确定</span>
            <span class="qx" @click="quTypexiao">取消</span>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="更改企业信息" width="800px" :visible.sync="auditshow" top="0">
        <div class="importbox">
          <div class="clearfix mb20">
            <div class="labelname">企业名称：</div>
            <div class="clearfix posbox">
                {{enterpriseName}}
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">企业英文名：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.enterpriseEnName" placeholder="请输入企业英文名" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">曾用名：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.enterpriseUsedName" placeholder="请输入曾用名" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">法人：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.legalPerson" placeholder="请输入曾用名" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">信用代码：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.creditCode" placeholder="请输入信用代码" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">行业：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.industry" placeholder="请输入行业" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix mb20">
            <div class="labelname">产品：</div>
            <div class="clearfix posbox">
                <el-input v-model="formdata.product" placeholder="请输入产品" maxlength="100"></el-input>
            </div>
          </div>
          <div class="clearfix">
            <div class="labelname">区域划分：</div>
            <div class="clearfix posbox">
                <ul class="marklistbox clearfix">
                    <li v-for="item in arealist" :key="item.id" @click="selectarea(item)" :class="{ selected: selectedid == item.name}">{{item.name}}</li>
                </ul>
            </div>
          </div>
          <div class="clearfix">
            <div class="labelname">选择标签：</div>
            <div class="clearfix posbox">
                <ul class="marklistbox clearfix">
                    <li v-for="item in marklistarr" :key="item.id" @click="select(item)" :class="{ selected: item.selected}">{{item.tagName}}</li>
                </ul>
            </div>
          </div>
          <div class="opbtnbox">
            <span class="qd" @click="queding">确定</span>
            <span class="qx" @click="quxiao">取消</span>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
import {filters,store} from 'utils/'
import uploader from 'cps/uploader/uploader.vue'

const importUrl ='/api/importEnterpriseLib'
const import2Url = '/api/importEnterpriseType'
const exportUrl = '/api/exportEnterpriseLibList'
const expor2tUrl = '/api/exportEnterpriseTypeList'
const downloadUrl = '/api/downloadEnterpriseImportTemplate'
const delUrl ='/api/deleteEnterpriseLib/{id}'
const listUrl ='/api/queryEnterpriseLibList'
const marklist ='/api/queryEnterpriseTagLibList'
const updateUrl ='/api/editEnterpriseLib'
const qiyetype = '/api/enterpriseTypeList'
const download2Url = '/api/downloadEnterpriseTypeImportTemplate'
const dataobj = {
    enterpriseEnName:'',
    enterpriseUsedName:'',
    legalPerson:'',
    creditCode:'',
    industry:'',
    product:'',
    region: '',
    tagIds: ''
}
const cdata = {
    enterpriseName:'',
    creditCode:'',
    industry:'',
    product:'',
    region: '',
    tagIds: '',
    xipopEnterpriseType: '',
    enterpriseUsedName: '',
    beginTime: '',
    endTime: ''
}
const arealist = [
    { id: 1, name: '思明区' },
    { id: 2, name: '海沧区' },
    { id: 3, name: '湖里区' },
    { id: 4, name: '集美区' },
    { id: 5, name: '同安区' },
    { id: 6, name: '翔安区' }
]
export default {
    data(){
        return{
            searchdata: Object.assign({},cdata),
            formdata:Object.assign({},dataobj),
            arealist: arealist,
            query:{},
            recomlist:[],
            importshow: false,
            importTypeshow:false,
            pgIndex:1,
            pgCount:20,
            total: 0,
            dataList:[],
            loading: false,
            adpic:'',
            adpic_Data:[],
            auditshow: false,
            tagIds: [],
            tagType:[],
            timeMonth:'',
            selectedid: '',
            enterpriseName: '',
            marklistarr: [],
            selectedids:[],
            adpic_name:'',
            enterpriseUsedName: '',
            beginTime: '',
            endTime: '',
            xipopEnterpriseType: '',
            qytypeList: []
        }
    },
    components: {
      uploader
    },
    filters:{
      sexFormat: filters.sexFormat,
    },
    mounted(){
      this.getmarklist()
      this.qylist()
      this.getquery()
      this.searchpage()
      this.loading = true;
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods:{
      totimestamp(date){
        var timestamp =date?Date.parse(new Date(date)):'';
        return timestamp
      },
      downfile() {
        const url = CONFIG.rootUrl + downloadUrl
        window.open(url)
      },
      down2file() {
        const url = CONFIG.rootUrl + download2Url
        window.open(url)
      },
      resets(){
          this.searchdata = Object.assign({},cdata);
          for(var key in this.searchdata){
              delete this.query[key]
          }
          this.tagIds = []
          this.searchpage()
      },
      audititem(it) {
        this.enterpriseName= it.enterpriseName
        this.selectedid = it.region
        this.formdata = Object.assign({}, it)
        const arr = it.tagIds.split(',') || []
        const ret = []
        arr.forEach(each => {
          ret.push(each-0)
        })
        this.selectedids = ret
        const rest = []
        this.marklistarr.forEach(item => {
            if(ret.indexOf(item.id) != -1) {
              item.selected = true
            } else {
              item.selected = false
            }
            rest.push(item)
          })
        this.marklistarr = rest
        console.log(this.selectedids, this.marklistarr)
        this.auditshow = true;
      },
      selectarea(it) {
          
          if(this.selectedid) {
            if(this.selectedid == it.name) {
              this.selectedid = ''
            } else {
              this.selectedid = it.name
            }
            
          }else {
            this.selectedid = it.name
          }
      },
      select(it) {
          it.selected = !it.selected
          if(it.selected) {
              this.selectedids.push(it.id)
          } else {
              this.selectedids.forEach(item => {
                  if (item == it.id) {
                      const index = this.selectedids.indexOf(item)
                      this.selectedids.splice(index, 1)
                  }
              })
          }
          console.log(this.selectedids)
      },
      getmarklist(){
        showLoaing()
        this.$http.get(marklist).then(res=>{
          let arr = res.data;
          arr.forEach(item=>{
            item.selected = false
          })
          this.marklistarr = arr;
          hideLoading()
        })
      },
      qylist(){
        showLoaing()
        this.$http.get(qiyetype).then(res=>{
          let arr = res.data;
          this.qytypeList = arr
          hideLoading()
        })
      },
      addreport(){
        const rest = []
        this.marklistarr.forEach(item => {
            item.selected = false
            rest.push(item)
          })
        this.marklistarr = rest
        this.importshow = true
        this.delfile()
      },
      addTypereport(){
        this.importTypeshow = true
        this.delfile()
      },
      exportxls() {
        const data = Object.assign({}, this.query)
        data.tagIds = this.selectedids.join(',')
        const url = CONFIG.rootUrl + exportUrl + "?" + $.param(data)
        window.open(url)
      },
      export2xls() {
        const url = CONFIG.rootUrl + expor2tUrl
        window.open(url)
      },
      downloadxls() {
        const url = CONFIG.rootUrl + downloadUrl
        window.open(url)
      },
      setUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
      },
      setTypeUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
      },
      setTypeUploaded2Material(data){
        var dat = data.data;
        let d = Object.assign({},dat)
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
      },
      delfile() {
        this.adpic_name = ''
        this.adpic = ''
      },
      resetUploader(valueName){
          this[valueName] = '';
          this[valueName+'_name'] = '';
      },
      uploaderErrCallback(data){
          this.$alert(data.msg);
      },
      quxiao(it){
        this.selectedid = ""
        this.selectedids = []
        this.auditshow = false
        this.importshow = false
        this.delfile()
      },
      quTypexiao(){
        this.importTypeshow = false
        this.delfile()
      },
      daoru(it){
        if(!this.adpic) {
          this.$message.warning('请先上传需要导入的文件');
          return
        }
        const str = this.selectedids.join(',')
        const data = {
          templateFileUrl: this.adpic,
          tagIds: str
        }
        showLoaing()
        this.$http.post(importUrl,data).then(res=>{
          this.$message.success('操作成功');
          this.quxiao()
          hideLoading()
          this.searchpage()
        }).catch(err=>{
          hideLoading()
          if(err&&err.response&&err.response.data&&err.response.data.msg){
            this.$message.error(err.response.data.msg)
          }else{
            this.$message.error('系统繁忙，请稍后再试')
          }
        })
      },
      daoTyperu(it){
        if(!this.adpic) {
          this.$message.warning('请先上传需要导入的文件');
          return
        }
        const data = {
          fileUrl: this.adpic
        }
        showLoaing()
        this.$http.get(import2Url,{params: data}).then(res=>{
          console.log(res)
          this.$message.success('操作成功');
          this.quTypexiao()
          this.searchpage()
          hideLoading()
        }).catch(err=>{
          if(err&&err.response&&err.response.data&&err.response.data.msg){
            this.$message.error(err.response.data.msg)
          }else{
            this.$message.error('系统繁忙，请稍后再试')
          }
          hideLoading()
        })
      },
      queding() {
        const data = Object.assign({}, this.formdata)
        data.tagIds = this.selectedids.join(',')
        data.region = this.selectedid
        showLoaing()
        this.$http.put(updateUrl, data).then(res => {
          this.$message.success('修改成功')
          this.quxiao()
          this.searchpage()
          hideLoading()
        }).catch(err => {
          if(err&&err.response&&err.response.data&&err.response.data.msg){
            this.$message.error(err.response.data.msg)
          }else{
            this.$message.error('系统繁忙，请稍后再试')
          }
          hideLoading()
        })
      },
      delitem(it){
        this.$confirm('您确定删除该企业吗？','确认删除', {type: 'warning'}).then(res=>{
          showLoaing()
          this.$http.delete(delUrl.replace("{id}",it.id)).then(res=>{
            this.$message.success('操作成功');
            this.searchpage()
            hideLoading()
          }).catch(err=>{
            if(err&&err.response&&err.response.data&&err.response.data.msg){
              this.$message.error(err.response.data.msg)
            }else{
              this.$message.error('系统繁忙，请稍后再试')
            }
            hideLoading()
          })
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
              if(re.tagIds) {
                const ids = re.tagIds.split(',')
                ids.forEach(item => {
                  const it = item - 0
                  this.tagIds.push(it)
                })
                
              }
              this.query = re;
      },
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(isf){
            this.query.pgIndex = isf ? 1 : this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
            console.log(this.query)
        },
        conditionsearch(){
          let obj ={}
          console.log(this.searchdata.endTime)
          this.searchdata.beginTime = this.totimestamp(this.searchdata.beginTime)
          this.searchdata.endTime = this.totimestamp(this.searchdata.endTime)
          console.log(this.searchdata)
          for(var k in this.searchdata){
            if(this.searchdata.hasOwnProperty(k)){
                if(this.searchdata[k]){
                    obj[k]= this.searchdata[k]
                }
            }
          }
          obj.tagIds = this.tagIds.join(',')
          let data = Object.assign({},obj);
          this.query = data;
          this.searchpage(true)
          console.log(this.query)
      },
      getOrderList(paramsData){
          paramsData = paramsData || {};
          this.loading = true;
          showLoaing()
          this.$http.get(listUrl, {params: paramsData})
          .then((resp) => {
              this.loading = false;
              var data = resp.data;
              console.log(data)
              var dataList = data.elements;
              this.dataList = dataList;
              this.pgIndex = data.pageNum || 1;
              this.total = data.totalElements;
              hideLoading()
          })
          .catch((err) => {
              this.loading = false;
              if(err&&err.response&&err.response.data&&err.response.data.msg){
                this.$message.error(err.response.data.msg)
              }else{
                this.$message.error('系统繁忙，请稍后再试')
              }
              hideLoading()
          });
      },
    }
}
</script>

<style lang='less'>
.xmcompanybox{
  min-width: 1160px;
    .ptitle{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
        .addbtn1{
          float: right;
          width: 100px;
          height: 30px;
          margin-top: 15px;
          margin-left: 20px;
          text-align: center;
          background-color: #379dea;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
        }
        .addbtn2{
          float: right;
          width: 100px;
          height: 30px;
          margin-top: 15px;
          margin-left: 20px;
          text-align: center;
          background-color: #fff;
          line-height: 30px;
          border: 1px solid #379dea;
          color: #379dea;
          border-radius: 4px;
          cursor: pointer;
        }
    }
    .result{
      font-size: 14px;
      overflow-x: auto;
      .nodatas {
        width: 100%;
        border: 1px solid #eee;
        text-align: center;
        line-height: 300px;
        font-size: 16px;
      }
    }
    .result_type{
      border: 1px solid #EBEEF5;
      border-collapse: collapse;
      width: 150%;
      img{
        max-width: 100px;
        max-height: 100px;
      }
      thead{
        th{
          border:1px solid #EBEEF5;
          height: 50px;
          background-color: #F5F7FA;
          // width: 120px;
        }
        th.minWidth{
          max-width:120px;
          min-width:60px;
        }
        th.comWidth{
          max-width:120px;
          min-width:60px;
        }
      }
      tbody{
        tr{
          text-align: center;
          border-top: 1px solid #EBEEF5;
        }
        td{
          color: #666;
          padding: 5px;
          border:1px solid #EBEEF5;
          word-break: break-all;
        }
        .newTd{
          padding: 0;
          >div{
            border-top: 1px solid #EBEEF5;
            min-height: 45px;
            min-width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          >div:first-child{
            border-top: 0;
          }
        }
        .sztj,.bj,.del{
          padding: 3px;
          color: #379dea;
          cursor: pointer;
        }
      }
      
    }
    .importbox {
      padding: 20px;
      .posbox {
        position: relative;
        float: left;
        width: 540px;
      }
      .labelname {
          float: left;
          width: 100px;
          font-size: 14px;
      }
      .hasrequired:before {
          content: '*';
          display: inline-block;
          margin-right: 2px;
          color: #f00;
          font-size: 14px;
          line-height: 1;
      }
      .marklistbox {
        width:540px;
        max-height: 250px;
        overflow-y: auto;
        > li {
            display: flex;
            float: left;
            width: 120px;
            height: 40px;
            line-height: 16px;
            padding: 4px 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            margin-bottom: 10px;
            color: #666;
            cursor: pointer;
            &.selected {
                background-color: #379dea;
                color: #fff;
            }
        }
      }
      .del {
        font-size: 12px;
        color: #379dea;
        margin-left: 20px;
        cursor: pointer;
      }
      .download {
        font-size: 12px;
        color: #379dea;
        cursor: pointer;
      }
      .filename {
        margin-bottom: 10px;
      }
      .tipbox {
        position: absolute;
        left: 120px;
        bottom: 0;
        padding-left: 20px;
        font-size: 14px;
      } 
      h3 {
        font-size: 12px;
        font-weight: normal;
        color: #999;
        line-height: 16px
      }
      .opbtnbox {
        font-size: 0;
        text-align: right;
        padding-top: 20px;
        > span {
          display: inline-block;
          width: 100px;
          font-size: 14px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          border-radius: 3px;
          vertical-align: middle;
          margin-left: 20px;
          &.qx {
            border: 1px solid #ccc;
            color: #666;
          }
          &.qd {
            background-color: #379dea;
            color: #fff;
          }
        }
      }
    }
    .el-dialog {
      top: 10%;
    }
    .form_control2{
      float:left;
      display: flex;
      >span{
          display: inline-block;
          width: 87px;
          height: 30px;
          line-height:30px;
          font-size: 14px;
          background-color:#379dea;
          color:#fff;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
          margin-right: 6px;
      }
      >span:last-child{
          margin-right: 10px;
      }
    }
    .form_control{
      float:left;
        width: 270px;margin-right: 10px;margin-bottom: 10px;
        .el-input__inner{height: 30px;}
        .el-input__icon{
          line-height: 30px;
        }
        .el-select{
          width: 100%;
        }
        .el-date-editor{
          width: 194px;
        }
        .el-tag{
          max-width: 115px;
          display: inline-block;
          span{
            max-width: 89px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .el-icon-close{
          right: 0;
          top: -6px;
        }
        >span{
            display: inline-block;
            margin-top: 2px;
            width: 80px;
            height: 30px;
            line-height:30px;
            font-size: 14px;
            background-color:#379dea;
            color:#fff;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            margin-right: 10px;
        }
        .qylxsxsj{
          width: 120px;
        }
    }
    .form_control3{
      width: 550px;
      i{
        padding: 0 10px;
      }
    }
    .control_flex{
      display: flex;
      >span{
        background: #fff;
        color: #333;
        width: 62px;
        flex-shrink:0;
      }
    }
    .marklistbox::-webkit-scrollbar {
        width: 4px;
        
    }
    .marklistbox::-webkit-scrollbar-track {
        width: 4px;
        background-color: #f2f2f2;
    }
    .marklistbox::-webkit-scrollbar-thumb {
        width: 4px;
        background-color: #379dea;
    }
}

</style>