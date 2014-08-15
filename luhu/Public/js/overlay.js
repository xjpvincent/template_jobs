//
// overlay.js
// Copyright (c) Land Rover. All rights reserved.
//
// $Id: overlay.js 784 2011-10-26 09:32:04Z paul $
//

// used across LR site and also in slideshow.js for promo external links
var externalLinkOverlaySettings = {
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="external-link"></div>'
		}
	};

// pre-set a variable so that the scrollbar width fetched below is in the global scope
var scrollbarWidth
	windowWidth = 0;

var t;

jQuery(function($) {

	// get the width of the scrollbars for the current browser so that we can accurately add
	// the right amount of width to overlays when they need to scroll to prevent a horizontal
	// scrollbar appearing
	getScrollbarWidth = function() {
		var parent, child, width;

		 if(width===undefined) {
			parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
			child=parent.children();
			width=child.innerWidth()-child.height(99).innerWidth();
			parent.remove();
		 }

		return width;
	}

	$(window).resize(function(){
		clearTimeout(t);
		t = setTimeout(function() {
			var w = $(window).width();
			if (w !== windowWidth) {
				// video overlays
				if (w >= 960 && $('#main-content.video-player .play-button').length > 0) {
					$.nyroModalSettings({width: 760, windowResizing: true});
				} else if (w < 960 && $('#main-content.video-player .play-button').length > 0) {
					$.nyroModalSettings({width: 690, windowResizing: true});
				}
				
				//video overlays without video
				if (w >= 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
					$('#main-content, #main-content img').width(720);
					$('#main-content img').height('auto');
					if($('#nyroModalContent .external-site-block').length === 0) {
						$.nyroModalSettings({width: 760, windowResizing: true});
					} 
				} else if (w < 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
					$('#main-content, #main-content img').width(650);
					$('#main-content img').height('auto');
					if($('#nyroModalContent .external-site-block').length === 0) {
						$.nyroModalSettings({width: 690, windowResizing: true});
					}
				}
				
				//image overlays
				if (w >= 960 && $('#photo-gallery #main-content, #photo #main-content').length > 0) {
					$('#main-content, #main-content img').width(850);
					$('#main-content img').height('auto');
					$.nyroModalSettings({width: 890, windowResizing: true});
				} else if (w < 960 && $('#photo-gallery #main-content, #photo #main-content').length > 0) {
					$('#main-content, #main-content img').width(650);
					$('#main-content img').height('auto');
					$.nyroModalSettings({width: 690, windowResizing: true});
				}
				
				windowWidth = w;
			}
		}, 100);
	});

	// set the global variable set up earlier with the value fetched by the function above.
	// doing it this way means the script only has to be run once on page load which, given
	// that the DOM must be modified for it to work, is much more efficient than running
	// it each time an overlay is created.
	scrollbarWidth = getScrollbarWidth();

	var text = { close: 'Close' };
	if (typeof pageConfig != 'undefined' && pageConfig != null) {
		text.close = pageConfig.text.overlay.close;
	}

	// Explore Gallery
	var galleries = new Object();

	// Photo Gallery Slideshow
	var isSlideshowRunning = false;
	var slideshowInterval = 5000;
	var slideshowTimeout;

	// Modal Settings
	$.fn.nyroModal.settings.minHeight = 150;
	$.fn.nyroModal.settings.closeButton = '<div class="close-nav"><a class="nyroModalClose" id="overlay-close-nav" title="' + text.close + '" href="#">' + text.close +'</a></div>';

	var galleryOverlaySettings = {
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="gallery"></div>',
			manual: '<div id="nyroModalContentWrapper" class="gallery"></div>'
		},
		endShowContent: function(elts, settings) {
			initializeFlowplayer($('div#main-content', elts.content));
			elts.content.css({overflow: 'auto'});

			if ($('#nyroModalContent').height() < $('#nyroModalContent').children().height()) {
				var aHeight = $('#nyroModalContent').height();
				var targetWidth = $('#nyroModalContent').width();
				$.nyroModalSettings({width: targetWidth,height: aHeight, windowResizing: true});
			}
		},
		endResize: function(elts, settings) {
			resizeOverlay();
		},
		hideContent: function(elts, settings, callback) {
			unloadFlowplayer($('div#main-content', elts.content));
			callback();
		},
		processHandler: function(settings) {
			var link = $(settings.from);
			var parent = link.parent('.connect-overlay');

			if (parent.length) {
				var content = $(overlayTemplates.connect);

				$('img', content).attr('src', link.attr('href'));
				$('img', content).attr('alt', link.children('span:not(.parent-number)').text());
				$('div#main-content h2 strong', content).text(link.children('span:not(.part)').text());

				if (parent.find('span.part').length) {
					$('div#text p.part', content).text(parent.children('span.part').text());
				} else {
					$('div#text p.part', content).remove();
				}

				if (parent.find('p.extended-description').length) {
					$('div#text p.extended-description', content).html(parent.children('p.extended-description').html());
				} else {
					$('div#text p.extended-description', content).remove();
				}
				
				if(parent.find('p.extended-description').length == 0 && parent.find('span.part').length == 0){
					$('div#text', content).remove();
				}

				settings.content = content;
				settings.wrap = galleryOverlaySettings.wrap;
				settings.type = 'manual';
			}
		},

		endFillContent: function(elts,settings) {
			var h1 = elts.wrapper.prev('h1');
			if (h1.length == 1) {
				var slide = h1.text().split('/');

				var nav = $('div#nyroModalCaption span#nyroModalCaptionNav');
				nav.empty();

				var prev = $('.nyroModalPrev');
				var next = $('.nyroModalNext');

				if (prev.length == 1) {
					nav.append('<a href="' + prev.attr('href') + '" onclick="$.nyroModalPrev();return false;" title="prev">&lt; Previous</a>');
					if (next.length == 1) {
						nav.append('&nbsp;|&nbsp;');
					}
				}

				if (next.length == 1) {
					nav.append('<a href="' + next.attr('href') + '" onclick="$.nyroModalNext();return false;" title="next">Next &gt;</a>');
				}

				$('div#nyroModalCaption span#nyroModalCaptionText').html(galleries[settings.gallery] + ': ' + slide[0] + ' of ' + slide[1]);
			};

			// Add support for nested video links [LRO-361]
			$('a[rel^="video-"]', elts.wrapper).each(function() {
				var settings = videoOverlaySettings;
				settings.hash = 'photo';
				$(this).nyroModal(settings);
			});
			
			if ($('.lt-ie8').length > 0 && $('#nyroModalContent #text').length === 0) {
				var h = $('#nyroModalContent .main-content-wrapper').outerHeight();
				if (h > 0) {
					$.nyroModalSettings({height: h, windowResizing: true});
				}
			};
		}
	}

	var externalLinkOverlaySettings = {
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="external-link"></div>'
		},
		endShowContent: function(elts, settings) {
			if ($('#nyroModalContent').height() < $('#nyroModalContent').children().height()) {

				var aHeight = $('#nyroModalContent').height();
				var targetWidth = $('#nyroModalContent').width();
				$.nyroModalSettings({width: targetWidth,height: aHeight, windowResizing: true});

			}
		}
	};

	var photoGalleryOverlaySettings = {
		width: ($.browser.msie && $.browser.version=="6.0") ? 865 : 0,
		minHeight: ($.browser.msie && parseInt($.browser.version) <= 7) ? 700 : 0,
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="photo-gallery"></div>'
		},
		endFillContent: function(elts,settings) {
			$('div:first', elts.content).css('overflow', 'hidden');
			processGalleryLinks(elts.content, settings);
			
			//image overlays
			if ($(window).width() >= 960 && $('#photo-gallery #main-content, #photo #main-content').length > 0) {
				$('#main-content, #main-content img').width(850);
				$('#main-content img').height('auto');
				$.nyroModalSettings({width: 890, windowResizing: true});
			} else if ($(window).width() < 960 && $('#photo-gallery #main-content, #photo #main-content').length > 0) {
				$('#main-content, #main-content img').width(650);
				$('#main-content img').height('auto');
				$.nyroModalSettings({width: 690, windowResizing: true});
			}

			if ($('#main-content img').width() > 720) {
				$('div.main-content-wrapper h2').css('max-width',$('#main-content img').width());
			}
		
		},
		beforeHideContent : function(elts, settings, callback) {
			clearTimeout(slideshowTimeout);
			isSlideshowRunning = false;
			callback();
		},
		endShowContent: function(elts, settings) {
			elts.content.css({overflow: 'auto'});
			resizeOverlay();
		},
		endResize: function(elts, settings) {
			resizeOverlay();
		}
	};

	var videoGalleryOverlaySettings = {
		width: ($.browser.msie && $.browser.version=="6.0") ? 735 : 0,
		minHeight: ($.browser.msie && parseInt($.browser.version) <= 7) ? 700 : 0,
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="video-gallery"></div>'
		},
		endFillContent: function(elts,settings) {
			processGalleryLinks(elts.content, settings);
			// video overlays
			if ($(window).width() >= 960 && $('#main-content.video-player .play-button').length > 0) {
				$.nyroModalSettings({width: 760, windowResizing: true});
			} else if ($(window).width() < 960 && $('#main-content.video-player .play-button').length > 0) {
				$.nyroModalSettings({width: 690, windowResizing: true});
			}
			
			//video overlays without video
			if ($(window).width() >= 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
				$('#main-content, #main-content img').width(720);
				$('#main-content img').height('auto');
				$.nyroModalSettings({width: 760, windowResizing: true});
			} else if ($(window).width() < 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
				$('#main-content, #main-content img').width(650);
				$('#main-content img').height('auto');
				$.nyroModalSettings({width: 690, windowResizing: true});
			}

		},
		endShowContent: function(elts, settings) {
			initializeFlowplayer($('div#main-content', elts.content));
			elts.content.css({overflow: 'auto'});
			equalHeight($('.cta-link-videos-overlay dd'));
			resizeOverlay();

		},
		hideContent: function(elts, settings, callback) {
			unloadFlowplayer($('div#main-content', elts.content));
			callback();
		},
		showTransition: function(elts, settings, callback) {
			// This is required to resolve a JavaScript error with IE6
			unloadFlowplayer($('div#main-content', elts.content));
			// code taken from nyromodal 1.6.0 source to support display of 'loading' image while navigating in gallery
			elts.loading
			.css({
				marginTop: elts.contentWrapper.css('marginTop'),
				marginLeft: elts.contentWrapper.css('marginLeft'),
				height: elts.contentWrapper.css('height'),
				width: elts.contentWrapper.css('width'),
				opacity: 0
			})
			.show()
			.fadeTo(400, 1, function() {
					elts.contentWrapper.hide();
					callback();
				});
		},
		endResize: function(elts, settings) {
			resizeOverlay();
		}
	};

	var videoOverlaySettings = {
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="video"></div>'
		},

		endFillContent: function(elts, settings) {
			if ($('#main-content .play-button').length === 0) {
				var imgWidth = $('#main-content img').width();
				$('#main-content').width(imgWidth);
			}
			
			// video overlays
			if ($(window).width() >= 960 && $('#main-content.video-player .play-button').length > 0) {
				$.nyroModalSettings({width: 760, windowResizing: true});
			} else if ($(window).width() < 960 && $('#main-content.video-player .play-button').length > 0) {
				$.nyroModalSettings({width: 690, windowResizing: true});
			}
			
			//video overlays without video
			if ($(window).width() >= 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
				$('#main-content, #main-content img').width(720);
				$('#nyroModalContent #text').css('max-width', '720px');
				$('#main-content img').height('auto');
				var min = (!$.browser.msie)? 565 : 570;
				$.nyroModalSettings({width: 760, minHeight: min, windowResizing: true});
			} else if ($(window).width() < 960 && $('#nyroModalContentWrapper .play-button').length === 0) {
				$('#main-content, #main-content img').width(650);
				$('#nyroModalContent #text').css('max-width', '650px');
				$('#main-content img').height('auto');
				var min = (!$.browser.msie)? 505 : 510;
				$.nyroModalSettings({width: 690, minHeight: min,  windowResizing: true});
			}
		},
		endShowContent: function(elts, settings) {
			$('iframe').addClass('hidden');
			initializeFlowplayer($('div#main-content', elts.content));
			elts.content.css({overflow: 'auto'});
			
			resizeOverlay();
		},
		hideContent: function(elts, settings, callback) {
			$('iframe.hidden').removeClass('hidden');
			unloadFlowplayer($('div#main-content', elts.content));
			callback();
		},
		endResize: function(elts, settings) {
			resizeOverlay();
		}
	};

	var graphOverlaySettings = {
		wrap: {
			ajax: '<div id="nyroModalContentWrapper" class="graph"></div>'
		}
	};
	// settings to pass to nyroModal when gallery contains both photos and videos in explore/accessories pages
	var videoPhotoGalleryOverlaySettings = {
			width: ($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) ? 735 : 0,
			// LRO-2194 minHeight: ($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) ? 700 : 0,
			wrap: {
				ajax: '<div id="nyroModalContentWrapper" class="video-gallery"></div>'
			},
			endShowContent: function(elts, settings) {
				// prevent flowplayer from being initialized for non video content
				var link = $(settings.from);
				var parent = link.parent('.connect-overlay');
				if(!parent.length){
					initializeFlowplayer($('div#main-content', elts.content));
				}
				elts.content.css({overflow: 'auto'});

			},
			hideContent: function(elts, settings, callback) {
				//unloadFlowplayer($('div#main-content'));
				callback();
			},
			processHandler: function(settings) {
				unloadFlowplayer($('div#main-content'));
				var link = $(settings.from);
				var parent = link.parent('.connect-overlay');

				if (parent.length) {
					var content = $(overlayTemplates.connect);
					
					if(link.hasClass('withoutThumb')) { 
						$(content).find('.main-content-wrapper').css('padding','0px');
					}
					if(link.attr('href')==''){
						$(content).find('#main-content').remove();
					} else {
						$('img', content).attr('src', link.attr('href'));
						$('img', content).attr('alt', link.children('span:not(.parent-number)').text());
					}
					$('div#main-content h2 strong', content).text(link.children('span:not(.part)').text());

					if (parent.find('span.part').length) {
						$('div#text p.part', content).text(parent.children('span.part').text());
					} else {
						$('div#text p.part', content).remove();
					}

					if (parent.find('p.extended-description').length) {
						$('div#text p.extended-description', content).html(parent.children('p.extended-description').html());
					} else {
						$('div#text p.extended-description', content).remove();
					}
					
					if(parent.find('p.extended-description').length == 0 && parent.find('span.part').length == 0){
						$('div#text', content).remove();
					}

					settings.content = content;
					settings.wrap = galleryOverlaySettings.wrap;
					settings.type = 'manual';
				}
			},
			showTransition: function(elts, settings, callback) {
				// This is required to resolve a JavaScript error with IE6
				unloadFlowplayer($('div#main-content', elts.content));
				// code taken from nyromodal 1.6.0 source to support display of 'loading' image while navigating in gallery
				elts.loading
				.css({
					marginTop: elts.contentWrapper.css('marginTop'),
					marginLeft: elts.contentWrapper.css('marginLeft'),
					height: elts.contentWrapper.css('height'),
					width: elts.contentWrapper.css('width'),
					opacity: 0
				})
				.show()
				.fadeTo(400, 1, function() {
						elts.contentWrapper.hide();
						callback();
					});
			},
			endResize: function(elts, settings) {
				resizeOverlay();
			},
			endFillContent: function(elts, settings) {
				if ($('#main-content img').width() >= 720) {
					$('#main-content h2').css('max-width',$('#main-content img').width());	
				}
			}
		};
	//Explore and Accessories bullet points
	$('body#explore div.explore-block div.explore-content-block ul, body#accessories div.explore-block div.explore-content-block ul').each(function(){
		$('.connect-overlay a', $(this)).nyroModal(videoPhotoGalleryOverlaySettings);
	});
	// Explore and Accessories Gallery
	$('body#explore div.explore-block div.explore-content-block dl, body#accessories div.explore-block div.explore-content-block dl').each(function() {
		var index = ($(this).index());
		var gallery = "gallery-"+index;
		var title = $('dt', $(this)).text();

		galleries[gallery] = title;
		$('dd:not(.connect-overlay) a[href]', $(this)).each(function() {
			var href = $(this).attr('href');
			var overlayContentType = 'photo';
			if(href.indexOf('view=Alt-1') == -1) {
				$(this).nyroModal(videoPhotoGalleryOverlaySettings);
				overlayContentType = 'wrapper';
			} else {
				$(this).nyroModal(videoPhotoGalleryOverlaySettings);
			}
			if (href.indexOf('#') == -1) {
				$(this).attr('href', $(this).attr('href') + '#' + overlayContentType);
			}
			// Gallery support disabled for the time being [LRO-125]
			/* enabled for LR Refresh
			 *
			 */
			//$(this).attr("rel", gallery);
		});

		$('.connect-overlay a', $(this)).nyroModal(videoPhotoGalleryOverlaySettings);
		$('a.performance', $(this)).nyroModal({ forceType: 'image', wrap: { image: '<div id="nyroModalContentWrapper"></div>' }, title: title, gallery: gallery });
	});

	// Galleries
	var photoGalleries = $('body#gallery div.explore-block div.inner div.explore-content-block, body#accessories div.article-block div.inner div.owner-column-primary div.explore-content-block').children();
	photoGalleries.each(function() {
		var type = null;
		if ($(this).hasClass('explore-photos')) { type = 'photo'; }
		else if ($(this).hasClass('explore-videos')) { type = 'video'; }

		if (type != null) {
			var gallery = 'gallery-' + photoGalleries.index($(this));
			var settings = (type == 'photo') ? photoGalleryOverlaySettings : videoGalleryOverlaySettings;

			var container = $(this).children();
			$('a', container).each(function() {
				$(this).attr('href', $(this).attr('href') + '#wrapper');
				$(this).nyroModal(settings);
				$(this).attr("rel", gallery);
			});
		}
	});

	// External Redirect Overlay
	$('a[rel="external"]').click(function(e) {
		e.preventDefault();

		// NOTE: Access the href attribute using jQuery rather than 'this.href' because nyroModal
		// only embeds content (rather than creating an iframe) on relative links.
		var href = $(this).attr('href');
		
		// JIRA LRO-700
		// Only open links with a URL parameter via the external redirect overlay
		var useOverlay = href.indexOf('?url=') != -1;
		if (useOverlay) {
			externalLinkOverlaySettings.url = $(this).attr('href').replace('?url=', '?view=Alt-1&url=');
			// LRO-2200
			//if($.browser.msie && (parseInt($.browser.version) <= 7)) {
				var ieWidth = {width: 400 };
				$.extend(externalLinkOverlaySettings, ieWidth);
			//}			
			$.nyroModalManual(externalLinkOverlaySettings);

		} else {
			window.open(href);
		}

		return false;
	});

	// Single videos
	$('a[rel^="video-"]').each(function() {
		var href = $(this).attr('href');
		if (href.indexOf('#') == -1) {
			$(this).attr('href', $(this).attr('href') + '#photo');
		}
		$(this).nyroModal(videoOverlaySettings);
	});

	// Microsites
	$('a[rel^="microsite"]').each(function() {
		var re = new RegExp('\\d+x\\d+');
		var overlay = re.exec($(this).attr('rel'));
		if (overlay != null) {
			var size = overlay[0].split('x');
			$(this).nyroModal({ height: size[1], width: size[0], forceType: 'iframe', wrap: { iframe: '<div id="nyroModalContentWrapper"></div>' }, gallery: null });
			$(this).attr('rel', '');
		}
	});

	//
	// processGalleryLinks(overlay)
	// Processes any links that exist within an overlay that allow a user to jump around within a
	// gallery.
	// PARAMS
	//  overlay: the current overlay
	//  settings: the settings for the modal
	//

	function processGalleryLinks(overlay, settings) {
		var links = $('[rel="'+settings.gallery+'"], [rel^="'+settings.gallery+' "]');

		var selector = 'div#text div.overlay-col-1 div dl dd a';
		$(selector, overlay).each(function() {
			var index = $(selector).index(this);
			if (index == links.index(settings.from)) {
				$(this).addClass("selected");
			}

			$(this).click(function(e) {
				e.preventDefault();

				if (isSlideshowRunning) {
					clearTimeout(slideshowTimeout);
				}

				links.eq(index).nyroModalManual(settings);
				if (isSlideshowRunning) {
					slideshowTimeout = setTimeout(function() { showNextSlide(settings) }, slideshowInterval);
				}
				return false;
			});

		});

		var slideshow = $('div#text div.overlay-col-1 dt span.slideshow', overlay);
		if (slideshow.length == 1) {
			if (isSlideshowRunning) {
				$(slideshow).children('a.play').hide();
				$(slideshow).children('a.stop').click(function() {
					clearTimeout(slideshowTimeout);
					isSlideshowRunning = false;
					$(this).hide();
					$(this).prev('a.play').show();
					return false;
				});

			} else {
				$(slideshow).children('a.stop').hide();
				$(slideshow).children('a.play').click(function() {
					slideshowTimeout = setTimeout(function() { showNextSlide(settings) }, slideshowInterval);
					$(this).hide();
					$(this).next('a.stop').show();
					return false;
				});
			}
		}
	}

	//
	// showNextSlide(settings)
	// Shows the next item in a modal gallery.
	// PARAMS
	//  settings: the settings for the modal
	//
	function showNextSlide(settings) {
		isSlideshowRunning = true;
		var nextSlide = $.nyroModalNext();
		if (nextSlide) {
			slideshowTimeout = setTimeout(function() { showNextSlide(settings) }, slideshowInterval);
		} else {
			var links = $('[rel="'+settings.gallery+'"], [rel^="'+settings.gallery+' "]');
			links.eq(0).nyroModalManual(settings);
			slideshowTimeout = setTimeout(function() { showNextSlide(settings) }, slideshowInterval);
		};
	}
});

