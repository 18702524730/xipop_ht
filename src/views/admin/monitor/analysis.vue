<template>
<div class="monitors">
    <h3 class="ptitle">页面分析</h3>
    <div class="trafficboxs">
        <div class="timebox">时间：<span v-for="(v,k) in time" :key="k" @click="change(v)" :class="{active: current ==v.id}">{{v.name}}</span></div>
        <div class="todaytraffic">
            <h3>指标概览</h3>
            <ul class="traffics">
                <li><span>浏览量(PV)</span><span>访客量</span><span>退出次数</span><span>平均访问时长</span></li>
                <li><span>{{detail[0]}}</span><span>{{detail[1]}}</span><span>{{detail[2]}}</span><span>{{detail[3]|secondToHourForamt }}</span></li>
            </ul>
        </div>
        <div v-loading='loading'>
        <el-table
            ref="multipleTable"
            :data="dataList"
            :header-cell-style="{color:'#333',background:'#F5F7FA'}"
            border
            tooltip-effect="dark"
            style="width: 100%">
           
            <el-table-column
            align="center"
            min-width="20" type='index' :index="getindex">
            
            </el-table-column>
            <el-table-column
            label="页面url"
            align="center"
            min-width="140">
            <template slot-scope="scope">{{ scope.row.pageUrl}}</template>
            </el-table-column>
            <el-table-column
            label="浏览量（PV）"
            align="center"
            min-width="60">
            <template slot-scope="scope">{{ scope.row.pvCount}}</template>
            </el-table-column>
            <el-table-column
            label="访客量（UV）"
            align="center"
            min-width="60">
            <template slot-scope="scope">{{ scope.row.visitorCount}}</template>
            </el-table-column>
            <el-table-column
            label="页面退出次数"
            align="center"
            min-width="60">
            <template slot-scope="scope">{{ scope.row.exitCount}}</template>
            </el-table-column>
            <el-table-column
            label="平均停留时长"
            align="center"
            min-width="60">
            <template slot-scope="scope">{{ scope.row.averageStayTime|secondToHourForamt}}</template>
            </el-table-column>
        </el-table>
        <div class="mypagination" v-show="!loading&&dataList && dataList.length">
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
</div>
</template>

<script>
const listurl = './api/monitor/pageAnalysis'
const viewUrl ='./api/monitor/indexOverview'
import $ from 'jquery'
import echarts from 'echarts'
import {filters} from 'utils/'
  export default {
    data() {
      return {
        time:[
            {name:'今日',id:'0'},
            {name:'最近7日',id:'6'},
            {name:'最近30日',id:'29'}
        ],
        current: 29,
        query:{},
        detail:{},
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
      }
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
      secondToHourForamt: filters.secondToHour,
    },
    mounted(){
        // this.getview()
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
        getindex(index){
            return index + 1
        },
        getview(){
            let data = {
                date: this.current
            }
            this.$http.get(viewUrl,{params: data}).then(res=>{
                if(res.data){
                    this.detail = res.data
                }
                
            })
        },
      totimestamp(date){
        var timestamp =date?Date.parse(new Date(date)):'';
        return timestamp
      },
      change(it){
          this.current = it.id;
          
          this.searchpage()
        //   this.getview()
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
          this.query.date = this.current;
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
                this.detail = data['PvUvExitTime']
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
.monitors{
  img{
    max-width: 100%;
    max-height: 100px;
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
  .trafficboxs{
      padding: 20px;
      padding-bottom: 50px;
      border: 1px solid #eee;
      .timebox{
          margin-bottom: 20px;
          font-size: 14px;
          color: #333;
          line-height: 30px;
          >span{
              display: inline-block;
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ccc;
              vertical-align: middle;
              cursor: pointer;
              &.active{
                  background-color: #379dea;
                  color: #fff;
                  border:none;
              }
          }
      }
      .todaytraffic{
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #eee;
          border-radius: 2px;
          box-shadow: 0 0 5px #ccc;
          >h3{
              font-size: 14px;
              font-weight: normal;
              color:#333;
              margin-bottom: 10px;
          }
          .traffics{
              >li{
                  margin-bottom: 10px;
                  >span{
                      display: inline-block;
                      width: 25%;
                      line-height: 20px;
                      font-size: 12px;
                      color: #666;
                      text-align: center;
                    //   &:first-child{
                    //       text-align: left;
                    //   }
                  }
              }
          }
      }
  }
  .stack{
      height: 400px;
  }
}

</style>