// img replace
function imgReplace(obj,flag){
	var imgSrc = obj.attr("src");
	if(flag == "on"){
		imgSrc = imgSrc.replace("_off.","_on.");
	} else if(flag == "off"){
		imgSrc = imgSrc.replace("_on.","_off.");
	}
	obj.attr("src",imgSrc);
}

var $win = $(window),
	$doc = $(document),
	$html = $('html'),
	$body = $('body');

var gnb1Idx = gnbDep1-1,
	gnb2Idx = gnbDep2-1,
	gnb3Idx = gnbDep3-1;

var viewMode,
	resizeTimer = null;

var Detect = {
	isDesktop : function(){
		var platform = "win16|win32|win64|mac", result = false;
		if( navigator.platform ){
			( platform.indexOf(navigator.platform.toLowerCase()) < 0 ) ? result = false : result = true ;
		}
		return result;
	},
	isTouch : function(){
		var _isTouchDevice = 'ontouchstart' in document.documentElement;
		return _isTouchDevice;
	}
};

/*
* checkViewMode
* @func
* return 'm' (모바일) , 't' (태블릿), 'p' (데스크탑) 
*/
function checkViewMode(){
	if ($win.width() < 641){
		viewMode = 'm'	//mobile
	} else if ($win.width() < 1025){
		viewMode = 't'	//tablet
	} else {
		viewMode = 'p'	//PC
	}
};
checkViewMode();

$win.resize(function(){
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(checkViewMode,100);
})

/* 
* Cookie 
* @func
*/
function setCookie(c_name,value,exdays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value+";domain=."+location.host+";path=/;";
}

