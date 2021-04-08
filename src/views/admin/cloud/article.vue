<template>
<div class="clouditembox">
    <div class='clearfix'>
        <div class="form_control"><el-input v-model='searchdata.articleTitle' placeholder="文章标题"></el-input></div>
        <div class="form_control">
          <el-select v-model="searchdata.itemName" placeholder="栏目">
            <el-option :label="it.label" v-for="(it,key) in lmlistarr" :key="key" :value="it.value">{{it.label}}</el-option>
          </el-select>
        </div>
        <div class="form_control">
          <el-select v-model="searchdata.journalIssue" placeholder="期号">
            <el-option :label="it.label" v-for="(it,key) in qilistarr" :key="key" :value="it.value">{{it.label}}</el-option>
          </el-select>
        </div>
        <div class="form_control"><span @click='conditionsearch'>查询</span><span @click='resets'>重置</span></div>
    </div>
    <h3 class="ptitle">文章列表 <span class="addbtn" @click="openadd">发布文章</span></h3>
    
  <el-table
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
      
      <template slot-scope="scope">{{ scope.row.articleCode}}</template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      align='center'
      min-width="100">
      <template slot-scope="scope">{{scope.row.articleTitle}}</template>
    </el-table-column>
    <el-table-column
      label="期号"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.journalIssue}}</template>
    </el-table-column>
    <el-table-column
      label="栏目"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.itemName}}</template>
    </el-table-column>
    <el-table-column
      label="是否显示"
      align='center'
      min-width="60">
      <template slot-scope="scope">{{ scope.row.isShow|isshowFormat}}</template>
    </el-table-column>
    <el-table-column
      label="添加时间"
      align='center'
      min-width="120">
      <template slot-scope="scope">{{ scope.row.createTime|dateFormat}}</template>
    </el-table-column>
    <el-table-column
      label="排序"
      align='center'
      min-width="40">
      <template slot-scope="scope"><input type="text" class="sortinput" v-model="scope.row.sort" @blur="changeaudit(scope.row)"></template>
    </el-table-column>
    <el-table-column
      prop="pv"
      align='center'
      label="浏览量"
      min-width="60">
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'
      min-width="100">
      <template slot-scope="scope">
          <el-button type="text" size="small" @click="toarticle(scope.$index, scope.row)">查看</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->

  <el-dialog :title="title" :visible.sync="isopen" :before-close="cancel">
    <div class="openbox">
      <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
          <el-form-item label="文章标题：" prop="articleTitle">
              <el-input v-model="formdata.articleTitle"></el-input>
          </el-form-item>
          <el-form-item label="期号：" prop="journalIssue">
              <el-select v-model="formdata.journalIssue">
                <el-option :label="it.label" v-for="(it,key) in qilistarr" :key="key" :value="it.value">{{it.label}}</el-option>
              </el-select>
              <!-- <el-input v-model="formdata.journalIssue"></el-input> -->
          </el-form-item>
          <el-form-item label="栏目：" prop="itemName">
            <el-select v-model="formdata.itemName">
                <el-option :label="it.label" v-for="(it,key) in lmlistarr" :key="key" :value="it.value">{{it.label}}</el-option>
              </el-select>
              <!-- <el-input v-model="formdata.itemName"></el-input> -->
          </el-form-item>
          <el-form-item label="显示设置：">
              <el-radio-group v-model="formdata.isShow">
                <el-radio :label='1'>显示</el-radio>
                <el-radio :label='0'>不显示</el-radio>
              </el-radio-group>
          </el-form-item>
      </el-form>
      <div id="myeditor">
        <div ref="toolbar" class="toolbar" id="etoolbar">
        </div>
        <div ref="editor" class="text" id="etext">
        </div>
      </div>
      <div style="text-align: right;padding-top:30px;">
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="primary" @click="addone">确定</el-button>
        <el-button type="default" @click="toaddarticle">预览</el-button>
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
const addurl = './api/pictorial/createArticle'
const delurl = './api/pictorial/deleteArticle'
const detailUrl ='./api/pictorial/articleDetail'
const listurl = './api/pictorial/articleList'
const editUrl ='./api/pictorial/editArticle'


