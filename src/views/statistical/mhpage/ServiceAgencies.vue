<template>
    <div class="serviceagent">
        <div class="cxTitles">
            <div :class="{active : actTit==1}" @click="actTit=1">专利代理机构查询</div>
            <div :class="{active : actTit==2}" @click="actTit=2">专利代理师查询</div>
        </div>
        <div class="searchs" v-if="actTit==1">
            <div>
                <span>机构名称 </span>
                <el-input class="elinp" v-model="institutionName" placeholder="请输入机构名称"></el-input>
            </div>
            <div>
                <span>法定代表人 </span>
                <el-input class="elinp" v-model="legal" placeholder="请输入法定代表人"></el-input>
            </div>
            <div>
                <span>机构代码 </span>
                <el-input class="elinp" v-model="institutionCode" placeholder="请输入机构代码"></el-input>
            </div>
            <div class="searchBtn" @click="searchpage(true)">查询</div>
        </div>
        <div class="searchs" v-if="actTit==2">
            <div>
                <span>姓名 </span>
                <el-input class="elinp" v-model="agent" placeholder="请输入姓名"></el-input>
            </div>
            <div>
                <span>专业 </span>
                <el-input class="elinp" v-model="major" placeholder="请输入专业"></el-input>
            </div>
            <div>
                <span>资格证号 </span>
                <el-input class="elinp" v-model="certificateNo" placeholder="请输入资格证号"></el-input>
            </div>
            <div>
                <span>执业备案号 </span>
                <el-input class="elinp" v-model="professionNo" placeholder="请输入执业备案号"></el-input>
            </div>
        </div>
        <div class="addrs" v-if="actTit==1">
            <span>地区</span>
            <div :class="{active:addrAct == 1}" @click="addrFn(1)">全部</div>
            <div :class="{active:addrAct == 2}" @click="addrFn(2)">厦门</div>
            <div :class="{active:addrAct == 3}" @click="addrFn(3)">其他</div>
        </div>
        <!-- <div class="topsearch">
            <div class="topsearchtitle">
                <h3>服务机构列表</h3>
                <div class="companyname">
                    <el-input placeholder="请输入机构名称检索" v-model="agency">
                        <el-button slot="append" class="bluebtn" @click="searchpage(true)">搜索</el-button>
                    </el-input>
                </div>
            </div>
        </div> -->
        <div class="searchlist" >
            <!-- <div class="sortsbox">
                <h3>排序</h3>
                <div class="sortsbtn">
                    <span v-for="(item, k) in sorts" :key="k" @click="changesort(item)" :class="{ active: sort === 1 }">{{item.label}}</span>
                </div>
            </div>
            
            <ul class="searchdatas" v-if="total && !loading">
                <li v-for="(item, index) in dataList" :key="index" class="clearfix" @click="toinfo(item)">
                    <h3 class="eachtitle">{{item.agency}}</h3>
                    <div class="ipsqnum">
                        <p class="names"><span class="eachcont">{{item.num}}名代理人</span></p>
                    </div>
                </li>
            </ul> -->
            <div class="organizationList"  v-if="actTit==1">
                <div class="organizationTit">
                    <div>服务机构列表</div>
                </div>
                <table class="organizationTables" v-if="total">
                    <thead class="organizationTheader">
                        <tr>
                            <th>机构代码</th>
                            <th>机构名称</th>
                            <th>机构状态</th> 
                            <th @click="sortFn(1)" class="soPor">
                                成立年限
                                <i class="el-icon-sort-down" :class="{ active: sort === 1 }"></i>
                                <i class="el-icon-sort-up" :class="{ active: sort === 2 }"></i>
                            </th>
                            <th @click="sortFn(2)" class="soPor">
                                专利代理师总数
                                <i class="el-icon-sort-down" :class="{ active: sort === 4 }"></i>
                                <i class="el-icon-sort-up" :class="{ active: sort === 3 }"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="organizationTbody">
                        <tr class="trCur" v-for="(item, index) in dataList" :key="index"  @click="toinfo(item)">
                            <td>{{item.institutionCode}}</td>
                            <td>{{item.institutionName}}</td>
                            <td>{{item.institutionState}}</td>
                            <td>{{item.establishYear}}</td>
                            <td>{{item.agentNumber}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mypagination" v-show="!loading && total > 10">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="pgCount"
                        :current-page.sync="pgIndex"
                        layout="total,prev, pager, next"
                        :total="total"
                        class="fr"
                    >
                    </el-pagination>
                </div>
            </div>
            <div class="nosearchdata" v-if="actTit==1 && !total && !loading">
                暂无数据
            </div>
            <div class="organizationList"  v-if="actTit==2">
                <div class="organizationTit">
                    <div>专利代理师列表</div>
                    <div class="searchBtn" @click="AgentFn">查询</div>
                </div>
                <table class="organizationTables" v-if="to2tal">
                    <thead class="organizationTheader">
                        <tr>
                            <th class="minWidth">姓名</th>
                            <th class="minWidth">性别</th>
                            <!-- <th class="zgzh" @click="sort2Fn">资格证号<img src="../../../assets/img/jigou.png" alt=""></th>  -->
                            <th class="minWidth">资格证号</th> 
                            <th class="minWidth">执业备案号</th>
                            <th class="minWidth">专业</th>
                            <th class="minWidth">机构名称</th>
                            <th class="minWidth">职业年限</th>
                            <th class="minWidth">是否取得律师执业资格</th>
                        </tr>
                    </thead>
                    <tbody class="organizationTbody">
                        <tr v-for="(item, index) in data2List" :key="index">
                            <td>{{item.agent}}</td>
                            <td>{{item.sex==1?'女':'男'}}</td>
                            <td>{{item.certificateNo}}</td>
                            <td>{{item.professionNo}}</td>
                            <td>{{item.major}}</td>
                            <td>{{item.agency}}</td>
                            <td>{{item.practiceYear}}</td>
                            <td>{{item.obtain==0?'否':item.obtain==1?'是':''}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mypagination" v-show="!loading && to2tal > 10">
                    <el-pagination
                        @current-change="handleCurrent2Change"
                        :page-size="pg2Count"
                        :current-page.sync="pg2Index"
                        layout="total,prev, pager, next"
                        :total="to2tal"
                        class="fr"
                    >
                    </el-pagination>
                </div>
            </div>
            <div class="nosearchdata" v-if="actTit==2 && !to2tal && !loading">
                暂无数据
            </div>
        </div>
    </div>
</template>
<script>
const listUrl = '/api/findXipopInstitutionList'
const list2Url = '/api/findXipopAgentList'
export default {
    data() {
        return {
            actTit: 1,
            legal: '',
            agent: '',
            major: '',
            certificateNo: '',
            professionNo: '',
            zhsort: 1,
            pg2Index: 1,
            pg2Count: 10,
            to2tal: 0,
            data2List: [],
            addrAct: 1,
            institutionCode: '',
            keepOnRecord: '',
            sorts: [
                { id: 1, label: '代理人数', type: 2 }
            ],
            dataList: [],
            sort: 1, 
            loading: false,
            total: 0,
            now: 1,
            pgCount: 10,
            pgIndex: 1,
            institutionName: '',
            query: {}
        }
    },
    created() {
    },
    mounted() {
        this.getquery()
        this.searchpage()
        this.searchAgent()
        
    },
    methods: {
        AgentFn(){
            this.pg2Index = 1
            this.searchAgent()
        },
        // sort2Fn(){
        //     this.zhsort = this.zhsort === 1 ? 2 : 1
        //     this.searchAgent()
        // },
        getAgentList(paramsData){
            paramsData = paramsData || {}
            this.loading = true
            this.$http.get(list2Url, { params: paramsData })
            .then((resp) => {
                this.loading = false
                var data = resp.data
                this.data2List = data.elements
                this.pg2Index = data.pageNum || 1
                this.to2tal = data.totalElements
            })
            .catch((err) => {
                this.loading = false
                this.$message.error(err.response.data.msg)
            })
        },
        searchAgent(){
            // if (!this.agent) {
            //     this.$messagesebe.warning('请输入要查询的代理师信息')
            //     return
            // }
            const reds = {}
            reds.pgIndex = this.pg2Index
            reds.pgCount = this.pg2Count
            // reds.zhsort = this.zhsort
            reds.agent = this.agent
            reds.major = this.major
            reds.certificateNo = this.certificateNo
            reds.professionNo = this.professionNo
            const query = Object.assign({}, reds)
            this.$router.replace({ query: query })
            this.getAgentList(query)
        },
        selected(it, tp) {
            this.query[tp] = it
            if (!this.query.enterpriseName) {
                return
            }
            this.searchpage()
        },
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchpage()
        },
        handleCurrent2Change(i) {
            this.pg2Index = i
            this.searchAgent()
        },
        toinfo(it) {
            this.$router.push({ name: 'AgencyInfo', params: { id: it.institutionCode } })
        },
        addrFn(k) {
            this.addrAct = k
            this.searchpage(true)
        },
        getquery() {
            // const re = {}
            if (this.$route.query) {
                const q = this.$route.query
                for (var k in q) {
                    if (q.hasOwnProperty(k)) {
                        this['query'][k] = q[k]
                    }
                }
                // if (q['sort']) {
                //     this.sort = q['sort'] - 0
                // }
                if (q['institutionName']) {
                    this.institutionName = q['institutionName']
                }
                
            }
        },
        sortFn(k){
            if (k === 1) {
                if (this.sort === 2 || this.sort === '') {
                    this.sort = 1
                } else {
                    this.sort = 2
                }
            }
            if (k === 2) {
                if (this.sort === 4 || this.sort === '' || this.sort < 3) {
                    this.sort = 3
                } else {
                    this.sort = 4
                }
            }
            this.searchpage(true)
        },
        searchpage(isreset) {
            // if (!this.institutionName) {
            //     this.$messagesebe.warning('请输入机构名称查询')
            //     return
            // }
            const ret = {}
            ret.pgIndex = isreset ? 1 : this.pgIndex
            ret.pgCount = this.pgCount
            ret.sort = this.sort
            ret.institutionName = this.institutionName
            ret.legal = this.legal
            ret.institutionCode = this.institutionCode
            if (this.addrAct !== 1) {
                if (this.addrAct === 2) {
                    ret.xiamen = '是'
                } else {
                    ret.xiamen = '否'
                }
            }
            const query = Object.assign({}, ret)
            this.$router.replace({ query: query })
            this.getOrderList(query)
        },
        getOrderList(paramsData) {
            paramsData = paramsData || {}
            this.loading = true
            this.$http.get(listUrl, { params: paramsData })
            .then(resp => {
                this.loading = false
                var data = resp.data
                console.log(data)
                this.dataList = data.elements
                this.pgIndex = data.pageNum || 1
                this.total = data.totalElements
            })
            .catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.serviceagent {
    background-color: #F2F2F2;
    font-family: 'PingFangSC-Semibold','PingFang SC';
    .addrs{
        display: flex;
        width: 1200px;
        background: #fff;
        margin: 0 auto;
        padding: 17px 24px;
        font-size: 14px;
        align-items: center;
        span{
            padding: 0 4px;
            border-left: 4px solid #2F72D1;
            margin-right: 30px;
            height: 14px;
            line-height: 14px;
        }
        div{
            display: inline-block;
            padding: 0 20px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            cursor: pointer;
        }
        .active{
            background: #2F72D1;
            color: #fff;
        }
    }
    .searchs{
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        padding: 28px 24px;
        background: #fff;
        font-size: 14px;
        span{
            margin-right: 10px;
        }
        div{
            display: flex;
            align-items: center;
            .elinp {
                width: 197px;
                height: 40px;
                line-height: 40px;
                input{
                    border-radius: 3px;
                    border: 1px solid #E9E9E9;
                }
            }
        }
        .searchBtn{
            display: inline-block;
            font-size: 16px;
            color: #fff;
            background: #2F72D1;
            width: 117px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            border: 0;
        }
    }
    .cxTitles{
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        display: flex;
        font-size: 18px;
        padding: 0 24px;
        border-bottom: 1px solid #dcdcdc;
        color: #333;
        div:last-child{
            margin-left: 36px;
        }
        div{
            padding: 18px 0;
            cursor: pointer;
        }
        .active{
            font-weight: bold;
            border-bottom: 2px solid #2F72D1;
        }
    }
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    h3, p {
        padding: 0;
        margin: 0;
    }
    .fr {
        float: right;
    }
    .topsearch {
        height: 100px;
        padding-top: 32px;
        background-image: url('../../../assets/img/company.png');
        background-position: center top;
        background-size: 100% auto;
        background-color: #eee;
    }
    .topsearchtitle {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        height: 42px;
        margin-bottom: 24px;
        > h3 {
            float: left;
            line-height: 42px;
            font-size: 18px;
            color: #333;
            font-weight: 600;
        }
        .companyname {
            float: right;
            width: 350px;
            .bluebtn {
                height: 40px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 0;
            }
        }
    }
    .searchslist {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 24px 16px;
        background-color: #fff;
        > li {
            margin-bottom: 16px;
            line-height: 28px;
            &:last-child {
                margin-bottom: 0;
            }
            .leftlabel {
                float: left;
                width: 136px;
                font-weight: 500;
                font-size: 14px;
                text-align: left;
                color: #333;
            }
            .rightcont {
                float: left;
                max-width: 1000px;
                font-size: 0;
                > span {
                    display: inline-block;
                    height: 28px;
                    margin-right: 24px;
                    padding: 0 12px;
                    line-height: 28px;
                    font-size: 14px;
                    color: #333;
                    font-weight: normal;
                    cursor: pointer;
                }
                span.active {
                    background-color: #2F72D1;
                    color: #fff;
                    border-radius: 2px;
                }
            }
        }
    }
    .searchlist {
        width: 1200px;
        padding-top: 20px;
        padding-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        background: #fff;
        .organizationList{
            padding: 0 24px;
            .organizationTit{
                display: flex;
                justify-content: space-between;
                div{
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                }
                .searchBtn{
                    font-size: 16px;
                    color: #fff;
                    background: #2F72D1;
                    width: 117px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    text-align: center;
                    border-radius: 2px;
                    cursor: pointer;
                    border: 0;
                }
            }
            .organizationTables{
                border: 1px solid #e9e9e9;
                margin-top: 34px;
                width: 100%;
                font-size: 14px;
                margin-bottom: 40px;
                .organizationTheader>tr{
                    background: #6198E7;
                    line-height: 52px;
                    color: #fff;
                    img{
                        margin-left: 8px;
                    }
                    .soPor{
                        cursor: pointer;
                        i{
                            display: inline-block;
                            width: 6px;
                        }
                        .active{
                            color: red;
                        }
                    }
                    .zgzh{
                        cursor: pointer;
                    }
                    .minWidth{
                        min-width: 80px;
                    }
                }
                .trCur{
                    cursor: pointer;
                }
                .trCur:hover{
                    background: #f5f7fa;
                }
                .organizationTheader th,.organizationTbody td{
                    text-align: center;
                }
                .organizationTbody>tr{
                    color: #333;
                    line-height: 86px;
                    border-bottom: 1px solid #e9e9e9;
                }
            }
        }
    }
    .nosearchdata {
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        background-color: #fff;
    }
    .mypagination {
        overflow: hidden; 
    }
}
</style>


