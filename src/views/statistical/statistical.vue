<template>
  <div class="index_page">
    <!-- <pbHeader></pbHeader> -->
    <!-- <navs></navs> -->
    <!-- <div class="tab">
      <ul class="content-nav clearfix">
        <li v-for="(item,index) in nav" :key="index" :class="{active: current ==item.path}" @click="topage(item)">{{item.name}}</li>
      </ul>
    </div> -->
    <div class="contents">
      <router-view></router-view>
    </div>
    <!-- <links></links> -->
    <!-- <div class="footerbox">
        <pbFooter></pbFooter>
    </div> -->
  </div>
</template>

<script>

// import pbHeader from "cps/public/header.vue";
// import pbFooter from "cps/public/footer.vue";
// import links from 'cps/public/links.vue'
// import navs from 'cps/public/nav.vue'
export default {
  data() {
    return {
      nav:[
        {name:'创新大数据监测',path:'/statistical/bigdata'},
        {name:'产业专题数据库',path:'/statistical/industrybox'},
        {name:'专利导航报告',path:'/statistical/patentbox'},
      ],
      current:'',
    };
  },
  components: {
    // pbHeader,
    // pbFooter,
    // links,
    // navs
  },
  mounted(){
    this.current = this.$route.matched[1]['path'];
  },
  
  watch:{
    $route(){
      this.current = this.$route.matched[1]['path'];
    }
  },
  methods: {
    topage(it){
      this.$router.replace({path:it.path})
    },
  },
};
</script>


<style lang="less">
.tab{
  background-color: #f5f5f5;
}
@media screen and (min-width: 768px){
    .index_page {
      width: 100%;
      height: 100%;
      // .tab{
      //   margin-bottom: 20px;
      //   border-bottom: 1px solid #fff;
      // }
      .content-nav{
        max-width: 1200px;
        margin: 0 auto;
        height: 50px;
        >li{
          font-family: Microsoft Yahei;
          box-sizing: border-box;
          float: left;
          padding: 0 5px;
          line-height: 45px;
          cursor: pointer;
          font-size: 16px;
          font-weight: normal;
          color:rgba(0,0,0,0.65);
          margin-right: 30px;
          &:hover{
            color: #4172cb;
          }
        }
        
        .active{
          color: #4172cb;
          border-bottom: 1px solid #4172cb;
          font-weight: 500;
        }
      }
    }
}
@media screen and (max-width: 768px){
  .index_page {
    width: 100%;
    height: 100%;
    // .tab{
    //   margin-bottom: 20px;
    //   border-bottom: 1px solid #fff;
    // }
    .content-nav{
      width: 100%;
      padding: 10px;
      margin: 0 auto;
      // height: 60px;
      >li{
        box-sizing: border-box;
        float: left;
        width: 100px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        color:#333;
        margin-right: 15px
      }
      .active{
        border-bottom: 2px solid #379dea;
      }
    }
  }
}
input{
  outline: none;
  border: none;
}


</style>
