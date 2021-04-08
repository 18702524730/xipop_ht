<template>
<div class="monitors">
    <h3 class="ptitle">报表面板</h3>
    <div class="trafficbox">
        <div class="todaytraffic">
            <h3>今日流量</h3>
            <ul class="traffic">
                <li><span></span><span>浏览量(PV)</span><span>访客量</span><span>IP数</span><span>平均访问时长</span></li>
                <li><span>今日</span><span>{{today.pvCount}}</span><span>{{today.visitorCount}}</span><span>{{today.ipCount}}</span><span>{{today.avgVisitTime | secondToHourForamt}}</span></li>
                <li><span>昨日</span><span>{{yestoday.pvCount}}</span><span>{{yestoday.visitorCount}}</span><span>{{yestoday.ipCount}}</span><span>{{yestoday.avgVisitTime| secondToHourForamt}}</span></li>
            </ul>
        </div>
        <div class="stackchart">
            <div id="stackChart" class="stack"></div>
        </div>
    </div>
</div>
</template>

<script>
const listurl = './api/monitor/reportPanel'
import echarts from 'echarts'
import $ from 'jquery'
import {filters} from 'utils/'
  export default {
    data() {
      return {
        query:{},
        today:{},
        yestoday:{},
        timedata:[],
        pvdata:[],
        uvdata:[]
      }
    },
    filters:{
      dateFormat: filters.formatDate.datesFormat,
      secondToHourForamt: filters.secondToHour,
    },
    mounted(){
      this.getOrderList()
      this.createStack()
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
      createStack(){
            var stackOption = {
                    title: {
                        text: '访客趋势',
                        left:'20',
                        top:'20',
                        textStyle:{
                            fontSize: '14',
                            fontWeight:'normal',
                            color: '#666'
                        }
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            // label: {
                            //     backgroundColor: '#6a7985'
                            // }
                        },
                        formatter: '{b}<br/>浏览量（PV）：{c}<br/>访客量（UV）：{c1}'
                    },
                    color:['red','#379dea'],//折线颜色
                    legend: {
                        top:'20',
                        right:'30',
                        textStyle:{
                            fontSize:'12',
                            color: '#ccc',
                    },
                    itemWidth:15,
                    itemHeight:15, //图例标记的图形高度
                    // show: false,
                        data:[{name:'PV',icon:'line'},{name:'UV',icon:'line'}],
                    },
                    // toolbox: {
                    // 	right:'30',
                    // 	top:'10',
                    // 	feature: {
                    // 		saveAsImage: {},
                    // 		magicType:{
                    // 			type:['line','bar','stack','tiled']
                    // 		}
                    // 	}
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                        // show: true,
                        // backgroundColor:'red'
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisTick:{
                            show:false
                            },
                            axisLine:{
                            // show: false
                                lineStyle:{
                                    color:'#ccc'
                                }
                            },
                            boundaryGap : false,
                            axisLabel:{
                                interval:2,
                                textStyle:{
                                    color: '#ccc',
                                    fontSize:'12'
                                },
                            },
                            data : this.timedata
                            // data:['11/1','11/2','11/3','11/4','11/5','11/6','11/7','11/8','11/9','11/10','11/11','11/12','11/13','11/14','11/15','11/16','11/17','11/18','11/19','11/20','11/21','11/22','11/23','11/24','11/25','11/26','11/27','11/28','11/29','11/30']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick:{
                            show:false
                            },
                            axisLine:{
                            // show: false
                                lineStyle:{
                                    color: '#ccc'
                                },
                            },
                            axisLabel:{
                                textStyle:{
                                    color: '#ccc'
                                },
                            },
                            splitLine:{
                                show: false
                            },
                            
                        }
                    ],
                    // series: this.patdata
                    series : [
                        {
                            name:'PV',
                            type:'line',
                            symbol:'none',
                            lineStyle:{
                            width:1,
                            },
                            label:{
                            normal:{
                                show:false
                            }
                            },
                            data:this.pvdata
                        },
                        {
                            name:'UV',
                            type:'line',
                            symbol:'none',
                            lineStyle:{
                                width: 1
                            },
                            data:this.uvdata
                        },
                        
                    ]
                };
                var stackCharts = echarts.init(document.getElementById('stackChart'), 'shine');
                    stackCharts.setOption(stackOption);
        },
        getOrderList(){
            this.loading = true;
            this.$http.get(listurl)
            .then((resp) => {
                this.loading = false;
                var data = resp.data;
                if(data){
                    let l = data.length;
                    this.today = data[l-1]
                    this.yestoday = data[l-2]
                    let tarr=[]
                    let pvarr=[]
                    let uvarr=[]
                    data.forEach(item=>{
                        tarr.push(item['date'])
                        if(typeof item['pvCount']=='number'){
                            pvarr.push(item['pvCount'])
                        }else{
                            pvarr.push(0)
                        }
                        if(typeof item['visitorCount']=='number'){
                            uvarr.push(item['visitorCount'])
                        }else{
                            uvarr.push(0)
                        }
                    })
                    this.pvdata = pvarr;
                    this.uvdata = uvarr;
                    this.timedata = tarr;
                }
                this.createStack()
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
  .ptitle{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    background-color: #eee;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    .addbtn{
        float: right;
        width: 100px;
        height: 30px;
        margin-top: 15px;
        margin-right: 20px;
        text-align: center;
        background-color: #fff;
        border:1px solid #ccc;
        line-height: 30px;
        cursor: pointer;
    }
  }
  .trafficbox{
      padding: 20px;
      border: 1px solid #ccc;
      .todaytraffic{
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #eee;
          border-radius: 2px;
          box-shadow: 0 0 5px #ccc;
          >h3{
              font-size: 14px;
              color:#333;
              margin-bottom: 10px;
              font-weight: normal
          }
          .traffic{
              >li{
                  margin-bottom: 10px;
                  >span{
                      display: inline-block;
                      width: 20%;
                      line-height: 20px;
                      font-size: 12px;
                      color: #666;
                      text-align: left;
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