function getCookie(c_name){
	var i,x,y,cookieArray =document.cookie.split(";");
	for (i=0;i<cookieArray.length;i++){
		x=cookieArray[i].substr(0,cookieArray[i].indexOf("="));
		y=cookieArray[i].substr(cookieArray[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

/*
* [PC] Navigation ( GNB & LNB )
*/
(function($) {
	var $header = $('#header'),
		$gnb = $('#gnb > ul'),
		$gnb_depth1 = $gnb.find('>li'),
		$gnb_depth2 = $gnb.find('>li>ul'),
		$lnb = $('#lnb'),
		$lnb_btn = $lnb.find('.ui-fold-btn'),
		$lnb_list = $lnb.find('.ui-fold-list'),
		$lnb_depth1 = null,
		openState = false,
		speed = {
			duration: 600,
			queue: false,
			easing: 'easeInOutExpo'
		};

	var GNB = {		

		init : function(){
			var now1depth = $gnb_depth1.eq(gnb1Idx),
				now2depth = now1depth.find('>ul>li');
			
			if (gnb1Idx != -1){
				now1depth.find('>a').addClass('on').find('img').USimgNameChg({'src':['_off','_on']});
			} 
			if (gnb2Idx != -1){
				now2depth.eq(gnb2Idx).addClass('on');
				if (gnb3Idx != -1){
					now2depth.find('li').eq(gnb3Idx).addClass('on');
				}
			}
			this.bindEvent();
		},

		open : function(state){
			if (state){
				$gnb_depth2.slideDown(speed);
				openState = true;
			} else {
				$gnb_depth2.slideUp(speed);
				openState = false;
				this.reset();
			}
		},

		reset : function(){
			$gnb_depth1.find('>a').not('.on').find('img').USimgNameChg({'src':['_on','_off']});
		},

		bindEvent : function(){

			$gnb_depth1.find('>a').on({
				'click' : function(e){
					if (!openState) GNB.open(true);
					$(this).find('img').USimgNameChg({'src':['_off','_on']});
					e.preventDefault();
				},
				'focusin' : function(){
					GNB.reset();
					if (!$(this).hasClass('on')){
						$(this).find('img').USimgNameChg({'src':['_off','_on']});
					}
				}, 
				'focusout mouseleave' : function(){
					if (!$(this).hasClass('on')){
						$(this).find('img').USimgNameChg({'src':['_on','_off']});
					}
				}
			});

			$gnb_depth2.find('a').on({
				'focusin mouseenter' : function(){
					GNB.reset();
					$(this).parents('li').find('a > img').USimgNameChg({'src':['_off','_on']});
				} 
			});

			$header.on({
				'mouseleave' : function(){
					GNB.open(false);
				}
			})

			$gnb.on('mousedown focusin', function(e){
				e.stopPropagation();
			})

			$body.on('mousedown focusin', function(e) {
				GNB.open(false);
				e.stopPropagation();
				//e.preventDefault();
			});
		}
	};

	var LNB = {

		init : function(){
			this.make();
			this.bindEvent();
		},

		make : function(){
			if (gnb2Idx != -1){
				$lnb_list.html( $gnb.find('>li').eq(gnb1Idx).find('ul').html() );
				this.addPageInfo();
			} else {
				$lnb.hide();
			} 
		},

		addPageInfo : function(){
			var currentPageTxt = '';
			$lnb_depth1 = $lnb_list.find('>li');
			$lnb_depth1.removeClass('on');
			
			if (gnb3Idx != -1){
				$lnb_depth1.eq(gnb2Idx).find('ul').slideDown(speed);
				currentPageTxt = $lnb_depth1.eq(gnb2Idx).addClass('on').find('li').eq(gnb3Idx).addClass('on').find('>a').text();
			} else {
				currentPageTxt = $lnb_depth1.eq(gnb2Idx).addClass('on').find('>a').text();
				$lnb_depth1.find('ul').hide(speed);
			}
			$lnb_btn.text(currentPageTxt);
		},

		bindEvent : function(){
			$lnb_list.find('>li a').on({
				'focusin mouseenter' : function(){
					var $this = $(this).parent('li');
					$this.addClass('on').siblings().removeClass('on').find('ul').hide();
					$this.find('ul').show();
				}
			});
		}
	};

	$(function(){
		GNB.init();
		LNB.init();
		
		//PC UI : LNB 폴딩박스
		$lnb.USfoldingBox({
			 _closeEvent : function(){
				LNB.addPageInfo();
			}
		});
	});
}( jQuery ));


/*
* [Mobile/Tabelt] ( GNB , Allmenu, FloatingBand )
*/
(function($){
var $gnb = $('#gnb_m'),
	$gnb1 = $gnb.find('#gnb_m_1'),
	$gnb2 = $gnb.find('#gnb_m_2'),
	$gnb3 = $gnb.find('#gnb_m_3');

var GNB = {
	init : function(){
		if (gnb1Idx < 0) { 
			$gnb1.hide();$gnb2.hide();$gnb3.hide();
		}		
		var pc1Depth = $('#gnb').find('>ul>li').eq(gnb1Idx),
			pc2Depth_UL = pc1Depth.find('>ul'),
			pc3Depth_Ul = pc2Depth_UL.find('>li').eq(gnb2Idx).find('ul')

		$gnb2.find('>ul').html(pc2Depth_UL.html()).find('ul').remove();

		if (gnb3Idx < 0 || !pc3Depth_Ul.length){
			$gnb3.hide();
			$gnb2.addClass('last');
		} else {
			$gnb3.find('>ul').html(pc3Depth_Ul.html());	
		}
		this.setClass();
	},
	
	setClass : function(){
		var onList1 = $gnb1.find('>ul>li').eq(gnb1Idx).addClass('on'),
			onList2 = $gnb2.find('>ul>li').eq(gnb2Idx).addClass('on'),
			onList3 = $gnb3.find('>ul>li').eq(gnb3Idx).addClass('on');

		$gnb1.find('.ui-fold-btn > span').html(onList1.find('a').text());
		$gnb2.find('.ui-fold-btn > span').html(onList2.find('a').text());
		$gnb3.find('.ui-fold-btn > span').html(onList3.find('a').text());
	}
};

/*
* Floating Band Banner (footer Area) _ Mobile/tablet
* 
*/
function m_flotingSteelMenu(){
	var $band = $('.steelMenu_m'),
		bandHeight = $band.height(),
		footHeight = $('#footer').height(),
		fixedPosVal = {'position':'fixed','bottom':'0','left':'0','z-index':'1'},
		basePosVal = {'position':'relative','z-index':'10'},
		basePosVal2 = {'position':'relative','z-index':'11'},
		visibleLength = 0,
		bandState = false, //내용이 닫혀있으면 false
		speed = {
			duration: 800,
			queue: false,
			easing: 'easeInOutExpo'
		};

	$band.find("> .ui-fold-btn").click(function(e){
		var $cont = $(this).next('.con');
		
		if ($cont.is(':visible')){
			$(this).removeClass("active");
			$cont.slideUp(speed);
			bandState = false;
			$('#footer').css(basePosVal2);
			visibleLength--;

		} else {
			$(this).addClass("active");
			$band.css(basePosVal);
			$('#footer').css(basePosVal2);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$cont.show();
				bandState = true;
			} else {
				$cont.slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		e.preventDefault();
	})
}


$(function(){
	//Mobile GNB
	GNB.init();
	$gnb.find('>div').USfoldingBox({ devide : true });
	
	//Mobile 전체메뉴
	$('#allMenu').USfoldingBox({
		_stateChange : 'image',
		_openEvent : function(){
			$('#allMenu').find('.ui-fold-btn > img').USimgNameChg({alt : ['펼침','닫힘'] });
			if($("body.main").size() == 1){ // main 일시 footer 높이 변경
				if(viewMode == 'm'){
					$("#footer").height("100px");
				} else {
					$("#footer").height("263px");
				}
			}
			$('#allMenu').find('.close > a').click(function(e){
				$('#allMenu').find('.ui-fold-btn').click();
				if($("body.main").size() == 1){
					$("#footer").height("auto");
				}
				e.preventDefault();
			});
		},
		_closeEvent : function(){
			$('#allMenu').find('.ui-fold-btn > img').USimgNameChg({alt : ['닫힘','펼침'] });
			if($("body.main").size() == 1){
				$("#footer").height("auto");
			}
		}
	});
	
	m_flotingSteelMenu();
})

}(jQuery));

/* 
* [PC] accordion (header area)
*/

function LUXTEEL_accordion() {
	
	var slideIdx = 0,
		slideWidth = 68,
		onSlideWidth = 195,
		speed = {
			duration: 800,
			queue: false,
			easing: 'easeInOutExpo'
		},
		$thumList = $('#luxteelStroy li');

	function accordionEvent(idx){
		var $target = $thumList.eq(idx);

		$thumList.each(function(index){
			var gapSize,
				$this = $(this);

			(index > idx) ? gapSize = 127 : gapSize = 0;
			
			$this.animate({
				width : slideWidth+'px',
				left : slideWidth * index + gapSize + 'px'
			},speed).removeClass('on');

			$this.find('.num > img').USimgNameChg({'src': ['_on','_off']})
		})

		$target.animate({
			width : onSlideWidth+'px',
			left : slideWidth * idx +'px'
		},speed).addClass('on');

		$target.find('.num > img').USimgNameChg({'src': ['_off','_on']});
		
		changeKeyvisual(idx);
	};
	
	function changeKeyvisual(idx){
		var $keyVi = $('#keyVisual');
		$keyVi.find('.list0'+(idx+1)).fadeIn(800).siblings().fadeOut(800);
	};
	
	$thumList.find('>a').on('mouseenter focusin', function(e){
		var $this = $(this).parent('li');
		slideIdx = $this.index();
		accordionEvent(slideIdx);
		e.preventDefault();
	});

	//최초 로딩시
	accordionEvent(slideIdx);
}

/*
* [PC] Floating Band Banner (footer Area)
* 
*/
function flotingSteelMenu(){
	var $band = $('.steelMenu'),
		bandHeight = $band.height(),
		footHeight = $('#footer').height(),
		fixedPosVal = {'position':'fixed','bottom':'0','left':'0','z-index':'1'},
		basePosVal = {'position':'relative','z-index':'0'},
		visibleLength = 0,
		bandState = false, //내용이 닫혀있으면 false
		speed = {
			duration: 800,
			queue: false,
			easing: 'easeInOutExpo'
		};

	$(".steel_map_menu").find("a").click(function(e){
		var idx = $(this).parent().index();

		$band.find(".con").prev(".ui-fold-btn").each(function(){
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($band.find(".con").eq(idx).prev(".ui-fold-btn").find("img"),"on");
		
		if ($band.find(".con").eq(idx).is(':visible')){
			$band.find(".con").eq(idx).slideUp(speed);
			bandState = false;
			visibleLength--;

			$band.find(".con").prev(".ui-fold-btn").each(function(){
				imgReplace($(this).find(">img"),"on");
			});

		} else {
			$band.css(basePosVal);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$band.find(".con").eq(idx).show();
				bandState = true;
			} else {
				$band.find(".con").eq(idx).slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		e.preventDefault();
		
		return false;
	});
	$band.find("h2").next(".ui-fold-btn").click(function(e){
		var $cont = $(this).next('.con');

		// button image replace
		if($("body.main").size() == 0){
			$band.find("h2").next(".ui-fold-btn").each(function(){
				imgReplace($(this).find(">img"),"off");
			});
			imgReplace($(this).find("img"),"on");
		}

		if ($cont.is(':visible')){
			$cont.slideUp(speed);
			bandState = false;
			visibleLength--;
			if($("body.main").size() == 0){
				$band.find("h2").next(".ui-fold-btn").each(function(){
					imgReplace($(this).find(">img"),"on");
				});
			}
		} else {
			$band.css(basePosVal);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$cont.show();
				bandState = true;
			} else {
				$cont.slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		e.preventDefault();
	})
	
	// 이정배 추가 --- pc 일때만 나오게
	$band.find("h2").next(".ui-fold-btn2").click(function(e){
		var UserAgent = navigator.userAgent;
		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
	        mobile_chk = 1; //mobile device
        }else{
    	    mobile_chk = 2;
        }
		
		if(mobile_chk == 1){
			alert("Services are available on a PC.\nOnce connected to your PC, please use.");
			return;
		}
		
		var $cont = $(this).next('.con');

		// button image replace
		if($("body.main").size() == 0){
			$band.find("h2").next(".ui-fold-btn2").each(function(){
				imgReplace($(this).find(">img"),"off");
			});
			imgReplace($(this).find("img"),"on");
		}

		if ($cont.is(':visible')){
			$cont.slideUp(speed);
			bandState = false;
			visibleLength--;
			if($("body.main").size() == 0){
				$band.find("h2").next(".ui-fold-btn2").each(function(){
					imgReplace($(this).find(">img"),"on");
				});
			}
		} else {
			$band.css(basePosVal);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$cont.show();
				bandState = true;
			} else {
				$cont.slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		e.preventDefault();
	})
	
	$(".steel_map_menu .menu2").find("a").click(function(e){
		/*
		var UserAgent = navigator.userAgent;
		if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
	        mobile_chk = 1; //mobile device
        }else{
    	    mobile_chk = 2;
        }
		
		if(mobile_chk == 1){
			alert("Services are available on a PC.\nOnce connected to your PC, please use.");
			return;
		}
		
		var idx = $(this).parent(".menu2").index()-1;

		$band.find(".con").prev(".ui-fold-btn2").each(function(){
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($band.find(".con").eq(idx).prev(".ui-fold-btn2").find("img"),"on");
		
		if ($band.find(".con").eq(idx).is(':visible')){
			$band.find(".con").eq(idx).slideUp(speed);
			bandState = false;
			visibleLength--;

			$band.find(".con").prev(".ui-fold-btn2").each(function(){
				imgReplace($(this).find(">img"),"on");
			});

		} else {
			$band.css(basePosVal);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$band.find(".con").eq(idx).show();
				bandState = true;
			} else {
				$band.find(".con").eq(idx).slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		e.preventDefault();
		
		return false;
		*/
	});
	
	//---------------------------------------------------
	// close action
	$(".con .close a").click(function(e){
		var $cont = $(this).parents('.con');
		
		if ($cont.is(':visible')){
			$cont.slideUp(speed);
			bandState = false;
			visibleLength--;
		} else {
			$band.css(basePosVal);
			if (visibleLength > 0 ){
				$band.find('.con:visible').hide();
				$cont.show();
				bandState = true;
			} else {
				$cont.slideDown(500,function(){
					$('html,body').animate({
						'scrollTop' : $band.offset().top
					},speed)
				});
				visibleLength++;
			}
			bandState = true;
		}
		if($("body.main").size() == 0){
			$band.find("h2").next(".ui-fold-btn").each(function(){
				imgReplace($(this).find(">img"),"on");
			});
		}

		$(this).parent().parent().prev(".ui-fold-btn").focus(); // 닫힌 후 포커스 이동
		e.preventDefault();
	});
	
	if (Detect.isDesktop()){

		$win.scroll(function(){
			if (bandState){
				$band.css(basePosVal);
			}
			else {
				if (parseInt($win.scrollTop(),10) > parseInt($doc.height() - $win.height() - footHeight,10)) {
					$band.css(basePosVal);
				} else if (parseInt($win.scrollTop(),10) < parseInt($doc.height() - $win.height() + footHeight,10)) {
					if($("body.main").size() == 0){
						$band.css(fixedPosVal);
					}
				} 
			}
		});

		$win.resize(function(){
			footHeight = $('#footer').height();
		})
		
		//최초 로딩시
		if ($win.height() > $doc.height()){
			$band.css(basePosVal);
		} else {
			if($("body.main").size() == 0){
				$band.css(fixedPosVal);
			}
		}
	}
}

/* steel in life PC action */
$(function(){
	var $innerLst = $(".steelMenu .lifeWrap > ul > li");
	var $innerLstSize = $(".steelMenu .lifeWrap > ul > li").size()-1;
	var $listTxt = $(".steelMenu .lifeWrap .menuTxt li");
	var $listImg = $(".steelMenu .lifeWrap .menuImg li");
	var $ConInner = $(".steelMenu .lifeWrap .menuCon");
	var $listCon = $(".steelMenu .lifeWrap .menuCon li");
	var $innerBg = $(".steelMenu .bg");
	var $innerBg2 = $(".steelMenu .bg2");
	var $topBtn = $(".steelMenu .menu li");

	var $prev = $(".steelMenu .lifeCon .prev");
	var $next = $(".steelMenu .lifeCon .next");
	var idx = 1;
	var isMoving = false;
	var $btn = $(".steelMenu .lifeCon .prev, .steelMenu .lifeCon .next");
	
	// easing speed motion
	var speed = {
		duration: 1000,
		queue: false,
		easing: 'easeInOutExpo'
	},
	txtTimer = null;
	
	// speed
	var bgSpeed = 1000;
	var bg2Speed = 1800;
	var btnSpeed = 500;
	var lstOutSpeed = 500;
	var lstInSpeed = 1000;
	var layerSpeed = 500;
	var distance = -1304;
	var distance2 = 1304;
	
	// reset
	$innerBg.fadeIn(layerSpeed);
	$listCon.hide();
	$innerLst.fadeOut(lstOutSpeed);
	$innerLst.eq(1).fadeIn(lstInSpeed);
	$innerLst.find(">div").fadeOut(layerSpeed);
	$ConInner.animate({right : "-500px"},speed,function(){});
	
	$prev.click(function(){
		bannerAction("prev");

		return false;
	});
	
	$next.click(function(){
		bannerAction("next");
		
		return false;
	});

	// 상단 steel 메뉴 클릭 시
	$topBtn.find("a").click(function(){
		var menuIdx = $(this).parent().index();
		
		$innerBg.show();
		$innerLst.find(">div").fadeOut(layerSpeed);
		$ConInner.animate({right : "-500px"},speed,function(){});
		
		// button imgage replace

		$topBtn.find("a").each(function(){
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($(this).find("img"),"on");
		
		isMoving = true;
		if(idx != menuIdx){
			idx = menuIdx-1;
			
			idx++;
			$innerLst.fadeOut(lstOutSpeed);
			var showEvent = setTimeout(function view(){
				$innerLst.eq(idx).fadeIn(lstInSpeed)
			},800);

			$btn.fadeOut(btnSpeed);
			if(idx == 0){
				distance = -585;
				distance2 = -3193;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnView();
				});

			} else if (idx == 1){
				distance = -1899;
				distance2 = -1899;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnView();
				});
			} else {
				distance = -3193;
				distance2 = -585;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){
				});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnView();
				});
			}

			function btnView(){
				if(idx == $innerLstSize){
					$prev.fadeIn(btnSpeed).find("span").text("House");
					$next.fadeOut(btnSpeed);
				} else if (idx == 0){
					$next.fadeIn(btnSpeed).find("span").text("House");
				} else {
					$btn.fadeIn(btnSpeed);
					$prev.find("span").text("Office");
					$next.find("span").text("Life");
				}
			}
		}
		isMoving = false;

		return false;

	});

	// btn action
	function bannerAction(btnAction){
		if(btnAction == "next"){
			isMoving = true;
			idx++;
			
			$innerLst.fadeOut(lstOutSpeed);
			var showEvent = setTimeout(function view(){
				$innerLst.eq(idx).fadeIn(lstInSpeed)
			},800);
			
			$btn.fadeOut(btnSpeed);
			
			if(idx == 0){
				distance = -585;
				distance2 = -3193;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});

			} else if(idx == 1) {
				distance = -1899;
				distance2 = -1899;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});
			} else {
				distance = -3193;
				distance2 = -585;
				
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});
			}
			
			$topBtn.find("a").each(function(){
				imgReplace($(this).find(">img"),"off");
			});
			imgReplace($topBtn.eq(idx).find(">a>img"),"on");

			function btnMotion(){
				if(idx == $innerLstSize){
					$prev.fadeIn(btnSpeed).find("span").text("House");
					$next.fadeOut(btnSpeed);
				} else if (idx == 0){
					$next.fadeIn(btnSpeed).find("span").text("House");
				} else {
					$btn.fadeIn(btnSpeed);
					$prev.find("span").text("Office");
					$next.find("span").text("Life");
				}
			}
			
			isMoving = false;

		} else if (btnAction == "prev"){
			isMoving = true;
			idx--;

			$innerLst.fadeOut(lstOutSpeed);
			var showEvent = setTimeout(function view(){
				$innerLst.eq(idx).fadeIn(lstInSpeed)
			},800);

			$btn.fadeOut(btnSpeed);
			
			if(idx == 0){
				distance = -585;
				distance2 = -3193;
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){
				});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});

			} else if(idx == 1) {
				distance = -1899;
				distance2 = -1899;
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){
				});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});
			} else {
				distance = -3193;
				distance2 = -585;
				$innerBg2.stop().animate({marginRight : + distance2 + "px"},bg2Speed,function(){
				});
				$innerBg.stop().animate({marginLeft : + distance + "px"},bgSpeed,function(){
					btnMotion();
				});
			}
			
			$topBtn.find("a").each(function(){
				imgReplace($(this).find(">img"),"off");
			});
			imgReplace($topBtn.eq(idx).find(">a>img"),"on");
			
			function btnMotion(){
				if(idx == $innerLstSize){
					$prev.fadeIn(btnSpeed).find("span").text("House");
					$next.fadeOut(btnSpeed);
				} else if (idx == 0){
					$next.fadeIn(btnSpeed).find("span").text("House");
				} else {
					$btn.fadeIn(btnSpeed);
					$prev.find("span").text("Office");
					$next.find("span").text("Life");
				}
			}
			isMoving = false;
		}
	}
	
	// 배너 상세 레이어 노출
	$innerLst.find("a").click(function(){
		$(this).next("div").show();
		$innerBg.hide();
		$innerBg2.hide();
		
		return false;
	});
	
	// 뒤로가기 버튼 클릭 시
	$(".btn_back").click(function(){
		$(this).parent("div").hide();
		$innerBg.show();
		$innerBg2.show();
		
		$listCon.hide();
		$ConInner.animate({right : "-500px"},speed,function(){});
		
		return false;
	});
	
	// text img over
	$listTxt.find("a").mouseenter(function(){
		if($ConInner.css("right") == "-500px"){
			var txtIdx = $(this).parent("li").index();
			
			$listImg.find("a").each(function(){
				imgReplace($(this).find("img"),"off");
			});
			imgReplace($(this).parents(".menuTxt").next(".menuImg").find("li").eq(txtIdx).find(">a>img"),"on");
		}
	}).mouseout(function(){
		$listImg.find("a").each(function(){
			imgReplace($(this).find("img"),"off");
		});
	});
	
	// text img focus
	$listTxt.find("a").focusin(function(){
		if($ConInner.css("right") == "-500px"){
			var txtIdx = $(this).parent("li").index();
			
			$listImg.find("a").each(function(){
				imgReplace($(this).find("img"),"off");
			});
			imgReplace($(this).parents(".menuTxt").next(".menuImg").find("li").eq(txtIdx).find(">a>img"),"on");
		}
	}).focusout(function(){
		$listImg.find("a").each(function(){
			imgReplace($(this).find("img"),"off");
		});
	});
	
	// icon img over
	$listImg.find("a").mouseenter(function(){
		imgReplace($(this).find("img"),"on");
	}).mouseleave(function(){
		imgReplace($(this).find("img"),"off");
	});
	
	// icon image focus
	$listImg.find("a").focusin(function(){
		imgReplace($(this).find("img"),"on");
	}).focusout(function(){
		imgReplace($(this).find("img"),"off");
	});
	
	// text image click 
	$listTxt.find("a").click(function(){
		$listCon.hide();
		var txtIdx = $(this).parent("li").index();
		
		$(this).parents(".menuTxt").next().next(".menuCon").find("li").eq(txtIdx).show();
		$ConInner.animate({right : "0"},speed,function(){});
		
		$listImg.find("a").each(function(){
			imgReplace($(this).find("img"),"off");
		});
	}).focus(function(){
		$listCon.hide();
		$listTxt.removeClass("active");
		$(this).parent("li").addClass("active");
	});

	// icon image click 
	$listImg.find("a").click(function(){
		$listCon.hide();
		var ImgIdx = $(this).parent("li").index();
		
		$(this).parents(".menuImg").next(".menuCon").find("li").eq(ImgIdx).show();
		$ConInner.animate({right : "0"},speed,function(){});
		
		$listImg.find("a").each(function(){
			imgReplace($(this).find("img"),"off");
		});
	}).focus(function(){
		$listCon.hide();
		$listTxt.removeClass("active");
		$listImg.removeClass("active");
		$(this).parent("li").addClass("active");
	});

	// layer close click
	$(".layerClose").click(function(){
		var idx = $(this).parent("li").index();

		$listImg.find("a").each(function(){
			imgReplace($(this).find("img"),"off");
		});
		$(this).parents(".menuCon").parent("div").find("li.active a").focus();

		$ConInner.animate({right : "-500px"},speed,function(){});
	});

	/* focus move action (해당메뉴로 상세내용으로 포커스 강제이동) */
	// 1. 텍스트 이미지 (tab key action)
	$listTxt.find("a[href^='#']").on({
		keydown : function(event) {
			if (event.keyCode == 9 ) {
				$($(this).attr('href')).find("div").attr('tabindex', '0').focus();
			}
		}
	});
	
	// 2. 아이콘 이미지 (tab key action)
	$listImg.find("a[href^='#']").on({
		keydown : function(event) {
			if (event.keyCode == 9 ) {
				$($(this).attr('href')).find("div").attr('tabindex', '0').focus();
			}
		}
	});
	
	// 3. 레이어 닫기버튼 (tab key & shiftKey + tab action)
	$(".layerClose").on({
		keydown : function(event) {
			if(event.keyCode == 9 && event.shiftKey) {
				var idx = $(this).parent("li").index();

				$(this).parents(".menuCon").parent("div").find("li.active a").focus();
				
			} else if (event.keyCode == 9 ) {
				var idx = $(this).parent("li").index();

				$(this).parents(".menuCon").parent("div").find("li.active a").focus();
			}
		}
	});
});

