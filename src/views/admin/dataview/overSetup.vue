<template>
  <div class="gksz">
      <h3 class="gktitle">区域创新指标设置</h3>
      <div class="clearfix labelfiles">
				<div class="labelname hasrequired">文件选择：</div>
				<div class="clearfix posbox">
						<uploader @complete="setUploadedMaterial" @complete2="setUploading" @resetUploader="resetUploader" :fileName="adpic_name" :canPreview="false"  :url="adpic" :valueName="'adpic'" :extensions='"xls,xlsx"'></uploader>
						<div class="tipbox">
							<p v-if="adpic_name" class="filename">{{decodeURIComponent(adpic_name)}} <span class="del" @click="delfile">删除</span></p>
							<p><span class="download" @click="downfile">下载模板</span></p>
							<h3>支持格式：xlsx</h3>
						</div>
				</div>
			</div>
			<div class="btns">
				<div class="btn1" @click="delfile">取消</div>
				<div class="btn2" @click="daoru">确定</div>
			</div>
      <h3 class="gktitle">创新企业专利有销量TOP10</h3>
			<div class="toupdate">
				<div>数据更新：</div><div class="updateing" @click="isTs=!isTs">更新</div>
			</div>
			<div class="zzc" v-if="isTs">
				<div class="tishis">
					<p><span>更新提示</span><span class="close" @click="isTs=!isTs"></span></p>
					<div class="tsTxt">数据更新可能需要一点时间，请耐心等待。确认更新？</div>
					<div class="btns">
						<div @click="isTs=!isTs">取消</div>
						<div @click="updateFn">确定</div>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
import uploader from 'cps/uploader/uploader.vue'
import $ from 'jquery'
const importUrl ='/api/submitXiamenOverview'
const downloadUrl = '/api/downloadXiamenOverviewTemplate'
const updateUrl = '/api/statisticsTop10EnterprisePatents'
export default {
    data(){
        return{
						adpic_name:'',
						adpic:'',
						addfile: '',
						isTs:false
        }
    },
    components: {
      uploader
    },
    methods:{
			setUploading(data){
				console.log(data)
				this.addfile = data
			},
			setUploadedMaterial(data){
				var dat = data.data;
        let d = Object.assign({},dat)
				console.log(d)
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
			},
			resetUploader(valueName){
          this[valueName] = '';
          this[valueName+'_name'] = '';
			},
			delfile() {
        this.adpic_name = ''
				this.adpic = ''
				this.addfile = ''
			},
			downfile() {
        const url = CONFIG.rootUrl + downloadUrl
        window.open(url)
			},
			updateFn(){
				this.isTs = !this.isTs;
				showLoaing()
        this.$http.get(updateUrl).then(res=>{
					this.$message.success('操作成功')
          hideLoading()
        }).catch(err=>{
					hideLoading()
          this.$message.error(err.response.data.msg)
        })
			},
			daoru(it){
        if(!this.adpic) {
          this.$message.warning('请先上传需要导入的文件');
          return
        }
        const data = {
					file: this.adpic
				}
				console.log(data)
        showLoaing()
        this.$http.get(importUrl,{params: data}).then(res=>{
					this.$message.success('操作成功');
					this.delfile()
          hideLoading()
        }).catch(err=>{
					hideLoading()
					this.delfile()
					console.log(err)
          this.$message.error(err.response.data.msg)
        })
      },
    },
    updated(){
        
    },
    mounted(){
        
    }
}
</script>

<style lang='less'>
.gksz{
    .gktitle{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        background-color: #eee;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #333;
        font-weight: normal;
		}
		.zzc{
			width: 100%;
			height: 100%;
			position: fixed;
			background: rgba(0, 0, 0, .6);
			top: 0;
			left: 0;
			.tishis{
				margin: 20% auto 0;
				width: 400px;
				overflow: hidden;
				>p{
					display: flex;
					justify-content: space-between;
					padding: 20px 20px;
					background: #fff;
					color: #333;
					font-size: 16px;
					.close{
						color: #333;
						border-radius: 12px;
						line-height: 20px;
						text-align: center;
						height: 20px;
						width: 20px;
						font-size: 18px;
						padding: 1px;
						cursor: pointer;
					}
					.close::before {
						content: "\00D7";
					}
				}
				.tsTxt{
					text-align: center;
					font-size: 14px;
					padding: 40px 30px 80px;
					background: #fff;
				}
				.btns{
					background: #fff;
					display: flex;
					padding-bottom: 30px;
					>div{
						width: 100px;
						line-height: 30px;
						font-size: 14px;
						text-align: center;
						margin: 0 40px;
						cursor: pointer;
					}
					>div:first-child{
						color: #379dea;
						border: 1px solid #379dea;
						background: #fff;
					}
					>div:last-child{
						color: #fff;
						border: 1px solid #379dea;
						background: #379dea;
					}
				}
			}
		}
		.toupdate{
			display: flex;
			font-size: 14px;
			padding-left: 20px;
			align-items: center;
			margin-top: 40px;
			.updateing{
				background: #379dea;
				border: 1px solid #379dea;
				color: #fff;
				width: 100px;
				line-height: 30px;
				text-align: center;
				border-radius: 4px;
				cursor: pointer;
			}
		}
		.labelfiles{
			padding: 50px;
		}
		.btns{
			display: flex;
			justify-content: center;
			>div{
				margin: 50px 30px;
				width: 100px;
				text-align: center;
				line-height: 30px;
				font-size: 14px;
				cursor: pointer;
				border-radius: 3px;
			}
			.btn1{
				background: #fff;
				border: 1px solid #379dea;
				color: #379dea;
			}
			.btn2{
				background: #379dea;
				border: 1px solid #379dea;
				color: #fff;
			}
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
    .posbox {
			position: relative;
			float: left;
			width: 540px;
		}
		.tipbox {
			position: absolute;
			left: 120px;
			bottom: 0;
			padding-left: 20px;
			font-size: 14px;
			>h3{
				font-weight: normal;
			}
		} 
		.filename {
			margin-bottom: 10px;
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
}

</style>