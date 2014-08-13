//inc-nfunction.js
//==========Mobile redirect Begin ========
var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };domain
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
	
	// JavaScript Document
 var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};
 
(function(){  

	var  href = location.href,
	      isFormMoblie = /[\?&]m(&|$)/.test(window.location.search),
		  doNotRedirect =  +Cookie.get('donotredirect'),
		  mUrl="http://m.pc6.com/",
		  isMoblie=browser.versions.mobile;
		  
		  	var Init ={
		      redirect : function(){
				  var reg = /\/(softview|azyx|az|mod|help|mac|fuzhu)\/(softview_)?(\d+)\.html/ig; 
				  var m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "s/" +m[3];  
					 return;
				  }
				  
				  reg = /\/(infoview|edu)\/(infoview_)?(\d+)\.html/ig; 
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "n/" +m[3]; 
					 return;
				  }
				  				  
				  reg = /\/pc\/(\w+)(\/?)/ig;
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl + "pc/" +m[1]; 
					 return;
				  }
				  
				  reg = /\.com(\/?)$/ig; 
				  m = reg.exec(href);
				  if(m){
					 window.location.href = mUrl ;  
				  }
				  
			  }
	       }
	
		  if(isFormMoblie){
			Cookie.set('donotredirect', 1, 7*24*3600*1000);
			return;
		} else if(isMoblie){
			if(!doNotRedirect)	Init.redirect(); 
		}
})()	
//==========Mobile redirect End ========

// JavaScript Document
 //==================函数列表=========================
 //写入Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

//读取Cookies值
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 
 // 加上等号的原因是避免在某些 Cookie 的值里有 
 // 与 cookieName 一样的字符串。 
 if (start == -1) // 找不到
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
 return unescape(cookieString.substring(start));
 return unescape(cookieString.substring(start, end)); 
 
}

 String.prototype.Trim=function(){ return  this.replace(/(^\s+)|(\s+$)/g,"");}
 String.prototype.Ltrim = function(){ return  this.replace(/(^\s+)/g,   "");}
 String.prototype.Rtrim = function() { return this.replace(/(\s+$)/g, "");}

//================= AJAX 提交表单 ====================
var http_request = true;
	function send_request(url,Temp,ref , tb) 
	 {//初始化、指定处理函数、发送请求的函数
		http_request = false;
		
		//document.domain = "yxdown.com";
		//开始初始化XMLHttpRequest对象
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {//设置MiME类别
				http_request.overrideMimeType('text/xml');
			}
		}
		else if (window.ActiveXObject) { // IE浏览器
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		http_request.onreadystatechange = ref; 
		
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		http_request.open("Post", url, tb);
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		http_request.send(Temp);
	}
	
	// 处理返回信息的函数
    function processRequest() {
        if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
                alert(http_request.responseText);
            } else { //页面不正常
                // alert("您所请求的页面有异常。");
            }
        }
    }
//加入收藏夹
function addfav(url,title)
{
	window.external.addFavorite(url,title); 
 }
 
//收藏本站
function address(url,title)
{
 window.external.AddFavorite(url,title);
}	



		

function isNumberS(i,obj)
{
	if (obj.value=="")
	{
		alert(obj.name + ": 不能为空");
		obj.focus();
		return false;
	}
	
	if(isNaN(obj.value))
	{
		alert(obj.name + ": 必须为数字");
		obj.focus();
		return false;
	}
	
	if (i<obj.value)
	{
		alert(obj.name + ": 不能大于" + i);
		obj.focus();
		return false;
	}
}

//=================================前台专用====================================================
function ViewCmsHits(tobj,id)
{
	var obj= document.getElementById(tobj);
	var Url="Action=4&id="+ id;
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					obj.innerHTML = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
   send_request("../ajax.asp",Url,ref,true);
}


function ViewCommCount(tobj,CommentTpye,id) //查询评论数
{
	var obj= document.getElementById(tobj);
	var Url="Action=16&CommentTpye="+CommentTpye+"&id="+ id;
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					obj.innerHTML = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
   send_request("../ajax.asp",Url,ref,true);
}


//============处理文章中的图片====================
function ViewCmsImages(tobj,id)
{
	var obj= document.getElementById(tobj);
	var imgs=obj.getElementsByTagName("img");
	
	for(i=0;i<imgs.length;i++)
	{
		//imgs[i].setAttribute('onmousewheel',"return bbimg(this)");
		var sobj= imgs[i].parentNode;
		if (sobj.tagName!="a")
		{
			//imgs[i].outerHTML ="<a href='/viewimg_"+id+"_1.html?"+ imgs[i].src +"' target='_blank'>" + imgs[i].outerHTML + "</a>"
			
			imgs[i].onclick=function(){window.open("/viewimg_"+id+"_1.html?"+ this.src,"n","")}
            imgs[i].title="点击查看大图"
            imgs[i].style.cursor="pointer";
         }
		//imgs[i].onmousewheel = function(){return bbimg(this)};
		//imgs[i].alt="可以用鼠标滚动改变大小";
	}
}

//单击选项卡通用过程 obj,'Index_3_2_1','li','li_click'
function liClick(obj,t1,t2,t3)
{
	var TempObj=document.getElementById(t1);
	var TempObj_Li=TempObj.getElementsByTagName(t2);
	
	var TempObj_Ul;
	
	for(i=1;i<TempObj_Li.length;i++)
		{
			TempObj_Li[i].className=null;
			if(TempObj_Li[i]==obj)
			{
				document.getElementById(t1+"_"+i).style.display='';
				}
			else
			{
				document.getElementById(t1+"_"+i).style.display='none';
			}
		}
	obj.className=t3;
	//alert('点了');
}
	
	
//提交表单软件下载评论
  var isSubmit=false;  //是否提交了评论
  function submitComment()
  {
     if (isSubmit)
	 {
		 alert("您的评论已经提交，请不要重复提交谢谢!");
	    //	 return;
	 }
	 
	 var Form=document.forms["FormComment"];
	 if (Form==null) Form=document.forms["zt_ly"];

	 var Content =Form.Content;
	 if (Content==null) Content=Form.ly_content;
	 
	 var ContentText = Content.value.Trim();
	 
	 if(ContentText=="" )
	 {
		alert("评论的内容不能为空！");
		Content.focus();
		return false;
	 }
	 
	 if( ContentText.length<5 || ContentText.length>1000 )
	 {
		alert("评论的内容不能小于5 大于 1000 个字符！");
		Content.focus();
		return false;
	 }
	 
	 var temp = ContentText;
	 var re = /\{.+?\}/g;        // 创建正则表达式模式
	 temp = temp.replace(re,"");
	 if (temp.Trim()=="")
	 {
		alert("对不起不能发表纯表情! 感谢您的支持！"); 
		Content.focus();
		return false;
	 }
	 
	 var ly_id
	 	 ly_id = Form.ly_id;
		 if (ly_id==null) ly_id = Form.softid;
		 
	 var CommentTpye,CommentTpyeId
	 	 CommentTpye =Form.CommentTpye;
		 if (CommentTpye==null) 
		 {
			 CommentTpyeId =0;
		 }else
		 {
			CommentTpyeId = CommentTpye.value; 
		 }
	 var Url="content=" + escape(ContentText) + "&SoftID=" +  escape(ly_id.value) + "&Action=2&CommentTpye="+CommentTpyeId;
	 
	 var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					 Content.value="";
					 //Content.disabled=true;
					 //Form.disabled=true;
//alert(requestText);
					 //alert("您的评论已经写入成功,但需要等审核才能显示出来");
					ViewComment(requestText);
	 
            } else { //页面不正常
                 //alert("写数据出错了！！"); 
            }
        }
	}
     send_request("/ajax.asp",Url,ref,true);
	 isSubmit = true;
  }
  
  //将提交的评论显示到页面上
  function ViewComment(text)
  {
	  var d = new Date(); 
	  var sd=d.toLocaleString();
	  
	  var Temp ="<dt><span><i>顶楼 </i><b >您发表的评论</b> </span><em>发表于: <font color='red'> "+ sd +" </font> </em></dt>"
      Temp +="<dd> "+ text +" <p></p></dd>"
	  
	  $("#comment_0 dl").append(Temp);
  }
  
  //提交评论表单得到焦点的时候显示验证码
  function CommentOnblur()
  {
	 document.getElementById("viewGetCode").style.display="";
  }
  //按 CTRL+回车 提交表单
  function submitForm()
  {
	  if(window.event.ctrlKey && window.event.keyCode==13)
	  {
	  	//alert("点击了");
		submitComment();
		return true;
	  }
  }
  
