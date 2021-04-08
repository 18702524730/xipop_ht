<template>
<div class="seniorsearch">
    <div class="logobox">
        <div class="logo">
            <a :href="homeUrl" target="_blank"><img src="~assets/img/logoa.png" alt=""></a>
        </div>
        <div class="textbox">
            <p>厦门知识产权</p>
            <p>运营公共服务平台</p>
        </div>
    </div>
      <div class="seniorconditions">
          <div class="countries">
            <!-- <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref='tree'
                :default-expanded-keys="[2]"
                :default-checked-keys="[2]"
                @check-change='dosome'
                >
            </el-tree> -->
            <div class="all">
                <el-checkbox v-model="all" >全部国家和地区</el-checkbox>
            </div>
            <div class="allcountry">
                <div class="each" v-for="(item,index) in list" :key="index">
                    <el-checkbox v-model="item.ischeck" @change="dosome(item)"><span class="countryiconbox" v-if="item.icon"><img :src="item.icon" alt=""></span><span style="vertical-align:middle;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;max-width:80px;">{{item.valueName}}</span> <span style="vertical-align:middle">({{item.value}})</span></el-checkbox>
                    <div style="padding-left: 30px;" v-if="item.list">
                        <el-checkbox-group v-model="item.checked" @change="check(item)">
                            <el-checkbox v-for="(t,key) in item.list" :label="t.value" :key="t.value">{{t.valueName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
          </div>
          <div>
              <!-- <div class="allstate">
                  <span class="tit">状态：</span>
                  <span class="active">全部</span>
                  <span>申请</span>
                  <span>受理</span>
              </div> -->
              <div class="forms">
            <el-form  label-width="120px" :model="cobj">
                <el-col :span="12">
                    <el-form-item label="申请号" >
                        <el-input v-model="cobj.an" class="sqh"></el-input>
                        <div class="popbox">
                            <p>格式：国别代码+流水号</p>
                            <p>例：cn201210190399（无校验位）</p>
                            <p>支持模糊匹配</p>
                        </div>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公开(公告)号">
                        <el-input v-model="cobj.pn"  class="sqh"></el-input>
                        <div class="popbox">
                            <p>格式：国别代码+流水号+公布级别</p>
                            <p>例：cn103483447B 或 WO2019011331A1</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请人/专利权人">
                        <el-input v-model="cobj.applicantSearch"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发明人">
                        <el-input v-model="cobj.in"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请日期">
                        <el-date-picker
                            v-model="date1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公开日期">
                        <el-date-picker
                            v-model="date2"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="名称" >
                        <el-input v-model="cobj.ti" class="sqh"></el-input>
                        <div class="popbox">
                            <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV or 人乳头瘤检索</p>
                            <p>②支持or、and、not运算符的使用，例如HPV or人乳头瘤，HPV and 疫苗</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="摘要" >
                        <el-input v-model="cobj.ab" class="sqh"></el-input>
                        <div class="popbox">
                            <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV or 人乳头瘤检索</p>
                            <p>②支持or、and、not运算符的使用，例如HPV or人乳头瘤，HPV and 疫苗</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="权利要求" >
                        <el-input v-model="cobj.cl" class="sqh"></el-input>
                        <div class="popbox">
                            <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV or 人乳头瘤检索</p>
                            <p>②支持or、and、not运算符的使用，例如HPV or人乳头瘤，HPV and 疫苗</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="IPC分类号">
                        <el-input v-model="cobj.ic"  class="sqh"></el-input>
                        <div class="popbox">
                            <p>支持分类号完全匹配，支持空格输入，例如C07K7/06 C07K16/18，按C07K7/06 or C07K16/18检索</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理机构" >
                        <el-input v-model="cobj.agentOrgSearch" class="sqh"></el-input>
                        <div class="popbox">
                            <p>支持全字符匹配，支持空格输入；不支持运算符</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理人名称">
                        <el-input v-model="cobj.agentSearch"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请人地址" >
                        <el-input v-model="cobj.dz" class="sqh"></el-input>
                        <div class="popbox">
                            <p>支持全字符匹配，支持空格输入；不支持运算符</p>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="hasprovince">
                    <el-form-item label="申请人所在省份">
                        <el-cascader :options="options" clearable v-model="sf"></el-cascader>
                    </el-form-item>
                </el-col>
            </el-form>
          </div>
          </div>
          
      </div>
      <div class="btnbox">
          <span class="confirm" @click="haschecked">确定</span>
          <span class="reset" @click="resets">重置</span>
      </div>
</div>     
</template>

<script>
const cityUrl= './api/queryProvinceCity'
const homeUrl = CONFIG.homeUrl
import $ from 'jquery'
const condition = {
    an:null,
    pn:null,
    applicantSearch:null,
    in:null,
    cl:null,
    ab:null,
    ic:null,
    agentOrgSearch:null,
    agentSearch:null,
    ti: null,
    dz: null
}
const treeData = [{
    id: 0,
    label: '全部国家',
    children: [
        {
            id: 2,
            label: '中国',
            children: [
                {
                    id: 21,
                    label:'发明'
                },
                {
                    id: 22,
                    label: '实用新型'
                }, {
                    id: 23,
                    label: '外观设计'
                }
            ]
        },
        {
            id: 3,
            label: '美国',
        },
        {
            id: 4,
            label: '日本',
        },
        {
            id: 5,
            label: '韩国',
        },
        {
            id: 6,
            label: '欧专局',
        },
        {
            id: 7,
            label: '英国',
        },
        {
            id: 8,
            label: '法国',
        },
        {
            id: 9,
            label: '俄罗斯',
        },
        {
            id: 10,
            label: '其他国家和地区',
        },
    ]
}]

export default {
    data(){
        return {
            sqh: false,
            options:[
                
            ],
            homeUrl: homeUrl,
            date1:'',
            date2:'',
            sf:[],
            'ap-province':'',
            'ap-city':'',
            hasprovince: true,
            all:true,
            label:['普通搜索','高级搜索'],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            cities:[
                {name:'国内',key:'1'},
                {name:'国外',key:'2'}
            ],
            checkedCities:[],
            cont:'',
            cobj:{...condition},
            ishow: false,
            treeData: treeData,
            current: 0,
            selected:'1',
            checklist:[],
            defaultExpandedKeys:[],
            defaultCheckedKeys:[],
            checkedKeys:[],
            curSelectedSmallIdList:[],
            sqdate: 0,
            gkdate: 0,
            links:[
                {name:'推荐链接1',link:'https://www.baidu.com'},
                {name:'推荐链接2',link:'https://www.baidu.com'},
                {name:'推荐链接3',link:'https://www.baidu.com'},
                {name:'推荐链接4',link:'https://www.baidu.com'},
                {name:'推荐链接5',link:'https://www.baidu.com'}
            ],
            list:[
                {
                    field: "dac", value: "CN", valueName: "中国", count: 15329459, percent: "55.95",
                    ischeck: false,
                    checked:[],
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/CN.png",
                    list: [
                        {field: "f-kind", value: "01", valueName: "发明专利", count: 9516527, percent: "62.08", icon: null},
                        {field: "f-kind", value: "02", valueName: "实用新型", count: 9516527, percent: "62.08", icon: null},
                        {field: "f-kind", value: "03", valueName: "外观设计", count: 5812932, percent: "37.92", icon: null}
                        ]
                },
                {
                    field: "dac", value: "US", valueName: "美国",
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/US.png",
                    ischeck: false,
                    list: null
                },
                {
                    field: "dac", value: "JP", valueName: "日本",
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/JP.png",
                    ischeck: false,
                    list: null
                },
                {
                    field: "dac", value: "KR", valueName: "韩国",
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/KR.png",
                    ischeck: false,
                    list: null
                },
                {
                    field: "dac", value: "EP", valueName: "欧专局", 
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/EP.png",
                    ischeck: false,
                    list: null
                },
                {
                    field: "dac", value: "WO", valueName: "世界知识产权组织",
                    icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/WO.png",
                    ischeck: false,
                    list: null
                },
                // {
                //     field: "dac", value: "GB", valueName: "英国",
                //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/GB.png",
                //     ischeck: false,
                //     list: null
                // },
                // {
                //     field: "dac", value: "FR", valueName: "法国",
                //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/FR.png",
                //     ischeck: false,
                //     list: null
                // },
                // {
                //     field: "dac", value: "RU", valueName: "俄罗斯",
                //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/RU.png",
                //     ischeck: false,
                //     list: null
                // },
                {
                    field: "dac", value: "ELSE", valueName: "其他国家和地区", count: 1559, percent: "5.95",
                    icon: null,
                    ischeck: false,
                    list: null
                },
            ],
        }
    },
    watch:{
        all(){
            this.list.forEach(item=>{
                item.ischeck = this.all;
                this.dosome(item)
                if(item.ischeck){
                    let arr = [];
                    if(item.list){
                        item.list.forEach(it=>{
                            if(this.all){
                                arr.push(it.value)
                            }
                        })
                    }
                    item.checked = arr
                }else{
                    item.checked = []
                }
                // if(item.list){
                    
                //     item.list.forEach(it=>{
                //         if(this.all){
                //             item.checked.push(it.value)
                            
                //         }else{
                //             item.checked= []
                //         }
                        
                //     })
                // }
            })
        },
    },
    updated(){
        let height = $('#app').height()
         window.parent.postMessage(
            height + 'px',
            '*'
        );
    },
    methods:{
        getcity(){
            this.$http.get(cityUrl).then(res=>{
                this.options = res.data
            })
        },
        doshow(){
            console.log(11111)
        },
        getkeys(){
            var re = [];
            var type = [];
            this.list.forEach(item=>{
                if(item.ischeck){
                    re.push(item.value)
                    if(item.checked&&item.checked.length){
                        type = [...item.checked]
                    }
                }
                
            })
            return {re,type}
        },
        dosome(it){
            if(it.value =='CN'){
                if(it.ischeck){
                    this.hasprovince = true
                    let arr = []
                    if(it['list']&&it['list'].length>0){
                        it['list'].forEach(w=>{
                            arr.push(w['value'])
                        })
                    }
                    it.checked = arr
                }else{
                    this.hasprovince = false
                    it.checked = []
                }
            }
        },
        haschecked(){
            var re = this.getkeys().re;
            var type = this.getkeys().type;
            if(this.date1){
                this.cobj.applicationDateStart  = this.totimestamp(this.date1[0]);
                this.cobj.applicationDateEnd  = this.totimestamp(this.date1[1])
            }
            if(this.date2){
                this.cobj.publishDateStart  = this.totimestamp(this.date2[0]);
                this.cobj.publishDateEnd  = this.totimestamp(this.date2[1])
            }
            if(this.sf.length){
                if(this.sf.length==1){
                    this.cobj['apProvince'] =this.sf[0]
                }
                if(this.sf.length==2){
                    this.cobj['apProvince'] =this.sf[0]
                    this.cobj['apCity'] =this.sf[1]
                }
            }

            let aa=this.isempty(this.cobj)
            if(aa){
                this.$message('请输入一个筛选条件')
                return;
            }
            this.cobj.searchType=2;
            if(re.length){
                var str = re.join(',');
                this.cobj.dac = str
            }
            if(type.length){
                var str = type.join(',');
                this.cobj['fKind'] = str
            }
                // this.$store.dispatch('set_patent', this.cobj);
                // this.$nextTick(()=>{
                //     this.$router.push({name:'patentsearch'})
                // })
            this.$router.push({path:'/search/patentsearch',query: this.cobj})
            console.log(re,type)
            console.log(this.cobj)
        },
        totimestamp(t){
            var date = new Date(t)
            return t?date.getTime():null
        },
        isempty(obj){
            for(var p in obj){
                if(obj.hasOwnProperty(p)){
                    if(obj[p]){
                        return false
                    }
                    
                }
            }
            return true;
        },
        resets(){
            this.cobj = {...condition}
            this.date1 =''
            this.date2 =''
            this.sf = []
            this.checkall()
        },
        check(it){
            if(it['checked'].length>0){
                it['ischeck'] = true;
                this.hasprovince = true;
            }else{
                it['ischeck'] = false;
                this.hasprovince = false;
            }
        },
        checkall(){
            if(this.all){
                this.hasprovince = true;
                this.list.forEach(item=>{
                    item.ischeck = this.all;
                    if(item.list){
                        item.list.forEach(it=>{
                            if(this.all){
                                item.checked.push(it.value)
                                
                            }else{
                                item.checked= []
                            }
                            
                        })
                    }
                })
            }
        }
    },
    mounted(){
        window.scrollTo(0,0);
        this.checkall();
        this.getcity()
        let sqh = document.querySelectorAll('.sqh')
        let sqhbox = document.querySelectorAll('.popbox')
        let len = sqh.length;
        
        for(let i =0;i<len;i++){
            let timer = null
            sqh[i].onmouseover = function(){
                clearTimeout(timer)
                sqhbox[i].style.display = 'block'
            }
            sqh[i].onmouseout = function(){
                timer = setTimeout(() => {
                    sqhbox[i].style.display = 'none'
                }, 200);
                sqhbox[i].onmouseover = function(){
                    clearTimeout(timer)
                    this.style.display = 'block'
                }
                sqhbox[i].onmouseout = function(){
                    timer = setTimeout(()=>{
                        this.style.display = 'none'
                    },100)
                    // this.style.display = 'none'
                }
                // sqhbox[i].style.display = 'none'
            }
        }
    }
}
</script>

<style lang = 'less'>
.countryiconbox{
    display: inline-block;
    width:20px;
    height: 19px;
    padding: 2px 0;
    margin-right: 10px;
    margin-left: 5px;
    vertical-align: middle;
    img{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
}
.seniorsearch{
    width: 1200px;
    margin: 0 auto;
    padding: 60px 40px;
    background-color: #fff;
    .el-input{
        position: relative;
    }
    .popbox{
        display: none;
        position: absolute;
        top: 44px;
        width: 100%;
        padding: 15px 10px;
        border-radius: 3px;
        background-color: #fff;
        font-size: 14px;
        box-shadow: 0 0 4px #ccc;
        color: #666;
        z-index: 9;
        >p{
            line-height: 20px;
            margin-bottom: 8px;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
    .logobox{
        width: 240px;
        height: 62px;
        margin: 0 auto 100px;
        p{
            font-size: 20px;
            color: #001833;
            /* text-align: center; */
            line-height: 26px;
            font-weight: 500;
        }
        .textbox{
            float: left;
            padding-top: 5px;
            padding-left: 15px;
        }
    }
    .logo{
        float: left;
        width: 62px;
        height: 62px;
        margin-bottom: 10px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .allstate{
        height: 38px;
        padding-left: 20px;
        line-height: 38px;
        border-bottom: 1px solid #eee;
        color: #666;
        span{
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
        }
        .tit{
            color:#999;
        }
        span.active{
            color:#379dea;
        }
    }
    .el-cascader{
        width:100%;
    }
}
.seniorconditions{
    display: -webkit-box; 
    display: -moz-box;  
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    .countries{
        width: 200px;
        border: 1px solid #eee;
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .all{
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .allcountry{
            padding: 10px;
        }
        .each{
            padding-bottom: 10px;
            &:first-child{
                border-bottom: 1px solid #eee;
            }
        }
    }
    .forms{
        width:900px;
    }
    .el-date-editor.el-input{
        width:100%;
    }
    .el-range-editor.el-input__inner{
        width: 100%;
    }
    .el-date-editor .el-range-separator{
        width: 20px;
    }
}
.btnbox{
    text-align: right;
    padding-top: 30px;
    span{
        display: inline-block;
        width: 160px;
        height: 50px;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        border-radius:4px;
    }
    .confirm{
        background-color: #379dea;
        color:#fff;
        margin-right: 50px;
    }
    .reset{
        border: 1px solid #eee;
        border-radius: 2px;
        color:#999;
    }
}
</style>