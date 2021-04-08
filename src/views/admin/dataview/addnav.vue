<template>
  <div class="addpatentdatabox">
      <div class="addpage">
        <div class="basicinfo">
          <h3 class="comtitle">基本信息 <span></span></h3>
          <div class="cont">
            <el-form label-width="150px" :model="formdatas" label-position="right" :rules="rules" ref='basics'>
              <el-form-item label="报告标题：" prop="title">
                  <el-input v-model="formdatas.title" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="简介：" prop="brief">
                  <el-input v-model="formdatas.brief" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="报告日期" required>
                <el-date-picker v-model="formdatas.publishTime" type="date"  placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="作者" prop="author" >
                  <el-input v-model="formdatas.author" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="报告封面" required>
                  <uploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="true"  :url="adpic" :valueName="'adpic'" :extensions='"jpg,png,JPG,PNG,jpeg,JPEG"' ></uploader>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <h3 class="comtitle">正文 <span></span></h3>
          <div class="addlist">
            <div id="myeditor">
              <div ref="toolbar" class="toolbar" id="etoolbar">
              </div>
              <div ref="editor" class="text" id="etext">
              </div>
            </div>

            <div class="submitbtn">
              <span @click='back' class="backbtn">返回</span>
              <span @click='toviewdetail' class="viewbtn">预览</span>
              <span @click='dosome'>提交</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import uploader from 'cps/uploader/uploader.vue'
const addUrl = './api/editOrAddArticle'
import $ from 'jquery'
const detailUrl = './api/findPatentArticleDetail/{number}'
import E from 'wangEditor'
const dataobj ={
  title:'',
  author:'',
  brief:'',
  publishTime:'',
}
export default {
    data(){
        return{
          detail:'',
          isClear: false,
          adpic:'',
          adpic_Data:[],
          adpic_name:'',
            formdatas:Object.assign({},dataobj),
            rules:{
                title:[{required:true,message:'请输入报告标题',trigger: 'blur'}],
                author:[{required:true,message:'请输入作者',trigger: 'blur'}],
                publishTime:[{required:true,message:'请选择报告日期',trigger: 'blur'}],
                brief:[{required:true,message:'请输入简介',trigger: 'blur'}],
            },
          type:'',
          editor:''
        }
    },
    components:{
      uploader,
    },
    mounted(){
      this.createEditor()
      this.type = this.$route.params.type
      let cont = localStorage.getItem('patentdetailcont')
      if(this.type!=0){
        if(cont){
          let data = JSON.parse(cont);
          this.formdatas.title = data.title;
          this.formdatas.brief = data.brief;
          this.formdatas.publishTime = data.publishTime;
          this.formdatas.author = data.author;
          this.adpic = data.coverUrl
          this.editor.txt.html(data.content)
        }else{
          this.getDetail()
        }
        
      }else{
        if(cont){
          let data = JSON.parse(cont);
          this.formdatas.title = data.title;
          this.formdatas.brief = data.brief;
          this.formdatas.publishTime = data.publishTime;
          this.formdatas.author = data.author;
          this.adpic = data.coverUrl
          this.editor.txt.html(data.content)
        }else{
          this.clear()
        }
        
      }
      
      
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods:{
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
      clear(){
        this.adpic ='';
        this.adpic_name = '';
        this.formdatas = Object.assign({},dataobj);
        localStorage.removeItem('patentdetailcont')
        this.editor.txt.clear()

      },
      back(){
        this.clear();
        this.$router.go(-1)
      },
      toviewdetail() {
        this.$refs.basics.validate(valid=>{
          if(valid){
            let data = Object.assign({},this.formdatas)
            data.publishTime=this.totimestamp(this.formdatas.publishTime),
            data.content = this.editor.txt.html()
            data.coverUrl = this.adpic
            let jsons = JSON.stringify(data)
            localStorage.setItem('patentdetailcont',jsons)
            console.log(jsons)
            this.$router.push({name:'viewpatentdetail'})
          }})
        
      },
      totimestamp(date){
        var timestamp =date?Date.parse(new Date(date)):'';
        return timestamp
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
				this[valueName+'_name'] = '';
    },
    uploaderErrCallback(data){
				this.$alert(data.msg);
    },
    getDetail(){
        this.$http.get(detailUrl.replace('{number}',this.type)).then(res=>{
          let resdata = res.data;
          this.formdatas.title = resdata.title;
          this.formdatas.brief = resdata.brief;
          this.formdatas.publishTime = resdata.publishTime;
          this.formdatas.author = resdata.author;
          this.adpic = resdata.coverUrl;
          // let cont = JSON.parse(resdata.content)
          this.editor.txt.html(resdata.content)
          console.log(resdata)

        })
      },
    dosome(){
      this.$refs.basics.validate(valid=>{
          if(valid){
            if(!this.adpic){
              this.$message.warning("请上传报告封面图片");
              return;
            }
            let str = this.editor.txt.html()
            let jsons = JSON.stringify(str)
            let data = {
              type: 2,
              title: this.formdatas.title,
              content: str,
              brief: this.formdatas.brief,
              coverUrl: this.adpic,
              publishTime: this.totimestamp(this.formdatas.publishTime),
              author:this.formdatas.author
            }
            if(this.type!=0){
              data.number = this.type
            }
            this.$http.post(addUrl,data).then(res=>{
              this.$message.success('操作成功');
              this.clear();
              this.$router.go(-1)
            }).catch(err=>{
              this.$message(err.response.data.msg);
            })
          }
      })
    },
      
    }
}
</script>

<style lang='less'>

.addpatentdatabox{
  .addpage{
    padding: 20px 0;
    border: 1px solid #eee;
    .addlist{
      padding:20px 50px;
      img{
        max-width: 100%;
        // max-height: 200px;
      }
      span{
        display: inline-block;
        width: 50%;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 40px;
        margin-left: -1px;
        margin-top: -1px;
        color:#999;
        input{
          width: 100%;
          padding: 0 10px;
          text-align: left;
        }
      }
    }
    .submitbtn{
        padding: 20px;
        text-align: center;
        // margin-right: -100px;
        >span{
          border:none;
          outline: none;
            display: inline-block;
            width: 160px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #379dea;
            color:#fff;
            font-size: 16px;
            border-radius: 2px;
            cursor: pointer;
        }
        .viewbtn{
          margin-right: 20px;
          border: 1px solid #ccc;
          color:#333;
          background-color: #fff;
        }
        .backbtn{
          margin-right: 20px;
          color:#fff;
          background-color: #ccc;
        }
    }
  }
  .basicinfo{
    .cont{
      padding:30px 100px;
      .el-input .el-input__inner{
            height: 40px;
            line-height: 40px;
        }
      .el-date-editor.el-input{
        width:100%;
      }
    }
  }
  .comtitle{
    position: relative;
    background-color: #999;
    color: #fff;
    height: 40px;
    width: 160px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 16px;
    >span{
      position: absolute;
      right: -40px;
      top: 0;
      width: 0;
      height: 0;
      border-width: 20px;
      border-color: transparent transparent transparent #999;
      border-style: dashed dashed dashed solid;
    }
  }  

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
}

</style>