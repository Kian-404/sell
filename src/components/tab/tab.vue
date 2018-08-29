<template>
	<!-- 商品header中的tab组件 -->
	<div class="tab border-1px">
	  <div class="tab-item">
	    <router-link to="/goods" >商品</router-link>
	  </div>
	  <div class="tab-item">
	    <router-link to="/ratings" >评论</router-link>
	  </div>
	  <div class="tab-item">
	    <router-link to="/seller" >商家</router-link>
	  </div>
	</div>
</template>
<script></script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.tab
	  display:flex
	  width: 100%
	  heigth:40px
	  line-height:40px
	  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
	  border-1px(rgba(7, 17, 27, 0.1))
	  .tab-item
	    flex:1
	    text-align:center
	    & > a
	      display:block
	      font-size:14px
	      color: rgb(77, 85, 93)
	      &.active
	        color: rgb(240, 20, 20)
</style>