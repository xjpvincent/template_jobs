
$(function(){
//------------------- 搜索 --------------------
		//searchBox
		//$("#searchBox").val("软件搜索...").addClass("grey9");
		//inputDefault("#searchBox");
		$("#searchBtn").click(function(){
				
				if($("#searchBox").val() == 0 || $("#searchBox").val() == "软件搜索..."){
						    $.blockUI({ 
									message:  '<p class="f18 fb pt10 pb10">请输入您要的软件名称</p>',
									css: {
											marginLeft:     '-150px', 
											top:   '100px',
											width: '300px',
											textAlign:	'center'
									}
							});
							setTimeout($.unblockUI, 1200);
							$("#searchBox").focus();
							return false; 	
				}
		});	
		
	//20130905 wangpanTitle
	if($('#download .pan_3').length>0 || $('#download .pan_2').length>0 || $('#download .pan_1').length>0 || $('#download .pan_0').length>0){
		$('#download .address-wrap').prepend('<p style="font-size:15px;color:#000;font-weight:bold">网盘下载通道</p>');	
		$('.address-wrap h3').css({'padding-top':'15px'});
	}
	//20130922 fix sendErr-wrap
	if($('.ul_Address .sendErr-wrap').length>0){
		var erhtml=$('.sendErr-wrap').detach();
		$('.ul_Address').after(erhtml);
	}
	if($('.address-wrap .sendErr-wrap #sendErr').html()=='点击这里报错'){
		$('.address-wrap .sendErr-wrap').html('有问题？ <span id="sendErr">点此报错</span>  + <a rel="nofollow" href="tencent://message/?uin=1614706254&amp;Site=投诉&amp;Menu=yes" class="tousu">投诉</a> + <a rel="nofollow" href="tencent://message/?uin=1614706254&amp;Site=提问&amp;Menu=yes" class="tiwen">提问</a>');
	}
	
	if($('.address-wrap ').height()<270){
			$('.address-wrap ').css({'height' : '285px', 'padding' : '0'});
	}
		
	//20130520 search cate + key
	//$('#search').append('<p id="ssfl"><b>全部软件</b><span style="display:none;"><i>全部软件</i><i>全部游戏</i><i>全部文章</i></span></p>');
	$("#Search_form #searchBtn").after('<input name="searchType" type="hidden" id="searchType" value="down" />');
	$('#ssfl b').click(function(){
		if($('#ssfl span')[0].style.display=='none'){
		  $('#ssfl span')[0].style.display='block';
	    }else{
		  $('#ssfl span')[0].style.display='none';
		};
    	return false;
	});
	$('#ssfl').hover(
		function(){try{window.clearTimeout(timer);}catch(e){}},
		function(){if($('#ssfl span')[0].style.display=='block'){timer = setTimeout("$('#ssfl span')[0].style.display='none';", 1000);}}
	);
	$('#ssfl i').hover(
		function(){$(this).addClass('hover');},
		function(){$(this).removeClass('hover');}
	);
	$('#ssfl i').each(function(index){
		var tpi=index;
		$(this).click(function(){
			$('#ssfl b').html($(this).text());
			$('#ssfl span')[0].style.display='none';
			$("#searchForm #searchType").remove();$("#searchForm #rootID").remove();
			if(tpi==0){$("#searchForm #searchBtn").after('<input name="searchType" type="hidden" id="searchType" value="down" />');}
		    if(tpi==1){$("#searchForm #searchBtn").after('<input name="searchType" type="hidden" id="searchType" value="down" /><input type="hidden" name="rootID" id="rootID" value="12" />');}
			if(tpi==2){$("#searchForm #searchBtn").after('<input name="searchType" type="hidden" id="searchType" value="cms" />');}
		});
	});

if($("#page").is(".detailPage")){
	var sid=$('#param').attr("sid");
	var cid=$('#param').attr("cid");
	var cmtype=$('#comment-wrap').attr("cmty");//down
	var cname=$('#fast-nav a:last').text();
	var sname=$('#main h1').text();
	ReadMark(sid,'showding','showcai',cmtype);
	$("#comment-list dd p a:last-child").addClass("glBtn");
    BindDing("#comment-list dl > dd > p",sid,0);//顶
    $('#subNav a').each(function(){
        if ($(this).text()==cname) {
           $(this).css({'color':'#fff'}).parent().addClass("on");               
        }
	});
    $("#comment-list #cmtGo-wrap a").click(function(){$("#comment-form #cmtMsg").focus();});

$('#addcollect').click(function(){
	var title="pc6软件："+sname;
	var url=window.location.href;
        try{
              window.external.addFavorite(url,title);
        } catch (e){
              try {
                   window.sidebar.addPanel(title, url, "");
              } catch (e) {
                   alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏");}
       }

});	
if($('.softadall1').html()!=""){$('.softadall1').removeClass('softadall1');}
	if($('#xgb ul li').length<1){
		$('#xgb').remove();		
	}	
	gotoTop();	
	//autotab
	var athtml='<ul id="autotab"><li class="nota gtop">返回顶部</li></ul>'
	var i=1;
	var items=[];
	$("#page").after(athtml);	
	$('#mtab span:eq(0),#soft-intro .introTit,#xgb .title,#download .title span:eq(0),#comment-wrap .title').each(function(){
		 items.push($(this));
		$('#autotab .gtop').before('<li>'+$(this).text()+'</li>');
	});
	$('#autotab li:first').addClass('fir');
	$(".gtop").click(//定义返回顶部点击向上滚动的动画
        function(){$('html,body').animate({scrollTop:0},700);
    });
	$('#autotab li:not(".nota")').each(function(index){
		var now=index;
		$(this).click(function(){
			$('#soft-info').show();
			$('#xgk').hide();
			$('#xgd').hide();
			$('#xgw').hide();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
			$('#mtab span').removeClass('cur').eq(0).addClass('cur');
			$('html,body').animate({scrollTop:items[index].offset().top},700);
		});
	});
	
	$(window).scroll(function(){
       var tnum=items.length;
	   for(var i=0;i<tnum;i++){
		   if(items[i].offset().top<=$(window).scrollTop()){
			   $('#autotab li').removeClass('cur');
			   $('#autotab li:eq('+i+')').addClass('cur');
		   }
	   }
    });
	
	//introTit addnum
	$('#soft-intro .introTit').wrapInner('<span></span>').each(function(index){
        var inum=index+1;
		var iht='<i>'+inum+'</i>';
		//$(this).prepend(iht);
    });
	if($('#main .mver span i').length<1){
	  $('#main .mver').remove();
	}else{
	  $('#main .mver').hover(
		function(){$(this).addClass('hover');},
		function(){$(this).removeClass('hover');});
	}
	$('#xgd li:first').css('padding-top','0');
	$('#xgd li:first').find('i').css('top','5px');
	$('#xgd li:last').css('border','none');
	$('#xgw li:first').css('padding-top','0');
	$('#xgw li:last').css('border','none');
	if($('.downnow span').length>0){
		var tpsize = $('.downnow span').html();
		tpsize = tpsize.replace('软件大小：','');
		$('.downnow span').html(tpsize);
	}
	if($('#xgk .xki').length<1){
		$('#xgk').remove();
		$('#mtab span').eq(1).remove();
	}	
	$('#mtab span').each(function(){
	  $(this).click(function(){
		$('#mtab span').removeClass('cur');
		$(this).addClass('cur');
		if($(this).text()=='软件介绍'){			
			$('#soft-info').show();
			$('#xgk').hide();
			$('#xgd').hide();
			$('#xgw').hide();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
		}else if($(this).text()=='相关合集'){
			$('#soft-info').hide();
			$('#xgk').show();
			$('#xgd').hide();
			$('#xgw').hide();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
		}else if($(this).text()=='相关软件'){
			$('#soft-info').hide();
			$('#xgk').hide();
			$('#xgd').show();
			$('#xgw').hide();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
		}else if($(this).text()=='相关文章'){
			$('#soft-info').hide();
			$('#xgk').hide();
			$('#xgd').hide();
			$('#xgw').show();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
		}else if($(this).text()=='网友评论'){
			$('#mtab span').removeClass('cur').eq(0).addClass('cur');
			$('#soft-info').show();
			$('#xgk').hide();
			$('#xgd').hide();
			$('#xgw').hide();
			$('#xgb').show();
			$('#download').show();
			$('#content .ad2').show();
			$('#comment-wrap').show();
			$('html,body').animate({scrollTop:$('#comment-wrap').offset().top},700);
		}
	  });
	});
	//new download
	if($('#download .title span').length>1){
	  $("#download .title span:last").addClass('nline');
	  if($('#download ul.androidd li').length<1){
		  $('#download ul.androidd').remove();
		  $('#download .title span:contains("Android")').remove();
	  }
	  if($('#download ul.iphoned li').length<1){
		  $('#download ul.iphoned').remove();
		  $('#download .title span:contains("iPhone")').remove();
	  }
	  if($('#download ul.macd li').length<1){
		  $('#download ul.macd').remove();
		  $('#download .title span:contains("Mac")').remove();
	  }
	  if($('#download ul.ipadd li').length<1){
		  $('#download ul.ipadd').remove();
		  $('#download .title span:contains("iPad")').remove();
	  }
	}
	$("#download .title span").each(function(index){
        $(this).click(function(){   
            $('#download .title span').removeClass('cur');
		    $(this).addClass('cur');
		    if($(this).text()=='Android版'){     
				$('#download ul').removeClass('on');
				$('#download ul.androidd').addClass('on');
			}else if($(this).text()=='iPhone版'){     
				$('#download ul').removeClass('on');
				$('#download ul.iphoned').addClass('on');
			}else if($(this).text()=='Mac版'){     
				$('#download ul').removeClass('on');
				$('#download ul.macd').addClass('on');
			}else if($(this).text()=='iPad版'){     
				$('#download ul').removeClass('on');
				$('#download ul.ipadd').addClass('on');
			}else{
				$('#download ul').removeClass('on');
				$('#download ul').eq(0).addClass('on');
			}
        });
      });
	
//------------------ 投票 ------------------
		var softid = $("#softID").val();//获取资源ID
		//定义读取
		function getVote(){
				$.ajax({ 
							  type:"POST",
							  url: "/ajax.asp",
							  data:{"Action":"3","num":"0","type":"down"},
							  success: function(data,textStatus) {alert(data);
									  var dataObj = eval('('+data+')');
									  var dingNum = dataObj.Num[0];
									  var caiNum = dataObj.Num[1];
									  $("#dingNum").html(dingNum);
									  $("#caiNum").html(caiNum);
									  var dingPoint =  dataObj.Percentage[0];
									  var caiPoint =  dataObj.Percentage[1];
									  $("#dingPoint").html(dingPoint);
									  $("#caiPoint").html(caiPoint);
									  var point = dataObj.Very[0];
									  $("#userPoint").html(point);
							  }
				}); 
		}; 
		//定义发送
		function sendVote(data_num){
				$.ajax({ 
							  type:"POST",
							  url: "/ajax.asp",
							  data:{
									"Action": 0,
									"softid": softid,
									"type":   0,
									"num":    data_num
							  },
							  success: function(data,textStatus) {
									 getVote();
							  } //complete end
				 }); 
				 return false;
		};
		//调用
		//getVote();
		$("#ding").click(function(){
				 sendVote(1);
		});
		$("#cai").one("click",function(){
				 sendVote(0);
		}); 
//------------------ 评论 ------------------
        //文本输入框默认值
		inputDefault("#cmtMsg");
		inputDefault("#userName");
		//如果没有评论，隐藏"查看所有评论"
	    if($("#cmtNum").html() < 6){ 
			 $("#cmtNum-wrap").hide();
                    
	    };

		//提交评论
		$("#cmtForm").ajaxForm({
					beforeSubmit:cmtBefore,
					success:function(responseText,statusText){ 
						   $("#cmtMsg").val("");//清空评论内容输入框
						   $("#subOK").remove();//移除上一次提交的临时评论
						   var u_name = $("#userName").val();//获取用户输入的用户名
						   if($("#comment-list dl").length>0){
						    $("#cmtOK").remove();//移除上一次提交的临时评论
						   //构造临时评论
						   var subOK_text ='<dt id="subOK"><span><i>顶楼 </i><b> 您的评论</b> </span><em>发表于: <font>' +nowTime+ '</font>  </em></dt><dd id="cmtOK">'+responseText+'</dd>';
						   //加入评论列表
						   
						       $("#comment-list dl").last().append(subOK_text);}
						   if($("#comment-list ul").length>0){//for-老版的评论
						   //构造临时评论
						   var subOK_text = '<li id="subOK" class="cmtList none"><p class="cmtList-user"><span class="cmtList-floor">顶楼</span><span class="cmtList-name">'+u_name+'</span></p><div class="cmtList-content">'+responseText+'</div><p class="cmtList-ft"><span class="cmtList-time">'+nowTime+'</span> <span class="cmtList-reply button btnGreen">盖楼(回复)</span></p></li>';
						   //加入评论列表
							   $("#comment-list ul:eq(1)").append(subOK_text);}
						   //显示临时评论
						   $("#subOK").fadeIn(400);
					}
		});
		//回复盖楼
		$(".cmtList-reply").click(function(){
					var replyId = $(this).next(".replyId").html(); //获取单条评论的ID，传递后台用
					var reply = '[quote]'+replyId+'[/quote]'; //构造后台所需数据
					$("#cmtMsg").focus().val(reply); //设置值
					/*发送*/
					var send_data = 'action=19&id='+replyId;
					$.ajax({
							 type: "POST",
							 url: "/ajax.asp",
                                                    	 data: send_data
                                                        
					});
		});
		
		//分享到
		var web_url = window.location.href; 	 
	    $(".shareTo").share({
			  title: document.title,
			  content:"",
			  url: web_url,
			  popupModel: "window"
	    });
		//跳转到网友评论
		scrollTop("#goCmt","#comment-wrap");
		//文章页点击图片放大
		viewImg(".main-content img",softid);//
		//图片最大宽度 IE6
	    $("div.main-content img").each(function() {
			 var imgWidth = $(this).width();
			 if (imgWidth > 650){
				 $(this).width(650);
			 };
	    });	
		
		var hei=$(document).height()<$(window).height()?$(window).height():$(document).height();
		//$('.glOverlay').height(hei).css({"top":"-hei"});
		//$('.glOverlay').css({"opacity":"0.2"});
		//------------------ 下载详细页 ------------------
        if( $("#page").is(".down-detailPage") ){
				//跳转到下载地址
				scrollTop("#goUrl","#download");
				$('#comment-list dd').each(function(){
					var stringPl=$(this).html();
					if(stringPl.indexOf("undefined")>=0){
						var newPl=stringPl.replace("undefined","");
						$(this).html(newPl);
					}
				});
				
				//新版弹窗盖楼
				$(".glBtn").click(function(){					
					var reply = '' //获取单条评论的ID，传递后台用:[quote]Id[/quote]形式
					if(this.qpid){reply = this.qpid; }					
					var glRep = ' ';	
					//glRep +='<div id="repBox">';
				    glRep += '<p class="f14 tl pr pb10 yahei green">盖楼回复<span class="closeSendErr" id="closeUI">X</span></p>';
					glRep += '<p id="glName-wrap"><input name="UserName" type="text" id="glName" class="input-bg grey9" maxlength="10" value="PC6网友" />(您的评论需要经过审核才能显示)</p>';
					glRep += '<p><textarea id="glMsg" class="input-bor"></textarea></p>';
					glRep += '<p class="tr pt10"><input type="submit" class="btn-submit button btnOrg" id="glRep-btn" value="提交评论" /></p>';
					//glRep +='</div>';
							
				    $.blockUI({ 
									message: glRep,
									css: {
											marginLeft: '-242px', 
											top:   '40%',
											padding: 15,
											width: '580px',
											color:"#000",
											background: "#fff",
											border: "3px solid #090"
									},
									overlayCSS:  {
										cursor: 'default'
									}
							 });
							 $('.blockOverlay').attr('title','点击取消盖楼').click($.unblockUI); 
							 $("#closeUI").click(function(){
								 	$.unblockUI();
							 });
				     $('#glMsg').focus();
					
					 $("#glRep-btn").click(function(){
								 	var content = $("#glMsg").val();
									if( content < 3 ){
											  alert("您输入的评论太短：少于3个汉字;请重新输入");
											  return false;
									};
									if( content.length > 200 ){
											  alert("您输入的内容太多了，最多200个汉字");
											  return false;
									};
									content = reply + content;
									$('#repBox').remove();
									$.ajax({
											  type:"POST",
											  url: "/ajax.asp",
											  data:{
													"Action": 2,
													"SoftId": softid,
													"CommentTpye": 0,
													"content" : content
											  },
											  success: function(data,textStatus) {
													setTimeout(function() { 
												           $.blockUI({ 
																message:  '<p class="f18 fb pt10 pb10">盖楼成功！</p>',
																css: {
																		marginLeft: '-150px', 
																		top:   '40%',
																		width: '300px',
																		textAlign:	'center',
																		color:"#090",
																		background: "#fdfddf",
																		border: "3px solid #090"
																},
																showOverlay: false,
																timeout: 500
														   });
											        }, 500); 
											  } //complete end
									});	
							 });	
					
					
							
				});
				//------------------ 报错 ------------------
				$("#sendErr").click(function(){
							var sendErr = ' ';
							sendErr += '<p class="f14 pr pb5 yahei green">请简要描述您遇到的错误，我们将尽快予以修正。<span class="closeSendErr" id="closeUI">X</span></p>';
							sendErr += '<p><textarea id="writebug" class="input-bor"></textarea></p>';
							sendErr += '<p><input type="submit" class="btn-submit button btnOrg" id="sendErr-btn" value="提交错误" /></p>';
							$.blockUI({ 
									message: sendErr,
									css: {
											marginLeft: '-250px', 
											top:   '40%',
											padding: 15,
											width: '500px',
											color:"#000",
											background: "#fff",
											border: "3px solid #090"
									},
									overlayCSS:  {
										cursor: 'default'
									}
							 });
							 $('.blockOverlay').attr('title','点击取消报错').click($.unblockUI); 
							 $("#closeUI").click(function(){
								 	$.unblockUI();
							 });
							 $("#sendErr-btn").click(function(){
								 	var content = $("#writebug").val();
									if( content == 0 ){
											  alert("请输入报错信息");
											  return false;
									};
									if( content.length > 100 ){
											  alert("您输入的内容太多了");
											  return false;
									};
									$.ajax({
											  type:"POST",
											  url: "/ajax.asp",
											  data:{
													"Action": 2,
													"SoftId": softid,
													"CommentTpye": 3,
													"content" : content
											  },
											  success: function(data,textStatus) {
												    setTimeout($.unblockUI, 400);
													setTimeout(function() { 
												           $.blockUI({ 
																message:  '<p class="f18 fb pt10 pb10">报错成功，谢谢您的参与！</p>',
																css: {
																		marginLeft: '-150px', 
																		top:   '40%',
																		width: '300px',
																		textAlign:	'center',
																		color:"#090",
																		background: "#fdfddf",
																		border: "3px solid #090"
																},
																showOverlay: false,
																timeout: 1000
														   });
											        }, 1400); 
											  } //complete end
									});	
							 });	
				});
				

	$('#yxpz p').each(function(){
		var sh1=$(this).find('span').height();
		$(this).find('em').height(sh1).css('line-height',sh1+'px');
	});
	$('#yxpz p:odd').addClass('clo');
				
		}// 下载详细页 end 
};// if detailPage end 
if($('#xgk .xki').length<1){$('#xgk').remove();}
  else{
	$('#xgk a:has(img)').addClass('img');
	$("#xgk .xki li > a:contains('下载')").addClass('dBtn');
	if($('.xki dt a font').length>0){
		$('.xki').each(function(){
			tit=$(this).find('dt div b >a font').html();
			$(this).find('dt a font').remove();
			$(this).find('dt div b >a').append(tit);
		});
	}
  }

//------------------ common ------------------	
		//时间
		var myDate = new Date();
		var y = myDate.getFullYear();
		var m = myDate.getMonth()+1;
		var d = myDate.getDate();
		var nowDate = y +"-"+ m +"-"+ d;
		var h = myDate.getHours();
		var minute = myDate.getMinutes();
		var sec = myDate.getSeconds();
		var nowTime = y +"-"+ m +"-"+ d +" "+ h +":"+ minute +":"+ sec;  	
		//IE6 缓存图片
		if($.browser.msie&&($.browser.version == "6.0")&&!$.support.style){
				document.execCommand("BackgroundImageCache",false,true);
		};
}); //end document.ready	

$(window).load(function(){
		if($.browser.msie&&($.browser.version == "6.0")&&!$.support.style){
				hoverIE6(".button");
				hoverIE6("#searchBtn");
		};	
		if($('#sidebar .ad').html()==''){$('#sidebar .ad').remove();}	
});