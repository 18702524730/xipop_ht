import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// import {Statisticals,Searchs,CloudPapers,Comcontent,Admins} from 'views/';
import {Admins,Statisticals,Comcontent,CloudPapers,Searchs} from 'views/';
export default new Router({
	routes: [
		// {
		// 	path     : '/sebebackend',
		// 	hidden   : true,
		// 	redirect:'/admin'
		// },
		{
			path     : '/',
			hidden   : true,
			redirect:'/admin'
		},
		{
			path: '/search',
			name:'search',
			meta:{
				name:'检索',
			},
			component: Searchs.search,
			redirect:'/search/comsearch',
			children:[
				{
					path:'comsearch',
					name:'comsearch',
					component: Searchs.psearch,
					meta:{name:'普通搜索'},
					redirect:'/search/comsearch/zlsearch',
					children:[
						{
							path:'zlsearch',
							name:'zlsearch',
							component: Searchs.zlsearch
						},
						{
							path:'sbsearch',
							name:'sbsearch',
							component: Searchs.sbsearch
						},{
							path:'cjsearch',
							name:'cjsearch',
							component: Searchs.cjsearch
						}
					]
				},
				{path:'expressionSearch',name:'expressionSearch',component: Searchs.expressionSearch,meta:{name:'表达式检索'}},
				{path:'patentsearch',name:'patentsearch',component: Searchs.patentsearch,meta:{name:'专利搜索'}},
				{path:'patentdetail/:id/:country/:num/:tp',name:'patentdetail',component: Searchs.patentdetail,meta:{name:'专利搜索详情'}},
				{path:'trademarksearch',name:'trademarksearch',component: Searchs.trademarksearch,meta:{name:'商标搜索'}},
				{path:'trademarkdetail/:id',name:'trademarkdetail',component: Searchs.trademarkdetail,meta:{name:'商标搜索详情'}},
				{path:'panli',name:'panli',component: Searchs.panli,meta:{name:'判例文书检索'}},
				{path:'panlidetail/:type/:islocal',name:'panlidetail',component: Searchs.panlidetail,meta:{name:'判例搜索详情'}},
				{path:'fushen',name:'fushen',component: Searchs.fushen,meta:{name:'判例复审检索'}},
				{path:'collectdetail',name:'collectdetail',component: Searchs.collectdetail,meta:{name:'判例搜索详情'}},
				{path:'seniorsearch',name:'seniorsearch',component: Searchs.seniorsearch,meta:{name:'高级搜索'}},
			]
		},
		{
			path: '/statistical',
			name:'statistical',
			meta:{
				name:'统计',
			},
			component: Statisticals.statistical,
			redirect:'/statistical/bigdata',
			children:[
				{
					path:'bigdata',
					name:'bigdata',
					meta:{
						name:'创新大数据监测'
					},
					component: Statisticals.bigdata
				},
				{
					path:'industrybox',
					name:'industrybox',
					meta:{
						name:'产业专题数据库'
					},
					component: Statisticals.contentbox,
					redirect:'/statistical/industrybox/industry',
					children:[
						{
							path:'industry',
							name:'industry',
							meta:{
								name:'产业专题数据库'
							},
							component: Statisticals.industry
						},
						{
							path:'industry/:id',
							name:'industrydetail',
							meta:{
								name:'产业专题数据库'
							},
							component: Statisticals.industrydetail
						},
						{
							path:'patentdetail/:id/:country/:num/:tp',
							name:'industrypatentdetail',
							component: Statisticals.industrypatentdetail,
							meta:{name:'专利搜索详情'}
						},
					]
				},
				{
					path:'patentbox',
					name:'patentbox',
					meta:{
						name:'专利导航报告'
					},
					component: Statisticals.contentbox,
					redirect:'/statistical/patentbox/patent',
					children:[
						{
							path:'patent',
							name:'patent',
							meta:{
								name:'专利导航报告'
							},
							component: Statisticals.patent
						},
						{
							path:'ServiceAgencies',
							name:'ServiceAgencies',
							meta:{
								name:'门户服务机构列表'
							},
							component: Statisticals.ServiceAgencies
						},
						{
							path:'AgencyInfo/:id',
							name:'AgencyInfo',
							meta:{
								name:'门户服务机构详情'
							},
							component: Statisticals.AgencyInfo
						},
						
						{
							path:'IPLive',
							name:'IPLive',
							meta:{
								name:'ip图文直播'
							},
							component: Statisticals.IPLive
						},
						{
							path:'patent/:id',
							name:'reportdetail',
							meta:{
								name:'专利导航报告'
							},
							component: Statisticals.reportdetail
						},
						{
							path:'viewpatentdetail',
							name:'viewpatentdetail',
							meta:{
								name:'专利导航报告'
							},
							component: Statisticals.viewdetail
						}
					]
				},
				
			]
		},
		{
			path: '/cloudpaper',
			name:'cloudpaper',
			meta:{
				name:'云画报',
			},
			component: Comcontent,
			redirect:'/cloudpaper/cloud',
			children:[
				{
					path:'cloud',
					name:'cloud',
					meta:{
						name:'云画报'
					},
					component: CloudPapers.cloud
				},
				{
					path:'cloudlist/:id/:year',
					name:'cloudlist',
					meta:{
						name:'云画报'
					},
					component: CloudPapers.paperlist
				},
				{
					path:'article/:lmid/:from',
					name:'article',
					meta:{
						name:'云画报'
					},
					component: CloudPapers.articleinfo
				},
				{
					path:'addarticle',
					name:'addarticle',
					meta:{
						name:'文章管理'
					},
					component: Admins.clouds.addarticle
				},
			]
		},
		{
			path: '/admin',
			name:'admin',
			meta:{
				name:'后台管理',
			},
			component: Admins.common,
			redirect:'/admin/adpage',
			children:[
				{
					path:'overview',
					name:'overview',
					meta:{
						name:'厦门概况统计设置'
					},
					component: Admins.dataviews.overview
				},
				{
					path:'overSetup',
					name:'overSetup',
					meta:{
						name:'区域创新指标设置'
					},
					component: Admins.dataviews.overSetup
				},
				{
					path:'patentdata',
					name:'patentdata',
					meta:{
						name:'产业专题数据库'
					},
					component: Admins.dataviews.box,
					redirect: '/admin/patentdata/list',
					children:[
						{
							path:'list',
							name:'patlist',
							meta:{
								name:'产业专题数据库'
							},
							component: Admins.dataviews.patentdata
						},
						{
							path:'add/:type',
							name:'addpage',
							meta:{
								name:'产业专题数据库'
							},
							component: Admins.dataviews.addpatentdata
						},
					]
				},
				{
					path:'patentnav',
					name:'patentnav',
					meta:{
						name:'专利导航版'
					},
					component: Admins.dataviews.box,
					redirect: '/admin/patentnav/list',
					children:[
						{
							path:'list',
							name:'patnavlist',
							meta:{
								name:'专利专题数据库'
							},
							component: Admins.dataviews.patentnav
						},
						{
							path:'add/:type',
							name:'addnavpage',
							meta:{
								name:'专利专题数据库'
							},
							component: Admins.dataviews.addnav
						},
					]
				},
				{
					path:'agent',
					name:'agent',
					meta:{
						name:'服务机构代理人'
					},
					component: Admins.dataviews.agent
				},
				{
					path:'ServiceOrganization',
					name:'ServiceOrganization',
					meta:{
						name:'服务机构列表'
					},
					component: Admins.dataviews.ServiceOrganization
				},
				{
					path:'patentstatistics',
					name:'patentstatistics',
					meta:{
						name:'专利统计'
					},
					component: Admins.dataviews.patentstatistics
				},
				{
					path:'patentstatisticsRes/:url/:id',
					name:'patentstatisticsRes',
					meta:{
						name:'专利统计'
					},
					component: Admins.dataviews.patentstatisticsRes
				},
				{
					path:'xmcompany',
					name:'xmcompany',
					meta:{
						name:'厦门企业库'
					},
					component: Admins.dataviews.xmcompany
				},
				{
					path:'companymark',
					name:'companymark',
					meta:{
						name:'企业标签管理'
					},
					component: Admins.dataviews.companymark
				},
				{
					path:'adpage',
					name:'adpage',
					meta:{
						name:'广告管理'
					},
					component: Admins.clouds.adpage
				},
				{
					path: 'iplive',
					name: 'iplive',
					meta: {
						name: 'IP直播banner'
					},
					component: Admins.iplive.banner
				},
				{
					path: 'livelist',
					name: 'livelist',
					meta: {
						name: 'IP直播列表'
					},
					component: Admins.iplive.livelist
				},
				{
					path: 'liveinfo/:id',
					name: 'liveinfo',
					meta: {
						name: 'IP直播控制台'
					},
					component: Admins.iplive.liveinfo
				},
				{
					path: 'portrait',
					name: 'portrait',
					meta: {
						name: 'IP直播banner'
					},
					component: Admins.portrait.banner
				},
				{
					path: 'portraitlist',
					name: 'portraitlist',
					meta: {
						name: 'IP直播列表'
					},
					component: Admins.portrait.portraitlist
				},
				{
					path:'journal',
					name:'journal',
					meta:{
						name:'期刊管理'
					},
					component: Admins.clouds.qikan
				},
				{
					path:'column',
					name:'column',
					meta:{
						name:'栏目管理'
					},
					component: Admins.clouds.lanmu
				},
				{
					path:'article',
					name:'article',
					meta:{
						name:'文章管理'
					},
					component: Admins.clouds.article
				},
				
				{
					path:'reportpanel',
					name:'reportpanel',
					meta:{
						name:'报表面板'
					},
					component: Admins.monitors.report
				},
				{
					path:'visitors',
					name:'visitors',
					meta:{
						name:'访客分析'
					},
					component: Admins.monitors.visitors
				},
				{
					path:'analysis',
					name:'analysis',
					meta:{
						name:'页面分析'
					},
					component: Admins.monitors.analysis
				},
				{
					path:'blacklist',
					name:'blacklist',
					meta:{
						name:'黑名单管理'
					},
					component: Admins.monitors.blacklist
				},
			]
		},
		{
			path: '*',
			hidden: true,
			name: 'other',
			redirect: { path: '/' }
		}
	]
})
