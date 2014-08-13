var ERR_OK = 0;
var ERR_VERSION_TOO_LOWLY = 1;
var ERR_NOT_SUPPORT_EXPLORER = 2;
var ERR_NOT_INSTALL_BDDOWNLOAD = 3;
var ERR_FAIL_STARTTASK = 4;
var ERR_NO_INTERFACE = 5;
var g_comDownload = null;
var NT_IE = 0;
var NT_FIREFOX = 1;
var NT_OPERA = 2;
var NT_CHROME = 3;
var NT_SAFARI = 4;
var NT_UNKNOWN = 0XFFFF;
var VER_ERR = "0.0.0.0";
var isBind = true;

function json2str(o) { 
    var arr = []; 
    var fmt = function(s) { 
    if (typeof s == 'object' && s != null) return json2str(s); 
        return /^(string)$/.test(typeof s) ? '"' + s + '"' : s; 
    }
    for (var i in o) arr.push('"' + i + '":' + fmt(o[i])); 
    return '{' + arr.join(',') + '}'; 
}

function GetNavigatorType() {
    var agent = navigator.userAgent.toLowerCase();
    if (/msie/i.test(agent) && !/opera/.test(agent)) {return NT_IE;} 
    if (/firefox/i.test(agent)){return NT_FIREFOX;} 
    if (/chrome/i.test(agent) && /webkit/i.test(agent) && /mozilla/i.test(agent)) {return NT_CHROME;} 
    if (/webkit/i.test(agent) && !(/chrome/i.test(agent) && /webkit/i.test(agent) && /mozilla/i.test(agent))) {return NT_SAFARI;}
    if (/opera/i.test(agent)) {return NT_OPERA;}
    //IE 11
    if (/(?:\sTrident\/7\.0;.*\srv:11\.0)/i.test(navigator.userAgent)) {return NT_IE;}
    return NT_UNKNOWN;
}

function IsChromeForbiddenNpapi() {
    var m = navigator.userAgent.match(/chrome\/([\d]+)(.[\d]+){3}/i)
    if (m && m.length == 3 && parseInt(m[1]) > 31) {
        return true;
    }
    return false;
}

function getAttr(obj, attrName) {
    return obj.getAttribute(attrName);
}

function AddEmbed() {
    if (document.getElementById("BDDLPlugin")) {
        return;
    }
    var v=document.createElement("embed");
    v.style.visibility="hidden";
    v.type=isBind?"application/np-BDSoftHelperPlug":"application/np-bddownload";
    v.style.width='0px';
    v.style.height='0px';
    v.setAttribute("id","BDDLPlugin");
    document.body.appendChild(v);
}

function CreateIEObject() {
    try {
        g_comDownload = new ActiveXObject(isBind?"ieBDSoftHelperPlug.Implement.1":"BDIEHelper.JSOnClick.1");
        g_comDownload.GetInfo();
    } catch (e) {
        return false;
    }
    return true;
}

function CreateFFObject() {
    AddEmbed();
    try {
        g_comDownload = document.getElementById("BDDLPlugin"); 
        g_comDownload.GetInfo();
    } catch (e) {
        return false;
    }
    return true;
}

function CreateObject(nType) {
    if (nType == NT_IE) {
        return CreateIEObject();
    } else if (nType == NT_FIREFOX || nType == NT_CHROME) {
        return CreateFFObject();
    } else {
        return false;
    }
}

function CompareVer(ver, targetVer) {
	var verSplit = new Array();
	verSplit = ver.split(".");
	
	var targetVerSplit = new Array();
	targetVerSplit = targetVer.split(".");
	
	if((verSplit.length != 4) || (targetVerSplit.length != 4))
		return false;
		
	for(i = 0; i < 4; i++)
	{
		var verInt = parseInt(verSplit[i]);
		var targetVerInt = parseInt(targetVerSplit[i]);
		if(verInt < targetVerInt)
			return false;
		else if(verInt > targetVerInt)
			return true;
	}
	return true;
}

function OnDownloadClick(nType, supply_id, soft_id, fname, fver, fsize, fmd5, iconurl, bddlurl, reurl, targetVer) {
    var ret = ERR_OK;
    do
    {
        if (!CreateObject(nType)) {
            ret = ERR_NOT_INSTALL_BDDOWNLOAD;
            break;
        }
		
        try {
            //判断版本号
            var ver = g_comDownload.GetVer();
			
            if (ver == VER_ERR || (targetVer && (!CompareVer(ver, targetVer)))) {
                ret = ERR_VERSION_TOO_LOWLY;
                break;
            }
            var encodeUrl = encodeURIComponent(bddlurl);
            var single_task_config = {
				"supply_id":supply_id,
                "soft_id":soft_id,
                "fname":fname,
                "fver":fver,
                "fmd5":fmd5,
                "fsize":fsize,
                "iconurl":iconurl,
                "url":bddlurl,
                "ntype":nType,
                "isbind":isBind,
                "countdown":"false"
            };
            var strRet = g_comDownload.StartTask(json2str(single_task_config), bddlurl);
            if (strRet && strRet != "")
                ret = ERR_FAIL_STARTTASK;
        } catch (e) {
            ret = ERR_NO_INTERFACE;
        }
    }while(0);
    if (ret != ERR_OK) {
        window.open(reurl);
    }
    return ret;
}

function OnBDDownloadClick (linkObj) {
    navigator.plugins.refresh(false);
	var supply_id = getAttr(linkObj, "supply_id");
    var soft_id = getAttr(linkObj, "soft_id");
    var fname = getAttr(linkObj, "fname");
    var fver = getAttr(linkObj, "fver");
    var fsize = getAttr(linkObj, "fsize");
    var fmd5 = getAttr(linkObj, "fmd5")
    var iconurl = getAttr(linkObj, "iconurl");
    var bddlurl = getAttr(linkObj, "bddlurl");
    var reurl = getAttr(linkObj, "reurl");
    var targetVer = getAttr(linkObj, "targetVer");
    isBind = true;

    var wxurl = getAttr(linkObj, "wxurl");
    try {
        var img=document.createElement("img");
        if( wxurl!=undefined && undefined!="" ){
            img.src=wxurl;
        }
    }catch(e){}
    
    var nType = GetNavigatorType();
    if ((nType == NT_IE || nType == NT_FIREFOX || (nType == NT_CHROME && !IsChromeForbiddenNpapi()))) {
        OnDownloadClick(nType, supply_id, soft_id, fname, fver, fsize, fmd5, iconurl, bddlurl, reurl, targetVer);
    } else {
        window.location.href = reurl;
    }
}
