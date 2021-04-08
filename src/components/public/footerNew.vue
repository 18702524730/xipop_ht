<template>
	<!-- 页尾 -->
	<footer class="fac_footer_new">
		<div class="container clearfix">
			<div class="footer_top">
				<span class="address">联系地址：浙江省杭州市江干区红浦路788号（创智绿谷发展中心6号楼12楼1202室杭州拾贝知识产权服务有限公司）</span>
				<span class="tel">
					<span>客服热线：4000-315-426</span>
					<span class="ml35">周一至周五：8：30-18：00</span>
				</span>
			</div>
			<div class="footer_bot clearfix">
				<div class="fl caasa">
					<a class="fl"><img src="~assets/img/header_footer/caasa.png" alt=""></a>
					<p>中国反侵权假冒创新战略联盟 <a class="link" href="https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E5%8F%8D%E4%BE%B5%E6%9D%83%E5%81%87%E5%86%92%E5%88%9B%E6%96%B0%E6%88%98%E7%95%A5%E8%81%94%E7%9B%9F?sefr=ps" target="_blank">联盟简介</a></p>
					<p>China Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
				</div>
				<div class="fr sebe">
					<a href="#" class="fl"><img src="~assets/img/header_footer/sebe.png" alt=""></a>
					<p>杭州拾贝知识产权服务有限公司为中国反侵权假冒创新战略联盟理事长单位</p>
					<p><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank" class="link">浙ICP备15042618号</a> | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197" target="_blank" class="link">浙公网安备 33010402003197号</a> © 2019 拾贝公司 All Rights Reserved</p>
				</div>
			</div>
		</div>

	</footer>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
	},
	mounted () {}
}
</script>

<style lang="scss">
/* 底部样式 */
.fac_footer_new{
	position: relative;color: #999;background: #222;
	&::after{content: '';height: 1px;width: 100%;background: #333;position: absolute;bottom: 82px;right: 0px}
	h3{font-size: 14px;line-height: 30px;padding-bottom: 10px;
		span{padding-left: 10px;color:#666;}
	}
	.footer_top{
		font-size: 14px;
		padding: 20px 0 20px;
		>span{color: #666;line-height: 30px;font-size: 14px;}
		.tel{
			float:right;display: inline-block;text-align: right;width: 450px;
			>span{color: #666;line-height: 30px;font-size: 14px;}
		}
		a{text-decoration: none;color: #666;padding-right: 30px;position: relative;line-height: 30px;
			&::after{content: '';height: 14px;width: 1px;background: #666;position: absolute;top: 3px;right: 15px}
			&:last-child::after{height: 0;}
			&:hover {color: #3DB1FA;}
		}
	}
	.footer_bot{
		padding: 20px 0 20px;
		.link {
			color: #999; font-size: 12px;
			&:hover { color: #3DB1FA;}
		}
		.caasa{
			height: 40px;
			p{padding-left: 80px;font-size: 12px;}
		}
		.sebe{
			height: 40px;
			p{padding-left: 84px;font-size: 12px;}
		}
	}
}
.fac_footer_new .container { width: 1200px; margin: 0 auto; overflow: hidden; }
</style>
