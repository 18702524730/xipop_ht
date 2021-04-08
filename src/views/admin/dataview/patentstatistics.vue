<template>
  <div class="statis">
    <div class="searchs">
      <div class="sel">
        <span>统计方式：</span>
        <div class="form_control">
          <el-select v-model="Ttype" placeholder="栏目">
            <el-option value="全部">全部</el-option>
            <el-option value="本地专利库">本地专利库</el-option>
            <el-option value="国家平台专利库">国家平台专利库</el-option>
          </el-select>
        </div>
        <!-- <select v-model="Ttype">
          <option value="1">本地专利库</option>
          <option value="2">国家平台专利库</option>
        </select> -->
      </div>
      <div class="times">
        <span>创建时间：</span>
        <div class="block">
          <el-date-picker
            v-model="stateTime"
            type="datetime"
            placeholder="请选择开始日期时间">
          </el-date-picker>
        </div>
        <span class="kong">~</span>
        <div class="block">
          <el-date-picker
            v-model="overTime"
            type="datetime"
            placeholder="请选择结束日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="btns">
        <div @click="seachList">查询</div>
        <div @click="reset">重置</div>
      </div>
    </div>
    <div class="tableTit">
      <div class="txt">数据列表</div>
      <div class="addBtn" @click="addFn">增加</div>
    </div>
    <div class="tables" v-if="total>0">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>统计专利数量</th>
            <th>统计方式</th>
            <th>创建时间</th>
            <th>说明</th>
            <th>统计状态</th>
            <th>统计完成时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key) in seachData" :key="key">
            <td>{{item.seqNo}}</td>
            <td>{{item.patentCount}}</td>
            <td>{{item.type==1?'本地专利库':'国家平台专利库'}}</td>
            <td>{{item.createTime|dateFormat}}</td>
            <td>{{item.remark}}</td>
            <td>{{item.state==1?'统计中':'已完成'}}</td>
            <td>{{item.finishTime|dateFormat}}</td>
            <td>
              <span @click="look(item)">查看</span>
              <span v-show="item.state==2" @click="resFn(item.resultUrl,item.id)">统计结果</span>
              <span v-show="item.state==2" @click="expFile(item.resultUrl)">导出</span>
              <span @click="delFn(item.id)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="zwsj">暂无数据</div>
    <div class="mypagination" v-show="total>0">
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
    <div class="el-dialog__wrapper" v-if="is_add">
      <div class="addkuang">
        <div class="addTit">
          <div>{{title==1?'增加':'查看'}}</div>
          <div class="el-dialog__close el-icon el-icon-close" @click="closeFn"></div>
        </div>
        <div class="addlist">
          <div class="fieIn">
            <span class="listTit"><i>*</i>导入申请号文件：</span>
            <input class="fieAct" type="text" disabled v-model="fieUrl">
          </div>
          <div class="fielBtn" :class="{grey:title==2}">
            <span>上传文件</span>
            <input type="file" accept=".xlsx" @change="fileFn">
          </div>
        </div>
        <div class="addli1">
          <div>请导入xlsx文件，须填写正确的申请号，上限5000条</div>
          <div class="down" @click="downFn" v-if="title==1">下载导入模板</div>
        </div>
        <div class="addlist">
          <div class="fieIn wid">
            <span class="listTit">统计方式：</span>
            <div class="radio"><input :disabled="title==2" type="radio" name="language1" v-model="tjType" value="1">本地专利库</div>
            <div class="radio"><input :disabled="title==2" type="radio" name="language1" v-model="tjType" value="2">国家平台接口</div>
          </div>
        </div>
        <div class="addlist">
          <div class="fieIn">
            <span class="listTit"><i>*</i>选择导出字段：</span>
            <div class="checks"><input :disabled="title==2" type="checkbox" v-model="exportFields" value="申请人" >申请人</div>
            <div class="checks"><input :disabled="title==2" type="checkbox" v-model="exportFields" value="法律状态" >法律状态</div>
            <div class="checks"><input :disabled="title==2" type="checkbox" v-model="exportFields" value="专利名称" >专利名称</div>
            <div class="checks"><input :disabled="title==2" type="checkbox" v-model="exportFields" value="公开（公告）号" >公开(公告)号</div>
            <div class="checks"><input :disabled="title==2" type="checkbox" v-model="exportFields" value="公开（公告）日" >公开(公告)日</div>
          </div>
        </div>
        <div class="addlist">
          <div class="fieIn wid">
            <span class="listTit">补充字段：</span>
            <div class="radio"><input :disabled="title==2" type="radio" name="language2" v-model="supplementField" value="登记变更或转让后的权利人（最新）">登记变更或转让后的权利人(最新)</div>
            <div class="radio"><input :disabled="title==2" type="radio" name="language2" v-model="supplementField" value="登记变更或转让后的权利人（全部）">登记变更或转让后的权利人(全部)</div>
          </div>
        </div>
        <div class="addlist">
          <div class="fieIn">
            <span class="listTit">说明：</span>
            <input class="shuoming" :class="{shuoming2:title==2}" :disabled="title==2" type="text" v-model="remark" maxlength="50">
          </div>
        </div>
        <div class="addli2">
          <div>提示：统计需要花费一些时间，需待统计完成后再下载统计结果。</div>
        </div>
        <div class="addBtns">
          <div class="btn1" @click="closeFn">取消</div>
          <div class="btn2" @click="checkBtn">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const subUrl = './api/findPatentStatisticList'
