<template>
  <div class="gksz">
      <h3 class="gktitle">厦门概况统计设置</h3>
      <div class="gaikuang">
          <el-form label-width="250px" :model="formdata" label-position="right" :rules="rules" ref="formdatas">
              <el-form-item label="有效专利(件)：">
                  {{formdata.validPatentCount}}
              </el-form-item>
              <el-form-item label="PCT申请量(件)：" prop="pctCount">
                  <el-input v-model="formdata.pctCount"></el-input>
              </el-form-item>
              <el-form-item label="专利获奖数(件)：" prop="patentPrizeCount">
                  <el-input v-model="formdata.patentPrizeCount"></el-input>
              </el-form-item>
              <el-form-item label="质押融资金额(万元)：" prop="pledgeFinanceAmount">
                  <el-input v-model="formdata.pledgeFinanceAmount"></el-input>
              </el-form-item>
              <el-form-item label="商标总数(件)：" prop="trademarkCount">
                  <el-input v-model="formdata.trademarkCount"></el-input>
              </el-form-item>
              <el-form-item label="马德里总数(件)：" prop="madridCount">
                  <el-input v-model="formdata.madridCount"></el-input>
              </el-form-item>
              <el-form-item label="服务机构总数(家)：" prop="organizationCount">
                  <el-input v-model="formdata.organizationCount"></el-input>
              </el-form-item>
              <el-form-item label="小微企业托管覆盖总数(家)：" prop="microEnterpriseCount">
                  <el-input v-model="formdata.microEnterpriseCount"></el-input>
              </el-form-item>
          </el-form>

          <div class="submitbtn">
              <span @click="submit">提交</span>
          </div>
      </div>
  </div>
</template>

<script>
const subUrl = './api/submitXiamenOverviewSetting'
const findUrl = './api/findXiamenOverviewSetting'
import $ from 'jquery'
const dataobj = {
    validPatentCount:'',
    pctCount:'',
    patentPrizeCount:'',
    pledgeFinanceAmount:'',
    trademarkCount:'',
    madridCount:'',
    organizationCount:'',
    microEnterpriseCount:'',
}
export default {
    data(){
        return{
            formdata:Object.assign({},dataobj),
            rules:{
                // validPatentCount:[{required:true,message:'请输入有效专利数',trigger: 'blur'}],
                pctCount:[{required:true,message:'请输入PCT申请量',trigger: 'blur'}],
                patentPrizeCount:[{required:true,message:'请输入专利获奖数',trigger: 'blur'}],
                pledgeFinanceAmount:[{required:true,message:'请输入质押融资金额',trigger: 'blur'}],
                trademarkCount:[{required:true,message:'请输入商标总数',trigger: 'blur'}],
                madridCount:[{required:true,message:'请输入马德里总数',trigger: 'blur'}],
                organizationCount:[{required:true,message:'请输入服务机构总数',trigger: 'blur'}],
                microEnterpriseCount:[{required:true,message:'请输入小微企业托管覆盖总数',trigger: 'blur'}],
            }
        }
    },
    methods:{
        submit(){
            this.$refs.formdatas.validate(valid=>{
                if(valid){
                    let data = Object.assign({},this.formdata)
                    this.$http.post(subUrl,data).then(res=>{
                        this.$message.success('提交成功');
                        this.getdata()
                        // this.formdata = Object.assign({},dataobj)
                    }).catch(err=>{
                        this.$message(err.response.data.msg)
                    })
                }
            })
        },
        getdata(){
            this.$http.get(findUrl).then(res=>{
                this.formdata = res.data;
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
    mounted(){
        this.getdata()
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
    .gaikuang{
        padding: 40px 100px 40px 0;
        border: 1px solid #eee;
        .el-input .el-input__inner{
            height: 40px;
            line-height: 40px;
        }
    }
    .submitbtn{
        padding: 20px;
        text-align: center;
        margin-right: -100px;
        >span{
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
    }
}

</style>