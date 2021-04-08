<template>
<div class="clouditembox">
    <h3 class="ptitle">黑名单列表</h3>
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
      label="序号"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.seqNo}}</template>
    </el-table-column>
    <el-table-column
      label="IP"
      align='center'
      min-width="100">
      <template slot-scope="scope">{{ scope.row.ip}}</template>
    </el-table-column>
    <el-table-column
      label="拉黑等级"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.level | levelFormat}}</template>
    </el-table-column>
    <el-table-column
      label="添加时间"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.firstTime|dateFormat}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'
      min-width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->

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
import $ from 'jquery'
const delurl = '/api/delBlacklistIP/{id}'
const listurl = '/api/findBlacklist'
import {filters} from 'utils/'
  export default {
    data() {
      return {
        isopen: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
        query:{}
      }
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      levelFormat: function(input) {
          let ret = ''
          const ins = input + ''
          if (ins === '1') {
              ret = '单日拉黑'
          }
          if (ins === '2') {
              ret = '永久拉黑'
          }
          return ret
      },
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
      handleClick(row) {
        console.log(row);
      },
      handleDelete(index, row) {
        let self = this;
        this.$confirm('您确定要删除吗？删除后不可恢复').then(()=>{
          this.$http.delete(delurl.replace('{id}', row.id)).then(res=>{
            this.$message.success('删除成功');
            this.searchpage()
          }).catch(err=>{
            this.$message(err.response.data.msg)
          })
        })
        
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