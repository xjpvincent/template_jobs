/*
 * LR Refresh Hero script
 * Version 1.0 - 03/05/2012
 *
 * This script controls the hero functionality for landrover.com
 *
 * NOTE: The script is currently littered with a great deal of comments. These are for development purposes. I suggest they be removed for production.
 */

var hero = $(function() {
	hero.init();
});

hero.timeout = null;
hero.allowEvents = true;
hero.tallestBlock = 0;

hero.init = function() {
	var _slides, _slidesLength, firstSlide;
	
	_slides = hero.slides; // Get the slides once so we don't have to go out of local scope, which is slow
	_slidesLength = _slides.length; // Get the number of slides once so we don't have to count multiple times
	
	$('.hero-block:first').wrap('<div class="hero-blocks-wrapper"></div>');
	/* set up the hero progress/navigation bar and populate hero content */
	$('ul', '.hero-control-block').attr('class', 'slides-'+_slidesLength).html(''); // Give the navigation the appropriate class and empty it out
	$(_slides).each(function(index) {
		
		if (index === 0) { // First item
			$('ul', '.hero-control-block').append('<li class="first on"><a href="#">1</a></li>');
			firstSlide = $('.hero-block:first');
			hero.populateSlide(this, firstSlide);
			
		} else if (index === (_slidesLength-1)) { // Last item
			$('ul', '.hero-control-block').append('<li class="last"><a href="#">'+(index+1)+'</a></li>');
			hero.populateSlide(this);
			
		} else { // Standard item
			$('ul', '.hero-control-block').append('<li><a href="#">'+(index+1)+'</a></li>');
			hero.populateSlide(this);
		}
	});
	
	$('.hero-blocks-wrapper').css({
		'overflow': 'hidden',
		'height': hero.tallestBlock + 'px'
	});
	
	/* set up the action for when one of the position indicators is clicked */
	$('li a', '.hero-control-block').click(function(e) {
		e.preventDefault();
		if (hero.allowEvents === true) {
			hero.allowEvents = false;
			var target = $(this).html() - 1; // the index of the slide is 1 less than the number contained within, as indexes start from 0
			hero.goToSlide(target);
		} else {
			return false;
		}
	});
	
	
	/* use the action above when clicking the next/previous arrows, determining which item to trigger a click on */
	$('.scroll-left', '.hero-control-block').click(function(e) {
		e.preventDefault();
		var _current = $('.on:last', '.hero-control-block');
		if ($('.wrapper[dir="rtl"]').length > 0) {
			if ($(_current).is('.last')) { // if the first slide is currently visible, go to the last one
				$('li:first a', '.hero-control-block').click();
			} else {
				$(_current).next('li').find('a').click(); // otherwise go to the previous slide
			}
		} else {
			if ($(_current).is('.first')) { // if the first slide is currently visible, go to the last one
				$('li:last a', '.hero-control-block').click();
			} else {
				$(_current).prev('li').find('a').click(); // otherwise go to the previous slide
			}
		}
		
	});
	
	
	$('.scroll-right', '.hero-control-block').click(function(e) {
		e.preventDefault();
		var _current = $('.on:last', '.hero-control-block');
		if ($('.wrapper[dir="rtl"]').length > 0) {
			if ($(_current).is('.first')) { // if the last slide is currently visible, go to the first one
				$('li:last a', '.hero-control-block').click();
			} else {
				$(_current).prev('li').find('a').click(); // otherwise go to the next slide
			}
		} else {
			if ($(_current).is('.last')) { // if the last slide is currently visible, go to the first one
				$('li:first a', '.hero-control-block').click();
			} else {
				$(_current).next('li').find('a').click(); // otherwise go to the next slide
			}
		}
		
	});
	
	
	/* set the timeout (globally accessible) for the slide auto-advance */
	hero.timeout = setTimeout(function() {
		hero.goToSlide();
	}, 10000);
};


/* function for the initial population of slides */
hero.populateSlide = function(slide, existingTarget) {
	var target, thisHeight;
	
	if (existingTarget) { // If this is the first slide, there will be some content in the page already, so we treat it differently
		target = existingTarget;
		$(target).html(''); // Empty out the existing content, just in case
	} else {
		target = $('<div class="' + slide.heroClass + ' shift-left" />').css('display', 'none'); // otherwise, create a new element and set it to be hidden initially
	}
	
	$(target).append('<div class="inner"><div class="text ' + slide.style + '" /></div>').data('image', slide.image); // add structural html and attach the image src as a data attribute
	$('.text', target).append(slide.title + slide.teaser + "<p>"+ slide.text + '</p><a class="button with-icon arrow-right" href=\'' + slide.buttonUrl + '\' rel=\''+slide.linkRel+'\' target=\''+slide.linkTarget+'\'><span class="inner">'
			 + slide.buttonText + '<span class="icon">&nbsp;</span></span></a>'); // add contents as defined by cms. TODO: Allow for some content to not be present?

		linkTarget  : '${__slide.linkTarget}',
	$(target).appendTo('.hero-blocks-wrapper'); // insert the finished slide at the very end of the list, right before the controller block
	thisHeight = $(target).outerHeight(true);
	hero.tallestBlock = (thisHeight > hero.tallestBlock)? thisHeight : hero.tallestBlock;
};


/* function used to load any slide. Takes an optional target argument. If this is not supplied, the function defaults to loading the next slide */
hero.goToSlide = function(target) {
	var _background, _el, _shim, _offset;
	
	clearTimeout(hero.timeout); // clear the auto-advance timeout. This is incase the function is called manually from a click
	
	if (target === undefined || target === null) { // Default to going to the next slide if there is no target passed in
		$('.hero-block:visible').each(function(index) {
			target = $(this).prevAll('.hero-block').length + 1;
			if (target >= $('.hero-block').length) {
				target = 0;
			}
		});
	}
	
	_el = $('.hero-block').eq(target);
	
	$('.hero-block:visible').fadeOut('slow', function() { // fade out the current slide
		$(_el).fadeIn(1000, function(){
			hero.allowEvents = true;
		});
		
		
		$('li', '.hero-control-block').each(function(index) { // make sure the indicator on the controller is in the right position
			if (index == target) {
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			}
		});
	});
	_background = $(_el).data('image'); // get the image src from the data attribute set earlier
	_offset = $('.hero-control-block').offset(); // this determines the required height of the background shim
	_shim = $('<div class="background-shim">&nbsp;</div>').css({'background-image' : 'url('+_background+')' , 'display' : 'none', 'height' : _offset.top}); // create the background shim and define styles as needed

	$(_shim).prependTo('.wrapper'); // adds the background shim at the very beginning of the wrapper element
	
	var totalBannersHeight = 0;
	var cbw = $('div#cookie_consent_banner');
	if(cbw != null & cbw.is(":visible")) {
		totalBannersHeight = cbw.height();
	}
	var obw = $('div#ie_warning_message');
	if(obw != null && obw.is(":visible")) {
		totalBannersHeight = totalBannersHeight + obw.height();
	}
	if(totalBannersHeight > 0) {
		$('.background-shim').css({'top' : ''+totalBannersHeight+'px' });
	} else {
		$('.background-shim').css({'top' : '0px' });
	}

	$('.background-shim').fadeIn(1500, function() { // fade in the shim, and once this is complete do the following:
		$('.wrapper').css('background-image', 'url('+_background+')'); // set the wrapper background to that of the shim
		$(this).remove(); // remove the shim
	});
	
	hero.timeout = setTimeout(function() { // reset the auto advance timeout
		hero.goToSlide();
	}, 10000);
};