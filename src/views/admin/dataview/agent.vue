<template>
  <div class="agentdatabox">
      <div>
        <h3 class="ptitle">专利代理师列表<span class="addbtn" @click='exportxls'>导出</span><span class="addbtn" @click='addreport'>导入</span> <span class="addbtn" @click='downloadxls'>下载导入模板</span></h3>
        <div class="result" >
          <table class="result_type" v-if="total">
            <thead class="thead">
              <tr>
                <!-- <th class="minWidth">编号</th> -->
                <th class="comWidth">机构名称</th>
                <th class="minWidth">姓名</th>
                <th class="minWidth">性别</th>
                <th class="comWidth">专业</th>
                <th class="comWidth">资格证号</th>
                <th class="comWidth">执业备案号</th>
                <th class="comWidth">是否取得律师执业资格</th>
                <th class="comWidth">执业开始时间</th>
                <th class="minWidth">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in dataList" :key="key">
                <!-- <td>{{item.agentSn}}</td> -->
                <td>{{item.agency}}</td>
                <td>{{item.agent}}</td>
                <td>{{item.sex|sexFormat}}</td>
                <td>{{item.major}}</td>
                <td>{{item.certificateNo}}</td>
                <td>{{item.professionNo}}</td>
                <td>{{item.obtain==0?'否':'是'}}</td>
                <td>{{item.practiceTime}}</td>
                <td>
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
      <el-dialog title="导入机构代理人" width="500px" :visible.sync="importshow" top="0">
        <div class="importbox">
          
          <div class="clearfix posbox">
            <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="false"  :url="adpic" :valueName="'adpic'" :extensions='"xls,xlsx"'></uploader>
            <div class="tipbox">
              <p v-if="adpic_name" class="filename">{{decodeURIComponent(adpic_name)}} <span class="del" @click="delfile">删除</span></p>
              <h3>请选择要导入的文件</h3>
              <h3>支持格式：xlsx</h3>
            </div>
          </div>
          <div class="opbtnbox">
            <span class="qd" @click="daoru">确定</span>
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

const  importUrl ='/api/importsXipopAgent'
const exportUrl = '/api/exportAllXipopAgent'
const downloadUrl = '/api/downloadAgentImportTemplate'
const  delUrl ='/api/deleteXipopAgent/{id}'
const  listUrl ='/api/findXipopAgentList'
export default {
    data(){
        return{
            query:{},
            recomlist:[],
            importshow: false,
            pgIndex:1,
            pgCount:20,
            total: 0,
            dataList:[],
            loading: false,
            adpic:'',
            adpic_Data:[],
            adpic_name:'',
        }
    },
    components: {
      uploader
    },
    filters:{
      sexFormat: filters.sexFormat,
    },
    mounted(){
      this.getquery()
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
      addreport(){
        this.importshow = true
      },
      exportxls() {
        const url = CONFIG.rootUrl + exportUrl
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
        this.adpic = ''
        this.adpic_name = ''
        this.importshow = false
      },
      daoru(it){
        if(!this.adpic) {
          this.$message.warning('请先上传需要导入的文件');
          return
        }
        const data = {
          url: this.adpic
        }
        showLoaing()
        this.$http.get(importUrl,{params:data}).then(res=>{
          this.$message.success('操作成功');
          this.quxiao()
          this.searchpage()
          hideLoading()
        }).catch(err=>{
          this.$message.error(err.response.data.msg)
          hideLoading()
        })
      },
      delitem(it){
        this.$confirm('您确定要删除吗？删除后不可恢复').then(res=>{
          showLoaing()
          this.$http.delete(delUrl.replace("{id}",it.id)).then(res=>{
            this.$message.success('操作成功');
            this.searchpage()
            hideLoading()
          }).catch(err=>{
            this.$message(err.response.data.msg)
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
            this.query = re;
    },
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            showLoaing()
            this.$http.get(listUrl, {params: paramsData})
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                var dataList = data.elements;
                this.dataList = dataList;
                this.pgIndex = data.pageNum || 1;
                this.total = data.totalElements;
                hideLoading()
            })
            .catch((err) => {
                this.loading = false;
                this.$message.error(err.response.data.msg)
                hideLoading()
            });
        },
    }
}
</script>

<style lang='less'>
.agentdatabox{
    .ptitle{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
        .addbtn{
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
        }
    }
    .result{
      font-size: 14px;
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
      width: 100%;
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
      }
      .del {
        font-size: 12px;
        color: #379dea;
        margin-left: 20px;
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
      top: 30%;
      transform: translateY(-50%);
    }
}

</style>