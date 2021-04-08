<template>
<div class="borderbox">
	<div class="header-box">
		<div class="pub_header">
			<ul>
				<li>首页</li>
				<li>请先登录</li>
				<li>注册</li>
				<li>用户中心</li>
				<li>帮助中心</li>
			</ul>
		</div>
	</div>
</div>
	
</template>

<script>
export default {
	props: {
	},
	data () {
		return {
		}
	},
	mounted () {
	},
	methods: {

	},
	watch: {
	}
}
</script>

<style lang="less">
.borderbox{
    background-color: #efefef;
    border-bottom: 1px solid #ddd;
}
.header-box{
    width: 1200px;
    margin: 0 auto;
}
	.pub_header {
		height: 40px;
		color: #333;
		ul{
			float: right;
			padding: 12px 0;
			li{
				float: left;
				height: 14px;
				line-height: 14px;
				padding-right: 20px;
				margin-right: 20px;
				border-right: 1px solid #ccc;
				cursor: pointer;
				&:last-child{
					border-right: none;
					margin-right: 0;
					padding-right: 0;
				}
			}
		}
	}
</style>