/* steel in life mobile action */
$(function(){
	var $innerLst = $(".steelMenu_m .lifeWrap > ul > li");
	var $layer = $(".layerDetail");
	var $close = $(".steelMenu_m .layerClose");
	var $titLink = $(".view_layer");
	var btnIdx = 0;
	
	//reset
	$innerLst.hide();
	$layer.hide();
	$layer.find(".list").hide();
	$innerLst.eq(1).show();

	function reset(){
		$innerLst.hide();
		$layer.hide();
		$layer.find(".menuCon li").hide();
	}
	
	$(".link_office").click(function(){
		reset();
		$innerLst.eq(0).show();
		$innerLst.eq(0).find(".inner").show();
		
		return false;
	});

	$(".link_house").click(function(){
		reset();
		$innerLst.eq(1).show();
		$innerLst.eq(1).find(".inner").show();

		return false;
	});

	$(".link_street").click(function(){
		reset();
		$innerLst.eq(2).show();
		$innerLst.eq(2).find(".inner").show();
		
		return false;
	});

	$titLink.click(function(){
		var idx = $(this).parent().parent(".inner").parent("li").index();
		var $parent = $(this).parent().parent()
		
		// reset
		$layer.hide();
		$innerLst.find(".menuCon .btn .prev a").hide();
		
		$parent.hide();
		$parent.next(".layerDetail").show();
		$parent.next().find(".menu > ul > li").eq(idx).addClass("on");
		$parent.next().find(".menu > ul > li").eq(idx).find(".list").show();
		$parent.next().find(".menuCon li").hide();
		$parent.next().find(".menuCon li").eq(0).show();
		
		$('#footer').css("position","static");

		return false; 
	});
	
	$close.click(function(){
		$(this).parents(".layerDetail").hide();
		$(this).parents(".layerDetail").prev(".inner").show();
		
		return false;
	});
	
	// list view
	$layer.find(".menu > ul > li > a").click(function(){
		if($(this).next(".list").css("display") == "none"){
			$layer.find(".list").hide();
			$(this).next(".list").show();
			$(this).parent("li").addClass("on").siblings().removeClass("on");
		} else {
			$layer.find(".list").hide();
			$(this).next(".list").hide();
			$(this).parent("li").removeClass("on");
			$('#footer').css("position","relative");
		}

		if($(this).parent().index() == 1){
			$('#footer').css("position","static");
		} else {
			$('#footer').css("position","relative");
		}
		
		return false;
	});
	
	$layer.find(".list > ul > li > a").click(function(){
		var textIdx = $(this).parent("li").index();
		var listIdx = $(this).parents(".list").parent("li").index();
		var btnPrev = $innerLst.find(".menuCon .btn .prev a");
		var btnNext = $innerLst.find(".menuCon .btn .prev a");
		
		if(textIdx == 0){
			btnPrev.hide();
		} else {
			btnPrev.show();
			btnNext.show();
		}
		
		$layer.find(".menu > ul > li").removeClass("on");
		$innerLst.hide();
		$innerLst.find(".inner").hide();
		$layer.find(".menuCon > ul > li").hide();
		
		btnIdx = textIdx;
		
		if(listIdx == 0){
			var $officeCon = $(".steelMenu_m .office .menuCon");
			var $officeList = $(".steelMenu_m .office .menuCon li");
			var textPrev = $(".steelMenu_m .office .menuCon li").eq(textIdx-1).find("strong").text();
			var textNext = $(".steelMenu_m .office .menuCon li").eq(textIdx+1).find("strong").text();
		
			$(this).parents(".list").hide();
			$innerLst.eq(0).show();
			$innerLst.eq(0).find($layer).show();
			
			$officeList.eq(textIdx).show();
			$officeCon.find(".prev a").text(textPrev);
			$officeCon.find(".next a").text(textNext);
			
			
			if(textIdx == $officeList.size()-1){
				$officeCon.find(".next a").hide();
			}
			
		} else if (listIdx == 1){
			var $houseCon = $(".steelMenu_m .house .menuCon");
			var $houseList = $(".steelMenu_m .house .menuCon li");
			var textPrev = $(".steelMenu_m .house .menuCon li").eq(textIdx-1).find("strong").text();
			var textNext = $(".steelMenu_m .house .menuCon li").eq(textIdx+1).find("strong").text();
		
			$(this).parents(".list").hide();
			$innerLst.eq(1).show();
			$innerLst.eq(1).find($layer).show();
			
			$houseList.eq(textIdx).show();
			$houseCon.find(".prev a").text(textPrev);
			$houseCon.find(".next a").text(textNext);
			
			if(textIdx == $houseList.size()-1){
				$houseCon.find(".next a").hide();
			}
			
		} else {
			var $streetCon = $(".steelMenu_m .street .menuCon");
			var $streetList = $(".steelMenu_m .street .menuCon li");
			var textPrev = $(".steelMenu_m .street .menuCon li").eq(textIdx-1).find("strong").text();
			var textNext = $(".steelMenu_m .street .menuCon li").eq(textIdx+1).find("strong").text();
		
			$(this).parents(".list").hide();
			$innerLst.eq(2).show();
			$innerLst.eq(2).find($layer).show();
			
			$streetList.eq(textIdx).show();
			$streetCon.find(".prev a").text(textPrev);
			$streetCon.find(".next a").text(textNext);
			
			if(textIdx == $streetList.size()-1){
				$streetCon.find(".next a").hide();
			}
		}
		
		return false;
	});
	
	// list close
	$layer.find(".list_close").click(function(){
		$layer.find(".menu > ul > li").removeClass("on");
		$(this).parent(".list").hide();
		
		$('#footer').css("position","relative");
		return false;
	});
	
	// 태블릿 좌우버튼 텍스트 노출
	$innerLst.find(".menuCon .btn .prev a").hide();
	$innerLst.find(".menuCon .btn .prev a").click(function(){
		var nextText = $(this).parent().parent().prev("ul").find("li").eq(btnIdx).find("strong").text();
		var prevText = $(this).parent().parent().prev("ul").find("li").eq(btnIdx-2).find("strong").text();
		
		btnIdx--;
		
		if (btnIdx == 0) {
			$(this).hide();
		} else {
			$(this).parent().next(".next").find("a").css("display","block");
			$(this).show();
		}
		
		$(this).text(prevText);
		$(this).parent().parent().prev("ul").find("li").hide();
		$(this).parent().parent().prev("ul").find("li").eq(btnIdx).show();
		
		$(this).parent().next(".next").find("a").text(nextText);
		
		return false;
	});
	
	$innerLst.find(".menuCon .btn .next a").click(function(){
		var $size = $(this).parent().parent().prev("ul").find("li").size()-1;
	
		var nextText = $(this).parent().parent().prev("ul").find("li").eq(btnIdx+2).find("strong").text();
		var prevText = $(this).parent().parent().prev("ul").find("li").eq(btnIdx).find("strong").text();
		
		btnIdx++;
		
		if (btnIdx == $size) {
			$(this).hide();
		} else {
			$(this).parent().prev(".prev").find("a").css("display","block");
			$(this).show();
		}
		
		$(this).text(nextText);
		$(this).parent().parent().prev("ul").find("li").hide();
		$(this).parent().parent().prev("ul").find("li").eq(btnIdx).show();
		
		$(this).parent().prev(".prev").find("a").text(prevText);
		
		return false;
	});
});

