<template>
<div class="clouditembox">
    <h3 class="ptitle">访客日志</h3>
    <div v-loading='loading'>
      <div class='tablebox'>
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
      label="访问时间"
      align="center"
      min-width="120">
      <template slot-scope="scope">{{ scope.row.startTime}}</template>
    </el-table-column>
    <el-table-column
      label="地域"
      align="center"
      min-width="40">
      <template slot-scope="scope">{{ scope.row.area}}</template>
    </el-table-column>
    <el-table-column
      label="访问页面"
      align="center"
      min-width="120">
      <template slot-scope="scope">{{ scope.row.accessPage}}</template>
    </el-table-column>
    <el-table-column
      label="访问IP"
      align="center"
      min-width="100">
      <template slot-scope="scope">{{ scope.row.ip}}</template>
    </el-table-column>
    <el-table-column
      label="访客标识码"
      align="center"
      min-width="120">
      <template slot-scope="scope">{{ scope.row.visitorId}}</template>
    </el-table-column>
    <el-table-column
      label="访问时长"
      align="center"
      min-width="80">
      <template slot-scope="scope">{{ scope.row.visitTime|secondToHourForamt}}</template>
    </el-table-column>
    <el-table-column
      label="访问页数"
      align="center"
      min-width="60">
      <template slot-scope="scope">{{ scope.row.visitPages}}</template>
    </el-table-column>
    <el-table-column
      label="访问设备"
      align="center"
      min-width="60">
      <template slot-scope="scope">{{ scope.row.deviceType}}</template>
    </el-table-column>
  </el-table>
  </div>
  <div class="mypagination" v-show="!loading&&dataList&& dataList.length">
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
</template>

<script>
const listurl = './api/monitor/visitorAnalysis'
import {filters} from 'utils/'
import $ from 'jquery'
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
      dateFormat: filters.formatDate.datesFormat,
      secondToHourForamt: filters.secondToHour,
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
                this.total = data.pageCount;
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
  img{
    max-width: 100%;
  }
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
    max-height: 100px;
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