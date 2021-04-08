<template>
  <div class="patentdatabox">
      <div>
        <h3 class="ptitle">专利导航报告列表 <span class="addbtn" @click='addreport'>添加</span></h3>
        <div class="result" >
          <table class="result_type" v-loading='loading'>
            <thead class="thead">
              <tr>
                <th class="minWidth">编号</th>
                <th class="smWidth">报告封面</th>
                <th class="smWidth">报告名称</th>
                <th class="smwidth">作者</th>
                <th class="smWidth">报告时间</th>
                <th class="smWidth">更新时间</th>
                <th class="minWidth">是否推荐</th>
                <th class="comWidth">操作</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for='(item,key) in dataList' :key ='key'>
                <td>{{item.number}}</td>
                <td><img :src='item.coverUrl' /></td>
                <td>{{item.title}}</td>
                <td>{{item.author}}</td>
                <td>{{item.publishTime | dateFormat}}</td>
                <td>{{item.updateTime | dateFormat}}</td>
                <td>{{item.isRecommend|isrecomFormat}}</td>
                <td>
                  <span class="sztj" @click="setrecom(item)" v-if="item.isRecommend==0">设为推荐</span>
                  <span class="sztj" @click="cancelrecom(item)" v-if="item.isRecommend==1">取消推荐</span>
                  <span class="bj" @click="bianji(item)">编辑</span>
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
import {filters} from 'utils/'
export default {
    data(){
        return{
            query:{},
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
      addreport(){
        this.$router.push({name:'addnavpage',params:{type:0}})
      },
      bianji(it){
        this.$router.push({name:'addnavpage',params:{type:it.number}})
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
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(){
            this.query.pgIndex = this.pgIndex;
            this.query.pgCount = this.pgCount;
            this.query.sortType = 1;
            this.query.type =2
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

