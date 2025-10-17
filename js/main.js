// zoom-detect.js
(function() {
    // Function to get approximate browser zoom percentage
    function getZoomPercent() {
        if (window.devicePixelRatio) {
            return Math.round(window.devicePixelRatio * 100);
        }
        if (window.outerWidth && window.innerWidth) {
            return Math.round((window.outerWidth / window.innerWidth) * 100);
        }
        return 100; // fallback
    }

    // Function to add/remove zoom class
    function applyZoomClass() {
        const zoom = getZoomPercent();
        const root = document.documentElement;

        // Optional: store current zoom in data attribute
        root.setAttribute('data-zoom', zoom);

        if (zoom <= 90) { // 90% or below
            root.classList.add('zoom-90-or-below');
        } else {
            root.classList.remove('zoom-90-or-below');
        }
    }

    // Run on page load and window resize
    window.addEventListener('load', applyZoomClass);
    window.addEventListener('resize', applyZoomClass);

    // Poll every 600ms to detect zoom changes not triggering resize
    let prevZoom = getZoomPercent();
    setInterval(function() {
        const currentZoom = getZoomPercent();
        if (currentZoom !== prevZoom) {
            prevZoom = currentZoom;
            applyZoomClass();
        }
    }, 600);
})();



// end //

(function ($) {
	"use strict";
	// skill
	$(".skill-per").each(function () {
		var $this = $(this);
		var id = $this.attr("id");
		$this.css("width", id + "%");
		$({ animatedValue: 0 }).animate(
			{ animatedValue: id },
			{
				duration: 1000,
				step: function () {
					$this.attr("id", Math.floor(this.animatedValue) + "%");
				},
				complete: function () {
					$this.attr("id", Math.floor(this.animatedValue) + "%");
				}
			}
		);
	});


	// sticky
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 200) {
			$("#header-sticky").removeClass("sticky-menu");
		} else {
			$("#header-sticky").addClass("sticky-menu");
		}
	});

	// RESPONSIVE MENU
	$('.responsive').on('click', function (e) {
		$('#mobile-menu').slideToggle();
	});

	// meanmenu
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "992"
	});

	$('.info-bar').on('click', function () {
		$('.extra-info').addClass('info-open');
	})

	$('.close-icon').on('click', function () {
		$('.extra-info').removeClass('info-open');
	})

	// offcanvas menu
	$(".menu-tigger").on("click", function () {
		$(".offcanvas-menu,.offcanvas-overly").addClass("active");
		return false;
	});
	$(".menu-close,.offcanvas-overly").on("click", function () {
		$(".offcanvas-menu,.offcanvas-overly").removeClass("active");
	});



	// menu toggle
	$(".main-menu li a").on('click', function () {
		if ($(window).width() < 700) {
			$("#mobile-menu").slideUp();
		}
	});

	// smoth scroll
	$(function () {
		$('a.smoth-scroll').on('click', function (event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 100
			}, 1000);
			event.preventDefault();
		});
	});

	// mainSlider
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: true,
			autoplaySpeed: 10000,
			dots: false,
			fade: true,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
			responsive: [
				{ breakpoint: 1200, settings: { dots: false, arrows: false } }
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();
	// faq section

	const faqBtns = document.querySelectorAll('.faq-btn');

	faqBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const item = btn.parentElement;
			const content = item.querySelector('.faq-content');

			// Close other open items
			document.querySelectorAll('.faq-item').forEach(i => {
				if (i !== item) {
					i.classList.remove('active');
					i.querySelector('.faq-content').style.maxHeight = null;
				}
			});

			// Toggle current item
			item.classList.toggle('active');

			if (item.classList.contains('active')) {
				content.style.maxHeight = content.scrollHeight + "px";
			} else {
				content.style.maxHeight = null;
			}
		});
	});


	// services-active
	$('.services-active').slick({
		dots: true,
		infinite: true,
		arrows: false,
		speed: 1000,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// team-active
	$('.team-active').slick({
		dots: false,
		infinite: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
		speed: 1000,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// portfolio-active
	$('.class-active').slick({
		dots: false,
		infinite: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// portfolio-active
	$('.portfolio-active').slick({
		dots: false,
		infinite: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
		speed: 1000,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// brand-active
	$('.brand-active').slick({
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 1500,
		arrows: false,
		speed: 1000,
		slidesToShow: 5,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					infinite: true,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// testimonial-active
	$('.testimonial-active').slick({
		dots: false,
		infinite: true,
		arrows: false,
		speed: 1000,
		slidesToShow: 2,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// testimonial-active
	$('.testimonial-active2').slick({
		dots: false,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// testimonial-active2

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: true,
		focusOnSelect: true,
		variableWidth: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
	});
	// home-blog-active
	$('.home-blog-active').slick({
		dots: false,
		infinite: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// home-blog-active
	$('.home-blog-active2').slick({
		dots: false,
		infinite: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});




	// blog
	$('.blog-active').slick({
		dots: false,
		infinite: true,
		arrows: true,
		speed: 1500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
	});


// panda start
// panda start
window.addEventListener('load', function () {
    try {
        const adInnerSwiper = new Swiper('.ad-inner-slider', {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: '.ad-inner-next',
                prevEl: '.ad-inner-prev',
            },
            effect: 'slide',
            speed: 600
        });

        // Start autoplay
        if (adInnerSwiper && adInnerSwiper.autoplay) {
            adInnerSwiper.autoplay.start();
        }

        window.adInnerSwiper = adInnerSwiper;
        // console.log('adInnerSwiper ready');
    } catch (err) {
        console.error('Swiper init failed:', err);
    }
});


// panda end

	// counterUp

	$('.count').counterUp({
		delay: 100,
		time: 1000
	});

	/* magnificPopup img view */
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/* magnificPopup video view */
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

	// paroller
	if ($('.paroller').length) {
		$('.paroller').paroller();
	}

	//* Parallaxmouse js
	function parallaxMouse() {
		if ($('#parallax').length) {
			var scene = document.getElementById('parallax');
			var parallax = new Parallax(scene);
		};
	};
	parallaxMouse();

	// service active
	$('.s-single-services').on('mouseenter', function () {
		$(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active');
	})

	// scrollToTop
	$.scrollUp({
		scrollName: 'scrollUp',
		topDistance: '300',
		topSpeed: 300,
		animation: 'fade',
		animationInSpeed: 200,
		animationOutSpeed: 200,
		scrollText: '<i class="fas fa-level-up-alt"></i>',
		activeOverlay: false,
	});


	// isotop
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: 1
			}
		});

		// filter items on button click
		$('.button-group').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

	});
	// isotop
	$(".element").each(function () {
		var a = $(this);
		a.typed({
			strings: a.attr("data-elements").split(","),
			typeSpeed: 100,
			backDelay: 3e3
		})
	}),
		//for menu active class
		$('.button-group > button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

	// WOW active
	new WOW().init();

	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

})(jQuery);

// mahamedia
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // remove active from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    // hide all content
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

    // show target content
    const target = document.querySelector(this.dataset.target);
    if(target) target.style.display = 'block';
  });
});

document.querySelectorAll('.nav-tabs span').forEach(tab => {
	tab.addEventListener('click', function () {
		const newImg = this.getAttribute('data-img');
		const imgElement = document.getElementById('benefitImage');

		if (newImg) {
			// Smooth fade effect
			imgElement.style.opacity = 0;
			setTimeout(() => {
				imgElement.setAttribute('src', newImg);
				imgElement.style.opacity = 1;
			}, 300);
		}
	});
});


// for the sticky header up scrolling

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header-sticky');
  if (!header) return;
  const threshold = 50; // pixels scrolled before sticky becomes active

  window.addEventListener('scroll', () => {
    if (window.scrollY > threshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
});


// Example JS for interactivity (breadcrumb highlight, scroll effects, etc.)

document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbLinks = document.querySelectorAll(".breadcrumb a");

  breadcrumbLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
      link.style.color = "#fff";
    });
    link.addEventListener("mouseout", () => {
      link.style.color = "#ffdd77";
    });
  });
});
// Captcha generation + refresh + simple validation on submit
(function(){
function genCaptcha(len){
var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; // remove ambiguous chars
var out = '';
for(var i=0;i<len;i++) out += chars.charAt(Math.floor(Math.random()*chars.length));
return out;
}


var captchaDisplay = null;
var captchaInput = null;
var refreshBtn = null;
var form = null;


document.addEventListener('DOMContentLoaded', function(){
captchaDisplay = document.getElementById('captchaDisplay');
captchaInput = document.getElementById('captchaInput');
refreshBtn = document.getElementById('refreshCaptcha');
form = document.getElementById('admissionForm');


function setNew(){
var code = genCaptcha(6);
captchaDisplay.value = code;
}


// initialize on load
setNew();


// refresh on button click
refreshBtn.addEventListener('click', function(){ setNew(); captchaInput.value = ''; captchaInput.focus(); });


// refresh on page reload is automatic because setNew runs on DOMContentLoaded


// form submit validation: check captcha matches
form.addEventListener('submit', function(e){
// allow normal submission if captcha matches
if(captchaInput.value.trim() === captchaDisplay.value.trim()){
// form will submit to action URL. If you want to show a success message instead, preventDefault and do ajax.
return true;
}


e.preventDefault();
alert('Captcha does not match. Please retype the code shown or click refresh.');
captchaInput.focus();
});
});
})();


