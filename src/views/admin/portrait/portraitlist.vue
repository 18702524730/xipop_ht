<template>
<div class="portraitlist">
    <h3 class="ptitle">IP画像列表 <span class="addbtn" @click="openadd">添加</span></h3>
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
      label="编号"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.ipListCode}}</template>
    </el-table-column>
    <el-table-column
      label="文章封面"
      align='center'
      min-width="100">
      <template slot-scope="scope"><img :src="scope.row.articleCover" alt=""></template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.articleTitle}}</template>
    </el-table-column>
    <el-table-column
      label="类型"
      align='center'
      min-width="120">
      <template slot-scope="scope">{{ scope.row.type}}</template>
    </el-table-column>
    <el-table-column
      label="添加时间"
      align='center'
      min-width="90">
      <template slot-scope="scope">{{ scope.row.createTime|dateFormat}}</template>
    </el-table-column>
    
    <el-table-column
      prop="isShow"
      label="是否显示"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.isShow|isshowFormat}}</template>
    </el-table-column>
    <el-table-column
      prop="isHot"
      label="是否设为热门"
      align='center'
      min-width="80">
      <template slot-scope="scope">{{ scope.row.isHot|ishotFormat}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'
      min-width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" v-if="scope.row.isHot == 0" @click="handleHot(scope.$index, scope.row)">设为热门</el-button>
        <el-button type="text" size="small" v-if="scope.row.isHot == 1" @click="handleHotc(scope.$index, scope.row)">取消热门</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <div class="openboxparent" v-if="isopen">
      <div class="openbox" >
        <span class="closebtn" @click="cancel"><i class="el-icon-close"></i></span>
        <div class="formbox">
        <el-form label-width="100px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
            <el-form-item label="文章标题：" prop="articleTitle">
                <el-input v-model="formdata.articleTitle" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="封面：" required="">
                <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :postAction="postAction" :fileName="adpic_name" :canPreview="true" :url="adpic" :valueName="'adpic'" :size='2' :isDialog='true'  :extensions='"jpg,png,JPG,PNG"'></uploader>
                <p class="tips">只能上传jpg/png格式文件，文件不能超过1MB</p>
            </el-form-item>
            <el-form-item label="是否显示：">
              <el-radio :label='1' v-model="formdata.isShow">是</el-radio>
              <el-radio :label='0' v-model="formdata.isShow">否</el-radio>
            </el-form-item>
            <!-- <el-form-item label="是否热门：">
              <el-radio :label='1' v-model="formdata.isHot">是</el-radio>
              <el-radio :label='0' v-model="formdata.isHot">否</el-radio>
            </el-form-item> -->
            <el-form-item label="文章类型：" prop="type">
                <el-select v-model="formdata.type">
                  <el-option v-for="(item,index) in articletype" :label="item.label" :value="item.label" :key="index">{{item.label}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容：" required="">
              <div id="myeditor">
                <div ref="toolbar" class="toolbar" id="etoolbar">
                </div>
                <div ref="editor" class="text" id="etext">
                </div>
              </div>
            </el-form-item>
        </el-form>
        </div>
        <div style="text-align: right;background:#fff;padding: 10px 0;">
          <el-button type="default" @click="cancel">取消</el-button>
          <el-button type="primary" @click="addone">确定</el-button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
const addurl = '/api/pictorial/updateIpPortraitList'
const delurl = '/api/pictorial/deleteIpPortraitList'
const listurl = '/api/pictorial/selectIpPortraitList'
// const detailUrl = '/api/pictorial/bannerCreateList'
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
import E from 'wangEditor'
import {filters} from 'utils/'
const dataobj = {
    articleCover:'',
    articleTitle:'',
    type:'',
    isShow: 1,
    isHot:1,
    content:'',
}
const articletype = [
  { id: 1, label: '专利'},
  { id: 2, label: '商标'},
  { id: 3, label: '版权'},
  { id: 4, label: '其他'},
]
  export default {
    data() {
      return {
        formdata:Object.assign({},dataobj),
        adpic:'',
        adpic_Data:[],
        adpic_name:'',
        postAction: CONFIG.rootUrl+'/api/file/uploadFile',
        rules:{
            articleTitle:[{required:true,message:'请输入文章标题',trigger: 'blur'}],
            type:[{required:true,message:'请选择文章类型',trigger: 'blur'}],
            addTime:[{required:true,message:'请选择添加时间',trigger: 'blur'}]
        },
        articletype: articletype,
        isopen: false,
        multipleSelection: [],
        pgIndex:1,
        pgCount:10,
        total: 0,
        dataList:[],
        loading: false,
        title:'添加广告',
        editor: '',
        query:{}
      }
    },
    components:{
      uploader
    },
    filters:{
      dateFormat: filters.formatDate.dateFormat,
      isshowFormat: filters.isshowformat,
      ishotFormat: filters.ishotformat
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
      async uploadimgs(files,insert){
          let self= this;
          let arr = []
          for(var i=0;i<files.length;i++){
            var form = new window.FormData()
            form.append('fileData', files[i])
            // arr.push(self.$http.post(editor.customConfig.uploadImgServer,form))
            try {
              let ret = await self.$http.post(this.editor.customConfig.uploadImgServer,form)
              console.log(ret)
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
                // editor.customConfig.showLinkImg = false
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
                'strikeThrough', // 删除线
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
                'redo', // 重复
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
                    console.log(result)
                    // let url = result.url
                    // insertImg(url)
                    // }
                }
                }
            editor.create()
            this.editor = editor
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
        this.adpic_name = ''
        this.editor.txt.clear()
        this.isopen = false;
        
      },
      openadd(){
        this.formdata = Object.assign({},dataobj)
        this.adpic = ''
        this.title= '添加文章'
        this.isopen = true
        this.$nextTick(() => {
          this.createEditor()
          this.editor.txt.clear()
        })
      },
      addone(){
        let data = Object.assign({},this.formdata)
        // data.addTime = this.totimestamp(this.formdata.addTime)
        data.articleCover = this.adpic
        let str = this.editor.txt.html()
        data.content = str
        this.$refs.formdatas.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message('请上传封面图片');
              return false
            }
            if(str == "<p><br></p>"){
              this.$message('请填写文章内容');
              return false
            }
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
      handleHot(index, row) {
        let data = Object.assign({}, row)
        data.isHot = 1
        this.$http.post(addurl,data).then(res=>{
          this.$message.success('操作成功')
          // this.cancel();
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg)
        })
      },
      handleHotc(index, row) {
        let data = Object.assign({}, row)
        data.isHot = 0
        this.$http.post(addurl,data).then(res=>{
          this.$message.success('操作成功')
          // this.cancel();
          this.searchpage()
        }).catch(err=>{
          this.$message.error(err.response.data.msg)
        })
      },
      handleEdit(index, row) {
        let data ={
          id: row.id
        }
        this.$http.get(listurl,{params:data}).then(res=>{
          let ret = res.data;
          if(ret){
            this.formdata = Object.assign({},ret)
            this.adpic = this.formdata.articleCover
            this.title = '编辑文章'
            this.isopen = true;
            this.$nextTick(() => {
              this.createEditor()
              this.editor.txt.clear()
              this.editor.txt.html(this.formdata.content)
            })
          }
        }).catch(err=>{
          this.$message(err.response.data.msg)
        })
        
      },
      handleDelete(index, row) {
        let self = this;
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
				this[valueName+'_name'] ='';
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
          // this.query.from = 1;
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
.portraitlist{
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
  .openboxparent {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
  }
  .openbox{
    width: 800px;
    height: 700px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding:50px 60px 30px 30px;
    background-color: #fff;
    .formbox {
      max-height: 550px;
      overflow-y: auto;
    }
    .closebtn {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #333;
      cursor: pointer;
    }
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
    img{
      max-width: 100%;
      max-height: 100px;
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