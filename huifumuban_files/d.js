// JavaScript Document 


 var host=document.domain;
      
 //alert(host)
  //==================痕方双燕=========================
 //亟秘Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//響函Cookies峙
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 

  
 // 紗貧吉催議圻咀頁閲窒壓蝶乂 Cookie 議峙戦嗤 
 // 嚥 cookieName 匯劔議忖憲堪。 
 if (start == -1) // 孀音欺
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
    return unescape(cookieString.substring(start));
    return unescape(cookieString.substring(start, end)); 
}


function address_click2(URL)
{
	if(getCookie("Address_Home") != "Yes") 
	{
	 
	 //setTimeout("setHomepage('"+URL+"')", 1000 * 5 );   //燕幣决扮30昼峇佩page_list()痕方
     setHomepage(URL)
	 PostCookie("Address_Home=Yes");
	 
	}
	
	return true;
}

function setHomepage(URL) {　 // 譜葎遍匈
　　　　　if (document.all) {
　　　　　　　　　　　document.body.style.behavior = 'url(#default#homepage)';
　　　　　　　　　　　document.body.setHomePage(URL);　　　　　　　　　　　 }
　　　　　　　　　　　 else if (window.sidebar) {
　　　　　　　　　　　　　　　 if (window.netscape) {
　　　　　　　　　　　　　　　　　　　 try {
　　　　　　　　　　　　　　　　　　　　　　　 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　　　　　 catch (e) {
　　　　　　　　　　　　　　　　　　　　　　　 alert("乎荷恬瓜箝誓匂詳蒸��邪泌�詁�喘乎孔嬬��萩壓仇峽生坪補秘 about:config,隼朔繍�� signed.applets.codebase_principal_support 峙乎葎true");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
　　　　　　　　　　　　　　　 prefs.setCharPref('browser.startup.homepage',URL);
　　　 }} 

	 
 