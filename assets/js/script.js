(function($) {

	"use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");
        var body = $(".page-wrapper");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
                body.addClass("body-overlay");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            body.removeClass("body-overlay");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                 e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = ($this.find(".slider-bg").attr("src")) ? $this.find(".slider-bg").attr("src") : false;

                if(img) {
                    $this.css({
                        backgroundImage: "url("+ img +")",
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                    })
                }
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear',
            });
        }
    }

    //Active heor slider
                heroSlider();


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();



            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // // Function for clone an element for sticky menu
    // function cloneNavForSticyMenu($ele, $newElmClass) {
    //     $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    // }

    // // clone home style 1 navigation for sticky menu
    // if ($('.header-style-1 .navigation').length) {
    //     cloneNavForSticyMenu($('.header-style-1 .navigation'), "sticky");
    // }

    // // Function for sticky menu
    // function stickIt($stickyClass, $toggleClass) {

    //     if ($(window).scrollTop() >= 300) {
    //         var orgElement = $(".original");
    //         var coordsOrgElement = orgElement.offset();
    //         var leftOrgElement = coordsOrgElement.left;
    //         var widthOrgElement = orgElement.css("width");

    //         $stickyClass.addClass($toggleClass);

    //         $stickyClass.css({
    //             "width": widthOrgElement
    //         }).show();

    //         $(".original").css({
    //             "visibility": "hidden"
    //         });

    //     } else {

    //         $(".original").css({
    //             "visibility": "visible"
    //         });

    //         $stickyClass.removeClass($toggleClass);
    //     }
    // }


    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;
    }


    /*------------------------------------------
        = HEADER SEARCH AREA
    -------------------------------------------*/
    if ($(".header-search-area").length) {
        var serachFormBox = $(".header-search-area .header-search-form");
        var openSeachBtn = $(".header-search-area .open-btn");

        $(document.body).append(serachFormBox);
        serachFormBox.hide();

        openSeachBtn.on("click", function(e) {
            serachFormBox.fadeIn();
            return false;
        });

        serachFormBox.on("click", function() {
            serachFormBox.fadeOut();
            return false;
        }).find(".form").on("click", function(e) {
            e.stopPropagation();
        })
    }
    


    /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".portfolio-slider").length) {
        $(".portfolio-slider").owlCarousel({
            center: true,
            items: 2,
            loop: true,
            margin: 20,
            dots: false,
            
            responsive:{
                600:{
                    margin: 10,
                },
                1200:{
                    items:4
                }
            }




            // autoplay:true,
            // smartSpeed: 300,
            // margin: 30,
            // loop:true,
            // autoplayHoverPause:true,
            // dots: false,
            // responsive: {
            //     0 : {
            //         items: 2
            //     },

            //     550 : {
            //         items: 3
            //     },

            //     992 : {
            //         items: 4
            //     },

            //     1200 : {
            //         items: 3
            //     }
            // }
        });
    }



    /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($('.testimonials-slider').length) {
        $('.testimonials-slider').bxSlider({
            auto:false,            
            controls: false,
            mode: 'fade',
            pause: 3000,
            speed: 500,
            pager: true,
            pagerCustom: '#testimonials-slider-pager'
        });
    }


    /*------------------------------------------
        = SERVICE SLIDER
    -------------------------------------------*/
    if ($(".service-slider").length) {
        $(".service-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            stagePadding: 15,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1
                },

                650 : {
                    items: 2
                },

                992 : {
                    items: 2
                },

                1200 : {
                    items: 3
                }
            }
        });
    }

    /*------------------------------------------
        = TEAM SLIDER
    -------------------------------------------*/
    if ($(".team-slider").length) {
        $(".team-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            stagePadding: 15,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                992 : {
                    items: 3
                },

                1200 : {
                    items: 4
                }
            }
        });
    }



    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                address: "required",
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                address: "Please enter your address",
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })    



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();

            toggleMobileNavigation();

            smallNavFunctionality();

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

		if ($(".site-header").length) {
            stickyMenu( $('.site-header .navigation'), "sticky-on" );
        }

        toggleBackToTopBtn();

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        
        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });



})(window.jQuery);
