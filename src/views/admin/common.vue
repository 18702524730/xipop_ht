<template>
<div class="adminpage">
    <div class="fromadmin">
        <!-- <h3><a href="http://www.xmipop.com"><span class="back fl" @click="toback">返回控制台</span></a><span class="fr refresh" @click="getDetail"><i class="el-icon-refresh"></i> 刷新</span></h3>
    </div>
  <div class="commonWidths clearfix">
      <div class="leftyearlist fl">
          <div class="itemyear" v-for="(item,index) in yearlist" :key="index">
              <h3 class="year" @click="openitem(item)">{{item.year}}<span class="iconbox"><i class="el-icon-arrow-down" v-if="!item.isopen"></i><i class="el-icon-arrow-up" v-if="item.isopen"></i></span></h3>
              <ul v-if="item.list&&item.isopen" class="itemlist" >
                  <li v-for="(v,k) in item.list" :key="k" @click="toitem(v)" :class="{active: nowroute==v.path}">{{v.title}}</li>
              </ul>
          </div>
      </div> -->
      <div class="rightcontitem">
          <router-view></router-view>
      </div>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            yearlist:[
                {
                    year: '云画报管理',
                    list:[
                            {title:'广告管理',path:'/admin/adpage'},
                            {title:'期刊管理',path:'/admin/journal'},
                            {title:'栏目设置',path:'/admin/column'},
                            {title:'文章列表',path:'/admin/article'}
                        ],
                    isopen: false,path:'cloud'
                },
                {year: '创新监测管理',list:[{title:'厦门概况统计设置',path:'/admin/overview'},{title:'专利专题数据库',path:'/admin/patentdata'},{title:'专利导航版',path:'/admin/patentnav'}],isopen: false,path:'dataview'},
                {year: '运行监控管理',list:[{title:'报表面板',path:'/admin/reportpanel'},{title:'访客分析',path:'/admin/visitors'},{title:'页面分析',path:'/admin/analysis'}],isopen: false,path:'monitor'},
            ],
            nowroute:'',
        }
    },
    methods:{
        toback(){
        },
        getDetail(){
            window.location.reload()
        },
        openitem(it){
            if(it.isopen){
                it.isopen = false;
            }else{
                this.yearlist.forEach(item=>{
                    item.isopen = false
                })
                it.isopen = true
            }
        },
        toitem(it){
            this.$router.replace({path:it.path})
        }
    },
    mounted(){
        this.nowroute = this.$route.matched[1]['path']
        this.yearlist.forEach(item=>{
            for(let i=0;i<item.list.length;i++){
                if(this.nowroute==item.list[i]['path']){
                    item.isopen = true;
                }
            }
        })
        console.log(this.nowroute)
    },
    watch:{
        $route(){
            this.nowroute = this.$route.matched[1]['path'];
            this.yearlist.forEach(item=>{
                for(let i=0;i<item.list.length;i++){
                    if(this.nowroute==item.list[i]['path']){
                        item.isopen = true;
                    }
                }
            })
        }
    }
}
</script>

<style lang='less'>
.adminpage{
    padding-bottom: 60px;
    background-color: #fff;
    .fromadmin{
        // margin-bottom: 15px;
        // border-bottom: 1px solid #ccc;
        // background-color: #f5f5f5;
        
        >h3{
            max-width: 1200px;
            padding: 15px 0;
            height: 60px;
            margin: 0 auto;
            line-height: 30px;
            font-size: 14px;
            .back{
                padding: 0 10px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 4px;
                background-color: #379dea;
                color: #fff;
                cursor: pointer;
                font-size: 14px;
            }
            .refresh{
                padding: 0 10px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #333;
                background-color: #fff;
                border: 1px solid #ccc;
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
    .commonWidths{
        width: 1200px;
        margin: 0 auto;
    }
    background-color: #fff;
    .leftyearlist{
        width: 210px;
        border: 1px solid #eee;
        color:#333;
        // .itemyear{
        //     border-bottom: 1px solid #eee;
        // }
        .year{
            height: 40px;
            line-height: 40px;
            padding:0 20px;
            border-bottom: 1px solid #eee;
            font-size: 16px;
            cursor: pointer;
            .iconbox{
                float: right;
            }
        }
        .itemlist{
            max-height: 428px;
            overflow-y: auto;
            cursor: pointer;
            >li{
                padding-left: 48px;
                height: 40px;
                font-size: 14px;
                line-height: 40px;
                margin: 6px 0;
                &.active{
                    background-color: rgba(47,114,209,0.06);
                    color:#2F72D1;
                }
                &:hover{
                    background-color: rgba(47,114,209,0.06);
                    color:#2F72D1;
                }
            }
            
        }
    }
    .rightcontitem{
        padding: 20px 20px;
        // width: 980px;
        // border: 1px solid #eee;
    }
}
</style>