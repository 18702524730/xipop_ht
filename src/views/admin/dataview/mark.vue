<template>
  <div class="companymarkbox">
      <div>
        <h3 class="ptitle">企业标签列表<span class="addbtn" @click='addmark'>新增标签</span></h3>
        <div class="result">

          <table class="result_type">
            <thead class="thead">
              <tr>
                <th class="minWidth">序号</th>
                <th class="comWidth">标签名称</th>
                <th class="comWidth">对外状态</th>
                <th class="minWidth">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in dataList" :key="key">
                <td>{{key + 1}}</td>
                <td>{{item.tagName}}</td>
                <td>{{item.ifShow | ifshowFormat}}</td>
                <td>
                  <span class="del" @click="audititem(item)">更改</span>
                  <span class="del" @click="delitem(item)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="nodatas" v-if="!dataList.length">
            暂无数据
          </div>
          
        </div>
        <!-- <div class="mypagination" v-show="!loading&&total">
              <el-pagination
                  @current-change='handleCurrentChange'
                  :page-size="pgCount"
                  :current-page.sync="pgIndex"
                  layout="total,prev, pager, next"
                  :total="total"
                  class="fr"
                  >
              </el-pagination>
          </div> -->
      </div>
      <el-dialog title="标签设置" width="500px" :visible.sync="auditshow" top="0">
        <div class="importbox">
          <div class="clearfix mb25">
            <div class="labelname hasrequired">标签名称：</div>
            <div class="clearfix posbox">
                <el-input v-model="subobj.tagName" placeholder="请输入标签名称" ></el-input>
            </div>
          </div>
          <div class="clearfix">
            <div class="labelname hasrequired">对外状态：</div>
            <div class="clearfix posbox">
                <el-radio-group v-model="subobj.ifShow">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
            </div>
          </div>
          <div class="opbtnbox">
            <span class="qd" @click="queding">确定</span>
            <span class="qx" @click="quxiao">取消</span>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
import {filters,store} from 'utils/'

const  createUrl ='/api/addOrEditEnterpriseTagLib'
const  delUrl ='/api/deleteEnterpriseTagLib/{id}'
const  listUrl ='/api/queryEnterpriseTagLibList'
export default {
    data(){
        return{
            subobj:{
              ifShow: 1,
              tagName: '',
            },
            recomlist:[],
            auditshow: false,
            pgIndex:1,
            pgCount:20,
            total: 0,
            dataList:[],
            loading: false,
        }
    },
    components: {
    },
    filters:{
      ifshowFormat: filters.ifshowFormat,
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
    methods:{
      audititem(it) {
          this.subobj = Object.assign({}, it)
          this.auditshow = true;
      },
      addmark(){
        this.auditshow = true
      },
      queding() {
        
        const data = Object.assign({}, this.subobj)
        if(!data.tagName) {
          this.$message.warning('请输入标签名称')
          return
        }
        this.$http.post(createUrl, data).then(res => {
          this.$message.success('操作成功')
          this.getOrderList()
          this.quxiao()
        }).catch(err => {
          this.$message.error(err.response.data.msg || '操作失败')
        })
      },    
      quxiao(){
        this.subobj = {
          ifShow: 1,
          tagName: ''
        }
        this.auditshow = false
      },
      delitem(it){
        this.$confirm('该标签可能已经应用于企业库中，删除后企业库将同步删除！是否确认删除？','确认删除', {type: 'warning'}).then(res=>{
          this.$http.delete(delUrl.replace("{id}",it.id)).then(res=>{
            this.$message.success('操作成功');
            this.searchpage()
          }).catch(err=>{
            this.$message(err.response.data.msg)
          })
        })
        
      },
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
            // this.query.pgIndex = this.pgIndex;
            // this.query.pgCount = this.pgCount;
            // this.$router.replace({query: this.query})
            this.getOrderList()
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(listUrl, {params: paramsData})
            .then((resp) => {
                this.loading = false;
                this.dataList = resp.data;
                // this.pgIndex = data.pageNum || 1;
                // this.total = data.totalElements;
            })
            .catch((err) => {
                this.loading = false;
                this.$message.error(err.response.data.msg)
            });
        },
    }
}
</script>