//
// initializeFlowplayer(selector)
// Initializes a Flowplayer instance for the HTML elements that match the specified selector.
// PARAMS
//  selector: A selector for the element(s) that should have a Flowplayer instance, or a collection
//            of element(s) that should have a Flowplayer instance.
// REMARKS
//  This method will not initialize a Flowplayer instance if:
//  * the variable flowplayerBaseUrl is undefined or null
//  * selector matches no elements
//  * the Flowplayer JavaScript libraries are not loaded
//
function initializeFlowplayer(selector) {
	if (typeof flowplayerBaseUrl == 'undefined' || flowplayerBaseUrl == null || $(selector).length == 0 || $(selector).flowplayer == undefined) {
		return;
	}

	var flowplayerUrl = flowplayerBaseUrl + 'flowplayer.commercial-3.2.7.swf';
	var flowplayerContentPluginUrl = flowplayerBaseUrl + 'flowplayer.content-3.2.0.swf';
	var flowplayerCaptionsPluginUrl = flowplayerBaseUrl + 'flowplayer.captions-3.2.3.swf';
	var flowplayerControlsPluginUrl = flowplayerBaseUrl + 'flowplayer.controls.landrover-3.2.5.swf';

	var videoTitle = $('#nyroModalContent #video-gallery #text .overlay-col-1 h2').text();
	var href = $(selector).attr('href');
	if(href) {
		$(selector).attr('href', encodeURI($(selector).attr('href'))).flowplayer(flowplayerUrl, {
			key: '#@cec1a32d5edfcbe24a7',
			clip: {
				captionUrl: captionUrl,
				autoPlay: true,
				autoBuffering: true,
				scaling: 'fit',
				onStart: function() {
					var _gaq = _gaq || [];
					_gaq.push(['g._trackEvent', 'Gallery', 'Video', 'Play - ' + videoTitle]);
					_gaq.push(['m._trackEvent', 'Gallery', 'Video', 'Play - ' + videoTitle]);
				},
				onLastSecond: function() {
					this.unload();
				}

			},
			play: null,
			plugins: {
				content: {
					url: flowplayerContentPluginUrl,
					width: '100%',
					height: 40,
					bottom: 26,
					borderRadius: 0,
					border: 0,
					backgroundColor: '#000000',
					backgroundGradient: 'none',
					opacity: 1,
					style: {
						body: {
							textAlign: 'center',
							fontSize: 11,
							fontFamily: 'Arial',
							color: '#ffffff'
						}
					},
					display: (captionUrl == '') ? 'none' : 'block'
				},
				captions: {
					url: flowplayerCaptionsPluginUrl,
					captionTarget: 'content',
					button: null
				},
				controls: {
					url: flowplayerControlsPluginUrl,
					tooltips: {
						play: buttons.play,
						pause: buttons.pause,
						mute: buttons.mute,
						unmute: buttons.unmute,
						fullscreen: buttons.fullscreen,
						fullscreenExit: buttons.fullscreenExit,
						captionsOn: buttons.subtitlesOn,
						captionsOff: buttons.subtitlesOff,
						buttons: true
					},
					autoHide: {
                        enabled: false
					},
					zIndex: 2
				}
			}
		});
		if (!(flashembed.getVersion()[0] > 0)) {
			$(selector).flowplayer(0).ipad();
		}
	}
}

