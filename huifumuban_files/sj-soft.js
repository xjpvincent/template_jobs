/*function close5577Div(){
            document.getElementById("myDiv").style.display = "none";
			return true;
        }	
var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};

(function(){
	var agent = window.navigator.userAgent,
		rWebKit = /AppleWebKit.+Safari/,
		isWebKit = rWebKit.test(agent),
		isAndroid = agent.indexOf('Android') > -1,
		isFormMoblie = /[\?&]m(&|$)/.test(window.location.search),
		doNotRedirect =  +Cookie.get('donotredirect');
		//isWebKit=true;
		//isAndroid =true;
		//alert(agent)
		
	 if(isAndroid){
	 if(Cookie.get("IsVisiteds").toLowerCase() != "yes"){
	 
		 document.writeln('<link href="http://m.pc6.com/js/sj-new.css" rel="stylesheet" type="text/css" /><div id="myDiv">  <a class="adwoji" href="http://m.pc6.com/pc6.apk" onClick="close5577Div()"><img src="http://5577.com/js/4/1.png" /></a> <p class="dibu2" > <a class="adclose" href="javascript:void(0)" onClick="close5577Div()"> </a> </p> </div>');	
		 
		var ExDate = new Date();
		ExDate.setDate(ExDate.getDate()+1);
		Cookie.set("IsVisiteds","yes",ExDate);
	}}
})();*/


var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};
var browser={
 versions:function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	return {
	trident: u.indexOf('Trident') > -1, //IE�ں�
	presto: u.indexOf('Presto') > -1, //opera�ں�
	webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
	gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
	mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //�Ƿ�Ϊ�ƶ��ն�
	ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios�ն�
	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
	iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
	iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
	webApp: u.indexOf('Safari') == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
	};
	}(),
 language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

browser.versions.android &&  DownApk();
		
function DownApk(){		

 if (Cookie.get("isApk")!="Yes")
 {
  if(confirm('�Ƽ������ֻ��氲װ?'))
  {
	  window.location.href ='http://d.xiazai18.com/wandoujia-meng6_ad.apk';
  }
  Cookie.set("isApk","Yes");
 }
}