//首页选项卡
function switchTab(obj,num,c,d){ 
    var parentNodeObj= obj.parentNode;
	 var s=0;
	 var i=0;
	 
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		 if (parentNodeObj.childNodes[i].nodeName=="#text")//针对FF处理
		   {
			 continue;  
		   }
		 parentNodeObj.childNodes[i].className=c+ "1";
		 var labObj= document.getElementById(d + s);
		 
		// alert(d + s)
		 if(labObj !=null)
		 {
		  labObj.style.display='none';
		 if(num==s)
		  {
			  labObj.style.display=''; 
	 
		  }
		 }
		 s +=1;
	 }
	obj.className=c + "2";
}

 
	
//=================================== 网站后台专用函数 ===================================================	

//文章插入分页符
function instellPage(objtext,EditorName)
{
  var EditType="";
  var oEditor = FCKeditorAPI.GetInstance(EditorName);
  //alert(objtext);	

 if (oEditor.EditMode == FCK_EDITMODE_WYSIWYG )
 {
   var obj=document.getElementById(objtext);
   var PageText = "[page]" + obj.value + "[/page]"
 // PageText ="fffff"
  oEditor.InsertHtml(PageText);
 }else
 {
	 alert('请切换到编辑模式')
 }
}




	//后台自写填上 下载名称	
	function AutoWrite(obj)
		{
 		var temp= myform.ResName.value + " " +  myform.ResVer.value; 
  		var parent=obj.parentNode; 
 		var setInput=parent.getElementsByTagName("input")[0];
   	 	setInput.value=temp;
	 }
		
	//设置默认的下载地址前缀
   function setAddressCookie(obj)
   {
	  var objTemp=document.getElementById(obj);
	  PostCookie("AddressCookie="+ objTemp.value);
	  alert("创建:"+ objTemp.value+" 成功")
   }
   
   //读取默认的 AddressCookie 值
   function redAddressCookie()
   {
	 var objTemp=document.getElementById("AddressCookie");
	 var temp =    getCookie("AddressCookie");
	 
	 if (temp==null)temp="";
		  
		  if (objTemp!=null)
		  {
	 	 objTemp.value= temp;
		  }
	 }
   
 //============ 自动填写表单 ================
  function autoWriteInput(obj,n)
   {
	  if(obj.value.Trim() =="")
	  {
		   var o=obj.createTextRange(); 
			if(n==1)
			{
				var temp= myform.ResName.value + " " +  myform.ResVer.value; 
				obj.value=temp;
			}else
			{
				obj.value=	getCookie("AddressCookie");
			}
		var o=obj.createTextRange(); 	
		o.move("character",obj.value.length);    
  		o.select();  
	  }
	 // alert("begin")   
   }
   
 //============ 添加软件 删除界面预览 ==============
 function DelPreviewImg()
 {
	 var S_PreviewImg    = document.getElementById("PreviewImg"); 
	 if(S_PreviewImg.selectedIndex>=0)
	 {
		//alert("删除第");
		S_PreviewImg.remove(S_PreviewImg.selectedIndex);
	 }
 }
 
//============ 添加软件 添加界面预览 ==============
 function AddPreviewImg()
	{
		
		var S_TPreviewImg   = document.getElementById("TPreviewImg"); 
		var S_PreviewImg    = document.getElementById("PreviewImg"); 
		
		//alert (S_TPreviewImg)
		if (S_TPreviewImg.value !="")
			 {
				var op       = document.createElement("OPTION");
				op.value     = S_TPreviewImg.value;
				op.innerHTML = S_TPreviewImg.value;
				S_PreviewImg.appendChild(op);	
				S_TPreviewImg.value="";	
			}	
	}
	
	
//============显示当前选择行的图片 =================
	function ViewPreviewImg(obj)
	{
		var S_TPreviewImg   = document.getElementById("TPreviewImg"); 
		
		 if(obj.selectedIndex>=0)	
		 {
			S_TPreviewImg.value=obj.options[obj.selectedIndex].text;
			
			setShowSpace(obj,obj.options[obj.selectedIndex].text)
		 }
		 
      for(i=0;i<obj.length;i++)
		 {
			// obj[i].selected=true;
	     }
	}
	
	
	

	
//======文章页专用=============

//快速分页需要 jQuery 库支持 //在页面中使用 shortcutKey("#cms_showpage_text")	
//参数分页容器id，默认为#cms_showpage_text

function shortcutKey(pagecss){
	
	if(typeof passcss == "undefined") {
		pagecss = "#cms_showpage_text";
	}


	var page = $(pagecss);
	
	if(page.length  == 0) return;

	var span = document.createElement("span");
	span.innerHTML = "提示：按\"←→\"键快速翻页"
	page[0].appendChild(span);
	var a = $(pagecss + " a");
	
	
	var b = parseInt($(pagecss + " b").text());
	

	$(document).keyup( function(e){
		
		var tag = e.target.tagName.toLowerCase();
		
		if(tag === "input" || tag === "textarea" ) return;
		
		if ( e.keyCode == 37){

			if (b > 1){

				window.location.href = a[b-2].href;

			}else{
					alert('这已经是第一页了');
			}
		}

		if ( e.keyCode == 39){
			if (b < a.length ){
				window.location.href = a[b-1].href;
			}else{
					alert('你已经浏览完所有内容');
			}

		  }
	});


 }





//------------
  function Cms_Title_Click(obj)
   {
	obj.style.background="  url(images/cms_c2_2.jpg) top center'";
   }
   
//统计点次下载次数
 function softCount(SoftID,SoftLinkID)
 { 
	 var Url = "Action=6&SoftLinkID=" + escape(SoftLinkID) + "&SoftID=" + escape(SoftID)
	  var ref=function()//处理返回数据
	  {
		  if (http_request.readyState == 4) { // 判断对象状态
		    if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
			
			var requestText=http_request.responseText;
			//alert(requestText)
			}else
			{
				//var requestText=http_request.responseText;
				//alert(requestText)
			}
		  }  
	  }
	 send_request("../ajax.asp",Url,ref,true);
	 //alert(Url);
 }

//改变图片大小
function resizepic(thispic)
{
if(thispic.width>700) thispic.width=700;
}

// 鼠标滚动 无级缩放图片大小 onmousewheel="return bbimg(this)"
function bbimg(o)
{
  var zoom=parseInt(o.style.zoom, 10)||100;
  zoom+=event.wheelDelta/12;
  if (zoom>0) o.style.zoom=zoom+'%';
  return false;
}


//把网页设为首页
function ThissetHomePage()
{
	  document.body.style.behavior="url(#default#homepage)";
	 // var url="http://www.cr173.com/";
	 // alert(url)
	 // document.body.setHomePage(url); 
}

//第一次点击下载地址的时候提示设为首页
function address_click()
{
	if(getCookie("Address_Home") != "Yes") 
	{
	ThissetHomePage();
	PostCookie("Address_Home=Yes");
	}
	return true;
}

 //比列调整当前图片大小
 function ReImgSize(obj,w,h){ 
  if(obj.width>w)
   {
	   obj.width=w;
	   obj.style.border="none" 
	   }
 }
 
   
//取得radio 选中的值
 function getRadioBoxValue(radioName){ 
            var obj = document.getElementsByName(radioName);             //这个是以标签的name来取控件 
                 for(i=0; i<obj.length;i++)    { 
                  if(obj[i].checked){ 
                          return obj[i].value; 
                  } 
              }          
             return "undefined";        
}



//Html转换成Ubb
function html_trans(str) {
	str = str.replace(/\r/g,"");
	str = str.replace(/on(load|click|dbclick|mouseover|mousedown|mouseup)="[^"]+"/ig,"");
	str = str.replace(/<script[^>]*?>([\w\W]*?)<\/script>/ig,"");
	str = str.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/ig,"[url=$1]$2[/url]");
	str = str.replace(/<font[^>]+color=([^ >]+)[^>]*>(.*?)<\/font>/ig,"[color=$1]$2[/color]");
	str = str.replace(/<img[^>]+src="([^"]+)"[^>]*>/ig,"[img]$1[/img]");
	str = str.replace(/<([\/]?)b>/ig,"[$1b]");
	str = str.replace(/<([\/]?)strong>/ig,"[$1b]");
	str = str.replace(/<([\/]?)u>/ig,"[$1u]");
	str = str.replace(/<([\/]?)i>/ig,"[$1i]");
	str = str.replace(/&nbsp;/g," ");
	str = str.replace(/&amp;/g,"&");
	str = str.replace(/&quot;/g,"\"");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/<br>/ig,"\n");
	str = str.replace(/<[^>]*?>/g,"");
	str = str.replace(/\[url=([^\]]+)\]\n(\[img\]\1\[\/img\])\n\[\/url\]/g,"$2");
	str = str.replace(/\n+/g,"\n");
	str = my_format(str);
	str = str.replace(/\n/g,"\n");
	return str;
}