/*
* [PC] 메인 하단 Steel in life ,expe... 폴딩
*/
(function($){
	var $mainFolder = $('#mainMenu').find('.foldingArea'),
		$foldBtn = $mainFolder.find('.foldingBtn > a'),
		state = 'close',
		visibleLen = 0,
		speed = {
			duration: 800,
			queue: false,
			easing: 'easeInOutExpo'
		};

	$foldBtn.click(function(e){
		$target = $(this).parent('div').next('.con');
		
		if (state == 'close'){
			//open action
			if (visibleLen == 0){
				$target.slideDown(speed);
				visibleLen++;
				$('html,body').animate({
					'scrollTop' : $target.offset().top
				},speed)
			}
			state ='open';
		} else {
			
			if ($target.is(':visible')){
				$target.slideUp(speed);
				visibleLen--;
				state ='close';
			} else {
				$mainFolder.find('.con:visible').hide();
				$target.show();
			}
		}
		e.preventDefault();
	})

	
}(jQuery));

/*
* 연혁 history페이지 상단 사진롤링 (PC,mobile,tablet)
*/
(function($){

var $frame = $('#history_frame'),
	$handler = $frame.find('>ul'),
	$list = $handler.find('>li'),
	$prev = $frame.find('> div > .prev'),
	$next = $frame.find('> div > .next'),
	totalImgLen = $list.length,
	oldIdx = 0,
	nowIdx = 0,
	startList = false,
	lastList = false,
	speed = {
		duration: 600,
		queue: false,
		easing: 'easeInOutExpo',
		complete : function(){
			flag=false;
		}
	},
	flag = false;
	
var _showItemLen,
	_frameWidth,
	_listWidth,	
	_listGap = 0,
	_distance;

var hFrame = {

	init : function(){
		_showItemLen = ($body.width() > 640) ? 2 : 1;
		_frameWidth = parseInt($frame.outerWidth(),10);
		_listGap = parseInt($list.css('margin-right'),10);
		_listWidth = parseInt((_frameWidth - _listGap) / _showItemLen,10);
		_distance = _listWidth+_listGap;

		$list.width(_listWidth);
		hFrame.check();
	},

	reset : function(){
		hFrame.init();
		if (totalImgLen%2 != 0 && _showItemLen == 2 && nowIdx == totalImgLen-1){
			nowIdx--;
		}
		hFrame.action(_showItemLen,nowIdx,0);
	},

	check : function(){
		if (totalImgLen - oldIdx <= _showItemLen){
			$next.fadeOut();
			lastList = true;
		} else if (oldIdx <= 0){
			$prev.fadeOut();
			startList = true;
		} else {
			$next.fadeIn();
			$prev.fadeIn();
			startList = lastList = false;
		}
	},

	action : function(_showItemLen ,idx, speed){
		$handler.animate({
			'margin-Left' : _distance * idx * -1
		},speed);
		oldIdx = nowIdx;
		hFrame.check();
	},

	bindEvent : function(){
		$win.resize(function(){
			hFrame.reset();
		});
		$next.find('>a').click(function(e){
			if (lastList){
				return;
			}
			if (!flag){	
				flag = true;
				nowIdx++;
				hFrame.action(_showItemLen,nowIdx,speed);
			}
			e.preventDefault();
		});

		$prev.find('>a').click(function(e){
			if (startList){
				return;
			}
			if (!flag){	
				flag = true;
				nowIdx--;
				hFrame.action(_showItemLen,nowIdx,speed);
			}
			e.preventDefault();
		});
		
		if (Detect.isTouch()){
			$handler.swipe( {
				swipe:function(event, direction, distance, duration, fingerCount) {
					if (direction == 'left'){
						$next.find('>a').click();
					} else if (direction == 'right') {
						$prev.find('>a').click();
					}
				},
				threshold:70,
				allowPageScroll : 'vertical'
			});
		};
	}
};

$(function(){
	$prev.hide();
	hFrame.init();
	hFrame.bindEvent();
})
}(jQuery));