const addUrl = './api/addPatentStatistic'
const delUrl = './api/deletePatentStatistic/{id}'
let loadingCount = 0
let loading = ''
import $ from 'jquery'
import {filters} from 'utils/'
export default {
    data(){
        return{
          stateTime:'',
          overTime:'',
          is_add:false,
          pgIndex:1,
          pgCount:20,
          Ttype:'全部',
          total:0,
          seachData:'',
          fieUrl:'',
          tjType:1,
          exportFields:['申请人','法律状态','专利名称','公开（公告）号','公开（公告）日'],
          supplementField:'',
          remark:'',
          upUrl:'',
          title:1,
        }
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      onlineFormat: filters.onlineformat,
    },
    methods:{
      showLoaing(){
    　　if( loadingCount==0){
    　　　　loading = this.ElementUI.Loading.service({
      　　　　lock:true,
      　　　　text:'',
      　　　　background:'rgba(51,51,51,0.6)'
      　　})
    　　};
    　　loadingCount++
      },
      hideLoading(){
    　　loadingCount--;
    　　if(loadingCount==0){
          loading.close();
    　　}
      },



      closeFn(){
        this.is_add = false;
      },
      resFn(k,id){
        this.$router.push({name:'patentstatisticsRes',params:{url:k,id:id}})
      },
      delFn(id){
        this.$confirm('删除后数据不可恢复，请确认是否删除？').then(()=>{
          this.$http.delete(delUrl.replace("{id}",id)).then(res=>{
            this.$message.success('操作成功');
            this.seachList();
          }).catch(err=>{
            this.$message(err.response.data.msg)
          })
        })
      },
      expFile(k){
        window.open(k)
      },
      look(item){
        console.log(item)
        this.is_add = true;
        this.title = 2;
        this.fieUrl = item.applicationDocNumFilename;
        this.tjType = item.type;
        this.exportFields = item.exportFields.split(',');
        this.supplementField = item.supplementField;
        this.remark = item.remark;
      },
      checkBtn(){
        if(this.title==2){
          this.is_add = false;
          return false;
        }
        if(!this.fieUrl){
          this.$message.error('请上传文件！')
          return false;
        }
        if(!this.exportFields || this.exportFields == ''){
          this.$message.error('请选择至少一个导出字段！')
          return false;
        }
        // if(!this.supplementField){
        //   this.$message.error('请选择补充字段！')
        //   return false;
        // }
        // if(!this.fieUrl){
        //   this.$message.error('请输入说明！')
        //   return false;
        // }
        let data = {
          applicationDocNumFilename:this.fieUrl,
          applicationDocNumFileurl:this.upUrl,
          type:this.tjType,
          exportFields:String(this.exportFields),
          supplementField:this.supplementField,
          remark:this.remark
        }
        this.showLoaing()
        this.$http.post(addUrl,data).then(res=>{
          this.$message.success('操作成功');
          this.seachList();
          this.is_add = false;
          this.hideLoading()
        }).catch(err=>{
          this.$message.error(err.response.data.msg)
          this.hideLoading()
        })
      },
      addFn(){
        this.is_add = true;
        this.title = 1;
        this.fieUrl = '';
        this.tjType = 1;
        this.exportFields = ['申请人','法律状态','专利名称','公开（公告）号','公开（公告）日'];
        this.supplementField = '';
        this.remark = '';
      },
      totimestamp(date){
        var timestamp =date?Date.parse(new Date(date)):'';
        return timestamp
      },
      fileFn(e){
        if(this.title==2){
          return false;
        }
        if(e.target.files[0]){
          this.fieUrl = e.target.files[0].name;
          let data = new FormData();
          data.append('fileData',e.target.files[0])
          this.$http.post('./api/file/uploadFile',data).then(res=>{
            this.$message.success('上传成功');
            let tdata = res.data
            this.upUrl = tdata.url;
          }).catch(err=>{
            this.$message.error(err.response.data.msg)
          })
        }
      },
      reset(){
        this.stateTime = '';
        this.overTime = '';
        this.Ttype = '全部';
      },
      downFn(){
        window.open(CONFIG.rootUrl+"/api/downloadApplicationDocNumTemplate")
      },
      seachList(){
        let data = {
          pgIndex: this.pgIndex,
          pgCount: this.pgCount,
          type: this.Ttype=='本地专利库'?1:this.Ttype=='国家平台专利库'?2:'',
          createTimeStart: this.totimestamp(this.stateTime),
          createTimeEnd: this.totimestamp(this.overTime)
        }
        this.$http.get(subUrl,{params:data}).then(res=>{
          // this.$message.success('操作成功');
          let tdata = res.data
          this.total = tdata.totalElements;
          this.seachData = tdata.elements;
        }).catch(err=>{
          this.$message.error(err.response.data.msg)
        })
      },
      handleCurrentChange(i){
        this.pgIndex = i;
        this.seachList();
      },
    },
    updated(){
        
    },
    mounted(){
      this.seachList();
    }
}
</script>

