// more shopping tools slider script. localizedStrings is initialized in the scripts.tag file //

jQuery(document).ready(function($){
	$('.shopping-extended').hide();
	$(".flip").click(function(e){
		e.preventDefault();
		$(this).toggleClass('shopping-minus');
		$(this).toggleClass('show');
		if ($(this).is('.show')) {
			$(".shopping-tools .shopping-extended").slideDown('slow');
			var htmlDecoded = $("<div/>").html(localizedStrings.LESS).text();
			$(".flip a").text(htmlDecoded);
		} else {
			$(".shopping-tools .shopping-extended").slideUp('slow');
			var htmlDecoded = $("<div/>").html(localizedStrings.MORE).text();
			$(".flip a").text(htmlDecoded);
		}
		
	});
});

function showCloseAccordion(){
	$('#accordion-open').hide();
	$('#accordion-close').show();
}

function showOpenAccordion(){
	$('#accordion-close').hide();
	$('#accordion-open').show();
}


function toggleAccordionContent() {
	showOpenAccordion();
	
	// If there is an open accordion header, we need to display close
	$("#model-further-details-content h3").each(function() {
		if ($(this).is('.ui-state-active')) {
			showCloseAccordion();
			return false;
		}
	});
}

$("#accordion-open").live('click',function(e) {
	e.preventDefault();
	$("#model-further-details-content h3").each(function() {
		if (!$(this).is('.ui-state-active')) {
			$(this).addClass("ui-state-active");
		} 
		
		var content = $(this).next('div.ui-accordion-content');
		content.slideDown('slow');
	});
	showCloseAccordion();	
});

$("#accordion-close").live('click',function(e) {
	e.preventDefault();
	$("#model-further-details-content h3").each(function() {
		$(this).toggleClass("ui-state-active",false);

		var content = $(this).next('div.ui-accordion-content');
		content.slideUp('slow');
	});
	showOpenAccordion();
});


jQuery(document).ready(function($) {
	// show the open accordion when the page first loads.
	showOpenAccordion();
	$("#model-further-details-content h3").each(function() {
		$(this).toggleClass("ui-state-active");

		var content = $(this).next('div.ui-accordion-content');

		content.hide();
	
		$(this).click(function() {
			$(this).toggleClass("ui-state-active");
			content.slideToggle('slow');
			toggleAccordionContent();
			return false;
		});
	
		$(this).hover(
			function() { $(this).addClass("ui-state-hover"); },
			function() { $(this).removeClass("ui-state-hover"); }
		);
	});
	
	
	$('div.explore-content-block dl').each(function() {
		$('dd p.extended-description').hide();
	});
	
	//LRO-2013 for explore features with description only
	$('div.explore-content-block ul li').each(function() {
		$('p.extended-description').hide();
	});
});

// Equalize height script //
jQuery(document).ready(function($) {
	$('div.explore-content-block dl').each(function() {
		var children = $('dd', this);
		var firstLast = $('dd.last:first', this);
		if (firstLast.length === 0) {
			firstLast = $('dd:last', this);
		}
		var cols = 0;
		$(firstLast).each(function(){
				cols = $(this).prevAll('dd').length;
		});
		
		var counter = 0;
		var maxHeight = 0;
		$(children).each(function(){
			var thisHeight = $(this).height();
			maxHeight = (thisHeight > maxHeight)? thisHeight : maxHeight;
			
			if (counter == cols || $(this).next().length === 0) {
				$(this).height(maxHeight).prevUntil('.last, dt').height(maxHeight);
				counter = 0;
				maxHeight = 0;
			} else {
				counter++;
			}
		});
	});
});

/* this function is used
 * if videos/images are opened in new tab
 */
function modifyNonOverlayMediaContentHtml() {
	if ($('body#notOverlay').length) {
		initializeFlowplayer($('div#main-content'));
		/*if(window.location.href.indexOf("#wrapper") != -1) {
			window.location.href = window.location.href.substr(0, window.location.href.indexOf("#wrapper"));
		}*/
		$('body#notOverlay div#wrapper span.slideshow').remove();
		$('body#notOverlay div#wrapper div.content-overlay-block').css('background-color', 'transparent');
	}
}


// Equal height script 2 //
function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