$.fn.extend({
	/* 
	* IMG fileName & alt modify  
	* @name : USimgNameChg
	* @use : $(a).USimgNameChg({
					'src' : ['_off','_on'],	//앞 문자열을 뒤 문자열로 변경
					'alt' : ['열림','닫힘'] 
				})
	*/
	USimgNameChg : function(options){
		$(this).each(function(){
			var $this = $(this);

			if (options.alt && options.alt.length == 2){
				$this.attr('alt', $this.attr('alt').replace(options.alt[0], options.alt[1]));
			}
			if (options.src && options.src.length == 2){
				$this.attr('src', $this.attr('src').replace(options.src[0], options.src[1]));
			}
		});
	},
	/* 
	* selectBox  
	* @name : USfoldingBox
	* @html : target > .ui-fold-btn //폴딩버튼으로 보통 a태그에 클래스 추가
	*				> .ui-fold-list //폴딩되는 영역으로 ul 혹은 div에 클래스 추가 
	*/
	USfoldingBox : function(options){
		var selectArray = $(this),
			speed = {
				duration: 500,
				queue: false,
				easing: 'easeInOutExpo'
			},
			defaults = {
				devide : false,		//true 일 경우 셀렉트영역 mouseleave시 숨김처리
				autoFocusEnter : false, //키보드포커스가 들어오면 자동펼침
				_stateChange : '',		//버튼 상태변화를 class, image로 지정 class는 on 추가/제거, image는 _on / _off
				_addEvent : false,	//추가 개별 event
				_openEvent : false,
				_closeEvent : false
			};
		var option = $.extend({},defaults,options);

		selectArray.each(function(){	

			var $folderBox = $(this),
				$selectList = $folderBox.find('.ui-fold-list');
			
			if (option.devide){ 
				//각 셀렉트박스를 개별인것 처럼
				$folderBox.on({
					'mouseleave' : function(){
						closeEvent();
					}
				})
			}
			
			if (option._addEvent){
				option._addEvent();
			}

			if (option.autoFocusEnter){	//btn에 focusIn 일때 자동펼침 
				$folderBox.find('.ui-fold-btn').on({
					'mouseenter focusin' : function(e){
						( $selectList.is(':visible') ) ? closeEvent() : openEvent();
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});
			} else {	//btn에 focusIn 일때 안 펼침 
				$folderBox.find('.ui-fold-btn').on({
					'click' : function(e){
						( $selectList.is(':visible') ) ? closeEvent() : openEvent();
						e.preventDefault();
						e.stopPropagation();
					}
				});
			}
	
			$folderBox.on('mousedown focusin', function(e){
				e.stopPropagation();
			})

			$body.on('mousedown focusin', function(e) {
				closeEvent();
				e.stopPropagation();
				//e.preventDefault();
			});

			function openEvent(){
				$folderBox.find('.ui-fold-btn').addClass('on');
				if (option._openEvent){
					speed.complete = option._openEvent;
				}
				$selectList.slideDown(speed);
				if (option._stateChange == 'image'){
					$folderBox.find('.ui-fold-btn img').USimgNameChg({'src' : ['_off','_on'] });
				}
			};

			function closeEvent(){
				$folderBox.find('.ui-fold-btn').removeClass('on');
				if (option._closeEvent){
					speed.complete = option._closeEvent;
				}
				$selectList.slideUp(speed);
				if (option._stateChange == 'image'){
					$folderBox.find('.ui-fold-btn img').USimgNameChg({'src' : ['_on','_off'] });
				}
				
			};

		});
	}
});

// 해외 지도
$(function(){
	var $map = $(".business_overseas .map li");
	var $mapOn = $(".business_overseas .map li.on");
	var $list = $(".business_overseas .map_list li");
	var $listOn = $(".business_overseas .map_list li.on");

	$mapOn.addClass("active"); // default 
	$listOn.addClass("active");

	// map over, focus action
	$map.find("a").bind('mouseenter focusin',function(){
		var idx = $(this).parent("li").index();
		reset();

		$(this).parent("li").addClass("on");
		$list.eq(idx).addClass("on");
	}).bind('mouseleave focusout',function(){
		reset();
	});

	// text over, focus action
	$list.find("a").bind('mouseenter focusin',function(){
		var idx = $(this).parent("li").index();
		reset();

		$(this).parent("li").addClass("on");
		$map.eq(idx).addClass("on");
	}).bind('mouseleave focusout',function(){
		$(this).mouseenter();
	});
	
	$("#lnb").find("a").focusin(function(){reset();});
	$(".map_area").mouseleave(function(){reset();});
	$list.last().focusout(function(){reset();});
	
	// reset
	function reset(){
		$map.removeClass("on");
		$list.removeClass("on");
		
		$(".map li.active").addClass("on"); // default 
		$(".map_list li.active").addClass("on");
	}
});


/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.3
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);



