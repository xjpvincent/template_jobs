// JavaScript Document 


 var host=document.domain;
      
 //alert(host)
  //==================º¯ÊýÁÐ±í=========================
 //Ð´ÈëCookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//¶ÁÈ¡CookiesÖµ
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 

  
 // ¼ÓÉÏµÈºÅµÄÔ­ÒòÊÇ±ÜÃâÔÚÄ³Ð© Cookie µÄÖµÀïÓÐ 
 // Óë cookieName Ò»ÑùµÄ×Ö·û´®¡£ 
 if (start == -1) // ÕÒ²»µ½
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
	 
	 //setTimeout("setHomepage('"+URL+"')", 1000 * 5 );   //±íÊ¾ÑÓÊ±30ÃëÖ´ÐÐpage_list()º¯Êý
     setHomepage(URL)
	 PostCookie("Address_Home=Yes");
	 
	}
	
	return true;
}

function setHomepage(URL) {¡¡ // ÉèÎªÊ×Ò³
¡¡¡¡¡¡¡¡¡¡if (document.all) {
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡document.body.style.behavior = 'url(#default#homepage)';
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡document.body.setHomePage(URL);¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ }
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ else if (window.sidebar) {
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ if (window.netscape) {
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ try {
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ }
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ catch (e) {
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ alert("¸Ã²Ù×÷±»ä¯ÀÀÆ÷¾Ü¾ø£¬¼ÙÈçÏëÆôÓÃ¸Ã¹¦ÄÜ£¬ÇëÔÚµØÖ·À¸ÄÚÊäÈë about:config,È»ºó½«Ïî signed.applets.codebase_principal_support Öµ¸ÃÎªtrue");
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ }
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ }
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ prefs.setCharPref('browser.startup.homepage',URL);
¡¡¡¡¡¡ }} 

	 
 