$(document).ready(function() {
	var $models = $('.model-select-block').filter(function(){
		return $(this).parents('header').length === 0
	}).find('ul li a');
	$models.addClass('equalised');
	equalHeight($models);
});

jQuery(document).ready(function() {
	$('div.explore-content-block dl').each(function() {
		var children = $('dd', this);
		var firstLast = $('dd.last:first', this);
		if (firstLast.length === 0) {
			firstLast = $('dd:last', this);
		}
		var cols = 0;
		$(firstLast).each(function(){
				cols = $(this).prevAll('dd').length;
		});
		
		var counter = 0;
		var maxHeight = 0;
		$(children).each(function(){
			var thisHeight = $(this).height();
			maxHeight = (thisHeight > maxHeight)? thisHeight : maxHeight;
			
			if (counter == cols || $(this).next().length === 0) {
				$(this).height(maxHeight).prevUntil('.last, dt').height(maxHeight);
				counter = 0;
				maxHeight = 0;
			} else {
				counter++;
			}
		});
	});
});



// Model select tab for header nav //
$(function(){
	equalHeight($('header .model-select-block ul li span.price'));
	$('.model-select-block', 'header').hide().css('visibility', 'visible');
	var hideTimeout;
	$('.vehicles a','#menu').mouseover(function(){
		clearTimeout(hideTimeout);
		$('.model-select-block', 'header').slideDown();
	}).mouseout(function(){
		hideTimeout = setTimeout(function(){
			$('.model-select-block', 'header').slideUp();
		}, 100);
	});
	$('.model-select-block', 'header').mouseenter(function(){
		clearTimeout(hideTimeout);
		$('.vehicles a').addClass('hover');
	}).mouseleave(function(){
		$('.vehicles a').removeClass('hover');
		hideTimeout = setTimeout(function(){
			$('.model-select-block', 'header').slideUp();
		}, 100);
	});
	$('li:not(.vehicles) a', '#menu').mouseover(function(){
		clearTimeout(hideTimeout);
		$('.model-select-block', 'header').slideUp();
	});

});
// Fade inactive models on home page //
	
jQuery(document).ready(function($) {
	$('div.model-select-block li').mouseover(function() {
		$(this).siblings().stop().animate({
			opacity: 0.5
		}, 300);
	}).mouseout(function(){
		$(this).siblings().stop().animate({
			opacity: 1
		}, 300);	
	});
});

// custome select trigger //

jQuery(document).ready(function($) {
	if ( $('span.html-select-box').length > 0 ) {
		$('span.html-select-box').customSelect();
	}
	
	if ( $('select', 'html:not(.lt-ie8)').length > 0 ) {
		$('select', 'html:not(.lt-ie8)').customSelect();
	}
	
});

// ensure table columns within accordion switches are the right width, even in IE
jQuery(document).ready(function($){
	$('tr:first', '.ui-accordion table').each(function(){
		var tableCols = $(this).children();
		if (tableCols.length < 7) {
			var colDifference = 7 - tableCols.length;
			var i = 0;
			while (i < colDifference) {
				$(this).parent().children('tr').append('<td>');
				i++;
			}
		}
		var targetWidth = 173;
		var first = $(this).find('td:first');
		var isTargetTable = $(first).find('img').length > 0;
		if (isTargetTable == true) {
			$(first).attr('width', targetWidth);
			$(first).nextAll().filter(function(index){
				return index % 3 == 2;
			}).each(function(){
				targetWidth = 174;
				$(this).attr('width', targetWidth);
				var containsImage = $(this).find('img').length > 0;
				var thisText = $(this).text();
				var trimmed = $.trim(thisText);
				var containsText = trimmed.length > 0;
				if(!containsImage && !containsText) {
					$(this).empty().append('<img src="/c/images/spacer.gif" alt="" width="'+targetWidth+'" height="1" />');
				}
			});
		} else {
			var originalWidth = $(first).parents('table').attr('width');
			originalWidth = (originalWidth === 0 || originalWidth === null || originalWidth === undefined)? 0 : originalWidth;
			$(first).parents('table').attr('style', 'width: '+originalWidth+'px !important');
		}
		
	});
});



/**
 * Get the current coordinates of the first element in the set of matched
 * elements, relative to the closest positioned ancestor element that
 * matches the selector.
 * @param {Object} selector
 */
