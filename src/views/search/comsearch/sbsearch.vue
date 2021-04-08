<template>
    <div class="commonWidth">
      <div class="ordinarypsearch">
          <div class="logobox">
              <div class="logo">
                  <img src="~assets/img/sb.png" alt="">
              </div>
              <div class="textbox">
                    <p>商标检索</p>
              </div>
          </div>
        <div class="search-box">
            <div class="left-search">
                <el-input placeholder="请输入要查询的内容，如申请号、公开公告号、申请（权利）人、发明人、关键字" v-model="patent" v-if="now==1" class="zhuanli" @keyup.enter.native="onSearch(1)">
                    <el-button slot="append" @click="onSearch(1)" ><i class="el-icon-search"></i></el-button>
                </el-input>
                <el-input placeholder="请输入要查询的商标名称、申请号、申请人等信息" v-model="mark" v-if="now==2" class="shangbiao" @keyup.enter.native="onSearch(2)">
                    <el-button slot="append" @click="onSearch(2)"><i class="el-icon-search"></i></el-button>
                </el-input>
                <el-input placeholder="请输入要查询的专利申请号，示例：200930172778" v-model="cont" v-if="now==3" @keyup.enter.native="onSearch(3)">
                    <el-select v-model="selected" slot="prepend" placeholder="请选择" class="fl">
                        
                        <el-option value='2' label="复审无效">复审无效</el-option>
                        <el-option value='1' label="裁判文书">裁判文书</el-option>
                    </el-select>
                    <el-button slot="append" @click="onSearch(3)"><i class="el-icon-search"></i></el-button>
                </el-input>
                <div class="shili" v-if="nowshili==1">
                    <p class="fl">示例</p>
                    <div class="shiliright">
                        <p>申请号  cn201210190399 或 cn201210190399.5</p>
                        <p>公开号  cn103483447 或 WO2019011331</p>
                        <p>申请人  厦门大学 </p>
                        <p>关键词  hpv</p>
                    </div>
                </div>
                <div class="shilis" v-if="nowshili==2">
                    <p class="fl">示例</p>
                    <div class="shiliright">
                        <p>商标名称 银鹭</p>
                        <p>申请号  34674512</p>
                        <p>申请人  厦门银鹭食品集团有限公司 </p>
                    </div>
                </div>
            </div>
            <p class="senior" @click="tosenior" v-if="now==1">
                高级搜索
            </p>
        </div>
        
        <div class="areas" v-if="now==1">
            <el-row>
                <el-checkbox-group v-model="checkedCities">
                    <el-col :span='4'><el-checkbox  label="cn" key="cn">国内</el-checkbox></el-col>
                    <el-col :span='6'><el-checkbox  label="docdb" key="docdb">国外及港澳台地区</el-checkbox></el-col>
                </el-checkbox-group>
            </el-row>
        </div>
        
      </div>
    </div>  
</template>

<script>
// 省市接口
const cityUrl = './api/queryProvinceCity'
const homeUrl = CONFIG.homeUrl
import $ from 'jquery'
export default {
    data(){
        return {
            homeUrl: homeUrl,
            label:['普通搜索','高级搜索'],
            checkedCities:['cn','docdb'],
            checkedTypes:[],
            checkedCountries:[],
            types:[{name:'发明专利',id:11,num:250},{name:'实用新型',id:12,num:256}],
            conditions:[],
            now:2,
            patent:'',
            mark:'',
            cont:'',
            selected:'2',
            current:0,
            world: false,
            all:false,
            china:false,
            search:[{name:'专利检索',id:1},{name:'商标检索',id:2},{name:'判例检索',id:3}],
            pgIndex:1,
            pgCount:10,
            total: 0,
            loading: false,
            nowshili:2,
        }
    },
    mounted(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
        this.shilishow()
    },
    methods:{
         xuanze(it){
           this.now  = it.id;
           this.nowshili = it.id
           this.$nextTick(()=>{
               this.shilishow()
           })
       },
       shilishow(){
           let self = this;
           let zl = document.querySelector('.zhuanli input')
            let sl = document.querySelector('.shili')
            if(sl){
               zl.onmouseover=function(){
                    sl.style.display= 'block'
                }
                zl.onmouseout=function(){
                    sl.style.display= 'none'
                } 
            }
            
            let sm = document.querySelector('.shangbiao input')
            let sls = document.querySelector('.shilis')
            if(sls){
                sm.onmouseover=function(){
                    sls.style.display= 'block'
                }
                sm.onmouseout=function(){
                    sls.style.display= 'none'
                }
            }
            
       },
        onSearch(num){
            let re = {}
            if(num==1){
                if(!this.patent){
                    this.$message('请输入内容查询');
                    return
                }
                re.all = this.patent;
                re.searchType = 1;
                if(this.checkedCities.length==0 || this.checkedCities.length==2){
                    re.category = ''
                }else{
                    re.category = this.checkedCities[0]
                }
                this.$router.push({path:'/search/patentsearch',query: re})
            }
            if(num==2){
                if(!this.mark){
                    this.$message('请输入要查询的商标名称、申请号、申请人等信息');
                    return
                }
                re.q = this.mark;
                this.$router.push({path:'/search/trademarksearch',query: re})
            }
            if(num==3){
                if(!this.cont){
                    this.$message('请输入要查询的专利申请号');
                    return
                }
                re.applicationDocNum = this.cont
                if(this.selected==1){
                    this.$router.push({path:'/search/panli',query: re})
                }
                if(this.selected==2){
                    this.$router.push({path:'/search/fushen',query: re})
                }
            }
        },
        tosenior(){
            
            this.$router.push({name:'/search/seniorsearch'});
        },
        getdata(data){
            this.conts = data;
        }
    }
}
</script>

<style lang ='less'>

</style>