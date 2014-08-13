/*
 * jquery.connect.serializeRows.js
 * v 1.0.0 - 31/05/2012
 *
 * Description:
 * This plugin allows the user to hide multiple rows of data on initial page load
 * and show them in serial by clicking a link. Only works on direct children of
 * target element (i.e. 'selector > child' as opposed to 'selector child' in css)
 * 
 *
 *
 * Usage:
 * $(selector).serializeRows('method', {options object});
 * Both the options object and the method are optional. The plugin will run as default
 * if no options are supplied. 'method' is used to call sub-methods as follows - 
 *
 *
 * Method name		Description																			Arguments (* = compulsory)
 *
 * showMore			Displays the next row/block of rows											settings*
 * showLess			Hides the last visible row/block of rows									settings*
 * reset				Returns the serialised element to its initial serialised state,
 * 					with no additional rows displayed
 * destroy			Destroys the serialized object, returning it to its default
 * 					state before this script acted upon it
 *
 *
 *
 * Options:
 * The options object allows you to override the defaults set by the script.
 * Details of the overridable options and syntax are below - 
 *
 *
 * Option name			Default value	Data type		Description
 *
 * initialRows			1					number			Sets the number of rows of data to be shown initially on page load
 * stepRows				1					number			Sets the number of rows to be shown per step
 * childSelector		null				string			Standard jquery selector string (i.e. '.selector') to filter the elements to be hidden
 * 																This is null by default so all child elements will be affected
 * animationType	'	slide'			string			Sets the animation type to be used when showing rows
 * 																Currently this only supports 'fade' and 'slide'
 * animationSpeed		300				string/number	The speed of the show animation. Accepts any standard jQuery animate speed
 * 																(i.e. 'slow', 'fast', 100, 300... Any number of milliseconds)
 * showLessLink		false				boolean			Show/hide the "less" link (only "more" shown by default)
 * linkHtml				htmlObject		string			Allows overriding of the html used for the link objects. Should be HTML only, 
 * 																excluding any textual content
 * moreLabel			'Show more'		string			Label for more link
 * lessLabel			'Show less'		string			Label for less link
 * moreClass			'show-more'		string			Class to be attached to more link
 * lessClass			'show-less'		string			Class to be attached to less link
 *
 * 
 */
 

(function( $ ) {
	
	// set up methods object
	var serializerMethods = {
		init : function(options) {
			return this.each(function() {
				// alias $this for reference later
				var $this = $(this);
				
				// set up default settings to be overriden if set in options
				var settings = $.extend({
					initialRows		: 1,
					stepRows		: 1,
					childSelector	: null,
					animationType	: 'slide',
					animationSpeed	: 300,
					showLessLink	: false,
					linkHtml		: '<button class="button with-icon arrow-right" href="#"><span class="inner"><span class="icon">&nbsp;</span></span></button>',
					moreLabel		: localizedStrings.NEWSMORE,
					lessLabel		: localizedStrings.NEWSLESS,
					moreClass		: 'show-more',
					lessClass		: 'show-less'
				}, options);
				
				$this.data('serializeRows', settings);
				
				// set up variables for use later
				var $children, $targetChildren, $moreLink, $lessLink;
				
				// get children that match the child selector
				$children = $this.children(settings.childSelector);
				$targetChildren = $children.slice(settings.initialRows, $children.length);
				if ($targetChildren.length > 0) {
					$targetChildren.hide();
					$targetChildren.filter(':eq(0)').prev().addClass('last');
					$moreLink = $(settings.linkHtml).addClass(settings.moreClass);
					$moreLink.find('.inner').prepend(settings.moreLabel);
					$this.append($moreLink);
					if (settings.showLessLink === true) {
						$lessLink = $(settings.linkHtml).addClass(settings.lessClass);
						$lessLink.find('.inner').prepend(settings.lessLabel).css('display', 'none');
						$this.append($lessLink);
					}
					$this.children('.'+settings.moreClass).click(function(e){
						e.preventDefault();
						$this.serializeRows('showMore');
					});
					$this.children('.'+settings.lessClass).click(function(e){
						e.preventDefault();
						$this.serializeRows('showLess');
					});
				}
			});
		},
		
		showMore : function(options) {
			return this.each(function(){
				var $this = $(this);
				var $targetChildren;
				
				var settings = $.extend(
					$this.data('serializeRows')
				, options);
				
				$targetChildren = $this.children(':hidden').not('.'+settings.moreClass+', .'+settings.lessClass);
				
				if ($targetChildren.length == 1) {
					$this.children('.'+settings.moreClass).hide();
				}
				
				$targetChildren = $targetChildren.filter(function(index){
					return index < settings.stepRows;
				});
				
				$this.children('.'+settings.lessClass).show();
					
				if (settings.animationType == 'fade') {
					$targetChildren.fadeIn(settings.animationSpeed)
				}
				if (settings.animationType == 'slide') {
					$targetChildren.slideDown(settings.animationSpeed);
				}
				$targetChildren.addClass('last').prevAll().removeClass('last');
			});
		},
		
		showLess : function(options) {
			return this.each(function(){
				var $this = $(this);
				var $targetChildren;
				
				var settings = $.extend(
					$this.data('serializeRows')
				, options);
				
				$targetChildren = $this.children(':visible').not('.'+settings.moreClass+', .'+settings.lessClass);
				
				if ($targetChildren.length <= settings.initialRows+settings.stepRows) {
					$this.children('.'+settings.lessClass).hide();
				}
				
				$targetChildren = $targetChildren.filter(function(index){
					return index >= ($targetChildren.length - settings.stepRows);
				});
				
				$this.children('.'+settings.moreClass).show();
				
				if (settings.animationType == 'fade') {
					$targetChildren.fadeOut(settings.animationSpeed, function(){
						$this.children(':visible').not('.'+settings.moreClass+', .'+settings.lessClass).filter(':last').addClass('last');
					});
				}
				if (settings.animationType == 'slide') {
					$targetChildren.slideUp(settings.animationSpeed, function(){
						$this.children(':visible').not('.'+settings.moreClass+', .'+settings.lessClass).filter(':last').addClass('last');
					});
				}
			});
		},
		
		reset : function(options) {
			return this.each(function(){
				var $this = $(this);
				
				var settings = $.extend(
					$this.data('serializeRows')
				, options);
				
				$('.'+settings.moreClass+', .'+settings.lessClass, $this).remove();
				$this.children().show();
				$this.serializeRows(settings);
			});
		},
		
		destroy : function(options) {
			return this.each(function(){
				var $this = $(this);
				
				var settings = $.extend(
					$this.data('serializeRows')
				, options);
				
				$('.'+settings.moreClass+', .'+settings.lessClass, $this).remove();
				$this.children().show();
			});
		}
	}
	
	$.fn.serializeRows = function(method, options) {
		
		// Method calling logic
		if ( serializerMethods[method] ) {
		  return serializerMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return serializerMethods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.serializeRows!' );
		}   
		
	};
})( jQuery );