function my_format(str){
   var cc,tempstr;
   cc = str;
   tempstr = "";
   var ss=cc.split("\n");
   for (var i=0; i< ss.length; i++ ){
        while (ss[i].substr(0,1)==" "||ss[i].substr(0,1)=="　"){ss[i]=ss[i].substr(1,ss[i].length);}
        if (ss[i].length>0) tempstr+="　　"+ss[i]+"\n";
   }
   return tempstr;
}

 
//=========== 前台最新更新 ===================

function MakeUbb(thisForm)
{
	var obj = document.getElementById(thisForm);
	
	if(isNaN(obj.TopNum.value))
	{
		obj.TopNum.value="";
		obj.TopNum.focus();
		alert("记录条数只能为数字！！");
		return false;
	}
	
	var sUbbType
	
	if (typeof(UbbType)=="undefined")
	{
	  sUbbType=0;
	} else
	{
		 sUbbType = UbbType;
	}
 
	
	var ref=function()//处理返回数据
	{
		  if (http_request.readyState == 4) 
		   { // 判断对象状态
            if (http_request.status == 200)
			{ // 信息已经成功返回，开始处理信息 
			  if (sUbbType==1)
			   {
				  // UbbText=http_request.responseText;
				   //makeCheckBtn();
				   makeCheckBtn(http_request.responseText);
			   }else
			   {
				document.getElementById("List").innerHTML=unescape(http_request.responseText);
			   }

            } else { //页面不正常
			    alert(  http_request.responseText);
                // alert("您所请求的页面有异常。");
            }
          }
	}
	
   document.getElementById("List").innerHTML = "正在查询中..."; 
   var SendTemp   = "Action=8&IsSize=" + escape(obj.IsSize.checked) +"&IsCateID=" + escape(obj.IsCateID.checked) +"&IsAtrImages=" + escape(obj.IsAtrImages.checked)+"&IsZhilian=" + escape(obj.IsZhilian.checked);
   		SendTemp += "&IsLanguage=" + escape(obj.IsLanguage.checked) +"&IsSoftSystem=" + escape(obj.IsSoftSystem.checked) +"&IsSoftViewImg=" + escape(obj.IsSoftViewImg.checked);
		SendTemp += "&IsContent=" + escape(obj.IsContent.checked)+"&IsHttp=" + escape(obj.IsHttp.checked) +"&IsXunLei=" + escape(obj.IsXunLei.checked);
		SendTemp += "&Bdate=" + escape(obj.Bdate.value)+"&Edate=" + escape(obj.Edate.value) +"&TopNum=" + escape(obj.TopNum.value);
		SendTemp += "&Tradio=" + escape(getRadioBoxValue("Tradio"))+"&order="+ escape(getRadioBoxValue("order"))+"&Keys_u="+ escape(obj.Keys_u.value);
		SendTemp +="&UbbType=" + sUbbType;
		
		
		if (document.getElementById("ContentNum")!=null)
		{
		  SendTemp += "&ContentNum=" + escape(obj.ContentNum.value);
		}
		
		if (document.getElementById("IsDownLink")!=null)
		{
		  SendTemp += "&IsDownLink=" + escape(obj.IsDownLink.checked);
		}
		
		
       send_request("ajax.asp",SendTemp,ref,true); 
      // alert(SendTemp);
}
//===========================================



//senfe("changecolor","#f8fbfc","#e5f1f4","#ecfbd4","#bce774"); 
////changecolor("表格名称","奇数行背景","偶数行背景","鼠标经过背景","点击后背景"); 

function senfe(o,a,b,c,d){ 
var t=document.getElementById(o).getElementsByTagName("tr");  
for(var i=0;i<t.length;i++){    t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b; 
t[i].onclick=function(){     if(this.x!="1"){      this.x="1";//本来打算直接用背景色判断，FF获取到的背景是RGB值，不好判断   
this.style.backgroundColor=d;
}else
{
	this.x="0";  
	this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;  
	}   
	}  
t[i].onmouseover=function(){ if(this.x!="1")this.style.backgroundColor=c; }   
t[i].onmouseout=function(){ 
if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b; } } }



//========================ICO显示图片============================================
var mailshowed=false; //是否显示列表图标
var showDiv="ListSpaces";
//===例表页显示软件大图======
function setShowSpace(obj,img)
{
  if (img=='') return;
  var sobj= document.getElementById(showDiv);
  if (sobj==null)
  {  
	var aNode =document.createElement("div");
	aNode.id=showDiv;
	aNode.innerHTML = "";
	aNode.onmouseout = function(){ closelisetSpace() };
	
	var Prean=document.getElementById("top");
	
	if (Prean==null)
	{
		obj.parentNode.insertBefore(aNode);  
	}
	else
	{
		 Prean.parentNode.insertBefore(aNode,Prean);  
	}
   }
		var x=obj.offsetLeft;
		var tempobj;
	        tempobj =obj;
		while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
		var y= obj.offsetTop;
		 tempobj =obj;
		 
		while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
			
		var list=document.getElementById(showDiv);
	    if(list!= null)
		{
		    list.innerHTML="<img src="+img+">";
		    list.style.left= x + "px";
	        list.style.top=y + obj.clientHeight +"px";
			list.style.display='';
			//alert(list.tagName);
		}
	     //setTimeout("setShowSpace('showList')",100);	 
}
//关闭
function closelisetSpace()
{
	 var sobj= document.getElementById(showDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//=======================================================


//============游戏网站用显示图片 Begin ===================

var showYouxiPicDiv="divLable";
var timer
function showYouxiPic(obj,softid)
{
   if (softid==''||obj==null ) return;
	
   var Url="Action=9&id="+ softid;
   
   var img=""
    
	
	var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
					 img = requestText;
            } else { //页面不正常
                // alert("写数据出错了！！");
            }
        }
	 }
	 
    send_request("../ajax.asp",Url,ref,false);
    if (img==''|| img=="NO") return;
	var list= document.getElementById(showYouxiPicDiv);
 
	var divListImg = list.getElementsByTagName("div")[1];
		divListImg.innerHTML=img
	
	var x=obj.offsetLeft;
	var tempobj;
	    tempobj =obj;
	while(tempobj=tempobj.offsetParent){
          x+=tempobj.offsetLeft;
         }	
		 
	var y= obj.offsetTop;
		 tempobj =obj;
		 
	while(tempobj=tempobj.offsetParent){
           y+=tempobj.offsetTop;
         }
	list.style.top=y ;
	
	if((document.body.scrollWidth - x)<(document.body.scrollWidth/2))
	{
	 list.style.left = (x - 500)+"px";;
	}else
	{
	 list.style.left= x + obj.clientWidth +"px";
    }
	list.style.display='block';
}

function closeshowYouxiPic()
{
	var sobj= document.getElementById(showYouxiPicDiv);
	var posSel=sobj.style.display;
	if(posSel=="block"){
		timer = setTimeout("showYouxiPicDiv_hide()", 500);
	}	
}

function showYouxiPicDiv_mouseover(){
	try{window.clearTimeout(timer);}catch(e){}
}

function showYouxiPicDiv_hide(){
	 var sobj= document.getElementById(showYouxiPicDiv);
	 if (sobj!=null)
	 {
		 sobj.style.display='none';
	 }
}

//============游戏网站用显示图片 End =====================

//插入表情图标
function insFace(id,itrm)
{
	var obj=document.getElementById(itrm);
	
	//obj.innerHTML = obj.innerHTML + "{f:"+id+"}";	
	obj.value += "{f:"+id+"}";
}


//=================投票===============================================
var isVote=false;  //是否已经投过票了
//投票BEGIN
function sEval(softid,num,din,cai,Tpye)
{
	if(isVote)
	{
		alert('您已经投过票了,请不要重复投票,感谢您的支持!!');
		return;
	}
	var Temp="Action=0&softid="+ escape(softid) + "&num=" +escape(num)+"&type="+ Tpye; //发送的数据
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
					ReadMark(softid,din,cai,Tpye);
				 
				  alert('投票成功!!');
            } else { //页面不正常
			      
                // alert("您所请求的页面有异常。");
            }
        }
	 };
	send_request("../ajax.asp",Temp,RequestFunction,false);
	isVote = true;
	//alert(Temp);
}
//投票End