// fab
document.addEventListener('DOMContentLoaded', () => {
  // elements
  const slides = Array.from(document.querySelectorAll('.slide'));
  let thumbnails = Array.from(document.querySelectorAll('.thumbnails img'));
  const titleEl = document.getElementById('slider-title');
  const descriptionEl = document.getElementById('slider-description');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const textOverlay = document.querySelector('.text-overlay');
  const sliderEl = document.querySelector('.slider');

  if (!slides.length) return; // nothing to do

  // ensure thumbnails length equals slides length (if not, regenerate indexes)
  thumbnails.forEach((img, i) => {
    if (!img.hasAttribute('data-index')) img.setAttribute('data-index', i);
  });

  // state + config
  let current = 0;
  const animations = ['animate-left', 'animate-right', 'animate-zoom'];
  const AUTOPLAY_DELAY = 2600;
  let autoplayId = null;
  let busy = false; // prevents super-fast clicking
  let touchStartX = null;
  const SWIPE_MIN_DISTANCE = 40; // px

  // helper: set active slide by index (wraps around)
  function setActiveSlide(index) {
    index = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));

    // refresh thumbnails NodeList (in case DOM changed) and update classes
    thumbnails = Array.from(document.querySelectorAll('.thumbnails img'));
    thumbnails.forEach((t, i) => t.classList.toggle('active-thumb', i === index));

    // update title/description (use dataset or fallback)
    const s = slides[index];
    if (titleEl) titleEl.textContent = s.dataset.title || '';
    if (descriptionEl) descriptionEl.textContent = s.dataset.description || '';

    // animate overlay
    if (textOverlay) {
      textOverlay.className = 'text-overlay'; // reset classes
      const anim = animations[Math.floor(Math.random() * animations.length)];
      // use rAF for smoother class application
      window.requestAnimationFrame(() => {
        textOverlay.classList.add(anim);
        // small delay to trigger the .show transition reliably
        setTimeout(() => textOverlay.classList.add('show'), 40);
      });
    }

    current = index;
  }

  // public action: go to slide with throttling
  function showSlide(index) {
    if (busy) return;
    busy = true;
    setActiveSlide(index);
    restartAutoplay();
    setTimeout(() => (busy = false), 260); // guard window
  }

  // arrow helpers
  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  // wire thumbnails
  function wireThumbnails() {
    thumbnails = Array.from(document.querySelectorAll('.thumbnails img'));
    thumbnails.forEach((img, i) => {
      // ensure data-index exists
      if (!img.hasAttribute('data-index')) img.setAttribute('data-index', i);
      img.style.touchAction = 'manipulation';

      // remove existing listeners to avoid duplicates
      img.replaceWith(img.cloneNode(true));
    });

    // reselect after cloning
    thumbnails = Array.from(document.querySelectorAll('.thumbnails img'));
    thumbnails.forEach((img) => {
      img.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        if (!Number.isNaN(idx)) showSlide(idx);
      });

      // keyboard accessibility
      img.setAttribute('tabindex', '0');
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(this.getAttribute('data-index'), 10);
          if (!Number.isNaN(idx)) showSlide(idx);
        }
      });
    });
  }

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => nextSlide(), AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  // pause on hover/focus/touch — but DO NOT pause when hovering/clicking the main slider element.
  // We still want thumbnails and text overlay to pause (so keyboard nav & intentional interactions still work),
  // and we keep touch handlers on the slider for mobile devices.
  const thumbnailsEl = document.querySelector('.thumbnails');

  // 1) Keep pause behaviour for thumbnails + textOverlay
  [thumbnailsEl, textOverlay].forEach((el) => {
    if (!el) return;
    el.addEventListener('mouseenter', stopAutoplay);
    el.addEventListener('mouseleave', startAutoplay);
    el.addEventListener('focusin', stopAutoplay);
    el.addEventListener('focusout', startAutoplay);

    // touch handlers (useful if thumbnails are tappable on mobile)
    el.addEventListener('touchstart', () => stopAutoplay(), { passive: true });
    el.addEventListener('touchend', () => startAutoplay(), { passive: true });
  });

  // 2) For the main slider element, only use touch handlers so mobile users can pause by touch.
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', () => stopAutoplay(), { passive: true });
    sliderEl.addEventListener('touchend', () => startAutoplay(), { passive: true });

    // Optionally: if you want a hover pause on desktop for the slider, uncomment these two lines:
    // sliderEl.addEventListener('mouseenter', stopAutoplay);
    // sliderEl.addEventListener('mouseleave', startAutoplay);
  }


  // prev/next button wiring (guard null)
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // simple touch swipe on sliderEl
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderEl.addEventListener('touchmove', (e) => {
      // prevent accidental page scroll if horizontal swipe detection desired
      // leaving default to allow normal scroll; we only capture end distance
    }, { passive: true });

    sliderEl.addEventListener('touchend', (e) => {
      if (typeof touchStartX !== 'number') return;
      const touchEndX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : null;
      if (touchEndX === null) { touchStartX = null; return; }
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > SWIPE_MIN_DISTANCE) {
        if (diff > 0) nextSlide(); else prevSlide();
      }
      touchStartX = null;
    }, { passive: true });
  }

  // pause autoplay when page/tab hidden for better battery & correctness
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  // window resize — re-wire thumbnails after small delay (if DOM changes)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => wireThumbnails(), 200);
  });

  // initial setup
  wireThumbnails();
  setActiveSlide(0);
  startAutoplay();
});

