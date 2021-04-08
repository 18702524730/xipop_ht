<template>
  <div class="patentdatabox">
      <div>
        <h3 class="ptitle">导航分析与专题库 <span class="addbtn" @click='addreport'>添加</span></h3>
        <div class="result" >
          <table class="result_type">
            <thead class="thead">
              <tr>
                <th class="minWidth">编号</th>
                <th class="comWidth">专题封面</th>
                <th class="comWidth">专题名称</th>
                <th class="comWidth">添加时间</th>
                <th class="comWidth">更新时间</th>
                <th class="minWidth">是否推荐</th>
                <th class="comWidth">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in dataList" :key="key">
                <td>{{item.number}}</td>
                <td><img :src="item.coverUrl" alt=""></td>
                <td>{{item.title}}</td>
                <td>{{item.createTime|dateFormat}}</td>
                <td>{{item.updateTime|dateFormat}}</td>
                <td>{{item.isRecommend|isrecomFormat}}</td>
                <td>
                  <span class="sztj" @click="setrecom(item)" v-if="item.isRecommend==0">设为推荐</span>
                  <span class="sztj" @click="cancelrecom(item)" v-if="item.isRecommend==1">取消推荐</span>
                  <!-- <span class="bj" @click="bianji(item)">编辑</span> -->
                  <span class="del" @click="delitem(item)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="nodata" v-if="!loading&&!total">
            没有搜到结果
          </div>
          
        </div>
        <div class="mypagination" v-show="!loading&&total">
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
const  recomUrl ='./api/updatePatentArticleRecommend'
const  delUrl ='./api/deletePatentArticle/{number}'
const  listUrl ='./api/findPatentArticleList'
import $ from 'jquery'
import {filters,store} from 'utils/'
export default {
    data(){
        return{
            query:{},
            recomlist:[],
            pgIndex:1,
            pgCount:10,
            total: 0,
            dataList:[],
            loading: false,
        }
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      isshowFormat: filters.isshowformat,
      isrecomFormat: filters.isrecomformat,
    },
    mounted(){
      this.getquery()
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
      addreport(){
        // this.current =2
        this.$router.push({name:'addpage',params:{type:0}})
      },
     bianji(it){
      //  store.set('projectData',it)
        this.$router.push({name:'addpage',params:{type:it.number}})
      },
      setrecom(it){
        let data = {
          number: it.number,
          isRecommend: 1,
        }
        this.$http.put(recomUrl,data).then(res=>{
          this.$message.success('操作成功');
          this.searchpage()
        }).catch(err=>{
          this.$message(err.response.data.msg)
        })
      },
      cancelrecom(it){
        let data = {
          number: it.number,
          isRecommend: 0,
        }
        this.$http.put(recomUrl,data).then(res=>{
          this.$message.success('操作成功');
          this.searchpage()
        }).catch(err=>{
          this.$message(err.response.data.msg)
        })
      },
      delitem(it){
        this.$confirm('您确定要删除吗？删除后不可恢复').then(res=>{
          this.$http.delete(delUrl.replace("{number}",it.number)).then(res=>{
            this.$message.success('操作成功');
            this.searchpage()
          }).catch(err=>{
            this.$message(err.response.data.msg)
          })
        })
        
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
            this.query.sortType = 1;
            this.query.type = 1
            this.$router.replace({query: this.query})
            this.getOrderList(this.query)
        },
        getOrderList(paramsData){
            paramsData = paramsData || {};
            this.loading = true;
            this.$http.get(listUrl, {params: paramsData})
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

<style lang='less'>
.patentdatabox{
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
          text-align: center;
          background-color: #379dea;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
        }
    }
    .result{
      font-size: 14px;
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
          cursor: pointer;
          &:hover{
            color: #379dea;
          }
        }
      }
    }
}

</style>