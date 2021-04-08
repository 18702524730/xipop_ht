// 默认域名环境
var rootConfig = {
	rootUrl: 'http://xm.xmipop.com/xipop',
	indexUrl: 'http://www.xmipop.com',
	homeUrl: 'http://www.xmipop.com'
};
//本地调试用
if (location.host.indexOf('localhost') === 0) {
	rootConfig = {
	  rootUrl: '//' + location.host + '/xipop',
	  indexUrl: '//' + location.host,
	  homeUrl:'http://www.xmipop.com'
	};
}
// 正式环境
// if (location.host.indexOf('112.48.134.160:4000') > -1) {
// 	rootConfig = {
// 		rootUrl: 'http://112.48.134.160:8092',
// 		indexUrl: 'http://112.48.134.160:4000',
// 		homeUrl: 'http://112.48.134.160:3002'
// 	};
// }
// 政务云正式域名环境
if (location.host.indexOf('ipop.scjg.xm.gov.cn') > -1) {
	rootConfig = {
		rootUrl: 'https://ipop.scjg.xm.gov.cn/xmsebeapi',
		indexUrl: 'https://ipop.scjg.xm.gov.cn/xmsebe',
		homeUrl: 'https://ipop.scjg.xm.gov.cn/xmsebe'
	};
}
// 政务云测试环境
if (location.host.indexOf('112.48.134.160:4100') > -1) {
	rootConfig = {
		rootUrl: '//112.48.134.160:4001/xmsebeapi',
    indexUrl: '//112.48.134.160:4001',
		homeUrl: '//112.48.134.160:4001'
	};
}
// 测试环境1
if (location.host.indexOf('122.112.165.166') > -1) {
	rootConfig = {
		rootUrl: 'http://122.112.165.166:8078',
		indexUrl: 'http://122.112.165.166:3002',
		homeUrl: 'http://122.112.165.166:3002'
	};
}
// 测试环境2
if (location.host.indexOf('192.168.0.155') > -1) {
	rootConfig = {
		rootUrl: 'http://192.168.0.155:8078',
		indexUrl: 'http://192.168.0.155:3002',
		homeUrl: 'http://192.168.0.155:3002'
	};
}
// 拾贝测试
if (location.host.indexOf('test') === 0 ) {
	rootConfig = {
		rootUrl: 'https://testxipop.ipsebe.com/xipop',
		indexUrl: 'https://testxipop.ipsebe.com',
		homeUrl:'https://testxipop.ipsebe.com',
	};
}
export default rootConfig;



