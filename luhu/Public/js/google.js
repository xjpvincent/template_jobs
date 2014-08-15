// LR GWS Tracking Script v4.0

/*----------------------------------------
  Required Files
  1. /system/logging/google.js (this file)
  2. /c/script/jquery.cookie.js
  3. /system/logging/gaconfig.js
  4. /c/script/jquery.js
  5. /system/logging/jquery.google.js
  6. /system/logging/jquery.google.marketmap.qa.js
  7. /system/logging/jquery.google.marketmap.js
  8. /system/logging/jquery.google.forms.js

/*----------------------------------------
1. Document Domain
----------------------------------------*/
document.domain='landrover.com';

/*----------------------------------------
2. Query Parameter function
----------------------------------------*/
var QueryParam = function(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/*----------------------------------------
3. Script Path
----------------------------------------*/
var tPath = '/system/logging';
var gaTracking = null;

/*----------------------------------------
4. Create Mobile redirect disable cookie
----------------------------------------*/
var CreateMobileCookie = function() {
	var name = "MobileRedirectDisabled";
	var expires = "";
	var value = "true";
	
	document.cookie = name + "=" + value + expires + "; path=/";
};

/*----------------------------------------
5. Get Mobile redirect disable cookie
----------------------------------------*/
var GetMobileCookie = function() {
	var nameEQ = "MobileRedirectDisabled=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

/*----------------------------------------
6. Mobile redirect enabled?
----------------------------------------*/
var MobileDetectEnabled = function() {
	var mobileRedirect = QueryParam('mobileRedirect');
	var enabled = true;
	
	enabled = ((mobileRedirect === 'false') ? false : true);
	
	if(!enabled)
		CreateMobileCookie();
		
	var disabled = GetMobileCookie();
	
	if(disabled != null && disabled === 'true')
		enabled = false;
	
	return enabled;
};

/*----------------------------------------
7. Blackberry Mobile script
----------------------------------------*/
var ua = navigator.userAgent.toLowerCase();
var m = location.pathname.substr(0,10);
if(MobileDetectEnabled()) {
	if(ua.indexOf('blackberry') != -1) {
		if(m.indexOf('/us/en/') != -1) {
			location.href = 'http://landrover.mobi/?c=redirect';
		} else if (m.indexOf('/gb/en/') != -1) {
			location.href = 'http://m.landrover.co.uk';
		} else if (m.indexOf('/gl/en/') != -1) {
			location.href = 'http://landrover.mobi/international';
		} else if (m.indexOf('/cn/zh/') != -1) {
			location.href = 'http://landrover.mobi/china';
		} else if (m.indexOf('/au/en/') != -1) {
			location.href = 'http://landrover.mobi/australia';
		} else if (m.indexOf('/es/es/') != -1) {
			location.href = 'http://landrover.mobi/spain';
		} else if (m.indexOf('/me/en/') != -1) {
			location.href = 'http://landrover.mobi/mena_en';
		} else if (m.indexOf('/me/ar/') != -1) {
			location.href = 'http://landrover.mobi/mena_ar';
		};
	};
};

/*----------------------------------------
8. Mobile Script
----------------------------------------*/
if(MobileDetectEnabled()) {
	if(m.indexOf('/us/en/') != -1 || m.indexOf('/gb/en/') != -1 || m.indexOf('/gl/en/') != -1 || m.indexOf('/cn/zh/') != -1 || m.indexOf('/au/en/') != -1 || m.indexOf('/es/es/') != -1 || m.indexOf('/me/') != -1) {
		var mobileDeviceNames = "ACER|Alcatel|AUDIOVOX|BlackBerry|CDM|Ericsson|iPhone|LG\/b|LGE|Motorola|MOT|NEC|Nokia|Panasonic|QCI|SAGEM|SAMSUNG|SEC|Sanyo|Sendo|SHARP|SIE-|SonyEricsson|Telit|Telit_mobile_Terminals|TSM|MMP|webOS|Android|Droid|HTC|mobile|Opera|Symbian|IEMobile";
		var findMobileAgent = mobileDeviceNames.split("|");
		if (screen.width < 700) {
			for(var a=findMobileAgent.length -1; a >= 0; --a) {
				if(ua.indexOf(findMobileAgent[a].toLowerCase()) != -1) {
					if(m.indexOf('/us/en/') != -1) {
						location.href='http://landrover.mobi/?c=redirect';
					} else if (m.indexOf('/gb/en/') != -1) {
						location.href='http://m.landrover.co.uk';
					} else if (m.indexOf('/gl/en/') != -1) {
						location.href='http://landrover.mobi/international';
					} else if (m.indexOf('/cn/zh/') != -1) {
						location.href='http://landrover.mobi/china';
					} else if (m.indexOf('/au/en/') != -1) {
						location.href='http://landrover.mobi/australia';
					} else if (m.indexOf('/es/es/') != -1) {
						location.href='http://landrover.mobi/spain';
					} else if (m.indexOf('/me/en/') != -1) {
						location.href='http://landrover.mobi/mena_en';
					} else if(m.indexOf('/me/ar/') != -1) {
						location.href='http://landrover.mobi/mena_ar';
					};
				};
			};
		};
	};
};

/*----------------------------------------
9. Obsolete Functions
----------------------------------------*/
function sbe(url) {
};

function trackEventGH(loc, val) {
};

function trackurl(url) {
	gaTracking = url;
};

/*----------------------------------------
10. Google Analytics variables
----------------------------------------*/
{
	var gaDone = false;
	document.write("<scr"+"ipt language='Javascript' type='text/javascript' src='"+tPath+"/gaconfig.js' onload='gaContinue(this);' onreadystatechange='gaContinue(this);'></scr"+"ipt>");
	var yandex = ua.indexOf('yandex');

	function gaContinue(elem) {
		if ( !gaDone &&
			((!elem.readyState || elem.readyState == "loaded" || elem.readyState == "complete") && yandex == -1) ) {
				gaDone = true;
				launchGATracking('false');
				elem.onload = elem.onreadystatechange = null;
			}
	}
};

/*----------------------------------------
11. Load main script when jQuery Available
----------------------------------------*/
function launchGATracking(val) {
	if(val == 'false') {
		if(typeof jQuery == 'undefined') {
			window.setTimeout("launchGATracking('false');",500);
		} else {
			launchGATracking('true');
		};
	} else if(val == 'true') {
		if(typeof gaConfig != 'undefined') {
			$.ajax({
				url: tPath + '/jquery.google.js',
				type: 'GET',
				dataType: 'script',
				cache: true
			});
		} else {
			window.setTimeout("launchGATracking('true')",500);
		};
	}
};