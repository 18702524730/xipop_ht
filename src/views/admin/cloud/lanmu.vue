<template>
<div class="clouditembox">
    <h3 class="ptitle">栏目列表 <span class="addbtn" @click="openadd">添加</span></h3>
  <el-table
    ref="multipleTable"
    :data="dataList"
    :header-cell-style="{color:'#333',background:'#F5F7FA'}"
    border
    tooltip-effect="dark"
    style="width: 100%">
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
    <el-table-column
      label="编号"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.itemCode}}</template>
    </el-table-column>
    <el-table-column
      label="栏目名称"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.itemName}}</template>
    </el-table-column>
    <el-table-column
      label="是否显示"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.isShow |isshowFormat}}</template>
    </el-table-column>
    <el-table-column
      label="排序"
      align='center'
      min-width="80">
      <template slot-scope="scope" ><input type="text" class="sortinput" v-model="scope.row.sort" @blur="changeaudit(scope.row)"></template>
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
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->

  <el-dialog :title="title" :visible.sync="isopen">
    <div class="openbox">
      <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
          <el-form-item label="栏目名称：" prop="itemName">
              <el-input v-model="formdata.itemName"></el-input>
          </el-form-item>
          <el-form-item label="是否显示：" prop="isShow">
                <el-radio :label='1' v-model="formdata.isShow">显示</el-radio>
                <el-radio :label='0' v-model="formdata.isShow">不显示</el-radio>
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
const delurl = './api/pictorial/deleteItem'
const addurl = './api/pictorial/createItem'
const listurl = './api/pictorial/itemList'
const infoUrl = './api/pictorial/journalInfo'
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import {filters} from 'utils/'
const dataobj = {
    itemName:'',
    isShow:1,
}
  export default {
    data() {
      return {
        formdata:Object.assign({},dataobj),
        adpic:'',
        adpic_Data:[],
        adpic_name:'',
        yearmonth:'',
        rules:{
            itemName:[{required:true,message:'请输入栏目名称',trigger: 'blur'}],
        },
        isopen: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
        query:{},
        title: '添加栏目'
      }
    },
    components:{
      uploader
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
      isshowFormat: filters.isshowformat,
      isrecomFormat: filters.isrecomformat,
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
    },
    methods: {
      changeaudit(it){
        let data = Object.assign({},it)
        this.$http.post(addurl,data).then(res=>{
        this.$message.success('操作成功')
        this.searchpage()
        }).catch(err=>{
        this.$message.error(err.response.data.msg)
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
        this.title = '添加栏目'
        this.isopen = true
      },
      addone(){
        let data = Object.assign({},this.formdata)
        // data.sort = it.sort
        this.$refs.formdatas.validate(valid=>{
            if(valid){
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
          this.$http.get(infoUrl, {params: data}).then(res=>{
              let ret = res.data;
              console.log(res)
              this.formdata = Object.assign({},row)
            this.adpic = this.formdata.journalCover;
          })
        this.title = '编辑栏目'
        this.isopen = true;
        console.log(index, row);
      },
      handleDelete(index, row) {
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
				this[valueName+'_name'] = '';
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
    .tips{
      height: 30px;
      font-size: 12px;
      color: #999;
    }
  }
}
// .ptitle{
//     height: 60px;
//     line-height: 60px;
//     padding-left: 20px;
//     background-color: #eee;
//     border-bottom: 1px solid #eee;
//     font-size: 14px;
//     color: #333;
//     font-weight: normal;
//     .addbtn{
//         float: right;
//         width: 100px;
//         height: 30px;
//         margin-top: 15px;
//         margin-right: 20px;
//         text-align: center;
//         background-color: #fff;
//         border:1px solid #ccc;
//         line-height: 30px;
//         cursor: pointer;
//     }
// }
</style>