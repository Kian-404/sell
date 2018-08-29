<template>
	<!-- header中的商品公告和优惠信息的组件复用 -->
	<div class="small-title">
		<div class="line"></div>
		<div class="text">
			<slot name="content"></slot>
		</div>
		<div class="line"></div>
	</div>
</template>
<script></script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.small-title
		width:80%
		margin:28px auto 24px auto
		display:flex
		.line
			flex:1
			position:relative
			top:-6px
			border-bottom:1px solid rgba(255, 255,255, 0.2)
		.text
			padding:0 12px
			font-weight:700
			font-size:14px
</style>