//读取投票数据 Begin
function ReadMark(softid,din,cai,Tpye)
{	
	var Temp="Action=1&softid="+ escape(softid)+"&type="+ Tpye; //发送的数据

	var objTemp=document.getElementById(din).getElementsByTagName("div")[1].getElementsByTagName("div");
	
	var AbetImg=objTemp[0].getElementsByTagName("span")[0];
	var AbetNum=objTemp[1];
	
		 objTemp=document.getElementById(cai).getElementsByTagName("div")[1].getElementsByTagName("div");
	var ArgueImg=objTemp[0].getElementsByTagName("span")[0];;
	var ArgueNum=objTemp[1];
	
	var RequestFunction=function() {  //返回处理函数
		if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var TempText=http_request.responseText;
 
				var	 TempText_1=TempText.split("|")[0];
				var  TempText_2=TempText.split("|")[1];
					
				var TempText_3= parseInt(TempText_1) + parseInt(TempText_2);
				if (TempText_3 == 0)
				{
					var a =50;
					var b=50;
				}else
				{
				var a =parseInt(parseInt(TempText_1) /TempText_3*100)
				var b= (100 - parseInt(parseInt(TempText_1) /TempText_3*100))
				}
    
				    AbetNum.innerHTML  = "%" + a +"(" + TempText_1 +")";
					ArgueNum.innerText = "%" +b +"(" + TempText_2 +")";;

					AbetImg.style.width = a+"%";
					ArgueImg.style.width = b+"%" ;
						document.getElementById("decimal_unm").innerHTML= a/10;
					
					
					
					if(a>=90){document.getElementById("asymarkimg1").src="/skin/star/10.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>85){document.getElementById("asymarkimg1").src="/skin/star/9.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>=80){document.getElementById("asymarkimg1").src="/skin/star/8.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>65){document.getElementById("asymarkimg1").src="/skin/star/7.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>=60){document.getElementById("asymarkimg1").src="/skin/star/6.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>45){document.getElementById("asymarkimg1").src="/skin/star/5.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>=40){document.getElementById("asymarkimg1").src="/skin/star/4.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>25){document.getElementById("asymarkimg1").src="/skin/star/3.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else if(a>=5){document.getElementById("asymarkimg1").src="/skin/star/2.gif";document.getElementById("asymarkimg1").alt=a+"%";}
					else {document.getElementById("asymarkimg1").src="/skin/star/1.gif";document.getElementById("asymarkimg1").alt=a+"%";}
                
            } else { //页面不正常
                // alert("您所请求的页面有异常");
            }
        }
	 };
     
	 send_request("../ajax.asp",Temp,RequestFunction,false);
	//AbetNum.innerText="5645";	
}
//读取投票数据 End


//==========投票第二种方案 Begin=================
function ngsEval(id,goodid,badid,verid,type)
{
	var objgood = $(goodid);
	var objbad = $(badid);
 
	objgood.css({cursor:"pointer"});
	
	 ngSendEval(id,goodid,badid,verid,0,type);
	 
	objgood.click(function (){ ngSendEval(id,goodid,badid,verid,1,type) ; isVote=true; });
	objbad.click(function (){ ngSendEval(id,goodid,badid,verid,2,type); isVote=true; });
}

function ngSendEval(id,goodid,badid,verid,num,type)
{
   if(isVote && num>0)
	{
		 alert('您已经投过票了,请不要重复投票,感谢您的支持!!')
		 return true;
	}
	
 var url="action=3&id="+id+"&num="+num+"&type="+type;
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListEval(goodid,badid,verid,msg);
   }
});
}

function ListEval(goodid,badid,verid,msg){
	var objgoodimg = $(goodid + " img");
	var objgoodem = $(goodid + " em");

	var objgoodb = $(goodid + " b");
 
	
	var objbadimg = $(badid + " img");
	var objbadem = $(badid + " em");

	var objbadb = $(badid + " b");
	
	
	var objver = $(verid);
	
	var dataObj=eval("("+msg+")");//转换为json对象
	
	
	objgoodimg.eq(0).animate({width: "1%"},200);
	objgoodimg.eq(0).animate({width: +dataObj.Percentage[0]+ "%"},"slow");
	
	objbadimg.eq(0).animate({width: "1%"},200);
	objbadimg.eq(0).animate({width: +dataObj.Percentage[1]+ "%"},"slow");
	
	objgoodem.eq(0).html(dataObj.Percentage[0]+ "%" + "("+ dataObj.Num[0] +")");
	objbadem.eq(0).html(dataObj.Percentage[1]+ "%"+ "("+ dataObj.Num[1] +")");
	
	objgoodb.eq(0).html(dataObj.Num[0] );
	objbadb.eq(0).html(dataObj.Num[1] );
	
	objver.html(dataObj.Very[0])	
	 
	
}
//==========投票第二种方案 End=================


//====留言专用===============
function countLyNum(obj,ttextObj) //统计留言字符数
{
	//alert('sss');
	var textObj=document.getElementById(ttextObj);
	var num=obj.innerHTML.length;
	if(num>500)
	{
		alert("只允许输入500个字符，超过部份将自动删除");
		obj.innerHTML = obj.innerHTML.substr(1,500);
	}
	if (textObj!=null)
	{
		textObj.innerHTML=num;
	}
}

//================自动搜索专用=================
function autoSearch()
{
	var autooptions;
	
	autooptions = {
		  serviceUrl:'/ajax.asp',
		  minChars:1, 
    	  delimiter: /(,|;)\s*/, // regex or character
   		  maxHeight:400,
    	  // width:300,
   		  zIndex: 9999,
    	  deferRequestBy: 0, //miliseconds
  		  params: {action:'15' }, //aditional parameters
   		   //default is false, set to true to disable caching
    	  // callback function:
    	   onSelect: function(value, data){ 
		   
		   window.location=data;
		     },
   	   	  // local autosugest options:
   	      //lookup: ['January', 'February', 'March', 'April', 'May'] //local lookup values 
		  noCache: true
		  };
	
	if($('#searchbox').length>0)
	{
		var a1 = $('#searchbox').autocomplete(autooptions);   
	}
	
}

//============文章心情===========

function SetMoon(id,objid)
{
	var objb=$('#'+objid+ ' b');
	var objspan=$('#'+objid+ ' span');
	var objem=$('#'+objid+ ' em');
	var countid= objem.length;
	
	objem.css({cursor:"pointer"});
	
	//alert(countid)
	objem.click(function (){ SendMoon(id,countid,$(this).attr('name'),objid)})
	
	SendMoon(id,countid,0,objid)
		
}

function SendMoon(id,countid,sendid,objid)
{
  var url="action=17&id="+id+"&countid="+countid+"&sendid="+sendid+""
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListMoon(msg,objid)  ;
   }
});
  

}

function ListMoon(msg,objid)
{  
	var objb=$('#'+objid+ ' b');
	var objspan=$("#"+objid + "  >ul>li> span >  img");
	var objem=$('#'+objid+ ' em');
	var countid= objb.length;
	
	//var aMsg=msg.split(",")
	var dataObj=eval("("+msg+")");//转换为json对象
	//alert(dataObj.data.length);//输出root的子对象数量
	//alert(msg);//输出root的子对象数量 
	//alert(countid)
	
	$('#'+objid+ ' label').html(dataObj.CountNumBer)
	 
	for(var i=0;i<countid;i++)
	{
		 objb.get(i).innerHTML= dataObj.Num[i];
		 objspan.eq(i).hide();
		// objspan.eq(i).attr('height',dataObj.data[i]);
		objspan.eq(i).css('height',dataObj.data[i] + '%')
		 
		 objspan.eq(i).slideDown("slow");
	}
	
}

//发送报错信息
function senderror(id,obj)
{
	var Content= document.getElementById(obj);
	var CommentTpyeId = 3
	
	if (Content.value.Trim().length<1) 
	{
		alert("请提供报错信息谢谢!!")
		return false;
	}
	
	var Url="content=" + escape(Content.value) + "&SoftID=" +  escape(id) + "&Action=2&CommentTpye="+CommentTpyeId;
	
	  var ref=function()//处理返回数据
	 	{
		  if (http_request.readyState == 4) { // 判断对象状态
            if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
				var requestText=http_request.responseText;
                 if(requestText=="OK") 
				 {
					alert("你的报错信息已经提交感谢您的支持。");
					Content.value="";
					
				 }else
				 {alert(requestText);}
            } else { //页面不正常
                 alert("写数据出错了！！"); 
            }
        }
	}
   
      send_request("/ajax.asp",Url,ref,true);
	  
	 //alert(Url)
	
	return true;
	
}