/* 
* 게시판 해당 셀 제거 _ 채용공고
*/

$(function(){
	var $listCount1 = $("#list_count1");

	listCount_view();

	$win.resize(function(){
		listCount_view();
	});

	function listCount_view(){
		$listCount1.find("th, td").hide();

		if($win.width() < 641){ // 모바일
			$listCount1.find("th, td").show();
			$listCount1.find("th:eq(0), td:nth-child(1)").hide(); // 모바일에서 번호 셀 제외
			$listCount1.find("th:eq(1)").width("47%");
			$listCount1.find("th:eq(2)").width("23%");
			$listCount1.find("th:eq(3)").width("20%");
		} else { // pc
			$listCount1.find("th, col, td").show();
			$listCount1.find("th:eq(0)").width("13%");
			$listCount1.find("th:eq(1)").width("auto");
			$listCount1.find("th:eq(2)").width("23%");
			$listCount1.find("th:eq(3)").width("20%");
		}

	}
});

/* 
* 게시판 해당 셀 제거 _ 투자공고
*/

$(function(){
	var $listCount1 = $("#list_count2");

	listCount_view();

	$win.resize(function(){
		listCount_view();
	});

	function listCount_view(){
		$listCount1.find("th, td").hide();

		if($win.width() < 641){ // 모바일
			$listCount1.find("th, td").show();
			$listCount1.find("th:eq(0), th:eq(3), td:nth-child(1), td:nth-child(4)").hide(); // 모바일에서 번호 셀 제외
			$listCount1.find("th:eq(1)").width("83%");
			$listCount1.find("th:eq(2)").width("17%");
		} else { // pc
			$listCount1.find("th, td").show();
			$listCount1.find("th:eq(0)").width("13%");
			$listCount1.find("th:eq(1)").width("auto");
			$listCount1.find("th:eq(2)").width("17%");
			$listCount1.find("th:eq(4)").width("15%");
		}

	}
});


