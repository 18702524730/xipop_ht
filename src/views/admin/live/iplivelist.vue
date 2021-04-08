<template>
<div class="clouditembox">
    <h3 class="ptitle">IP直播列表 <span class="addbtn" @click="openadd">添加</span></h3>
    <div class='tablebox'>
  <el-table
    ref="multipleTable"
    :data="dataList"
    :header-cell-style="{color:'#333',background:'#F5F7FA'}"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
    <el-table-column
      label="编号"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.liveBannerCode}}</template>
    </el-table-column>
    <el-table-column
      label="直播封面"
      align='center'
      min-width="100">
      <template slot-scope="scope"><img :src="scope.row.liveCover" alt=""></template>
    </el-table-column>
    <el-table-column
      label="直播名称"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.liveName}}</template>
    </el-table-column>
    <el-table-column
      label="直播开始时间"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.liveStartTime|dateFormat}}</template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      align='center'
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="isShow"
      label="是否显示"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.isShow|isshowformat}}</template>
    </el-table-column>
    <el-table-column
      prop="liveState"
      label="直播状态"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.liveState|livestateformat}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'
      min-width="100">
      <template slot-scope="scope">
        <!-- <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">操作</el-button> -->
        <el-button type="text" size="small" @click="toinfo(scope.$index, scope.row)">操作</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->

  <el-dialog :title="title" :visible.sync="isopen">
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
  <div class="mypagination" v-show="!loading">
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
</template>

<script>
const addurl = '/api/pictorial/updateIpLive'
const delurl = '/api/pictorial/deleteIpLive'
const listurl = '/api/pictorial/selectIpLive'
// const detailUrl = '/api/pictorial/bannerCreateList'
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import {filters} from 'utils/'
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
        postAction: CONFIG.rootUrl+'/api/file/uploadFile',
        rules:{
            liveName:[{required:true,message:'请输入直播名称',trigger: 'blur'}],
            liveStartTime:[{required:true,message:'请选择开始时间',trigger: 'blur'}],
            address:[{required:true,message:'请输入直播地址',trigger: 'blur'}],
            remarks:[{required:true,message:'请输入直播简介',trigger: 'blur'}]
        },
        isopen: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
        title:'添加广告',
        query:{}
      }
    },
    components:{
      uploader
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      isshowformat: filters.isshowformat,
      livestateformat: filters.livestateformat
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
                    if(q[k]){
                        re[k]= q[k]
                    }
                }
            }
        }
        this.query = re;
      },
      cancel(){
        this.formdata = Object.assign({},dataobj);
        this.adpic = ''
        this.adpic_name = ''
        this.isopen = false;
      },
      openadd(){
        this.formdata = Object.assign({},dataobj)
        this.adpic = ''
        this.title= '添加直播'
        this.isopen = true
      },
      toinfo(index, it) {
        this.$router.push({ name: 'liveinfo', params: { id: it.id } })
      },
      addone(){
        let data = Object.assign({},this.formdata)
        data.liveStartTime = this.totimestamp(this.formdata.liveStartTime)
        // data.bannerEnd = this.totimestamp(this.formdata.bannerEnd)
        // data.bannerPosition = '云画报'
        data.liveCover = this.adpic
        this.$refs.formdatas.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message('请上传直播封面');
              return false
            }
            this.$http.post(addurl,data).then(res=>{
              this.$message.success('操作成功')
              this.cancel();
              this.searchpage()
            }).catch(err=>{
              this.$message.error(err.response.data.msg)
            })
          }
        })
        
        
      },
        handleClick(row) {
        console.log(row);
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
        this.formdata = Object.assign({}, row)
        this.adpic = this.formdata.liveCover
        this.title = '编辑直播'
        this.isopen = true;
        
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
        let isrepeat= false;
        let md= this[data.valueName+'_Data'];
         for(let i=0;i<md.length;i++){
           if(d.url == md[i]['url']){
             isrepeat = true;
             break;
           }
         }
         if(!isrepeat){
            md.unshift(d)
          }
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
        searchpage(){
          this.query.pgIndex = this.pgIndex;
          this.query.pgCount = this.pgCount;
          
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
.tablebox{
  img{
    max-width: 100%;
    max-height: 100px;
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