<style lang='less'>
    .el-message-box__headerbtn{
      z-index: 1;
    }
    .el-message-box{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  .statis{
    color: #606266;
    font-size: 14px;
    .searchs{
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      .sel{
        display: flex;
        align-items: center;
        margin-right: 3%;
        .form_control,.el-select,.el-input{
          height: 30px;
        }
        .el-input:hover input{
          border: 1px solid #379dea;
        }
        .el-input__suffix,.el-input__suffix>span{
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
        .el-select__caret{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .times{
        display: flex;
        align-items: center;
        margin-right: 3%;
        .block{
          height: 30px;
          position: relative;
          .el-date-editor.el-input{
            height: 30px;
          }
          .el-input__prefix, .el-input__suffix,input{
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
          }
          .el-date-editor.el-input{
            width: 180px;
          }
          .el-input__icon{
            line-height: 30px;
          }
          .el-icon-circle-close{
            display: none;
          }
          .el-input__prefix{
            position: absolute;
            right: 0;
            left: auto;
          }
        }
        .kong{
          margin: 0 10px;
        }
      }
      .btns{
        display: flex;
        div{
          width: 88px;
          height: 30px;
          text-align: center;
          background-color: #379dea;
          color: #fff;
          line-height: 30px;
          border-radius: 3px;
          cursor: pointer;
          border: 1px solid #379dea;
        }
        >div:last-child{
          margin-left: 20px;
          background: #fff;
          color: #379dea;
        }
      }
    }
    .tableTit{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 18px 0 18px 20px;
      align-items: center;
      margin-top: 10px;
      font-weight: bold;
      .txt{
        color: #333;
      }
      .addBtn{
        width: 88px;
        height: 30px;
        text-align: center;
        background-color: #379dea;
        color: #fff;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
        border: 1px solid #379dea;
      }
    }
    .zwsj{
      text-align: center;
      padding: 30px;
    }
    .tables{
      table{
        width: 100%;
        border-color: #ebeef5;
        td,th{
          text-align: center;
          border: 1px solid #ebeef5;
        }
        th{
          color: rgb(51, 51, 51);
        }
        tr{
          line-height: 48px;
          td:last-child{
            color: #379dea;
            border-color: #ebeef5;
            cursor: pointer;
            span{
              padding: 0 3.3%;
            }
          }
        }
        tr:hover{
          background: #f5f7fa;
        }
        thead{
          background: rgb(245, 247, 250);
        }
      }
    }
    .el-dialog__wrapper{
      background: rgba(0, 0, 0, .5);
      .addkuang{
        width: 700px;
        position: relative;
        top: 30%;
        left: 50%;
        background: #fff;
        padding: 20px;
        font-size: 14px;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        .addTit{
          display: flex;
          justify-content: space-between;
          color: #223344;
        }
        .addlist{
          display: flex;
          align-items: center;
          margin-top: 20px;
          .wid{
            width: 100%;
          }
          .fieIn{
            display: flex;
            align-items: center;
            .fieAct{
              cursor:no-drop;
            }
            .fieAct,.shuoming{
              border: 1px solid #DFE2E5;
              width: 280px;
              height: 30px;
              line-height: 30px;
              padding-left: 10px;
              border-radius: 5px;
              transition: .5s;
            }
            .shuoming:hover{
              border: 1px solid #379dea;
            }
            .shuoming:focus{
              border: 1px solid #379dea;
            }
            .shuoming2{
              cursor: no-drop;
            }
            .radio{
              margin-right: 3%;
              input{
                margin-right: 3px;
              }
            }
            .checks{
              margin-right: 20px;
              input{
                margin-right: 3px;
              }
            }
          }
          .fielBtn{
            position: relative;
            cursor: pointer;
            width: 88px;
            height: 30px;
            line-height: 30px;
            background: #379dea;
            text-align: center;
            color: #fff;
            border-radius: 5px;
            margin-left: 80px;
            input{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
            }
            input[type=file]::-webkit-file-upload-button { /* chromes and blink button */
              cursor: pointer; 
            }
          }
          .grey{
            background: #999;
            input{
              display: none;
            }
          }
          .listTit{
            width: 130px;
            display: inline-block;
            text-align: right;
            i{
              font-style: normal;
              color: red;
            }
          }
        }
        .addli1{
          margin-left: 132px;
          font-size: 12px;
          color: #999;
          >div{
            line-height: 30px;
          }
          .down{
            cursor: pointer;
            font-size: 14px;
            color: #379dea;
            text-decoration: underline;
          }
        }
        .addli2{
          margin-left: 132px;
          font-size: 12px;
          color: #FF9900;
          line-height: 30px;
        }
        .addBtns{
          display: flex;
          justify-content: space-evenly;
          margin: 20px 20px 40px;
          div{
            width: 88px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #379dea;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
          }
          .btn1{
            color: #379dea;
            background: #fff;
          }
          .btn2{
            color: #fff;
            background: #379dea;
          }
        }
      }
    }
  }

</style>