/* 
* 게시판 해당 셀 제거 _ 손익계산서, 재무상태표
*/

$(function(){
	var $listCount1 = $("#list_year1");

	listCount_view();

	$win.resize(function(){
		listCount_view();
	});

	function listCount_view(){
		$listCount1.find("th, col, td").hide();

		if(viewMode == 'm'){ // 모바일
			$listCount1.find("th, col, td").show();
			$listCount1.find("th:eq(2), col:eq(2), td:nth-child(3)").hide(); // 모바일에서 번호 셀 제외
		} else { // pc
			$listCount1.find("th, col, td").show();
		}

	}
});

/*
* 스토리 콘텐츠 상세내용 more 버튼 클릭시 추가 리스트 보여줌
* target : 모바일
*/

/*
* @func stroyContentMoreView
* @arg1,	[target]		string {리스트 상위 ul , ol 아이디 } 
* @arg2,	[btn]			string  {more버튼의 a태그 아이디} 
* @arg3,	[showItemLength] number {한번에 보여줄 리스트 갯수} 
*/
function stroyContentMoreView (target,btn,showItemLength){
	var $list = $('#'+target).find('> li'),
		$btnMore = $('#'+btn),
		totalLength = $list.size(),
		showLength = showItemLength;

	var num = 1;
	$btnMore.click(function(e){
		showLength = showLength;
		$list.filter(':hidden:lt('+showLength+')').show();

		var offsetSize = num*3;

		num++;
		$('html,body').delay(500).animate({
			'scrollTop' : $("#fold_storyList li").eq(offsetSize).offset().top
		},800);

		showLength = showLength+showItemLength;

		if (showLength == totalLength){
			$btnMore.hide();
		};
		e.preventDefault();
	});

	$list.hide().filter(':lt('+showLength+')').show();
}

var conSize = $("#fold_storyCon li").size();

if(viewMode == 'm') {
	stroyContentMoreView('fold_storyCon','btn_more_storyCon',1);
	stroyContentMoreView('fold_storyList','btn_more_storyList',2);
} else {
	stroyContentMoreView('fold_storyCon','btn_more_storyCon',conSize);
	stroyContentMoreView('fold_storyList','btn_more_storyList',6);
}


$doc.ready(function(){

	$('select, input, textarea').on('click mousedown focusin', function(e){
		e.stopPropagation();
	});

	//PC UIDeivce :  LUXTEEL STORY
	LUXTEEL_accordion();
	//PC Floating Band Banner [only PC]
	flotingSteelMenu();

	$('#familySite').USfoldingBox();
	$('#contactus').USfoldingBox();
	$('#experienceTxt').USfoldingBox();
	$('#mobileSelect').USfoldingBox();
	$(".expericeClose").click(function(){
		$('#experienceTxt .ui-fold-list').slideUp();
		
		return false;
	});
	
	$('#storyVisual_con').USfoldingBox({
		_openEvent : function(){
			$(this).prev('.ui-fold-btn').find('>img').USimgNameChg({
				'src' : ['_on','_off'],
				'alt' : ['펼침','닫힘'] 
			})
		},
		 _closeEvent : function(){
			$(this).prev('.ui-fold-btn').find('>img').USimgNameChg({
				'src' : ['_off','_on'],
				'alt' : ['닫힘','펼침'] 
			})
		}
	});
});


