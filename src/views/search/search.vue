<template>
  <div class="search-page-box">
            <!-- <pbHeader></pbHeader> -->
      <!-- <ul class="nav">
          <li v-for="(item,index) in label" :key ='index' @click="toggle(item,index)" :class="{active: match ===item.path}">{{item.name}}</li>
      </ul> -->
      <router-view></router-view>
      <!-- <div class="recommended">
          <ul class="links">
              <li v-for="(item,key) in links" :key="key">{{item.name}}</li>
          </ul>
      </div>
      <div class="footerbox">
          <pbFooter></pbFooter>
      </div> -->
  </div>
</template>

<script>
import pbHeader from 'cps/public/header.vue'
import pbFooter from 'cps/public/footer.vue'
export default {
    data(){
        return {
            label:[{name:'普通搜索',path:'/search/comsearch'},{name:'高级搜索',path:'/search/seniorsearch'}],
            match:'',
            checkedCities:[],
            cont:'',
            links:[
                {name:'推荐链接1',link:'https://www.baidu.com'},
                {name:'推荐链接2',link:'https://www.baidu.com'},
                {name:'推荐链接3',link:'https://www.baidu.com'},
                {name:'推荐链接4',link:'https://www.baidu.com'},
                {name:'推荐链接5',link:'https://www.baidu.com'}
            ],
        }
    },
    mounted(){
        this.match = this.$route.matched[1]['path']
    },
    components:{
        pbHeader,
        pbFooter
    },
    watch:{
        $route(){
            this.match = this.$route.matched[1]['path']
        }
    },
    methods:{
        toggle(it,i){
            this.current = i;
            this.$router.replace(it.path)
        },
    }
}
</script>

<style lang = 'less'>

.search-page-box{
    .el-select .el-input {
        width: 100px;
        height: 40px;
    }
    .el-input	.el-input__inner{
        height: 40px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    /* .el-loading-mask{
        background-color:rgba(255,255,255,0.9);
    } */
    
}

</style>