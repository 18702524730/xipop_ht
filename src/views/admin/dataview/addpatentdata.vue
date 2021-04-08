<template>
  <div class="patentdatabox">
      <div class="addpage">
        <div class="basicinfo">
          <h3 class="comtitle">基本信息 <span></span></h3>
          <div class="cont">
            <el-form label-width="150px" :model="formdatas" label-position="right" :rules="rules" ref='basics'>
              <el-form-item label="专题标题：" prop="title">
                  <el-input v-model="formdatas.title" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="简介：" prop="brief" >
                  <el-input v-model="formdatas.brief" maxlength="80" type='textarea'></el-input>
              </el-form-item>
              <el-form-item label="专题封面" required>
                  <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="adpic_name" :canPreview="true" :url="adpic" :valueName="'adpic'" :extensions='"jpg,png,JPG,PNG,jpeg,JPEG"' ></uploader>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <h3 class="comtitle">专题数据配置 <span></span></h3>
          <div class="addlist">
            <div class="exportdatatype"><span :class="{ active: current == 2 }">报告分析数据</span></div>
            <div class="exportdata">
              <div class="uploadbox">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="report_name" :canPreview="false" :url="report" :valueName="'report'" :extensions='"xlsx,xls"' ></uploader>
              </div>
              <div class="uploadtipsbox">
                <div class="moban" @click="download('report')">下载模板</div>
                <p>选择你所需的专利数据表格，支持格式：xlsx</p>
              </div>
            </div>
            <div class="exportdatatype"><span :class="{ active: current == 2 }">重点专利</span></div>
            <div class="exportdata">
              <div class="uploadbox">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="patentdata_name" :canPreview="false" :url="patentdata" :valueName="'patentdata'" :extensions='"xlsx,xls"' ></uploader>
              </div>
              <div class="uploadtipsbox">
                <div class="moban" @click="download('patent')">下载模板</div>
                <p>选择你所需的专利数据表格，支持格式：xlsx</p>
              </div>
            </div>
            <div class="exportdatatype"><span :class="{ active: current == 2 }">全部总数据</span></div>
            <div class="exportdata">
              <div class="uploadbox">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="alldata_name" :canPreview="false" :url="alldata" :valueName="'alldata'" :extensions='"xlsx,xls"' ></uploader>
              </div>
              <div class="uploadtipsbox">
                <div class="moban" @click="download('alldata')">下载模板</div>
                <p>选择你所需的专利数据表格，支持格式：xlsx</p>
              </div>
            </div>
            <div class="submitbtn">
                <span  @click="dosome">提交</span>
            </div> 
          </div>
        </div>
      </div>
      <div class="zzcs" v-if="is_zzc">
        <div class="upCons">
          <div class="closes" @click="closeUp(1)"><div class="XXX"></div></div>
          <div class="upTitle">上传提示</div>
          <div class="upTxt">正在上传要导入的数据，请稍后...</div>
          <div class="upTs">您可以离开此页面，导入将在后台进行，完成后请到”重点专利库“列表查看。</div>
          <div class="upSubs">
            <div class="upSub" @click="closeUp(2)">完成</div>
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import { store} from 'utils/'

const addUrl = '/api/editOrAddArticle'
const dataobj = {
  title:'',
  brief:'',
}
export default {
    data(){
        return{
          postAction: CONFIG.rootUrl  + '/api/file/uploadFile',
          adpic:'',
          reportUrl: CONFIG.rootUrl  + '/api/downloadReportAnalysisDataTemplate',
          patentUrl: CONFIG.rootUrl  + '/api/downloadKeyPatentTemplate',
          alldataUrl: CONFIG.rootUrl  + '/api/downloadAllHomdogyDataTemplate',
          adpic_Data:[],
          adpic_name:'',
          report: '',
          report_name: '',
          alldata: '',
          alldata_name: '',
          patentdata: '',
          patentdata_Data: [],
          patentdata_name: '',
            formdatas: Object.assign({},dataobj),
            rules:{
                title:[{required:true,message:'请输入专题标题',trigger: 'blur'}],
                brief:[{required:true,message:'请输入专题简介',trigger: 'blur'}],
            },
            specialSubjectData:[],

            current:2,
            pgIndex:1,
            pgCount:10,
            total: 0,
            dataList:[],
            loading: false,
            type:'',
            is_zzc:false
        }
    },
    components:{
      uploader
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    mounted(){
      this.type = this.$route.params.type
      
    },
    methods:{
      closeUp(k){
        this.is_zzc = false;
        if(k==2){
          this.$router.go(-1)
        }
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
    resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
    },
    uploaderErrCallback(data){
				this.$alert(data.msg);
    },
    changetype(n) {
      this.current = n
    },
    cancel() {
      this.adpic ='';
      this.adpic_name = '';
      this.patentdata = ''
      this.patentdata_name = ''
      this.alldata = ''
      this.alldata_name = ''
      this.formdatas = Object.assign({},dataobj);
    },
    download(tp) {
        const url = this[tp+'Url']
        window.open(url)
    },
    dosome(){
      this.$refs.basics.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message.warning("请上传专题封面图片");
              return;
            }
            if(!this.report){
              this.$message.warning("请上传报告分析数据");
              return;
            }
            if(!this.patentdata){
              this.$message.warning("请上传重点专利");
              return;
            }
            if(!this.alldata){
              this.$message.warning("请上传全部总数据");
              return;
            }
            let data = {
              type: 1,
              title: this.formdatas.title,
              brief: this.formdatas.brief,
              coverUrl: this.adpic,
              reportAnalysisDataTemplateUrl: this.report,
              keyPatentTemplateUrl: this.patentdata,
              allHomdogyDataTemplateUrl: this.alldata
            }
            this.$http.post(addUrl,data).then(res=>{
              this.is_zzc = true;
              // this.$message.success('操作成功');
              this.cancel()
            }).catch(err=>{
              this.$message(err.response.data.msg)
            })
          }
      })
    },
      
    }
}
</script>