//评论页读取顶
function BindDing(objtext,id,CommentTpye)
{
	var obj=$(objtext)
	//var sobj = obj..$("a")
	
	if (obj.length==0) return false;
	 
	 for (var i=0 ;i<obj.length;i++)
	 {
	  var sobj = obj.eq(i).find("a")
	  var spanobj = obj.eq(i).find("span")
	  
	 // alert(sobj.length)	

	  sobj.click(function (){ 
						   SendDing($(this).parent().attr("id"));
						   
						   var  spanobj = $(this).parent().find("span")
						   spanobj.html(parseInt(spanobj.html())+1);
						    $(this).unbind();
							
						    $(this).attr("title","您已经顶过了");
							
						   })
	 }
	ReadDing(objtext,id,CommentTpye)	
}

function SendDing(id)//发送顶
{
	//alert(id)
	var url="action=19&id="+id
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
     // alert(msg)  ;
   }
});
}

function ReadDing(objtext,id,CommentTpye)
{
	var obj=$(objtext)
	var sendid=""
	for (var i=0 ;i<obj.length;i++)
	{
		sendid+=obj.eq(i).attr("id");
		if (i<(obj.length-1)) sendid+=",";
	}
  var url="action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
 //alert(url)
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListDing(objtext,msg)  ;
   }
});	
}

function ListDing(objtext,msg) //显示顶的数据
{
	//alert(msg)
	var obj=$(objtext)
	var dataObj=eval("("+msg+")");//转换为json对象
	 for (var i=0 ;i<obj.length;i++)
	 { 
	   var spanobj = obj.eq(i).find("span")
	   var sid = obj.eq(i).attr("id");
	   for (var y=0;y < dataObj.ID.length;y++)
	   {
		   if (sid == dataObj.ID[y])
		   {
			 spanobj.html(dataObj.Ding[y]);
			 break;
		   }
	   }
	}	
}


//投票 需要 JQ支持  
//function SendVote(id,sobj,ref)

function SendVote(id,sobj,ref)
{
	var obj = $(sobj +" input");
	var temp='';
	for(var i=0; i<obj.length; i++)
	{
		if (obj.eq(i).attr("checked")==true)
		{
			if (temp !='') temp +=',';
			temp +=  i;
		}
		obj.eq(i).attr("checked",false);
	}
	
	if (temp=='') {
		alert('请选择一个项目!!')
		return;
	}
	
  var url="action=21&id="+id+"&v="+ escape(temp);
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}

//单个投票ＪＱ支持
function OneVote(id,ni,ref)
{
  var url="action=21&id="+id+"&v="+ escape(ni);
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//读取投票数据 ＪＱ支持
function ReadVote(id,ref)
{
  var url="action=21&id="+id+"&v=";
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ref(msg)
   }
});
}


//设置控制的显示的数值
//sobj　JQ选择器 msg 数据 , iatt 是否百分比 ,att CSS Name
//列子 Listvote('#vote b',msg,true,'') 
//	   Listvote('#vote em img',msg,false,'width') 
function Listvote(sobj,msg,iatt,att) //显示顶的数据
{
	//alert(msg)
	var obj=$(sobj)
	var dataObj=eval("("+msg+")");//转换为json对象
	var PNum=0
	 
		for (var i=0;i<obj.length; i++)
		{
			if (iatt)
			{
				obj.eq(i).html(dataObj.Num[i]);  
			}else
			{
				PNum =  (dataObj.Num[i] /dataObj.NumBer *100).toFixed(1);
				if (att=='')
				{
				 obj.eq(i).html(PNum + "%" ); 
				}else
				{
				  obj.eq(i).css(att, PNum + '%');
				 // alert(obj.eq(i).attr(att))  
				}
			}
		}	  
}

//选项卡
function onSelect(obj,ch)
 {
	 var parentNodeObj= obj.parentNode;
	 var s=0;
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		// alert("第" +i +"次")
		if (parentNodeObj.childNodes[i].nodeName=="#text")
		   {
			 continue;  
		   }
		parentNodeObj.childNodes[i].className="tab_1";
		var newObj=document.getElementById(ch + "_" + s);
		
		if(newObj!=null)
		{
			 newObj.style.display='none';
			 if(parentNodeObj.childNodes[i]==obj)
			 {
				newObj.style.display='';	
			 }
		}
		s +=1;
	 }
	 obj.className="tab_2";
 }
//IE6图片自动缩放
function imgFix() { 
  var widthRestriction = 600; 
  var heightRestriction = 600; 
  var allElements = document.getElementsByTagName('*')   
  for (var i = 0; i < allElements.length; i++) 
  { 
    if (allElements[i].className.indexOf('soft-img') >= 0) 
        { 
      var imgElements = allElements[i].getElementsByTagName('img'); 
      for (var j=0; j < imgElements.length; j++) 
           { 
			  if ( imgElements[j].width > widthRestriction ) 
			     { 
				    imgElements[j].width = widthRestriction; 
			     } 		 
           } /*for j*/ 
       } 
  }/*for i*/ 
}


