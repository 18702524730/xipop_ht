<template>
<div class="clouditembox">
    <h3 class="ptitle">直播控制台</h3>
    <div class="clearfix">
    <div class='liverecord fl'>
        <div class="livecontbox">
          <div class="livecont">
            <el-input type="textarea" v-model="content" placeholder="请输入你想发表的直播进程" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </div>
          <div class="clearfix">
            <uploader class="fl" @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="itempic_name" :canPreview="true" :url="itempic" :valueName="'itempic'" :size='2' :isDialog='false'  :extensions='"jpg,png,JPG,PNG"'></uploader>
            <span class="sendbtn" @click="addlive">发送</span>
          </div>

        </div>
        <div class="livemarks">
          <span v-for="it in marklist" :key="it.id" @click="changemarknow(it)" :class="{ active: it.id == marknow}">{{it.name}}</span>
        </div>
        <ul class="livelistbox" v-if="!loading && total">
          <li class="clearfix" v-for="(item, key) in dataList" :key="key">
            <div class="lefttime">
              <h3 class="itemday">{{item.createTime | monthdayformat}}</h3>
              <p class="itemtime">{{item.createTime | hourminformat}}</p>
            </div>
            <div class="midconts">
              <div class="clearfix mb20">
                <div class="midcont">
                  <div class="mb10">
                    {{item.content}}
                  </div>
                  <div v-if="item.picture" class="contimgbox">
                    <img :src="item.picture" alt="">
                  </div>
                </div>
                <div class="rightop">
                  <p @click="sethot(item)" v-if="!item.isHot && item.picture">设为热点</p>
                  <p @click="cancelhot(item)" v-if="item.isHot && item.picture">取消热点</p>
                  <p @click="openaudit(item)">编辑</p>
                  <p class="pjbtn" @click="openpj(item)">评价</p>
                  <p class="scbtn" @click="delitem(item)">删除</p>
                </div>
              </div>
              <div class="zjdp" v-if="item.evaluate">
                <h3>专家点评</h3>
                <p>{{item.evaluate}}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="nodatabox" v-if="!loading && !total">
          暂无数据
        </div>
        <div class="mypagination" v-show="!loading && total">
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
    <div class="fr livemsg">
      <div class="clearfix msgitem">
        <h3 class="fl">标题：</h3>
        <div class="msgcont">
          {{liveinfo.liveName}}
        </div>
      </div>
      <div class="clearfix msgitem">
        <h3 class="fl">封面：</h3>
        <div class="msgcont">
          <img :src="liveinfo.liveCover" alt="">
        </div>
      </div>
      <div class="clearfix msgitem">
        <h3 class="fl">简介：</h3>
        <div class="msgcont">
          {{liveinfo.remarks}}
        </div>
      </div>
      <div class="clearfix msgitem">
        <h3 class="fl">时间：</h3>
        <div class="msgcont">{{liveinfo.liveStartTime |dateFormat}}
        </div>
      </div>
      <div class="clearfix msgitem">
        <h3 class="fl">地点：</h3>
        <div class="msgcont">{{liveinfo.address}}
        </div>
      </div>
      <div class="livebtnitem" @click="openadd">
        编辑直播间信息
      </div>
      <div class="livebtnitem">
        {{liveinfo.liveState | livestateFormat}}
      </div>
      <div class="livebtnitem startlive" v-if="liveinfo.liveState == 1" @click="changelivestate(2)">
        开始直播
      </div>
      <div class="livebtnitem startlive" v-if="liveinfo.liveState == 2" @click="changelivestate(3)">
        结束直播
      </div>
    </div>
    </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->

  <el-dialog title="修改直播间信息" :visible.sync="isopen">
    <div class="openbox">
      <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
          <el-form-item label="直播名称：" prop="liveName">
              <el-input v-model="formdata.liveName" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="liveStartTime">
              <el-date-picker v-model="formdata.liveStartTime" type='datetime'></el-date-picker>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
              <el-input v-model="formdata.address" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="简介：" prop="remarks">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" v-model="formdata.remarks" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="是否显示：">
                <el-radio :label='1' v-model="formdata.isShow">是</el-radio>
                <el-radio :label='0' v-model="formdata.isShow">否</el-radio>
          </el-form-item>
          <el-form-item label="直播封面：" required="">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="adpic_name" :canPreview="true" :url="adpic" :valueName="'adpic'" :size='2' :isDialog='true'  :extensions='"jpg,png,JPG,PNG"'></uploader>
              <p class="tips">只能上传jpg/png格式文件，文件不能超过1MB</p>
          </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="primary" @click="addone">确定</el-button>
      </div>
    </div>
  </el-dialog>

  <el-dialog title="修改内容" :visible.sync="auditshow">
    <div class="openbox">
      <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
          <el-form-item label="内容：">
              <el-input type="textarea" v-model="nowcontent" placeholder="请输入你想发表的直播进程" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
          <el-form-item label="图片：">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="nowpic_name" :canPreview="true" :url="nowpic" :valueName="'nowpic'" :size='2' :isDialog='true'  :extensions='"jpg,png,JPG,PNG"'></uploader>
              <p class="tips">只能上传jpg/png格式文件，文件不能超过1MB</p>
          </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="default" @click="cancelnow">取消</el-button>
        <el-button type="primary" @click="bianji">确定</el-button>
      </div>
    </div>
  </el-dialog>
  <el-dialog title="评价" :visible.sync="pjshow">
    <div class="openbox">
      <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
          <el-form-item label="内容：">
              <el-input type="textarea" v-model="nowevaluate" placeholder="请输入评价内容" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="default" @click="cancelpj">取消</el-button>
        <el-button type="primary" @click="setpj">确定</el-button>
      </div>
    </div>
  </el-dialog>
  
