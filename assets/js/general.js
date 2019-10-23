/* ------------------------------------------------------------------------------------------------------------------- *
 *
 * Clarity - Responsive Minimalistic Bootstrap 4 HTML Template
 *
 * Version    1.0.3
 * Copyright  vtdes.ru
 *
 * ------------------------------------------------------------------------------------------------------------------ */

(function($, $2) {

    'use strict';


    /* -------------------------------------------------------------------------------------------------------------- *
     * Variables, Constants
     * -------------------------------------------------------------------------------------------------------------- */

    var app = {

        gridBreakpoints: {
            xs: {
                min: 0,
                max: 575
            },
            sm: {
                min: 576,
                max: 767
            },
            md: {
                min: 768,
                max: 991
            },
            lg: {
                min: 992,
                max: 1199
            },
            xl: {
                min: 1200,
                max: 100000 /* Number.MAX_SAFE_INTEGER*/
            }
        },

        gridYBreakpoints: {
            step: 50,
            prefix: 'height-'
        },

        sidebar: {

            selector: '.sidebar',
            classExpanded: 'sidebar-expanded',

            slide: {
                selector: '.sidebar-slide',
                classActive: 'active'
            },

            menu: {
                selector: '.sidebar-slide .sidebar-nav',
                selectorActive: '.sidebar-slide .sidebar-nav.active',
                classActive: 'active'
            }

        }

    };

    var $html     = $('html');
    var $body     = $('body');
    var $bodyHTML = $('body, html');
    var $overlay  = $('.overlay');


    /* -------------------------------------------------------------------------------------------------------------- *
     * Is Mobile
     * -------------------------------------------------------------------------------------------------------------- */

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $html.addClass(isMobile ? 'mobile' : 'no-mobile');


    /* -------------------------------------------------------------------------------------------------------------- *
     * Prevent Empty Anchors
     * -------------------------------------------------------------------------------------------------------------- */

    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Navbar Fixed
     * -------------------------------------------------------------------------------------------------------------- */

    function affixHook() {

        var top = $(window).scrollTop();

        $('[data-affix-top]').each(function() {
            var $this = $(this);
            if (top > $this.attr('data-affix-top')) {
                $this.addClass('affix-fixed');
                $this.find('.affix-fixed-hidden').slideUp();
            } else {
                $this.removeClass('affix-fixed');
                $this.find('.affix-fixed-hidden').slideDown();
            }
        });
    }

    function affix() {

        var $this = $(this);
        var height = $this.height();
        var top = $this.offset().top;

        $this.parent().height(height);
        $this.attr('data-affix-top', top);

        $(window).on('scroll', affixHook);
    }

    function affixInit() {
        $('.affix').each(affix);
    }

    // Re-init affix elements on resize
    $(window).on('resize', affixInit);
    // Call affix hook on resize
    $(window).on('resize', affixHook);
    // Init affix elements first
    affixInit();
    // Call affix hook first
    affixHook();


    /* -------------------------------------------------------------------------------------------------------------- *
     * Smooth Scroll
     * -------------------------------------------------------------------------------------------------------------- */

    $('.smooth-scroll:not([href="#"])').on('click', function(e) {

        e.preventDefault();

        var $this = $(this),
            target = $this.attr('href');

        if (target === 'undefined') return;

        var $target = $(target);
        if ($target.length === 0) return;

        $.scrollWindow($target.offset().top || 0);

    });

    $.scrollWindow = function(offset) {

        $overlay.fadeIn();
        $bodyHTML.animate({ scrollTop: offset }, 750);
        $overlay.delay(300).fadeOut();

        if ($html.hasClass('mobile')) {
            $('.aside').removeClass('aside-expand');
        }
    };


    /* -------------------------------------------------------------------------------------------------------------- *
     * Tooltips
     * -------------------------------------------------------------------------------------------------------------- */

    $(function () { $('[data-toggle="tooltip"]').tooltip(); });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Icon Toggle
     * -------------------------------------------------------------------------------------------------------------- */

    $('.navigation-toggle').on('click', function() {

        var $this = $(this);

        if ($body.hasClass('navigation-open')) {
            $body.removeClass('navigation-open');
            $this.removeClass('open');
        } else {
            $body.addClass('navigation-open');
            $this.addClass('open');
        }
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Top
     * -------------------------------------------------------------------------------------------------------------- */

    function pageTop() {
        if ($(this).scrollTop() > 20) $body.removeClass('top');
        else                          $body.addClass('top');
    }

    $(window).on('scroll', pageTop);
    pageTop();


    /* -------------------------------------------------------------------------------------------------------------- *
     * Site Menu for Mobile
     * -------------------------------------------------------------------------------------------------------------- */

    function aside() {

        if (isMobile) {
            $html.addClass('mobile');
            $html.removeClass('no-mobile');
            return;
        }

        if (parseInt($(window).height()) < 550 || $(window).width() < 991) {
            $html.addClass('mobile');
            $html.removeClass('no-mobile');
        } else {
            $html.addClass('no-mobile');
            $html.removeClass('mobile');
        }
    }

    $(window).on('resize', aside);


    /* -------------------------------------------------------------------------------------------------------------- *
     * Sidebar API
     * -------------------------------------------------------------------------------------------------------------- */

    $(document).on('click', '[data-action="slide-nav-show"]', function(e) {

        // Prevent event
        e.preventDefault();

        // Target menu
        var $target  = $($(this).attr('data-target'));
        var $current = $(app.sidebar.menu.selectorActive);

        // Show slide part
        if (!$body.hasClass(app.sidebar.classExpanded)) {
            $body.addClass(app.sidebar.classExpanded)
        }

        // Hide current slide menu
        $current.removeClass(app.sidebar.menu.classActive);
        // Show new slide menu
        $target.addClass(app.sidebar.menu.classActive);
    });

    $(document).on('click', '[data-action="slide-nav-hide"]', function(e) {
        // Prevent event
        e.preventDefault();
        // Hide slide part
        $body.removeClass(app.sidebar.classExpanded)
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Appear
     * -------------------------------------------------------------------------------------------------------------- */

    $('.appear').appear();

    $body.on('appear', '.appear', function () {
        $(this).addClass('appear-in');
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Animate Numbers
     * -------------------------------------------------------------------------------------------------------------- */

    var $animateNumber = $('.animate-number');
    if ($animateNumber.length > 0) $animateNumber.appear();

    $body.on('appear', '.animate-number', function () {
        $animateNumber.each(function () {
            var $this = $(this);
            if ($this.hasClass('animate-stop')) return;
            $this.animateNumber({ number: $this.attr('data-value') }, 1500);
            $this.addClass('animate-stop');
        });
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * OWLCarousel2
     * -------------------------------------------------------------------------------------------------------------- */

    function initOwlCarousel($carousel) {

        $carousel.owlCarousel('destroy');

        var owl_parameters = {
            dots: false,
            navText: [
                '<i class="icon ti-angle-left"></i>',
                '<i class="icon ti-angle-right"></i>'
            ]
        };

        var data_items = $carousel.data('owl-items') || 1,
            items_count = parseInt(data_items, 10);

        // Set to config
        owl_parameters['items'] = items_count;

        // Disable mouse drag
        if ($carousel.hasClass('owl-no-mousedrag')) owl_parameters['mouseDrag'] = false;
        // Show prev/next navigation
        if ($carousel.hasClass('owl-navigation')) owl_parameters['nav'] = true;
        // Show dots navigation
        if ($carousel.hasClass('owl-pagination')) owl_parameters['dots'] = true;

        // Enable autoplay
        if ($carousel.hasClass('owl-autoplay')) {
            owl_parameters['loop'] = true;
            owl_parameters['autoplay'] = true;
            owl_parameters['autoplayTimeout'] = $carousel.data('owl-autoplay-timeout') || 5000;
        }

        // Responsive Items Count
        var data_items_responsive = $carousel.data('owl-items-responsive');
        if (typeof data_items_responsive !== 'undefined') {

            var arr = data_items_responsive.split(';'),
                responsive = {};

            responsive[1000] = { items: items_count };
            responsive[0] = { items: 1 };

            for (var i = 0, j = arr.length; i < j; i++) {

                var _arr = arr[i].split(':');
                if (typeof _arr[0] === 'undefined' || typeof _arr[1] === 'undefined') continue;

                var max_w = parseInt((_arr[0]).trim(), 10),
                    items_cnt = parseInt((_arr[1]).trim(), 10);

                responsive[max_w] = { items: items_cnt }
            }

            owl_parameters['responsive'] = responsive;
            owl_parameters['responsiveClass'] = true;
        }

        // Custom Animation
        var animate_in = $carousel.attr('data-owl-animate-in'),
            animate_out = $carousel.attr('data-owl-animate-out');

        if (typeof animate_in !== 'undefined') owl_parameters['animateIn'] = animate_in;
        if (typeof animate_out !== 'undefined') owl_parameters['animateOut'] = animate_out;

        // Initialize OWL Carousel
        $carousel.owlCarousel(owl_parameters);
    }

    $('.owl-carousel').each(function() {
        initOwlCarousel($(this));
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Magnific Popup
     * -------------------------------------------------------------------------------------------------------------- */

    $('.popup-image').magnificPopup({
        closeBtnInside: true,
        type          : 'image',
        mainClass     : 'mfp-fade',
        gallery       : {
            enabled: true
        }
    });

    $('.popup-iframe').magnificPopup({
        type      : 'iframe',
        mainClass : 'mfp-fade'
    });

    $('.popup-modal').magnificPopup({
        type      : 'inline',
        modal     : true,
        mainClass : 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Material Controls
     * -------------------------------------------------------------------------------------------------------------- */

    $('.md-form-control')
        .each(function() {
            var $this = $(this);
            if ($this.val() !== '') $this.parent().addClass('md-completed');
        })
        .on('focus', function() {
            $(this).parent().addClass('focus');
        })
        .on('blur', function() {

            var $this = $(this);
            var $parent = $this.parent();

            $parent.removeClass('focus');

            if ($(this).val() !== '') $parent.addClass('md-completed');
            else $parent.removeClass('md-completed');
        })
        .on('input, change', function() {

            var $parent = $(this).parent();

            if ($(this).val() !== '') $parent.addClass('md-completed');
            else $parent.removeClass('md-completed');
        });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Bootstrap Dropdown Animation
     * -------------------------------------------------------------------------------------------------------------- */

    var $dropdown = $('.dropdown');

    $dropdown.on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn('fast');
    });

    $dropdown.on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut('fast');
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Template API
     * -------------------------------------------------------------------------------------------------------------- */

    $(document).on('click', '[data-action="class-toggle"]', function(e) {

        e.preventDefault();

        var $this = $(this);
        var target = $this.attr('data-target');
        var cl = $this.attr('data-class');

        if (typeof target === 'undefined' || typeof cl === 'undefined') return;

        $(target).toggleClass(cl);

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Parallax Stellar
     * -------------------------------------------------------------------------------------------------------------- */

    if (!isMobile) {

        $2.stellar({
            responsive: true,
            verticalOffset: 0,
            horizontalOffset: 0,
            horizontalScrolling: false,
            hideDistantElements: false
        });
    }


    /* -------------------------------------------------------------------------------------------------------------- *
     * Finish Loading
     * -------------------------------------------------------------------------------------------------------------- */

    $(window).on('load', function() {

        setTimeout(function() { $('.loader').fadeOut('slow'); }, 300 );
        setTimeout(function() { $overlay.fadeOut('slow');     }, 700 );
        setTimeout(function() { $body.addClass('loaded');     }, 1000);

        aside();
    });

})(jQuery, jQuery2);
