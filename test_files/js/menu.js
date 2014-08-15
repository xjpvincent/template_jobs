/**************************************************************************
* 메뉴관련 링크 및 Location 관련
**************************************************************************/
var menuArr = new Array();
var m = 0;

var ext	= "";
/*확장자 검사*/
var domail		= ".";

ext = "do";

// 유니온스틸홈 
menuArr[m++] = new Array('00', 'Home', '', ''); //

// Company
menuArr[m++] = new Array('01', 'Company', '/cn/info/unionsteel.'+ext , '');
menuArr[m++] = new Array('0101', '企业概述', '/cn/info/unionsteel.'+ext , '', '');
menuArr[m++] = new Array('0102', '企业规划', '/cn/info/vision.'+ext , '', '');
menuArr[m++] = new Array('0103', '董事长致辞', '/cn/info/ceo.'+ext , '', '');
menuArr[m++] = new Array('0104', '企业沿革 ', '/cn/info/history.'+ext , '', '');
menuArr[m++] = new Array('0105', 'CI', '/cn/info/ci.'+ext , '');
menuArr[m++] = new Array('0107', '营销网络', '/cn/info/business/headoffice.'+ext , '', '');
menuArr[m++] = new Array('010701', '国内公司', '/cn/info/business/headoffice.'+ext , '', '');
menuArr[m++] = new Array('010702', '海外分公司', '/cn/info/business/china.'+ext , '', '');


// Product
menuArr[m++] = new Array('02', 'PRODUCT', '/cn/product/cate01/product01.'+ext , '','');
menuArr[m++] = new Array('0201', '产品介绍', '/cn/product/cate01/product01.'+ext , '','');
menuArr[m++] = new Array('020101', '冷轧钢板', '/cn/product/cate01/product01.'+ext , '', '');

menuArr[m++] = new Array('020201', '镀锌钢板', '/cn/product/cate02/product01.'+ext , '', '');
menuArr[m++] = new Array('02020101', '电镀锌钢板 (EGI)', '/cn/product/cate02/product01.'+ext , '', '');
menuArr[m++] = new Array('02020102', '熔融镀锌钢板 (GI)', '/cn/product/cate02/product02.'+ext , '', '');
menuArr[m++] = new Array('02020103', '热镀铝锌板 (GL)', '/cn/product/cate02/product03.'+ext , '', '');
menuArr[m++] = new Array('02020104', '合金镀锌钢板 (GA)', '/cn/product/cate02/product04.'+ext , '', '');

menuArr[m++] = new Array('020301', '彩钢板', '/cn/product/cate03/product01.'+ext , '', '');
menuArr[m++] = new Array('02030101', 'Luxteel', '/cn/product/cate03/product01.'+ext , '', '');

menuArr[m++] = new Array('0203010101', 'UNIGLASS', '/cn/product/cate03/product01.'+ext , '', '');
menuArr[m++] = new Array('0203010102', 'UNITEX', '/cn/product/cate03/product02.'+ext , '', '');
menuArr[m++] = new Array('0203010103', 'UNISUS', '/cn/product/cate03/product03.'+ext , '', '');
menuArr[m++] = new Array('0203010104', 'PRINT', '/cn/product/cate03/product04.'+ext , '', '');
menuArr[m++] = new Array('0203010105', 'LAMINA', '/cn/product/cate03/product05.'+ext , '', '');
menuArr[m++] = new Array('0203010106', '3COATING', '/cn/product/cate03/product06.'+ext , '', '');
menuArr[m++] = new Array('0203010107', 'PVDF', '/cn/product/cate03/product07.'+ext , '', '');
menuArr[m++] = new Array('0203010108', 'UNIMINIUM', '/cn/product/cate03/product08.'+ext , '', '');
menuArr[m++] = new Array('0203010109', 'EMBOSS', '/cn/product/cate03/product09.'+ext , '', '');

menuArr[m++] = new Array('02030102', 'Appsteel', '/cn/product/cate04/product01.'+ext , '', '');
menuArr[m++] = new Array('0203010201', 'UNIGLASS', '/cn/product/cate04/product01.'+ext , '', '');
menuArr[m++] = new Array('0203010202', 'UNITEX', '/cn/product/cate04/product02.'+ext , '', '');
menuArr[m++] = new Array('0203010203', 'UNISUS', '/cn/product/cate04/product03.'+ext , '', '');
menuArr[m++] = new Array('0203010204', 'PRINT', '/cn/product/cate04/product04.'+ext , '', '');
menuArr[m++] = new Array('0203010205', 'LAMINA', '/cn/product/cate04/product05.'+ext , '', '');
menuArr[m++] = new Array('0203010206', '3COATING', '/cn/product/cate04/product06.'+ext , '', '');
menuArr[m++] = new Array('0203010207', 'EMBOSS', '/cn/product/cate04/product07.'+ext , '', '');