/*skin2011 js newcommon.js*/
/*!
 * jQuery.mouseDelay.js v1.2
 * http://www.planeart.cn/?p=1073
 * Copyright 2011, TangBin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');

/*!
 * jQuery Form Plugin
 * version: 2.83 (11-JUL-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($){$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
method=this.attr('method');action=this.attr('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var n,v,a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;for(n in options.data){if(options.data[n]instanceof Array){for(var k in options.data[n]){a.push({name:n,value:options.data[n][k]});}}
else{v=options.data[n];v=$.isFunction(v)?v():v;a.push({name:n,value:v});}}}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a);if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm();});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||options;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};var fileInputs=$('input:file',this).length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);if(options.iframe!==false&&(fileInputs||options.iframe||multipart)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){fileUpload(a);});}
else{fileUpload(a);}}
else{if($.browser.msie&&method=='get'){var ieMeth=$form[0].getAttribute('method');if(typeof ieMeth==='string')
options.type=ieMeth;}
$.ajax(options);}
this.trigger('form-submit-notify',[this,options]);return this;function fileUpload(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var useProp=!!$.fn.prop;if(a){for(i=0;i<a.length;i++){el=$(form[a[i].name]);el[useProp?'prop':'attr']('disabled',false);}}
if($(':input[name=submit],:input[id=submit]',form).length){alert('Error: Form elements must not have name or id of "submit".');return;}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr('name');if(n==null)
$io.attr('name',id);else
id=n;}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;$io.attr('src',s.iframeSrc);xhr.error=e;s.error&&s.error.call(s.context,xhr,e,status);g&&$.event.trigger("ajaxError",[xhr,s,e]);s.complete&&s.complete.call(s.context,xhr,e);}};g=s.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
return;}
if(xhr.aborted){return;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=frame.contentWindow?frame.contentWindow.document:frame.contentDocument?frame.contentDocument:frame.document;return doc;}
function doSubmit(){var t=$form.attr('target'),a=$form.attr('action');form.setAttribute('target',id);if(!method){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state.toLowerCase()=='uninitialized')
setTimeout(checkState,50);}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);timeoutHandle&&clearTimeout(timeoutHandle);timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){extraInputs.push($('<input type="hidden" name="'+n+'" />').attr('value',s.extraData[n]).appendTo(form)[0]);}}
if(!s.iframeTarget){$io.appendTo('body');io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);}
setTimeout(checkState,15);form.submit();}
finally{form.setAttribute('action',a);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
try{doc=getDoc(io);}
catch(ex){log('cannot access response document: ',ex);e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut)
return;}
io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body==null||doc.body.innerHTML=='')){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml)
s.dataType='xml';xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=s.dataType||'';var scr=/(json|script|text)/.test(dt.toLowerCase());if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerHTML;}
else if(b){xhr.responseText=b.innerHTML;}}}
else if(s.dataType=='xml'&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,s.dataType,s);}
catch(e){status='parsererror';xhr.error=errMsg=(e||status);}}
catch(e){log('error caught: ',e);status='error';xhr.error=errMsg=(e||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){s.success&&s.success.call(s.context,data,'success',xhr);g&&$.event.trigger("ajaxSuccess",[xhr,s]);}

else if(status){if(errMsg==undefined)
errMsg=xhr.statusText;s.error&&s.error.call(s.context,xhr,status,errMsg);g&&$.event.trigger("ajaxError",[xhr,s,errMsg]);}
g&&$.event.trigger("ajaxComplete",[xhr,s]);if(g&&!--$.active){$.event.trigger("ajaxStop");}
s.complete&&s.complete.call(s.context,xhr,status);callbackProcessed=true;if(s.timeout)
clearTimeout(timeoutHandle);setTimeout(function(){if(!s.iframeTarget)
$io.remove();xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){$.error&&$.error('parsererror');}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};}};$.fn.ajaxForm=function(options){if(this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',function(e){if(!e.isDefaultPrevented()){e.preventDefault();$(this).ajaxSubmit(options);}}).bind('click.form-plugin',function(e){var target=e.target;var $el=$(target);if(!($el.is(":submit,input:image"))){var t=$el.closest(':submit');if(t.length==0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!=undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);});};$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic){var a=[];if(this.length===0){return a;}
var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n){continue;}
if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n,value:$(el).val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:n,value:v});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(){return this.each(function(){$('input,select,textarea',this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};function log(){var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}};})(jQuery);


/*!
 * jQuery blockUI plugin
 * Version 2.37 (29-JAN-2011)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
;(function($){if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)){alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);return;}
$.fn._fadeIn=$.fn.fadeIn;var noOp=function(){};var mode=document.documentMode||0;var setExpr=$.browser.msie&&(($.browser.version<8&&!mode)||mode<8);var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!mode;$.blockUI=function(opts){install(window,opts);};$.unblockUI=function(opts){remove(window,opts);};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout==undefined)timeout=3000;$.blockUI({message:$m,fadeIn:700,fadeOut:1000,centerY:false,timeout:timeout,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS});};$.fn.block=function(opts){return this.unblock({fadeOut:0}).each(function(){if($.css(this,'position')=='static')
this.style.position='relative';if($.browser.msie)
this.style.zoom=1;install(this,opts);});};$.fn.unblock=function(opts){return this.each(function(){remove(this,opts);});};$.blockUI.version=2.37;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'50%',left:'50%',color:'#fff520',border:'3px solid #fff',backgroundColor:'#393','-webkit-border-radius':'5px','-moz-border-radius':'5px','border-radius':'5px',cursor:'default'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.3,cursor:'default'},growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:'blockMsg'};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var full=(el==window);var msg=opts&&opts.message!==undefined?opts.message:undefined;opts=$.extend({},$.blockUI.defaults,opts||{});opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});var css=$.extend({},$.blockUI.defaults.css,opts.css||{});var themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)
remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)
data.parent.removeChild(node);}
var z=opts.baseZ;var lyr1=($.browser.msie||opts.forceIframe)?$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>'):$('<div class="blockUI" style="display:none"></div>');var lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var lyr3,s;if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>';}
else if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>';}
else if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';}
else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';}
lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content');}
else
lyr3.css(css);}
if(!opts.applyPlatformOpacityRules||!($.browser.mozilla&&/Linux/.test(navigator.platform)))
lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if($.browser.msie||opts.forceIframe)
lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par);});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'});}
var expr=setExpr&&(!$.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.boxModel)
$('html,body').css('height','100%');if((ie6||!$.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0;}
$.each([lyr1,lyr2,lyr3],function(i,o){var s=o[0].style;s.position='absolute';if(i<2){full?s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"'):s.setExpression('height','this.parentNode.offsetHeight + "px"');full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT);}
else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0;}
else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression);}});}
if(msg){if(opts.theme)
lyr3.find('.ui-widget-content').append(msg);else
lyr3.append(msg);if(msg.jquery||msg.nodeType)
$(msg).show();}
if(($.browser.msie||opts.forceIframe)&&opts.showOverlay)
lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)
lyr2._fadeIn(opts.fadeIn,cb1);if(msg)
lyr3._fadeIn(opts.fadeIn,cb2);}
else{if(opts.showOverlay)
lyr2.show();if(msg)
lyr3.show();if(opts.onBlock)
opts.onBlock();}
bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(':input:enabled:visible',pageBlock);if(opts.focusInput)
setTimeout(focus,20);}
else
center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){full?$.unblockUI(opts):$(el).unblock(opts);},opts.timeout);$(el).data('blockUI.timeout',to);}};function remove(el,opts){var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout');}
opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);var els;if(full)
els=$('body').children().filter('.blockUI').add('body > .blockUI');else
els=$('.blockUI',el);if(full)
pageBlock=pageBlockEls=null;if(opts.fadeOut){els.fadeOut(opts.fadeOut);setTimeout(function(){reset(els,data,opts,el);},opts.fadeOut);}
else
reset(els,data,opts,el);};function reset(els,data,opts,el){els.each(function(i,o){if(this.parentNode)
this.parentNode.removeChild(this);});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;if(data.parent)
data.parent.appendChild(data.el);$(el).removeData('blockUI.history');}
if(typeof opts.onUnblock=='function')
opts.onUnblock(el,opts);};function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))
return;if(!full)
$el.data('blockUI.isBlocked',b);if(!opts.bindEvents||(b&&!opts.showOverlay))
return;var events='mousedown mouseup keydown keypress';b?$(document).bind(events,opts,handler):$(document).unbind(events,handler);};function handler(e){if(e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back)},10);return false;}}}
var opts=e.data;if($(e.target).parents('div.'+opts.blockMsgClass).length>0)
return true;return $(e.target).parents().children().filter('div.blockUI').length==0;};function focus(back){if(!pageBlockEls)
return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)
e.focus();};function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0';};function sz(el,p){return parseInt($.css(el,p))||0;};})(jQuery);

// jQuery JCShare plugin 0.2
;(function($){$.fn.extend({share:function(options){options=$.extend({},$.Share.defaults,options);return new $.Share(this,options)}});$.Share=function(input,options){var title=options.title?options.title:document.title;var content=options.content?options.content:document.title;var url=options.url?options.url:document.URL;$.each(options.sharePlace,function(name,tag){input.find(tag).each(function(){var linkurl=eval("options.dictlink."+name+"(this, title, content, url);");switch(options.popupModel){case"link":$(this).attr("target",options.target);$(this).attr("href",linkurl);break;case"window":$(this).bind("click",function(){window.open(linkurl,'','width=700, height=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no')});break;case"showdialog":$(this).bind("click",function(){window.showModalDialog(linkurl,new Object(),'dialogWidth=700px;dialogHeight=400px')});break}})})};$.Share.defaults={share:".share",sharePlace:{kaixin:".share_kaixin",sina:".share_sina",renren:".share_renren",email:".share_email",douban:".share_douban",qq:".share_qq",google:".share_google",twitter:".share_twitter"},popupModel:"link",title:"",content:"",url:"",target:"_blank",dictlink:{kaixin:function(div,title,content,url){return"http://www.kaixin001.com/repaste/share.php?rtitle="+encodeURIComponent(title)+"&rurl="+encodeURIComponent(url)+"&rcontent="+encodeURIComponent(content)},sina:function(div,title,content,url){return"http://v.t.sina.com.cn/share/share.php?appkey=2000229224&url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},douban:function(div,title,content,url){return"http://www.douban.com/recommend/?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},renren:function(div,title,content,url){return"http://share.xiaonei.com/share/buttonshare.do?link="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},qq:function(div,title,content,url){return"http://v.t.qq.com/share/share.php?title="+encodeURI(title)+"&url="+encodeURIComponent(url)}}}})(jQuery);

//表单默认值
function inputDefault(obj){
	  var $obj = $(obj);
	  var defaultVal = $obj.val();
	  $obj.focus(function(){
			 var iptval = $(this).val();
			 if(!this.defaultValue){
				  this.defaultValue = defaultVal;
			 };
			 if(iptval==this.defaultValue){
				  $(this).val("");
			 }
			 $(this).removeClass("grey9").addClass("black");
	  });
	  $obj.blur(function(){
			 var iptval = $(this).val();
			 if(iptval==""){
				  $(this).val(this.defaultValue);
				  $(this).removeClass("black").addClass("grey9");
			 }
	  });
};

//评论提交前验证
function cmtBefore(formData, jqForm, options) { 	
			var form = jqForm[0]; 
			if (form.content.value=='' || form.content.value=='我来说两句...') { 
				$.blockUI({ 
						message:  '<p class="f18 fb pt10 pb10">请输入评论内容</p>',
						css: {
								marginLeft: '-50px', 
								top:   '60%',
								width: '300px',
								textAlign:	'center'
						}
				});
				setTimeout($.unblockUI, 1000);
				$("#cmtMsg").focus();
				return false; 
			}; 
			if (form.content.value.length < 3) { 
				$.blockUI({ 
						message:  '<p class="f18 fb pt10 pb5">您输入的评论太短：少于3个汉字</p><p class="f18 fb pb10">请重新输入</p>',
						css: {
								marginLeft: '-50px', 
								top:   '60%',
								width: '320px',
								textAlign:	'center'
						}
				});
				setTimeout($.unblockUI, 1200);
				$("#cmtMsg").focus();
				return false; 
			};
			if (form.content.value.length > 200) { 
				$.blockUI({ 
						message: '<p class="f18 fb pt10 pb5">您输入的评论过长</p><p class="f18 fb pb10">最多200个汉字</p>',
						css: {
								marginLeft: '-50px', 
								top:   '60%',
								width: '300px',
								textAlign:	'center'
						}
				});
				setTimeout($.unblockUI, 1200);
				return false; 
			};
			var queryString = $.param(formData); 
			return true; 
};


/*hoverIE6*/
function hoverIE6(obj){
		    $(obj).hover(function(){
					$(this).addClass("hover");
			},function(){
					$(this).removeClass("hover");
			});
};