/* product */
$(function(){
	var $img = $(".cate .img_area li a");
	var $imgOn = $(".cate .img_area li.on a");
	var $imgList = $(".cate .img_area ul");
	var $imgOnDiv = $(".cate .img_area li.on div");
	
	$imgList.height($imgOnDiv.height()); // 목록 높이 지정 (on처리 되어있는 div)

	$(window).load(function(){
		$imgOn.find(".hover").width($imgOn.width()-4).height($imgOn.height()-4);
		$imgList.height($imgOnDiv.height());
	});

	$(window).resize(function(){
		$imgOn.find(".hover").width($img.width()-4).height($img.height()-4);
		$imgList.height($imgOnDiv.height());
	});

	$img.click(function(){
		$img.parent().removeClass("on");
		$(this).parent().addClass("on");
		
		var size1 = $(this).width();
		var size2 = $(this).height();
		$(this).find(".hover").width(size1-4).height(size2-4);
		
		return false;
	}).focus(function(){
		$(this).click();
	});
});

/* main visual */
$(function(){
	var MainV = $(".mainVisual");
	var MainUL = MainV.find(".list ul");
	var Length = MainUL.find("li").size() -1;
	var btnItem = $(".mainVisual .menu");
	var Speed = 5000 ; // 롤링 속도
	var delaySpeed = 500;
	var txtSpeed = 1000;
	var idx = 0;
	
	if($("body.main").size() == 1){

		// txt reset
		MainUL.find("p").hide();
		RollMain = setInterval(function(){Event()},Speed);
		
		// btn reset 
		$(".btn_play").hide();
		
		$(window).load(function(){
			if($win.width() > 1024){
				MainUL.find("> li:first-child").find("p.p").delay(delaySpeed).fadeIn(txtSpeed);
			} else {
				MainUL.find("> li:first-child").find("p.m").delay(delaySpeed).fadeIn(txtSpeed);
			}
		});
		
		function Event() {
			var Target = MainUL.find("li:visible")
			var btn_target = $(".mainVisual .menu").find("a")
			var idx = Target.index();
			var StartView = MainUL.find("> li:first-child")
			var StartBtn = $(".mainVisual .menu").find("li:first-child")
			var TargetBtn = $(".mainVisual .menu li")
			
			if (idx >= Length) {
				StartView.fadeIn("slow").addClass("on").siblings().fadeOut("slow").removeClass("on");
				StartView.siblings().find("p").fadeOut("slow");
				
				if($win.width() > 1024){
					StartView.find("p.p").delay(delaySpeed).fadeIn(txtSpeed);
				} else {
					StartView.find("p.m").delay(delaySpeed).fadeIn(txtSpeed);
				}
				
				$(window).resize(function(){
					if($win.width() > 1024){
						StartView.find("p.p").delay(delaySpeed).fadeIn(txtSpeed);
					} else {
						StartView.find("p.m").delay(delaySpeed).fadeIn(txtSpeed);
					}
				});
				
				StartBtn.addClass("on").siblings().removeClass("on");
				
				TargetBtn.each(function(){
					imgReplace(TargetBtn.find("img"),"off");
				});
				imgReplace(StartBtn.find("img"),"on");

			} else {
				Target.next().fadeIn("slow").addClass("on").siblings().fadeOut("slow").removeClass("on"); // 모션
				Target.next().find(".p").delay(delaySpeed).fadeIn(txtSpeed);
				Target.next().siblings().find("p").fadeOut("slow");
				
				if($win.width() > 1024){
					Target.next().find("p.p").delay(delaySpeed).fadeIn(txtSpeed);
				} else {
					Target.next().find("p.m").delay(delaySpeed).fadeIn(txtSpeed);
				}
				
				$(window).resize(function(){
					if($win.width() > 1024){
						Target.next().find("p.p").delay(delaySpeed).fadeIn(txtSpeed);
					} else {
						Target.next().find("p.m").delay(delaySpeed).fadeIn(txtSpeed);
					}
				});
				
				TargetBtn.each(function(){
					imgReplace(TargetBtn.find("img"),"off");
				});
				imgReplace(TargetBtn.eq(idx+1).find("img"),"on");
				
				TargetBtn.eq(idx+1).addClass("on").siblings().removeClass("on");
			}
		}

		MainV.find(".menu a").click(function(){
		  return false;
		});
		
		$(".btn_stop a").click(function(){
			$(".btn_stop").hide();
			$(".btn_play").show();
			
			clearInterval(RollMain);
		});
		
		$(".btn_play a").click(function(){
			$(".btn_stop").show();
			$(".btn_play").hide();
			
			RollMain = setInterval(function(){Event()},Speed);
		});

		btnItem.find("li>a").mouseenter(function(){
			clearInterval(RollMain);
			
			var num = $(this).parent().index();
			
			MainUL.find(">li").eq(num).fadeIn("slow").siblings("li").fadeOut("slow");
			
			$(this).parent().addClass("on");
			$(this).parent().siblings().removeClass("on");
		
			btnItem.find("li>a").each(function(){
				imgReplace(btnItem.find("li>a>img"),"off");
			});
			imgReplace($(this).find("img"),"on");
			
			MainUL.find(">li").find("p").fadeOut("slow");
			
			if(viewMode == "p"){
				MainUL.find(">li").eq(num).find(".p").delay(delaySpeed).fadeIn(txtSpeed);
			} else {
				MainUL.find(">li").eq(num).find(".m").delay(delaySpeed).fadeIn(txtSpeed);
			}
			
			$(window).resize(function(){
				if(viewMode == "p"){
					MainUL.find(">li").eq(num).find(".p").delay(delaySpeed).fadeIn(txtSpeed);
				} else {
					MainUL.find(">li").eq(num).find(".m").delay(delaySpeed).fadeIn(txtSpeed);
				}
			});
			
		}).focusin(function(){
			$(this).mouseenter();
		});
		
		btnItem.find("li>a").mouseleave(function(){
			RollMain = setInterval(function(){Event()},Speed);
		});
		
		$(".network li:first-child a").focusin(function(){
			$(".btn_stop").show();
			$(".btn_play").hide();
			RollMain = setInterval(function(){Event()},Speed);
		});
		
	}
	// 리스트 높이 리사이징
	imgResize();
	
	$(window).resize(function(){
		imgResize();
	});
	
	function imgResize(){
		var imgHeight = MainUL.find("li:visible").height();
		
		if($win.width() < 641){
			$(".mainVisual .list ul").height("430px");
		} else if ($win.width() < 1025){
			$(".mainVisual .list ul").height("560px");
		} else if ($win.width() > 1024){
			$(".mainVisual .list ul").height(imgHeight);
		}
	}
});