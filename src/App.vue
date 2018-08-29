<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <!-- v-tab组件代替下面的一块 -->
    <!-- <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" >评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" >商家</router-link>
      </div>
    </div> -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
import axios from 'axios'

const ERR_OK =0;

export default {
  name: 'App',
  data() {
    return {
      seller:{}
    }
  },
  created(){
    axios.get('/api/seller').then(res=>{
      var result = res.data.data;
      console.log(result.data);
      if(result.errno === ERR_OK){
        this.seller = result.data;
      }
      console.log(this.seller);
    })
  },
  components:{
    'v-header': Header,
    'v-tab': Tab
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  // @import "./common/stylus/mixin.styl"
  // #app
  //   .tab
  //     display:flex
  //     width: 100%
  //     heigth:40px
  //     line-height:40px
  //     // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  //     border-1px(rgba(7, 17, 27, 0.1))
  //     .tab-item
  //       flex:1
  //       text-align:center
  //       & > a
  //         display:block
  //         font-size:14px
  //         color: rgb(77, 85, 93)
  //         &.active
  //           color: rgb(240, 20, 20)
</style>