//超出字符省略
function ellipsis(obj,len){
		  $(obj).each(function(){
			  var objString = $(this).text();
			  var objLength = $(this).text().length;
			  var num = len;
			  if(objLength > num){
				  objString = $(this).text(objString.substring(0,num)+" ...");
			  }
		  });
};
//跳转到评论，下载地址等
function scrollTop(obj_btn,obj_target){
		  $(obj_btn).click(function(){
					 $(this).attr("target","_self");
					 var scroll_target = $(obj_target).offset().top;
					 $('html,body').animate({scrollTop:scroll_target},800);
					 return false;
		  });
};

//图片点击放大 新 by 李楠
function viewImg(obj,id){
	  $(obj).css("cursor","pointer").attr("title","点击查看原图")
	  $(obj).each(function(){
		      $(this).click(function(){
				    window.open("/viewimg_"+id+"_1.html?"+ this.src,"n","");
			  });
	  });
};

//选项卡
function myTab(obj){
		  var obj_target = $(obj).find(".tabHd");
		  $(obj_target).hover(function(){
			  var myThis = $(this);
			  if($(myThis).is(".current")){
				  return false;
			  };
			  delayTime = setTimeout(function() {
				   $(myThis).addClass("current").siblings(".tabHd").removeClass("current").end()
				            .siblings(".tabBd").stop(true,true).hide().end()
				            .next(".tabBd").stop(true,true).show();
			  },150)
		  },
		  function(){
			  clearTimeout(delayTime);
		  });
};
//下载排行
function downRank(obj){
		  $(obj).find(".j_downRank_item").mouseenter(function(){
				   $(this).children("dl").stop(true,true).fadeIn(400).end()
						   .children("p").hide().end()
						   .siblings().children("dl").hide().end()
						   .children("p").show();
		  });		        
};

//向下滚动 lj
function scrollDown(scrollWrap){
     $(scrollWrap).hover(function(){
            clearInterval(scrtime);
     },function(){
            scrtime = setInterval(function(){
                      var $obj = $(scrollWrap).children(".j_scrollBox");
                      var itemHeight = $obj.find(".j_item:last").height();
                      $obj.animate({marginTop: itemHeight},600,function(){
                            $obj.find(".j_item:last").prependTo($obj);
                            $obj.find(".j_item:first").hide().fadeIn(600);
                            $obj.css({marginTop:0});
                      });   
            },2600);
     }).trigger("mouseleave");
};

//支持效果 lj
//评论页读取顶
function BindDing(objtext,id,CommentTpye)
{
    var obj=$(objtext)
    //var sobj = obj..$("a")
    
    if (obj.length==0) return false;
      //alert(obj.length) 
     for (var i=0 ;i<obj.length;i++)
     {
      var sobj = obj.eq(i).find("a").first();
      //alert(sobj.length)  

      sobj.click(function (){ 
                           SendDing($(this).parent().attr("id"));
                           
                           var  spanobj = $(this).parent().find("span")
                           spanobj.html(parseInt(spanobj.html())+1);
						   spanobj.css({"color":"#999"});
						   
						   var emobj = $(this).parent().find("em");
						   emobj.css({"color":"#999"});
						   
                            $(this).unbind();                            
                            $(this).attr("title","您已经顶过了").css({"cursor":"default","color":"#999"});														
							                            
                           })
     }
    ReadDing(objtext,id,CommentTpye)    
}

function SendDing(id)//发送顶
{
    //alert(id)
    var url="action=19&id="+id
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
     // alert(msg)  ;
   }
});
}

function ReadDing(objtext,id,CommentTpye)
{
    var obj=$(objtext)
    var sendid=""
    for (var i=0 ;i<obj.length;i++)
    {
        sendid+=obj.eq(i).attr("id");
        if (i<(obj.length-1)) sendid+=",";
    }
  var url="action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
 //alert(url)
  $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListDing(objtext,msg);
   }
}); 
}

function ListDing(objtext,msg) //显示顶的数据
{
    //alert(msg)
    var obj=$(objtext)
    var dataObj=eval("("+msg+")");//转换为json对象
     for (var i=0 ;i<obj.length;i++)
     { 
       var spanobj = obj.eq(i).find("span")
       var sid = obj.eq(i).attr("id");
       for (var y=0;y < dataObj.ID.length;y++)
       {
           if (sid == dataObj.ID[y])
           {
             spanobj.html(dataObj.Ding[y]);
             break;
           }
       }
    }   
}

function gotoTop(min_height){
    //预定义返回代码，样式默认为不显示
	if($('#download').length>0){
		var gotoTop_html = '<p id="gotoBox"><i></i><s></s></p>';
		min_height = 700;
	}else{
	    var gotoTop_html = '<p id="gotoBox"><i></i></p>';
		//获取页面的最小高度，无传入值则默认为400像素
        min_height ? min_height = min_height : min_height = 400;
	}
    $("#page").after(gotoTop_html);
    $("#gotoBox i").click(//定义返回顶部点击向上滚动的动画
        function(){$('html,body').animate({scrollTop:0},700);
    }).hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
        function(){$(this).addClass("hover");},
        function(){$(this).removeClass("hover");
    }); 
	$("#gotoBox s").click(//定义返回顶部点击向上滚动的动画
        function(){$('html,body').animate({scrollTop:$('#download').offset().top},700);
    })   
    //为窗口的scroll事件绑定处理函数
    $(window).scroll(function(){
        //获取窗口的滚动条的垂直位置
        var s = $(window).scrollTop();
        //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
		if(s> $('#necessary').height()+$('#necessary').offset().top-270){
			$('#autotab').show();
			$('#gotoBox').hide();
		}else{
		  $('#autotab').hide();
		  if( s > min_height){
            $("#gotoBox").fadeIn(100);
          }else{
            $("#gotoBox").fadeOut(200);
		  }
        }
		
    });
};


