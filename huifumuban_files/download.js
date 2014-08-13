
<!--
//
// patch of innerText for firefox
//
(function (bool) {
    function setInnerText(o, s) {
        while (o.childNodes.length != 0) {
            o.removeChild(o.childNodes[0]);
        }

        o.appendChild(document.createTextNode(s));
    }

    function getInnerText(o) {
        var sRet = "";

        for (var i = 0; i < o.childNodes.length; i ++) {
            if (o.childNodes[i].childNodes.length != 0) {
                sRet += getInnerText(o.childNodes[i]);
            }

            if (o.childNodes[i].nodeValue) {
                if (o.currentStyle.display == "block") {
                    sRet += o.childNodes[i].nodeValue + "\n";
                } else {
                    sRet += o.childNodes[i].nodeValue;
                }
            }
        }

        return sRet;
    }

    if (bool) {
        HTMLElement.prototype.__defineGetter__("currentStyle", function () {
            return this.ownerDocument.defaultView.getComputedStyle(this, null);
        });

        HTMLElement.prototype.__defineGetter__("innerText", function () {
            return getInnerText(this);
        })

        HTMLElement.prototype.__defineSetter__("innerText", function(s) {
            setInnerText(this, s);
        })
    }
})(/Firefox/.test(window.navigator.userAgent));
//-->


function HTMLEnCode(str)  {         
	var  s = "";          
	if (str.length == 0)  return  "";   
	s    =    str.replace(/&/g, "&amp;");       
	s    =    s.replace(/</g, "&lt;");          
	s    =    s.replace(/>/g, "&gt;");          
	s    =    s.replace(/    /g,  "&nbsp;");       
	s    =    s.replace(/\'/g, "'");            
	s    =    s.replace(/\"/g,"&quot;");          
	s    =    s.replace(/\n/g,"<br>");          
	return    s; 
}
function HTMLDeCode(str)   {          
	var    s    =    "";           
	if    (str.length    ==    0)    return    "";         
	s    =    str.replace(/&amp;/g, "&");           
	s    =    s.replace(/&lt;/g, "<");          
	s    =    s.replace(/&gt;/g,  ">");           
	s    =    s.replace(/&nbsp;/g,  " ");         
	s    =    s.replace(/'/g,  "\'");           
	s    =    s.replace(/&quot;/g,  "\"");        
	s    =    s.replace(/<br>/g,  "\n");          
	return    s;  
}
var _GET = (function(){
	var url = document.getElementsByTagName("script")[document.getElementsByTagName("script").length -1].src;				 
   // var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();

if(typeof AddressList === "undefined"){ var AddressList = {};}

function getUrl(){
var Address,TypeID,SoftLinkID;

    Address =_GET["Address"];
	
	TypeID =_GET["TypeID"];
	SoftLinkID = _GET["TypeID"];
	SoftID= _GET["SoftID"];
	
	Address = decodeURIComponent(Address)
	
	if (Address.indexOf("http:") >=0 || Address.indexOf("ftp:") >=0 || Address.indexOf("https:") >=0){
		 document.write("<li><a href='"+  Address + "' target='_blank'>直接点击下载 </a></li>");
		 return true;
	 }
	 
   var sList=(eval("AddressList.siteId_"+TypeID ));
   var DownLoadName = sList.split("||")[0];
   var DownLoadURL = sList.split("||")[1];
   var DownLoadNameList = DownLoadName.split(",");
   var DownLoadURLList  = DownLoadURL.split(",");
   var DownTitle , DownAlt ,DownURL
  for (var n=0;n< DownLoadNameList.length ;n++){
	  
		DownURL   = DownLoadURLList[n]
        //DownURL   = GetDownAddress(DownURL)
		
		DownURL   = DownURL + Address

		
	  if(DownLoadNameList[n].indexOf("#")>=0){
	    DownTitle =  DownLoadNameList[n].split("#")(0)
		DownAlt   = DownLoadNameList[n].split("#")(1)
	  }else{
		DownTitle = DownLoadNameList[n];
		DownAlt = DownLoadNameList[n];
	  }
	  
	  if(n==0)
	   {
	    //document.write("<li class=\"address_like\"><a href='http://box.cr173.com/exe/setup_"+SoftID+".exe'><b>西西专用下载</b></a></li>");
	   } 
		document.write("<li class=\"address_like\"><a href="+ DownURL + " target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">"+ HTMLDeCode(DownTitle) +"</a></li>");
   }
}



function getUrl2(){
var Address,TypeID,SoftLinkID;

    Address =_downInfo.Address;
	
	TypeID =_downInfo.TypeID;
	SoftLinkID = _downInfo.SoftLinkID;
	SoftID= _downInfo.SoftID; 


	
	if (Address.indexOf("http:") >=0 || Address.indexOf("ftp:") >=0 || Address.indexOf("https:") >=0){
		 document.write("<li><a href='"+  Address + "' target='_blank'>直接点击下载 </a></li>");
		 return true;
	 }
	 
	 
	  
	   
   var sList=(eval("AddressList.siteId_"+TypeID ));
   var DownLoadName = sList.split("||")[0];
   var DownLoadURL = sList.split("||")[1];
   var DownLoadNameList = DownLoadName.split(",");
   var DownLoadURLList  = DownLoadURL.split(",");
   var DownTitle , DownAlt ,DownURL
  for (var n=0;n< DownLoadNameList.length ;n++){
	  
		DownURL   = DownLoadURLList[n]
        //DownURL   = GetDownAddress(DownURL)
		
		DownURL   = DownURL + Address

		
	  if(DownLoadNameList[n].indexOf("#")>=0){
	    DownTitle =  DownLoadNameList[n].split("#")(0)
		DownAlt   = DownLoadNameList[n].split("#")(1)
	  }else{
		DownTitle = DownLoadNameList[n];
		DownAlt = DownLoadNameList[n];
	  }
	  
	  document.write("<script type=\"text/javascript\" src=\"/js/softdown.js\"></"+"script>");


	
	 var fname=document.getElementsByTagName("h1").innerText;
	 var fver="";
	 var fsize="";
	     fsize = fsize.replace("软件大小:","")
	 var iconurl ="http://www.pc6.com/skin2011/images/logo.png"
	
	  if(n==0)
	   {
	  
		 document.write ("<li class=\"address_like\"><a href=\""+ DownURL + "\" target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">电信联通下载</a></li><li class=\"address_like\"><a href=\""+ DownURL + "\" target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">电信联通下载</a></li>")
	   } 
	   
	   
		document.write("<li class=\"address_like\"><a href=\""+ DownURL + "\" target=\"_blank\" onclick=\"softCount("+ SoftID +","+ SoftLinkID +")\">"+ HTMLDeCode(DownTitle) +"</a></li>");
  
   }
	// var softdown = [];
	//     softdown[3] = "";
	//alert(DownLoadURL)
}


if(typeof _downInfo === "undefined")
{	getUrl()
	}
else{
	getUrl2()
}