const qilist = './api/pictorial/JournalIssueList'
const lmlist ='./api/pictorial/JournalItemList'
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import {filters} from 'utils/'
import E from  'wangEditor'
const cdata = {
    articleTitle:'',
    itemName:'',
    journalIssue:''
}
const dataobj = {
    articleTitle:'',
    journalIssue:'',
    itemName:'',
    isShow:1,
    content:''
}
  export default {
    data() {
      return {
        searchdata: Object.assign({},cdata),
        formdata:Object.assign({},dataobj),
        adpic:'',
        adpic_Data:[],
        adpic_name:'',
        rules:{
            articleTitle:[{required:true,message:'请输入文章标题',trigger: 'blur'}],
            journalIssue:[{required:true,message:'请输入期号',trigger: 'change'}],
            itemName:[{required:true,message:'请输入栏目',trigger: 'change'}],
        },
        isopen: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
        query:{},
        editor:'',
        type:'',
        qilistarr:[],
        lmlistarr:[],
        title:'发布文章'
      }
    },
    components:{
      uploader
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      isshowFormat: filters.isshowformat,
    },
    mounted(){
      this.getquery()
      this.searchpage(true)
      this.getlmlist()
      this.getqilist()
      let data = localStorage.getItem('nowarticlecont');
      if(data){
        let detail = JSON.parse(data);
        this.formdata.articleTitle = detail.articleTitle;
        this.formdata.journalIssue = detail.journalIssue;
        this.formdata.itemName = detail.itemName;
        this.title = detail.title;
        // this.formdata.id = detail.id;
        this.isopen = true
        this.$nextTick(()=>{
          this.createEditor();
          this.editor.txt.clear()
          this.editor.txt.html(detail.content)
        })
      }
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods: {
        toaddarticle(){
          let data = Object.assign({},this.formdata)
          let str = this.editor.txt.html()
          data.content = str
          data.title = this.title;
          this.$refs.formdatas.validate(valid=>{
            if(valid){
              localStorage.setItem('nowarticlecont',JSON.stringify(data))
              this.$router.push({name:'addarticle',params:{id: data.itemName}})
            }
          })
          
        },
        async uploadimgs(files,insert){
          let self= this;
          let arr = []
          for(var i=0;i<files.length;i++){
            var form = new window.FormData()
            form.append('fileData', files[i])
            // arr.push(self.$http.post(editor.customConfig.uploadImgServer,form))
            try {
              let ret = await self.$http.post(this.editor.customConfig.uploadImgServer,form)
              insert(ret.data.url)
            } catch (error) {
              self.$message.warning(error.response.data.msg||'上传失败')
            }
            
          }
        },
        createEditor(){
          let self = this;
          // $('#myeditor').empty()
            var editor =  new E('#etoolbar', '#etext');
            editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
                editor.customConfig.uploadImgServer = CONFIG.rootUrl+'/api/file/uploadFile'// 配置服务器端地址
                editor.customConfig.uploadImgHeaders = {
                }// 自定义 header
                editor.customConfig.uploadFileName = 'fileData' // 后端接受上传文件的参数名
                editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
                editor.customConfig.uploadImgMaxLength = 500 // 限制一次最多上传 3 张图片
                editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
                editor.customConfig.customUploadImg = this.uploadimgs
                // editor.customConfig.customUploadImg = function (files, insert) {
                //     let arr = []
                //     for(var i=0;i<files.length;i++){
                //       var form = new window.FormData()
                //       form.append('fileData', files[i])
                //       arr.push(self.$http.post(editor.customConfig.uploadImgServer,form))
                //     }
                //   Promise.all(arr).then(res=>{
                //     res.forEach(item=>{
                //       insert(item.data.url)
                //     })
                //   }).catch(err=>{
                //     self.$message.warning(err.response.data.msg||'上传失败')
                //   })
                // } 
                // 配置菜单
                editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                // 'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                // 'backColor', // 背景颜色
                'link', // 插入链接
                // 'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                
                // 'table', // 表格
                //   'video', // 插入视频
                // 'code', // 插入代码
                'undo', // 撤销
                'image', // 插入图片
                // 'redo', // 重复
                //   'fullscreen' // 全屏
                ]
                editor.customConfig.uploadImgHooks = {
                fail: (xhr, editor, result) => {
                    // 插入图片失败回调
                },
                success: (xhr, editor, result) => {
                    // 图片上传成功回调
                },
                timeout: (xhr, editor) => {
                    // 网络超时的回调
                },
                error: (xhr, editor) => {
                    console.log(xhr,editor)
                    // 图片上传错误的回调
                },
                customInsert: (insertImg, result, editor) => {
                    // 图片上传成功，插入图片的回调
                    //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
                    // console.log(result.data[0].url)
                    //insertImg()为插入图片的函数
                    //循环插入图片
                    // for (let i = 0; i < 1; i++) {
                    // console.log(result)
                    // let url = result.url
                    // insertImg(url)
                    // }
                }
                }
            editor.create()
            this.editor = editor
        },
        changeaudit(it){
          let datas = {
            id: it.id,
            from:2
          }
        this.$http.get(detailUrl,{params:datas}).then(res=>{
          let data = Object.assign({},it)
          data.journalIssue = res.data.journalIssue;
          this.$http.post(addurl,data).then(res=>{
          this.$message.success('操作成功')
          this.searchpage()
          }).catch(err=>{
          this.$message.error(err.response.data.msg)
          })
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
        if(this.query.articleTitle){
          this.searchdata.articleTitle = this.query.articleTitle
        }
        if(this.query.itemName){
          this.searchdata.itemName = this.query.itemName
        }
        if(this.query.journalIssue){
          this.searchdata.journalIssue = this.query.journalIssue
        }
      },
      conditionsearch(){
          let obj ={}
          for(var k in this.searchdata){
                if(this.searchdata.hasOwnProperty(k)){
                    if(this.searchdata[k]){
                        obj[k]= this.searchdata[k]
                    }
                }
          }
          let data = Object.assign({},this.query,obj);
          this.query = data;
          this.searchpage(true)
          console.log(this.query)
      },
      resets(){
          this.searchdata = Object.assign({},cdata);
          for(var key in this.searchdata){
              delete this.query[key]
          }
          this.searchpage()
      },
      getDetail(it){
          let data = {
              id: it.id,
              from: 2
          }
        this.$http.get(detailUrl,{params:data}).then(res=>{
          let resdata = res.data;
          this.formdata.articleTitle = resdata.articleTitle;
          this.formdata.journalIssue = resdata.journalIssue;
          this.formdata.itemName = resdata.itemName;
          this.formdata.id = resdata.id;
          this.isopen = true
          this.$nextTick(()=>{
            this.createEditor();
            this.editor.txt.clear()
            this.editor.txt.html(resdata.content)
          })
          
          
          
          console.log(resdata)

        })
      },
      cancel(){
        this.formdata = Object.assign({},dataobj);
        localStorage.removeItem('nowarticlecont')
        this.adpic = ''
        this.isopen = false;
      },
      openadd(){
        this.formdata = Object.assign({},dataobj)
        this.title = '发布文章'
        this.isopen = true;
        this.$nextTick(()=>{
            this.createEditor()
            this.editor.txt.clear()
        })
        // this.$router.push({name:'addarticle',params:{type:0}})
      },
      addone(){
        let data = Object.assign({},this.formdata)
        let str = this.editor.txt.html()
        let jsons = JSON.stringify(str)
        data.content = str
        this.$refs.formdatas.validate(valid=>{
          if(valid){
            this.$http.post(addurl,data).then(res=>{
              this.$message.success('操作成功')
              this.editor.txt.clear()
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
      toarticle(index, row) {
          this.$router.push({name:'article',params:{lmid:row.id,from:2}})
      },
      handleEdit(index, row) {
        let data = {
              id: row.id,
              from: 2
          }
        this.$http.get(editUrl,{params:data}).then(res=>{
          let resdata = res.data;
          this.formdata.articleTitle = resdata.articleTitle;
          this.formdata.journalIssue = resdata.journalIssue;
          this.formdata.itemName = resdata.itemName;
          this.formdata.isShow = resdata.isShow;
          this.formdata.id = resdata.id;
          this.formdata.sort = resdata.sort;
          this.title = '编辑文章'
          this.isopen = true
          this.$nextTick(()=>{
            this.createEditor();
            this.editor.txt.clear()
            this.editor.txt.html(resdata.content)
          })
        })
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
      getlmlist(){
        this.$http.get(lmlist).then(res=>{
          let arr = res.data;
          let ret = []
          arr.forEach(item=>{
            ret.push({
              label:item,
              value: item,
            })
          })
          this.lmlistarr = ret;
        })
      },
      getqilist(){
        this.$http.get(qilist).then(res=>{
          let arr = res.data;
          let ret = []
          arr.sort();
          console.log(arr)
          arr.forEach(item=>{
            ret.push({
              label:item,
              value: item,
            })
          })
          this.qilistarr = ret;
          console.log(ret)
        })
      },
      handleCurrentChange(i){
            this.pgIndex = i;
            this.searchpage()
        },
        searchpage(extra){

          this.query.pgIndex =extra?1: this.pgIndex;
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
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    background-color: #efefef;
    border: 1px solid #ccc;
    border-bottom: none;
  }
  .text {
    border: 1px solid #ccc;
    height: 300px;
  }
  .el-dialog{
    width: 700px;
  }
  .sortinput{
    width: 40px;
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