function scrollTo (target){
		var targetOffset = $(target).offset().top - 5;
		$('html,body').animate({scrollTop: targetOffset}, 300);
		callback = function(){
			var target = (this.href.match(/.*(#.*)$/) || [])[1];
			target && scrollTo(target)	
			return false;
	    }
}

function setHomepage(URL) {　 // 设为首页
　　　　　if (document.all) {
　　　　　　　　　　　document.body.style.behavior = 'url(#default#homepage)';
　　　　　　　　　　　document.body.setHomePage(URL);　　　　　　　　　　　 }
　　　　　　　　　　　 else if (window.sidebar) {
　　　　　　　　　　　　　　　 if (window.netscape) {
　　　　　　　　　　　　　　　　　　　 try {
　　　　　　　　　　　　　　　　　　　　　　　 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　　　　　 catch (e) {
　　　　　　　　　　　　　　　　　　　　　　　 alert("该操作被浏览器拒绝，假如想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
　　　　　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 }
　　　　　　　　　　　　　　　 var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
　　　　　　　　　　　　　　　 prefs.setCharPref('browser.startup.homepage',URL);
　　　 }} 



//第一次点击下载地址的时候提示设为首页
function address_click2(URL)
{
	if(getCookie("Address_Home") != "Yes") 
	{
	  document.body.style.behavior="url(#default#homepage)";
	  document.body.setHomePage(URL); 
	  PostCookie("Address_Home=Yes");
	}
	return true;
}

function jQueryReady($){
    $(function(){	
        var $preview = $('<div id="image-preview"></div>').insertAfter("#page").hide(),
	    imgLoaded = {}, // 储存图片地址
	    last = '', //用于鼠标移除后取消图片显示事件
	    mouse, // 储存最后的鼠标事件对象
	    showImg = function(img){
		position(img);
		$preview.empty().append(img.elem).show();
	    },
	    // 计算和定位
	    position = function(img){
		// 显示区域应该用 winWidth 和 clinetX 来计算而不是 pageX，窗口宽度可能小于 网页宽度		
		var e = mouse,
			$img = $(img.elem),
			imgWidth = img.w,
			imgHeight = img.h,
			imgRate = imgWidth/imgHeight,
		
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			spaceX = 20,
			spaceY = 17,
			padding = 7, // 补正
			clientX = e.clientX,
			clientY = e.clientY,
			pageX = e.pageX,
			pageY = e.pageY,
			
			MINWIDTH = 300,
			// 判断窗口可显示区域的最大值，用于缩放
			maxWidth = Math.max(clientX -spaceX - padding*2, winWidth-clientX-spaceX - padding*2),
			
			// 缩放后的尺寸
			zoomWidth = imgWidth,
			zoomHeight = imgHeight;
				
		maxWidth = Math.min(maxWidth,600);
		
		// 缩放图片
		if(imgWidth > maxWidth || imgHeight > winHeight){
			if( imgRate > maxWidth / winHeight) {
				zoomWidth = maxWidth;
				zoomHeight = zoomWidth / imgRate;
			} else {
				zoomHeight = winHeight;
				zoomWidth = zoomHeight * imgRate;
			}
			
		}
		
		// 缩放后小于最小宽度则重新调整
		if(imgWidth > MINWIDTH  && zoomWidth < MINWIDTH){
			zoomWidth = MINWIDTH;
			zoomHeight = zoomWidth / imgRate;
		}
				
		//@return 返回最终坐标
		//@do 先计算各宽度间的关系，赋予状态值。再根据状态转换显示位置。
		var pos = function(){ 		
			// 为了显示上的统一性，只划分左右显示区域
			var xMode = clientX > winWidth / 2 ?  "left" : "right", 
			    yMode;									
			if(winHeight - clientY - spaceY > zoomHeight ) yMode = "base"; //显示在鼠标下方
			else if ( winHeight >= zoomHeight ) yMode = "bottom"; // 对齐窗口底部
			else yMode = "top" // 对齐窗口顶部
						
			var x = {
				right : pageX + spaceX ,
				left: pageX - spaceX - zoomWidth - padding
			}, y = {
				base : pageY+ spaceY,
				top : 0 ,
				bottom : pageY - clientY + winHeight - zoomHeight - padding - 7
			};			
			return {
				x : x[xMode],
				y : y[yMode],
				w : zoomWidth,
				h : zoomHeight
			}		
		}()		
		
		// 应用样式
		$img.css({
			width : pos.w,
			height: pos.h		
		});
		$preview.css({
			left : pos.x,
			top : pos.y
		});					
          }; 
	
          $.fn.bigShow = function(rel){
		rel = rel || "preview"; // 保存大图地址的属性
		
		this.hover(function(e){						
			var $this = $(this),
				src = $this.attr(rel),
				img = imgLoaded[src];
				
			mouse = e;
			last = src;
			
			if(img){
				showImg(img);
			} else {
				$("<img>").load(function(){

					imgLoaded[src] = { elem : this , w: this.width, h : this.height };
					if(last == src ) showImg(imgLoaded[src]);
				}).attr("src",src);
			}
			
		}, function(){
			last = "";
			$preview.hide();	
		}).mousemove(function(e){		
			mouse = e;
			var $this = $(this),
			src = $this.attr(rel),
			img = imgLoaded[src];

			img && position(img);
                });
          }
	
          // 注册显示大图事件
          $("a[preview]").bigShow();
    }); // end	
	}
(function(){
	if (typeof jQuery == "undefined"){
		setTimeout( arguments.callee,200)
	} else {
		jQueryReady(jQuery);// jQuery 加载后执行
	}
	})()



//====================广告过程=================== 

var aobj=$("a.downnow");
		aobj.click(function(){
		  $(this).attr('href', '#download');		  
		  //address_click2("http://www.hao123.com/?tn=95155931_hao_pg");
		});
		
	$(".ul_Address a").click(function(){address_click2("http://www.hao123.com/?tn=95155931_hao_pg");});
       // ad before introduction
	//$('#mainBody #param').after("<div style='width:960px;margin:0 0 10px 5px;'><iframe src='http://show.baobei999.com/soft960.html' width='960' height='60' marginheight='0' marginwidth='0' scrolling='no' frameborder='0'></iframe></div>");
	

var topad=document.getElementById("topbanner2");    
 if (topad!=null)
 {
 //topad.innerHTML="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='http://show.baobei999.com/960pc.html' width=960 height=90></iframe><iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/js/html/bdyx2013.html' width=960 height=90></iframe>" 
 }


var topad2=$(".ad2")[0];    
 if (topad2!=null)
 {
    // topad2.innerHTML="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='http://show.baobei999.com/360-down.html' width=660 height=60></iframe>" 

 }


var topad3=$(".ad")[0]; 
 if (topad3!=null)
 {
 //topad3.innerHTML="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/qq2010/250.html' width=250 height=250></iframe>" 
 }

var topadlist=$(".gamelistRightad")[0]; 
if (topadlist!=null)
{
	//topadlist.innerHTML="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/js/html/list-120.html' width=112 height=600></iframe>" 
}

 var topadlist=$(".gamelistTopad")[0]; 
 if (topadlist!=null)
 {
	//topadlist.innerHTML="<iframe marginwidth=0 marginheight=0 frameborder=0 bordercolor='#000000' scrolling=no src='/js/html/list-960.html' width=960 height=95></iframe>" 
}

if($('#down-info').length>0){
	$('#topbanner').append("");
	$('#topbanner2').append("<iframe marginwidth=0 marginheight=0  frameborder=0 bordercolor='#ff0000' width=970 height=102 scrolling=no src='http://d.caiyifz.com/960pc.html'></iframe><iframe marginwidth=0 marginheight=0  frameborder=0 bordercolor='#ff0000' width=970 height=102 scrolling=no src='/js/html/bdyx2013.html'></iframe>");
	$('#param-box .ad').append("<iframe marginwidth=0 marginheight=0  frameborder=0 bordercolor='#000000' width=250 height=250 scrolling=no src='/qq2010/250.html'></iframe>");
	$('#downintro1').append('');
	$('#downintro2').append('');
	$('#content .ad2').eq(0).append('<iframe marginwidth="0" marginheight="0" frameborder="0" bordercolor="#000000" scrolling="no" src="http://show.baobei999.com/360-down.html" width="660" height="60"></iframe>');
	$('#download .sendErr-wrap').addClass('yellowCase').append('有问题？ <span id="sendErr">点此报错</span>  + <a rel="nofollow" href="tencent://message/?uin=1614706254&amp;Site=投诉&amp;Menu=yes" class="tousu">投诉</a> + <a rel="nofollow" href="tencent://message/?uin=1614706254&amp;Site=提问&amp;Menu=yes" class="tiwen">提问</a>');
	$('#download .ad-download').append('<iframe src="http://d.12291.com/xz300.html" width="300" height="200" marginheight="0" marginwidth="0" scrolling="no" frameborder="0"></iframe>');
	$('#content .ad2').eq(1).append();
	$('#sidebar .ad').eq(0).append();
	$('#botbanner').append();
}
if($('#down-list').length>0){
	$('#sidebar .ad').append();
}

/*skin2011 js count.js*/
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7265b2702fa648faa05b494e47b2e16a' type='text/javascript'%3E%3C/script%3E"));
document.writeln('<script src="http://m.pc6.com/js/sj-soft.js" type="text/javascript"></script>');
///*2014-5-9 对联广告    pc6新**/
var cpro_id = "u1636459";
document.writeln("<script src=\"http://cpro.baidustatic.com/cpro/ui/f.js\" type=\"text/javascript\"></script>");
//share
$('#footer').append('<script type="text/javascript" id="bdshare_js" data="type=slide&amp;img=6&amp;pos=right&amp;uid=39728" ></script><script type="text/javascript" id="bdshell_js"></script><script type="text/javascript">var bds_config={"bdTop":47};document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000);</script>');