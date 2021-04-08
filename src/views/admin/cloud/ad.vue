<template>
<div class="clouditembox">
    <h3 class="ptitle">广告列表 <span class="addbtn" @click="openadd">添加</span></h3>
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
      <template slot-scope="scope">{{ scope.row.bannerCode}}</template>
    </el-table-column>
    <el-table-column
      label="广告图片"
      align='center'
      min-width="100">
      <template slot-scope="scope"><img :src="scope.row.bannerPic" alt=""></template>
    </el-table-column>
    <el-table-column
      label="广告名称"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.bannerName}}</template>
    </el-table-column>
    <el-table-column
      prop="bannerPosition"
      label="广告位置"
      align='center'
      width="80">
    </el-table-column>
    <el-table-column
      label="开始时间"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.bannerStart|dateFormat}}</template>
    </el-table-column>
    <el-table-column
      label="到期时间"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.bannerEnd|dateFormat}}</template>
    </el-table-column>
    <el-table-column
      prop="isOnline"
      label="上线/下线"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.isOnline|onlineFormat}}</template>
    </el-table-column>
    <el-table-column
      prop="bannerUrl"
      label="广告链接"
      align='center'
      min-width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'
      min-width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          <el-form-item label="广告名称：" prop="bannerName">
              <el-input v-model="formdata.bannerName"></el-input>
              <p class="tip">广告名称只是作为辨别多个广告条目之用，不显示在广告中</p>
          </el-form-item>
          <el-form-item label="广告位置：" prop="bannerPosition">
              云画报
          </el-form-item>
          <el-form-item label="开始时间：" prop="bannerStart">
              <el-date-picker v-model="formdata.bannerStart" type='datetime'></el-date-picker>
          </el-form-item>
          <el-form-item label="到期时间：" prop="bannerEnd">
              <el-date-picker v-model="formdata.bannerEnd" type='datetime'></el-date-picker>
          </el-form-item>
          <el-form-item label="上线/下线：" prop="isOnline">
                <el-radio :label='1' v-model="formdata.isOnline">上线</el-radio>
                <el-radio :label='0' v-model="formdata.isOnline">下线</el-radio>
          </el-form-item>
          <el-form-item label="广告图片：" required="">
              <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="true" :url="adpic" :valueName="'adpic'" :size='2' :isDialog='true'  :extensions='"jpg,png,JPG,PNG"'></uploader>
              <p class="tips">只能上传jpg/png格式文件，文件不能超过1MB</p>
          </el-form-item>
          <el-form-item label="广告链接：" prop="bannerUrl">

              <el-input v-model="formdata.bannerUrl"></el-input>
          </el-form-item>
          <el-form-item label="广告备注：">
              <el-input v-model="formdata.bannerRemark"></el-input>
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
const addurl = './api/pictorial/createBanner'
const delurl = './api/pictorial/deleteBanner'
const listurl = './api/pictorial/bannerList'
const detailUrl = './api/pictorial/bannerCreateList'
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import {filters} from 'utils/'
const dataobj = {
    bannerName:'',
    bannerPosition:'',
    bannerStart:'',
    bannerEnd:'',
    isOnline:1,
    bannerPic:'',
    bannerUrl:'',
    bannerRemark:'',
}
  export default {
    data() {
      return {
        formdata:Object.assign({},dataobj),
        adpic:'',
        adpic_Data:[],
        adpic_name:'',
        rules:{
            bannerName:[{required:true,message:'请输入广告名称',trigger: 'blur'}],
            bannerStart:[{required:true,message:'请选择开始时间',trigger: 'blur'}],
            bannerEnd:[{required:true,message:'请输选择结束时间',trigger: 'blur'}],
            bannerPic:[{required:true,message:'请上传广告图片',trigger: 'blur'}],
            // bannerUrl:[{required:true,message:'请输入广告链接',trigger: 'blur'}],
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
      onlineFormat: filters.onlineformat,
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
        this.isopen = false;
      },
      openadd(){
        this.formdata = Object.assign({},dataobj)
        this.adpic = ''
        this.title= '添加广告'
        this.isopen = true
      },
      addone(){
        let data = Object.assign({},this.formdata)
        data.bannerStart = this.totimestamp(this.formdata.bannerStart)
        data.bannerEnd = this.totimestamp(this.formdata.bannerEnd)
        data.bannerPosition = '云画报'
        data.bannerPic = this.adpic
        this.$refs.formdatas.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message('请上传广告图片');
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
        let data ={
          id: row.id
        }
        this.$http.get(detailUrl,{params:data}).then(res=>{
          let ret = res.data;
          if(ret){
            this.formdata = Object.assign({},ret)
            this.adpic = this.formdata.bannerPic
            this.title = '编辑广告'
            this.isopen = true;
          }
        }).catch(err=>{
          this.$message(err.response.data.msg)
        })
        
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
        console.log(data)
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
    },
    resetUploader(valueName){
      console.log(valueName)
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
          this.query.from = 1;
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
    color: #333333;
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