</div>
</template>

<script>
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import {filters} from 'utils/'
const addurl = '/api/pictorial/updateContent'
const delurl = '/api/pictorial/deleteContent'
const listurl = '/api/pictorial/selectContent'
const detailUrl = './api/pictorial/selectIpLive'
const addurls = '/api/pictorial/updateIpLive'
const dataobj = {
    liveName:'',
    liveStartTime:'',
    isShow:1,
    liveCover:'',
    address:'',
    remarks:'',
}
  export default {
    data() {
      return {
        formdata:Object.assign({},dataobj),
        adpic:'',
        adpic_Data:[],
        adpic_name:'',
        itempic: '',
        itempic_Data:[],
        itempic_name: '',
        nowcontent:'',
        nowpic: '',
        nowpic_Data:[],
        nowpic_name: '',
        nowid: '',
        pjshow: false,
        nowevaluate: '',
        postAction: CONFIG.rootUrl+'/api/file/uploadFile',
        marklist: [
          { id: 0, name: '直播记录'},
          { id: 1, name: '图片'},
          { id: 2, name: '点评'},
          { id: 3, name: '热点图片'}
        ],
        content:'',
        marknow: 0,
        rules:{
            liveName:[{required:true,message:'请输入直播名称',trigger: 'blur'}],
            liveStartTime:[{required:true,message:'请选择开始时间',trigger: 'blur'}],
            address:[{required:true,message:'请输入直播地址',trigger: 'blur'}],
            remarks:[{required:true,message:'请输入直播简介',trigger: 'blur'}]
        },
        isopen: false,
        auditshow: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        liveId:'',
        liveinfo: {
          liveStartTime: '',
          address: "",
          liveName: "",
          remarks: "",
          liveCover: "",
          isShow: "",
          liveState: "",
          id: ""
        },
        loading: false,
        title:'添加广告',
        query:{}
      }
    },
    components:{
      uploader
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
      monthdayformat: filters.monthdayformat,
      hourminformat: filters.hourminformat,
      livestateFormat: filters.livestateFormat
    },
    created() {
      this.liveId  = this.$route.params.id
      this.getlivedetail()
    },
    mounted(){
      this.searchpage()
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
        console.log(height)
    },
    methods: {
      changelivestate(id) {
        let data = Object.assign({}, this.liveinfo)
        data.liveState = id
        let tit = "确定开始直播吗？"
        if(id == 3) {
          tit = "确定结束直播吗？"
        }
        this.$confirm(tit,'提示').then(() => {
          this.$http.post(addurls, data).then(res=>{
            this.getlivedetail()
          })
        }).catch(() => {})
        
      },
      getlivedetail() {
        let data = {
          id: this.liveId
        }
        this.$http.get(detailUrl, {params: data}).then(res => {
          this.liveinfo = res.data
        })
      },
      totimestamp(date){
        var timestamp =date?Date.parse(new Date(date)):'';
        return timestamp
      },
      getquery(){
        var re ={};
        if(this.$route.query){
            var q = this.$route.query;
            for(var k in q){
                if(q.hasOwnProperty(k)){
                  re[k]= q[k]
                }
            }
        }
        this.marknow = re['isActive']
        if (re['isActive'] == 0) {
          delete re['isActive']
        }
        this.query = Object.assign({}, re)
        
      },
      cancel(){
        this.formdata = Object.assign({},dataobj);
        this.adpic = ''
        this.adpic_name = ''
        this.isopen = false;
      },
      cancelnow() {
        this.nowcontent = ''
        this.nowpic = ''
        this.nowpic_name = ''
        this.nowid = ''
        this.auditshow = false
      },
      clearmsg() {
        this.content = ''
        this.itempic = ''
        this.itempic_name = ''
        this.nowcontent = ''
        this.nowpic = ''
        this.nowpic_name = ''
      },
      sethot(it) {
        let data = {
          ipLiveId: this.liveId,
          id: it.id,
          isHot: 1
        }
        this.$http.post(addurl,data).then(res => {
          this.$message.success('操作成功')
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },
      cancelhot(it) {
        let data = {
          ipLiveId: this.liveId,
          id: it.id,
          isHot: 0
        }
        this.$http.post(addurl,data).then(res => {
          this.$message.success('操作成功')
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },
      openpj(it){
        this.nowid = it.id
        this.nowevaluate = it.evaluate
        this.pjshow = true
        console.log(this.nowid)
      },
      cancelpj() {
        this.nowid = ''
        this.nowevaluate = ''
        this.pjshow = false
      },
      setpj() {
        let data = {
          ipLiveId: this.liveId,
          id: this.nowid,
          evaluate: this.nowevaluate
        }
        this.$http.post(addurl,data).then(res => {
          this.$message.success('操作成功')
          this.cancelpj()
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },
      openaudit(it) {
        this.nowcontent = it.content
        this.nowpic = it.picture
        this.nowid = it.id
        this.auditshow = true
      },
      bianji() {
        let data = {
          ipLiveId: this.liveId,
          id: this.nowid
        }
        if (!this.nowcontent && !this.nowpic) {
          this.$message.warning('请输入需要发布的内容或图片')
          return
        }
        if (this.nowcontent) {
          data.content = this.nowcontent
        }
        if (this.nowpic) {
          data.picture = this.nowpic
        }
        this.$http.post(addurl,data).then(res => {
          this.$message.success('操作成功')
          this.cancelnow()
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },
      delitem(it) {
        this.$confirm(
          '是否确认删除该评论该条直播内容及其评论',
          '提示'
        ).then(() => {
          let data = {
            ipLiveId: this.liveId,
            id: it.id
          }
          this.$http.get(delurl,{params: data}).then(res => {
            this.$message.success('操作成功')
            this.searchpage()
          }).catch(err=>{
            this.$message.error(err.response.data.msg || '操作失败')
          })
        })
      },
      addlive(){
        let data = {
          ipLiveId: this.liveId
        }

        if (!this.content && !this.itempic) {
          this.$message.warning('请输入需要发布的内容或图片')
          return
        }
        if (this.content) {
          data.content = this.content
        }
        if (this.itempic) {
          data.picture = this.itempic
        }
        this.$http.post(addurl,data).then(res => {
          this.$message.success('操作成功')
          this.clearmsg()
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },
      openadd(){
        this.formdata = Object.assign({}, this.liveinfo)
        this.adpic = this.formdata.liveCover
        this.isopen = true
      },
      addone(){
        let data = Object.assign({},this.formdata)
        data.liveStartTime = this.totimestamp(this.formdata.liveStartTime)
        data.liveCover = this.adpic
        
        this.$refs.formdatas.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message('请上传封面图片');
              return false
            }
            this.$http.post(addurls,data).then(res=>{
              this.$message.success('操作成功')
              this.cancel();
              this.getlivedetail()
            }).catch(err=>{
              this.$message.error(err.response.data.msg)
            })
          }
        })
        
        
      },
      changemarknow(it) {
        this.marknow = it.id
        this.searchpage(true)
      },
      handleEdit(index, row) {
        // let data ={
        //   id: row.id
        // }
        // this.$http.get(detailUrl,{params:data}).then(res=>{
        //   let ret = res.data;
        //   if(ret){
        //     this.formdata = Object.assign({},ret)
        //     this.adpic = this.formdata.bannerPic
        //     this.title = '编辑直播'
        //     this.isopen = true;
        //   }
        // }).catch(err=>{
        //   this.$message(err.response.data.msg)
        // })
        
      },
      handleDelete(index, row) {
        let self = this;
        let data = {
          id: row.id
        }
        this.$confirm('您确定要删除吗？删除后不可恢复').then(()=>{
          this.$http.get(delurl,{params: data}).then(res=>{
            this.$message.success('删除成功');
            this.searchpage()
          }).catch(err=>{
            this.$message(err.response.data.msg)
          })
        })
        
      },
      setUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
        // let isrepeat= false;
        // let md= this[data.valueName+'_Data'];
        //  for(let i=0;i<md.length;i++){
        //    if(d.url == md[i]['url']){
        //      isrepeat = true;
        //      break;
        //    }
        //  }
        //  if(!isrepeat){
        //     md.unshift(d)
        //   }
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
				this[valueName+'_name'] ='';
    },
    uploaderErrCallback(data){
				this.$alert(data.msg);
    },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(isfirst){
          this.query.pgIndex = isfirst ? 1 : this.pgIndex;
          this.query.pgCount = this.pgCount;
          this.query.ipLiveId = this.liveId;
          this.query.isActive = this.marknow
          if (this.marknow ==0) {
            delete this.query.isActive
          }
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(listurl, {params: paramsData})
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
                this.$message.error(err.response.data.msg)
            });
        },
    }
  }
</script>
<style lang="less">
.clouditembox{
  .el-dialog{
    width: 700px;
  }
  .openbox{
    padding:0 30px 30px;
    .el-input .el-input__inner{
        height: 40px;
        line-height: 40px;
    }
    .el-date-editor.el-input{
        width:100%;
      }
    .tip{
      height: 30px;
      font-size: 12px;
      color: #999;
      margin-top: -10px;

    }
    
  }
}
.liverecord{
  width: 70%;
  padding: 24px 30px;
  border: 1px solid #d2d2d2;
  font-family:'PingFangSC-Regular','PingFang SC';
  .livecontbox {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #d2d2d2;
    .sendbtn {
      float: right;
      width: 100px;
      height: 30px;
      margin-top: 90px;
      background-color: #379dea;
      color: #fff;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .livecont {
    margin-bottom: 20px;
  }
  .livemarks {
    height: 30px;
    margin-bottom: 20px;
    > span {
      float: left;
      height: 30px;
      margin-right: 20px;
      line-height: 30px;
      color: #666;
      font-size: 14px;
      cursor: pointer;
      &.active {
        font-size: 16px;
        color: #379dea;
        font-weight: 600;
      }
    }
  }

  .livelistbox {
    margin-bottom: 20px;
    > li {
      padding: 15px 20px;
      margin-bottom: 10px;
      &:nth-child(2n-1) {
        background-color: #f5f5f5;
      }
      .lefttime {
        float: left;
        width: 80px;
      }
      .itemday {
        position: relative;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: #666;
        font-weight: normal;
        &:before {
          content: '';
          position: absolute;
          left: -16px;
          border-left: 4px solid #379dea;
          height: 20px;
        }
      }
      .itemtime {
        line-height: 30px;
        font-size: 14px;
        color: #666;
      }
      .midconts {
        // min-width: 100px;
        margin-left: 80px;
        .midcont {
          float: left;
          font-size: 14px;
          color: #333;
          line-height: 20px;
          word-break: break-all;
          margin-right: 80px;
        }
        .zjdp {
          border-top: 1px dashed #d2d2d2;
          padding-top: 10px;
          > h3 {
            font-size: 14px;
            font-weight: 600;
            color: #333;
          }
          > p {
            font-size: 14px;
            line-height: 20px;
            color: #666;
          }
        }
        .contimgbox {
          max-height: 120px;
          img {
            max-width: 100%;
            max-height: 120px;
          }
        }
      }
      .rightop {
        float: right;
        margin-left: -100%;
        width: 80px;
        text-align: right;
        font-size: 14px;
        line-height: 20px;
        color: #666;
        cursor: pointer;
        > p {
          margin-bottom: 5px;
        }
        .pjbtn {
          color: #379dea;
        }
        .scbtn {
          color: rgb(196, 51, 51);
        }
      }
    }
  }
  .nodatabox {
    height: 160px;
    line-height: 160px;
    text-align: center;
    background-color: #f5f5f5;
    color: #666;
  }
}
.livemsg {
  width: 28%;
  min-width: 100px;
  padding: 20px;
  border: 1px solid #d2d2d2;
  .msgitem {
    margin-bottom: 20px;
    color: #666;
    > h3 {
      width: 60px;
      font-size: 14px;
    }
    .msgcont {
      margin-left: 60px;
      font-size: 14px;
      line-height: 20px;
      img {
        max-width: 100%;
        max-height: 100px;
      }
    }
  }
  .livebtnitem {
    height: 60px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #666;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    
  }
  .startlive {
    color: #fff;
    background-color: #379dea;
  }
}
.ptitle{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    // background-color: #eee;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    .addbtn{
        float: right;
        width: 100px;
        height: 30px;
        margin-top: 15px;
        // margin-right: 20px;
        text-align: center;
        background-color: #379dea;
        color: #fff;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
    }
}
</style>