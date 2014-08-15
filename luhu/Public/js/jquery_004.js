var closeTimeout;

(function( $ ) {

	// set up methods object
	var selectMethods = {
		init : function(options) {
			return this.each(function(index) {
				// alias $this for reference later
				var $this = $(this);
				if ($this.prop('tagName') == 'SPAN') {
					var $wrapper =  $this.parent();
					var $element = $this;
					var $elementInner = $this.children('.inner');
					var $dropElement = $this.siblings('ul');
					
					$wrapper.css({
						'position': 'relative',
						'overflow': "visible",
						'display': "inline-block",
						'margin': 0,
						'padding': 0
					});
					$element.css({
						'display': 'inline-block',
						'white-space': 'nowrap',
						'cursor': 'pointer',
						'top': 0,
						'float': 'left',
						'margin-right': '5px'
					});
					$elementInner.css('margin', 0);
					$dropElement.css({
						'position': 'absolute',
						'display': 'block',
						'float': 'left',
						'margin': 0,
						'z-index': 100,
						'list-style': 'none',
						'overflow': 'auto',
						'white-space': 'nowrap'
					}).find('li').css({
						'display' : 'block',
						'float': 'left',
						'list-style': 'none',
						'white-space': 'nowrap',
						'margin' : '5px 0',
						'padding': '0',
						'font-weight': 'bold',
						'cursor': 'pointer',
						'text-align': 'left',
						'clear': 'both'
					}).find('a').css({
						'display': 'block',
						'float': 'left',
						'padding': '3px 48px 3px 16px',
						'background-image': 'none'
					});
					var widest = null;
					$('li', $dropElement).each(function(){
						if(widest === null){
							widest = $(this);
						} else if($(this).outerWidth() > widest.outerWidth()){
							widest = $(this)
						}
					});
					if($dropElement.outerHeight() >= parseInt($dropElement.css('max-height').replace('px', ''))){
						$dropElement.width($(widest).outerWidth()+30);
					} else {
						$dropElement.width($(widest).outerWidth());
					}
					
					var targetWidth = $dropElement.width();
					$element.width(targetWidth);
					var innerWidth = targetWidth;
					$('.inner', $element).outerWidth(innerWidth);
					$dropElement.find('li, a').css({
						'display': 'block',
						'float': 'none'
					});
					$dropElement.css({'max-height': '400px', 'overflow': 'auto'}).hide();
					$this.click(function(e){
						e.stopPropagation();
						e.preventDefault();
						$this.focus();
						$dropElement.slideToggle('fast');
						$('body').click(function(e){
							if ($(e.target).parents('ul.select-box-dropdown').length === 0) {
								e.stopPropagation();
								e.preventDefault();
								$this.siblings('ul.select-box-dropdown').slideUp();
								$('body').off('click');
							}
						});
					});
					
					
					return;
				} else {
					
				
					// ensure we're not on mobile, as their own controls are better for touch devices
					if( navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i) ) {
						$this.show().css('margin-top', '5px');
						return;
					}
					
					// set up default settings to be overriden if set in options
					var settings = $.extend({
						filterClass : null,
						elementClass : '',
						dropdownClass : ''
					}, options);
	
					$this.data('customSelect', settings);
					var currentSelected = $this.find('option[selected]').text();
					currentSelected = (currentSelected === null || currentSelected === undefined || currentSelected.length === 0) ? $this.find('option:first').text() : currentSelected ;
					var externalCurrentSelected = window['selectedTab'+(index+1)+''];
					currentSelected = (externalCurrentSelected !== null && externalCurrentSelected !== undefined && externalCurrentSelected.length > 0)? externalCurrentSelected : currentSelected;
					$this.css('display', 'none').after('<span class="custom-select-wrapper"><span class="custom-select-box '+settings.elementClass+'"><span class="inner">'+currentSelected+'</span></span></span>');
					$('body').append('<ul class="select-box-dropdown '+settings.dropdownClass+' dropdown'+index+'"></ul></span>');
					
					var $wrapper = $this.next('.custom-select-wrapper');
					var $element = $wrapper.find('.custom-select-box');
					var $elementInner = $element.find('.inner');
					var $dropElement = $('.dropdown'+index);
					// var $allElements = $element.add($dropElement);
					
					$this.find('option').each(function(){
						var optionText = $(this).text();
						var optionValue = $(this).attr('value');
						$dropElement.append('<li class="option"><a href="'+optionValue+'">'+optionText+'</a></li>');
					});
					
					/*
					var elementPosition = $element.position();
					var elementOffset = $element.offset();
					var elementPadding = $element.css('padding-top').replace('px', '') + $element.css('padding-bottom').replace('px', '');
					var elementHeight = $element.height();
					var elementWidth = $element.outerWidth();
					var labelWidth = $element.prevAll('label:first').outerWidth(true);
					*/
					
					$wrapper.css({
						'position': 'relative',
						'overflow': "visible",
						'display': "inline-block",
						'margin': 0,
						'padding': 0
					});
					$element.css({
						'display': 'inline-block',
						'white-space': 'nowrap',
						'cursor': 'pointer',
						'top': 0,
						'float': 'left',
						'margin-right': '5px'
					});
					$elementInner.css('margin', 0);
					$dropElement.css({
						'position': 'absolute',
						'display': 'block',
						'float': 'left',
						'margin': 0,
						'z-index': 100,
						'list-style': 'none',
						'overflow': 'auto',
						'white-space': 'nowrap',
						'top': $wrapper.offset().top + $element.outerHeight(),
						'left': $wrapper.offset().left,
						'max-height': $(window).height() - ($wrapper.offset().top + $element.outerHeight() + 30)
					}).find('li').css({
						'display' : 'block',
						'float': 'left',
						'list-style': 'none',
						'white-space': 'nowrap',
						'margin' : '5px 0',
						'padding': '0',
						'font-weight': 'bold',
						'cursor': 'pointer',
						'text-align': 'left',
						'clear': 'both'
					}).find('a').css({
						'display': 'block',
						'float': 'left',
						'padding': '3px 48px 3px 16px',
						'background-image': 'none'
					}).click(function(e){
						e.preventDefault();
						var clickedContent = $(this).text();
						$this.find('option').filter(function(){
							var isTarget = $(this).text() == clickedContent;
							return isTarget;
						}).attr('selected', 'selected');
						$this.change();
						$element.click();
					});
					var widest = null;
					$('li', $dropElement).each(function(){
						if(widest === null){
							widest = $(this);
						} else if($(this).outerWidth() > widest.outerWidth()){
							widest = $(this)
						}
					});
					if($dropElement.outerHeight() >= parseInt($dropElement.css('max-height').replace('px', ''))){
						$dropElement.width($(widest).outerWidth()+30);
					} else {
						$dropElement.width($(widest).outerWidth());
					}
					
					var targetWidth = $dropElement.width();
					$element.width(targetWidth);
					var innerWidth = targetWidth;
					$('.inner', $element).outerWidth(innerWidth);
					$dropElement.find('li, a').css({
						'display': 'block',
						'float': 'none'
					});
					$element.click(function(e){
						e.stopPropagation();
						e.preventDefault();
						$dropElement.slideToggle('fast');
						$dropElement.css({
							'top': $wrapper.offset().top + $element.outerHeight(),
							'left': $wrapper.offset().left,
							'max-height': ($(window).height() - ($wrapper.offset().top + $element.outerHeight() + 30)) + $(window).scrollTop()
						});
						$('body').click(function(e){
							if ($(e.target).parents('ul.select-box-dropdown').length === 0) {
								$dropElement.slideUp('fast');
								$('body').off('click');
							}
						});	
					});
				
					$dropElement.hide().find('li').css('font-weight', 'normal');
					
					$this.change(function(){
						$('.inner', $element).text($this.find(':selected').text());
					});
				}
			});
		}
	}
	
	

	$.fn.customSelect = function(method, options) {

		// Method calling logic
		if ( selectMethods[method] ) {
		  return selectMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return selectMethods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.customSelect!' );
		}   

	};
})( jQuery );