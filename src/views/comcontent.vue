<template>
  <div class="index_page">
    <!-- <pbHeader></pbHeader> -->
    <!-- <cloudnav></cloudnav> -->
      <router-view></router-view>
    <!-- <links></links> -->
    <!-- <pbFooter></pbFooter> -->
  </div>
</template>

<script>

import pbHeader from "cps/public/header.vue";
import pbFooter from "cps/public/footer.vue";
import links from 'cps/public/links.vue'
import cloudnav from 'cps/public/cloudnav.vue'
export default {
  data() {
    return {
      current:'',
    };
  },
  components: {
    pbHeader,
    pbFooter,
    links,
    cloudnav
  },
  mounted(){
  },
  methods: {
  }
};
</script>


<style lang="less">
input{
  outline: none;
  border: none;
}
.index_page {
  width: 100%;
  height: 100%;
}
</style>
