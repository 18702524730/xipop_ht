<template>
  <div class="statisRes">
    <div class="searchs">
      <div>
        <div class="sel">
          <span>申请号：</span>
          <input type="text" placeholder="请输入申请号" v-model="inpVal">
        </div>
        <div class="btns">
          <div @click="seachList">查询</div>
          <div @click="reset">重置</div>
        </div>
      </div>
      <div @click="$router.push({name:'patentstatistics'})">返回</div>
    </div>
    <div class="tableTit">
      <div class="txt">统计结果列表</div>
      <div class="addBtn" @click="expFile">导出</div>
    </div>
    <div class="tables" v-if="total>0">
      <table>
        <thead>
          <tr :class="Ttitle.length==9?'num9':''">
            <th v-for="(item,key) in Ttitle" :key="key">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key) in seachData" :key="key">
            <td v-for="(res,index) in item" :key="index">{{res}}</td>
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
    
  </div>
</template>

<script>
const subUrl = './api/findPatentStatisticResultList'
import $ from 'jquery'
import {filters} from 'utils/'
export default {
    data(){
        return{
          inpVal:'',
          resid:'',
          pgIndex:1,
          pgCount:20,
          total:0,
          seachData:'',
          Ttitle:'',
          url:'',
        }
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      onlineFormat: filters.onlineformat,
    },
    methods:{
      linkFn(){
        this.$router.push({name:'patentstatistics',params:{}})
      },
      reset(){
        this.inpVal = '';
      },
      expFile(){
        window.open(this.url)
      },
      seachList(){
        let data = {
          pgIndex: this.pgIndex,
          pgCount: this.pgCount,
          id: this.resid,
          applicationDocNum:this.inpVal,
        }
        this.$http.get(subUrl,{params:data}).then(res=>{
          // this.$message.success('操作成功');
          let tdata = res.data
          this.total = tdata.page.totalElements;
          this.seachData = tdata.page.elements;
          this.Ttitle = tdata.title;
          console.log(tdata,this.seachData)
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
      this.resid = this.$route.params.id;
      this.url = this.$route.params.url;
      this.seachList();
    }
}
</script>

<style lang='less'>
  .statisRes{
    color: #606266;
    font-size: 14px;
    .searchs{
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sel{
        display: flex;
        align-items: center;
        margin-right: 3%;
        input{
          width: 180px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #DFE2E5;
          padding: 0 8px;
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
      >div:first-child{
        display: flex;
        align-items: center;
        width: 50%;
      }
      >div:last-child{
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
          padding: 0 6px;
          border: 1px solid #ebeef5;
        }
        th{
          color: rgb(51, 51, 51);
        }
        tr{
          line-height: 48px;
          td:last-child{
            border-color: #ebeef5;
          }
        }
        tr:hover{
          background: #f5f7fa;
        }
        thead{
          background: rgb(245, 247, 250);
          tr{
            th{
              white-space: nowrap;
            }
          }
        }
      }
    }
    
  }

</style>