jQuery.fn.positionAncestor = function(selector) {
	var left = 0;
	var top = 0;
	this.each(function(index, element) {
		// check if current element has an ancestor matching a selector
		// and that ancestor is positioned
		var $ancestor = $(this).closest(selector);
		if ($ancestor.length && $ancestor.css("position") !== "static") {
			var $child = $(this);
			var childMarginEdgeLeft = $child.offset().left - parseInt($child.css("marginLeft"), 10);
			var childMarginEdgeTop = $child.offset().top - parseInt($child.css("marginTop"), 10);
			var ancestorPaddingEdgeLeft = $ancestor.offset().left + parseInt($ancestor.css("borderLeftWidth"), 10);
			var ancestorPaddingEdgeTop = $ancestor.offset().top + parseInt($ancestor.css("borderTopWidth"), 10);
			left = childMarginEdgeLeft - ancestorPaddingEdgeLeft;
			top = childMarginEdgeTop - ancestorPaddingEdgeTop;
			// we have found the ancestor and computed the position
			// stop iterating
			return false;
		}
	});
	return {
		left:    left,
		top:    top
	}
};

String.prototype.capitalize = function(){
	return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

jQuery.fn.toTitleCase = function(selector) {
	return this.each(function(){
		var $this = $(this);
		var originalText = $this.text();
		var correctedText = originalText.toLowerCase().capitalize();
		$this.text(correctedText);
	});
}

$(document).ready(function() {
	$('div.explore-content-header h3, div.model-select-block ul li span.price').toTitleCase();
	$('ul.search-results li').each(function(){
		$(this).find('span:first').toTitleCase();
	});
	$('div.model-select-block').filter(function(){
		return $(this).parents('header').length < 1;
	}).find('ul li').mouseenter(function(){
		$(this).children('a').addClass('hover');
	}).mouseleave(function(){
		$(this).children('a').removeClass('hover');
	});
});



// Empty <p> Squasher
//
// Remove empty (orr effectively empty - containing only &nbsp;) <p> tags
// In this implementation, only from the explore responsibility switch.
jQuery.fn.pSquasher = function(selector) {
	return this.each(function(){
		$(this).find('p').each(function(){
				var $this = $(this);
				if ($this.html().replace(/\s|&nbsp;/g, '').length === 0) {
					$this.remove();
				}
		});
	});
}
$(function(){
	$('div.responsibility-row').pSquasher();
});


// AddThis script
//
// Write the AddThis html elements into the document in the appropriate place and then 
// load the AddThis javascript
$(function(){

	var addThisHtml = '<!-- AddThis Button BEGIN -->'+
		'<div class="addthis_toolbox addthis_default_style ">';
	
	var counter = 0;
	if (typeof preferredAddThisServices !== 'undefined' && preferredAddThisServices !== '') {
		var preferredServicesArr = preferredAddThisServices.split(',');
		counter = preferredServicesArr.length > 4 ? 4 : preferredServicesArr.length;
	    
	    for (var i = 0; i < counter; i++) {
	        addThisHtml += '<a class="addthis_button_'+preferredServicesArr[i].replace(/^\s+|\s+$/g,"")+'"></a>';    	        
	    }	
	} 
	
	for (var i = 1; i <= (4 - counter); i++) {
		addThisHtml += '<a class="addthis_button_preferred_'+i+'"></a>'
	}
	
	addThisHtml +=	'<a class="addthis_button_compact"></a>'
				+ '<a class="addthis_counter addthis_bubble_style"></a>'
				+ '</div>'
				+ '<!-- AddThis Button END -->';
	
	$('body:not(".suppress-addthis")').each(function(){
		if ($('body.addthis-hero').length > 0) {
			$('div.hero-block').after('<div class="explore-addthis"></div>');
			$('.explore-addthis').append(addThisHtml);
		} else {
			$('.selector-block > .inner, .header-only-hero-block > .inner').prepend(addThisHtml);
		}
	});
	
});
//jquery domready equivalent
$(function(){
	//LRO-1870 fix for non-overlay image/video
	modifyNonOverlayMediaContentHtml();
});

// LRO-2009 Social Media box width
$(document).ready(function(){
	var newWidth = 0;
	$('ul.social-media').children('li').each(function(){
	    newWidth += $('img', this).outerWidth();
	});
	$('ul.social-media').width(newWidth);
});