//
// unloadFlowplayer(selector)
// Unloads the Flowplayer instance attached to the HTML elements that match the specified selector.
// PARAMS
//  selector: A selector for the element(s) that should have a Flowplayer instance, or a collection
//            of element(s) that should have a Flowplayer instance.
//
function unloadFlowplayer(selector) {
	if ($(selector).length == 0 || $(selector).flowplayer == undefined || $(selector).flowplayer(0) == undefined) {
		return;
	}
	/* LR Refresh and new versions of flash bugs for IE6 and IE7 require this
	 * Remove flash object created by flowplayer
	 * Empty any video player class container
	*/
	if($('#main-content_api')) {
		$('#main-content_api').remove();
	}
	if($('#video-content_api')) {
		$('#video-content_api').remove();
	}
	if($('.video-player')) {
		$('.video-player').empty();
	}
}

function resizeOverlay() {
	var $videoOverlayTarget = $('#main-content.player'),
		$playButton = $videoOverlayTarget.find('.fp-play'),
		$video = $videoOverlayTarget.find('video, object, embed');
	if ($videoOverlayTarget.length > 0) {
		$videoOverlayTarget.height('auto');
		if ($playButton.length > 0 || $video.length > 0) {
			var targetWidth = $videoOverlayTarget.width(),
				targetHeight = targetWidth * 0.5625;

			$videoOverlayTarget.height(targetHeight);
		} else {
			
		}
	}
}