<style lang='less'>
.companymarkbox{
    .ptitle{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
        .addbtn{
          float: right;
          width: 100px;
          height: 30px;
          margin-top: 15px;
          margin-left: 20px;
          text-align: center;
          background-color: #379dea;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
        }
    }
    .result{
      font-size: 14px;
      .nodatas {
        width: 100%;
        border: 1px solid #eee;
        text-align: center;
        line-height: 300px;
        font-size: 16px;
      }
    }
    .result_type{
      border: 1px solid #EBEEF5;
      border-collapse: collapse;
      width: 100%;
      img{
        max-width: 100px;
        max-height: 100px;
      }
      thead{
        th{
          border:1px solid #EBEEF5;
          height: 50px;
          background-color: #F5F7FA;
          // width: 120px;
        }
        th.minWidth{
          min-width:50px;
        }
        th.comWidth{
          min-width:120px;
        }
      }
      tbody{
        tr{
          text-align: center;
          border-top: 1px solid #EBEEF5;
        }
        td{
          color: #666;
          padding: 5px;
          border:1px solid #EBEEF5;
        }
        .sztj,.bj,.del{
          padding: 3px;
          color: #379dea;
          cursor: pointer;
        }
      }
      
    }
    .importbox {
      padding: 20px;
      .posbox {
        position: relative;
        float: left;
        width: 300px;
      }
      .labelname {
          float: left;
          width: 100px;
          font-size: 14px;
      }
      .hasrequired:before {
          content: '*';
          display: inline-block;
          margin-right: 2px;
          color: #f00;
          font-size: 14px;
          line-height: 1;
      }
      .marklistbox {
        width:300px;
        max-height: 250px;
        overflow-y: auto;
        > li {
            display: flex;
            float: left;
            width: 120px;
            height: 40px;
            line-height: 16px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            margin-bottom: 10px;
            color: #666;
            cursor: pointer;
            &.selected {
                background-color: #379dea;
                color: #fff;
            }
        }
      }
      .del {
        font-size: 12px;
        color: #379dea;
        margin-left: 20px;
        cursor: pointer;
      }
      .download {
        font-size: 12px;
        color: #379dea;
        cursor: pointer;
      }
      .filename {
        margin-bottom: 10px;
      }
      .tipbox {
        position: absolute;
        left: 120px;
        bottom: 0;
        padding-left: 20px;
        font-size: 14px;
      } 
      h3 {
        font-size: 12px;
        font-weight: normal;
        color: #999;
        line-height: 16px
      }
      .opbtnbox {
        font-size: 0;
        text-align: right;
        padding-top: 20px;
        > span {
          display: inline-block;
          width: 100px;
          font-size: 14px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          border-radius: 3px;
          vertical-align: middle;
          margin-left: 20px;
          &.qx {
            border: 1px solid #ccc;
            color: #666;
          }
          &.qd {
            background-color: #379dea;
            color: #fff;
          }
        }
      }
    }
    .el-dialog {
      top: 30%;
      transform: translateY(-50%);
    }
    .form_control{
      float:left;
        width: 180px;margin-right: 10px;margin-bottom: 10px;
        .el-input__inner{height: 30px;}
        .el-input__icon{
          line-height: 30px;
        }
        >span{
            display: inline-block;
            margin-top: 2px;
            width: 80px;
            height: 30px;
            line-height:30px;
            font-size: 14px;
            background-color:#379dea;
            color:#fff;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            margin-right: 10px;
        }
    }
    .marklistbox::-webkit-scrollbar {
        width: 4px;
        
    }
    .marklistbox::-webkit-scrollbar-track {
        width: 4px;
        background-color: #f2f2f2;
    }
    .marklistbox::-webkit-scrollbar-thumb {
        width: 4px;
        background-color: #379dea;
    }
}

</style>