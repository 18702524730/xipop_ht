<template>
	<!-- 页尾 -->
	<footer class="fac_footer">
		<div class="container clearfix">
			<div class="footer_bot clearfix">
				<div class="fl links">
					<h3>相关链接</h3>
					<ul>
						<li v-for="(item,index) in linklist" :key="index"><a :href="item.link" class="link">{{item.name}}</a></li>
					</ul>
				</div>
				<div class="fl contact">
					<div class="contact-icon">
					</div>
					<div>
						<h3>联系我们</h3>
						<p class="tel">0592-0000-0000</p>
						<p>每周一至周五9:00-17:00</p>
					</div>
					
				</div>
			</div>
			<div class="others">
				<a href="" class="link">关于我们</a>|<a href="" class="link">新手入门</a>|<a href="" class="link">帮助中心</a>|<a href="" class="link">联系我们</a>|<a href="" class="link">免责申明</a>
				<p>主办单位：厦门市知识产权局 技术支持：厦门XXXX</p>
			</div>
		</div>

	</footer>
</template>

<script>
export default {
	data () {
		return {
			linklist:[
				{name:'知识产权运营公共平台',link:'https://www.baidu.com'},
				{name:'运营公共平台',link:'https://www.baidu.com'},
				{name:'知识产权运营公共平台',link:'https://www.baidu.com'},
				{name:'知识产权运营公共平台',link:'https://www.baidu.com'},
				{name:'知识产权公共平台',link:'https://www.baidu.com'},
				{name:'知识产权运营公共平台',link:'https://www.baidu.com'},
				{name:'知识产权运营公共平台',link:'https://www.baidu.com'},
			]
		}
	},
	methods: {
	},
	mounted () {}
}
</script>

<style lang="less">
/* 底部样式 */
.fac_footer{
	position: relative;color: #999;background: #222;
	.footer_bot{
		padding: 20px 0;
		border-bottom: 1px solid #333;
		.links{
			width: 50%;
			border-right: 1px solid #444;
			h3{
				padding-left: 20px;
				color: #fff;
			}
			
			ul{
				padding-left: 20px;
				padding-right: 20px;
				li{
					float: left;
					width: 50%;
					cursor: pointer;
					
				}
			}
		}
		.contact{
			display: -webkit-box;
			display: -moz-box; 
			display: -webkit-flex;  
			display: -moz-flex;  
			display: -ms-flexbox; 
			display: flex;
			padding-left: 100px;
			align-items: center;
			.contact-icon{
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background-color: #333;
				margin-right: 60px;
			}
			h3{
				color: #fff;
				text-align: center;
			}
			p{
				text-align: center;
				font-size: 12px;
			}
			.tel{
				font-size: 30px;
			}
		}
	}
	.link{
		color:#666;
		&:hover{
			color: #379dea;
		}
	}
	.others{
		padding: 30px 0;
		text-align: center;
		color: #666;
		.link{
			margin-right: 10px;
			margin-left: 10px;
		}
	}
}
.fac_footer .container { width: 1200px; margin: 0 auto; overflow: hidden; }
</style>