//
// TEMPLATES
//

var overlayTemplates = {
	connect: '<div id="photo" class="content-overlay-block"><div class="main-content-wrapper"><div id="main-content"><img src="" alt="" height="360" width="720"/><h2><strong></strong></h2></div></div><div id="text"><p class="part"></p><p class="extended-description"></p></div></div>'	
};

//Form overlay
$(document).ready(function() { 
	/*
	 *
	 * Flash cover method
	 */
	formOverlay = function(url, x, y) {
		$('div#dialog').formOverlay(url, {'overlayWidth':x, 'overlayHeight':y});
	};	
	
	/*
	 * formOverlay
	 *
	 *
	 */
	$.fn.formOverlay = function(url, options) {
		var defaults = {
			'overlayWidth':800,
			'overlayHeight':660,
			'offset':16};  // Height plus header, footer etc
		var options = $.extend(defaults, options);
		var backgroundColor=parseQueryString(url)['backgroundColor'];
		if (!backgroundColor) backgroundColor='transparent';
		else backgroundColor=backgroundColor[0];
		var overlay = this;
		var parms=parseQueryString(url)
		var container = $('<div>').attr('id','iframe-container').css({'height':options.overlayHeight});
		var iframe = $('<iframe>').attr({'src': url,
										'allowTransparency':'true',
										'frameborder':0,
										'id':'iframe-overlay',
										'style':'display:block;height:100%;width:100%;background-color:'+backgroundColor});
		
		iframe.appendTo(container);
		overlay.html(container); // Inject the form into the overlay
		formDialog($(this), options);
	};
	
	function parseQueryString(url) {
		var indx= url.indexOf("?");
		if (indx==-1) return {};
		

	    var query = url.substr(indx+1),
	        map   = {};
	    query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function(match, key, value) {
	        (map[key] = map[key] || []).push(value);
	    });
	    return map;
	}
	
	
	function parseCoords(coords) {
		var coordinates = coords.split(",");
		
		return {'overlayWidth':(coordinates[0]) ? parseInt(coordinates[0], 10) : undefined, // Radix 10
				'overlayHeight':(coordinates[1]) ? parseInt(coordinates[1], 10) : undefined};
	}
	
	$('a.dialog').click(function (e) {
		$('div#dialog').formOverlay($(this).attr('href'), parseCoords($(this).attr('coords')));
		e.preventDefault(); // Removed the event's default action
		
		return false;
	});
	
	formDialog = function(node, options) {
		var overlay = node;
		
		// fix for IE 6/7
		if($.browser.msie && parseInt($.browser.version) <= 7) {
			$('body').css('position', 'relative');
		}
		
		overlay.dialog({'height':options.overlayHeight, // Calls the jQueryUI Dialog plugin
						'width':options.overlayWidth,
						'modal':true,
						'draggable':false,
						'dialogClass':'formOverlayDialog',
						'closeText': 'X',
						'open':function(event, ui) {
							var dialog = $('.ui-dialog');
							var height = dialog.height();
							
							$('.ui-widget-overlay').css('opacity', '0');
							$('.ui-widget-overlay').fadeTo('slow', 0.75);
							
							if(options.onOpen)
								options.onOpen();
						},
						'close':function(event, ui) {
							overlay.dialog("destroy");
							overlay.empty();
							
							if(options.onClose)
								options.onClose();
						}});
		
		
		$(window).resize(function() { 
			overlay.dialog("option", "position", "center"); 
		});
	};
	
});