<style lang='less'>
.patentdatabox{
  .zzcs{
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .6);
    position: fixed;
    top: 0;
    left: 0;
    .upCons{
      position: relative;
      width: 460px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      background: #fff;
      border: 1px solid #E0E3EA;
      box-shadow: 0px 1px 6px 0px rgba(10, 33, 90, 0.1);
      padding: 16px;
      .upTitle{
        font-size: 16px;
        text-align: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #dcdcdc;
      }
      .upTxt{
        padding: 52px 0 40px;
        text-align: center;
      }
      .upTs{
        color: #999999;
        padding-left: 30px;
      }
      .upSubs{
        text-align: right;
        .upSub{
          width: 88px;
          display: inline-block;
          color: #fff;
          line-height: 36px;
          background: #008ae6;
          border-radius: 4px;
          text-align: center;
          font-size: 16px;
          margin-top: 48px;
          cursor: pointer;
        }
      }
      .closes{
        width: 20px;
        height: 20px;
        top: 0px;
        right: -40px;
        cursor: pointer;
        position: absolute;
        .XXX {
          display: inline-block;
          width: 20px;
          height: 2px;
          background: #909399;
          transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -o-transform: rotate(45deg);
        }
        .XXX::after {
          content: '';
          display: block;
          width: 20px;
          height: 2px;
          background: #909399;
          -ms-transform: rotate(-90deg);
          -webkit-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
          transform: rotate(-90deg);
        }
      }
      
    }
  }
  .addpage{
    padding: 20px 0;
    border: 1px solid #eee;
    .addlist{
      padding:50px 100px;
      .exportdatatype {
        font-size: 0;
        > span {
          display: inline-block;
          width: 180px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          background-color: #f5f5f5;
          color: #333;
          font-size: 16px;
          &.active {
            background-color: #666;
            color: #fff;
          }
        }
      }
      .exportbds {
        height: 200px;
      }
      .exportdata {
        display: flex;
        height: 200px;
        border: 1px solid #f5f5f5;
        padding: 40px;
        margin-bottom: 20px;
        align-items: flex-end;
        .uploadbox {
          margin-right: 20px;
        }
        .uploadtipsbox {
          font-size: 14px;
          .moban {
            margin-bottom: 10px;
            font-size: 14px;
            color: #379dea;
            cursor: pointer;
          }
        }
      }
      .bds textarea {
        // min-height: 150px!important;
        font-size: 16px;
        line-height: 25px;
      }
      /*li:first-child{
        span{
          background-color: #eee;
          color: #333;
        }
      }
      span{
        display: inline-block;
        width: 50%;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 40px;
        margin-left: -1px;
        margin-top: -1px;
        color:#666;
        input{
          width: 100%;
          padding: 0 10px;
          text-align: left;
          color:#444;
        }
      }
      */
    }
    .submitbtn{
        padding: 20px;
        text-align: center;
        margin-right: -100px;
        >span{
            display: inline-block;
            width: 160px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #379dea;
            border: none;
            color:#fff;
            font-size: 16px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
  }
  .basicinfo{
    .cont{
      padding:30px 100px;
      .el-input .el-input__inner{
            height: 40px;
            line-height: 40px;
        }
    }
  }
  .comtitle{
    position: relative;
    background-color: #999;
    color: #fff;
    height: 40px;
    width: 160px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 16px;
    >span{
      position: absolute;
      right: -40px;
      top: 0;
      width: 0;
      height: 0;
      border-width: 20px;
      border-color: transparent transparent transparent #999;
      border-style: dashed dashed dashed solid;
    }
  }  
}

</style>