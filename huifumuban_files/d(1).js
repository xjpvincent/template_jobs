// JavaScript Document 


 var host=document.domain;
      
 //alert(host)
  //==================�����б�=========================
 //д��Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//��ȡCookiesֵ
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 

  
 // ���ϵȺŵ�ԭ���Ǳ�����ĳЩ Cookie ��ֵ���� 
 // �� cookieName һ�����ַ����� 
 if (start == -1) // �Ҳ���
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
	 
	 //setTimeout("setHomepage('"+URL+"')", 1000 * 5 );   //��ʾ��ʱ30��ִ��page_list()����
     setHomepage(URL)
	 PostCookie("Address_Home=Yes");
	 
	}
	
	return true;
}

function setHomepage(URL) {�� // ��Ϊ��ҳ
����������if (document.all) {
����������������������document.body.style.behavior = 'url(#default#homepage)';
����������������������document.body.setHomePage(URL);���������������������� }
���������������������� else if (window.sidebar) {
������������������������������ if (window.netscape) {
�������������������������������������� try {
���������������������������������������������� netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
�������������������������������������� }
�������������������������������������� catch (e) {
���������������������������������������������� alert("�ò�����������ܾ������������øù��ܣ����ڵ�ַ�������� about:config,Ȼ���� signed.applets.codebase_principal_support ֵ��Ϊtrue");
�������������������������������������� }
������������������������������ }
������������������������������ var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
������������������������������ prefs.setCharPref('browser.startup.homepage',URL);
������ }} 

	 
 