menuArr[m++] = new Array('02030103', '家电用 2COATING', '/cn/product/cate05/product01.'+ext , '', '');
menuArr[m++] = new Array('02030104', '建材用 2COATING', '/cn/product/cate05/product02.'+ext , '', '');
menuArr[m++] = new Array('02030105', '功能性彩钢板', '/cn/product/cate05/product03.'+ext , '', '');

menuArr[m++] = new Array('0204', '产品目录', '/cn/product/catalog.'+ext , '','');
menuArr[m++] = new Array('0205', '认证现况', '/cn/product/certification01.'+ext , '','');
menuArr[m++] = new Array('020501', '产品认证现况 Certificate Status', '/cn/product/certification01.'+ext , '','');
menuArr[m++] = new Array('020502', '系统认证现况', '/cn/product/certification02.'+ext , '','');


// PR
menuArr[m++] = new Array('04', 'PR', '/cn/publicty/video_en.'+ext , '');
menuArr[m++] = new Array('0401', '宣传片', '/cn/publicty/video_en.'+ext , '', '');
menuArr[m++] = new Array('0402', '宣传手册', '/cn/publicty/brochures.'+ext , '', '');

// CSR 
menuArr[m++] = new Array('06', 'CSR', '/cn/social/responsibility.'+ext , '');
menuArr[m++] = new Array('0601', '社会责任', '/cn/social/responsibility.'+ext , '');
menuArr[m++] = new Array('0602', '环境经营', '/cn/social/environmental01.'+ext , '', '');

// ContactUs
menuArr[m++] = new Array('07', 'ContactUs', '/cn/util/contactus.'+ext , '');
menuArr[m++] = new Array('0701', 'Q&A', '' , '/cn/util/contactus.'+ext, '');

// ETC 
menuArr[m++] = new Array('08', 'SITEMAP', '', ''); //




/**************************************************************************
* Linemap
**************************************************************************/
function dispLinemap(MenuCode) {
	var c_no = 0;
	document.write("<ul>");
	for (var i=0; i<MenuCode.length; i=i+2) {
		SubCode = MenuCode.substring(0, i+2);
		for (j=0; j<menuArr.length-1; j++){
			
			if (menuArr[j][0]==SubCode){
				if (c_no == 0){
					document.write("<li><img src=\"/cn/static/images/common/ico_home.gif\" alt=\"Home\" /></li>");
					c_no = c_no + 1;
				}
				if (j == 1) {
					if ((MenuCode!=SubCode) && (menuArr[j][2].length > 0)) {
						document.write("<li>"+menuArr[j][1]+"</li>");
					}
				}else{
					document.write("<li>"+menuArr[j][1]+"</li>");
				}
				break;
			}
		}
	}
	document.write("</ul>");
	
}



/**************************************************************************
* 메뉴 링크
**************************************************************************/
// 도메인 붙이고 가는 경우
function menuLink(str) {
	var isFind = false;

	for (i = 0; i < str.length; i = i + 2) {
		for (j = 0; j < menuArr.length; j++) {
			if (str == menuArr[j][0]) {
				if (menuArr[j][2] == "#") {
					alert("페이지 없음");
					return;
				}
				else {
					window.location.href = menuArr[j][3] + menuArr[j][2];
					isFind = true;
					break;
				}
			}
		}

		if (isFind) break;
	}
}

// 도메인 안 붙이고 바로 가는 경우
function menuLink2(str) {
	var isFind = false;

	for (i = 0; i < str.length; i = i + 2) {
		for (j = 0; j < menuArr.length; j++) {
			if (str == menuArr[j][0]) {
				if (menuArr[j][2] == "#") {
					alert("페이지 없음");
					return;
				}
				else {
					window.location.href = menuArr[j][2];
					isFind = true;
					break;
				}
			}
		}
		if (isFind) break;
	}
}

// 도메인 붙이고 부모창 갈때
function menuLinkP(str) {
	var isFind = false;

	for (i = 0; i < str.length; i = i + 2) {
		for (j = 0; j < menuArr.length; j++) {
			if (str == menuArr[j][0]) {
				if (menuArr[j][2] == "#") {
					alert("페이지 없음");
					return;
				}
				else {
					if (window.top == window) {
						window.location.href = menuArr[j][3] + menuArr[j][2];
					} else {//iframe 일 경우 호출되어야 하는 url
						parent.location.href = menuArr[j][3] + menuArr[j][2];
					}
					isFind = true;
					break;
				}
			}
		}
		if (isFind) break;
	}
}

function ready() {
	alert('준비중입니다');
}