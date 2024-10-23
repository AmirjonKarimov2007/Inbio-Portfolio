(function($) {
    "use strict";

    var imJs = {
        m: function(e) {
            imJs.d();
            imJs.methods();
        },
        d: function(e) {
            (this._window = $(window)),
            (this._document = $(document)),
            (this._body = $("body")),
            (this._html = $("html"));
        },

        methods: function(e) {
            imJs.backToTopInit();
            imJs.mobileMenuActive();
            imJs.magnificPopupActivation();
            imJs.stickyHeader();
            imJs.contactForm();
            imJs.wowActive();
            imJs.awsActivation();
            imJs.demoActive();
            imJs.activePopupDemo();
            imJs.onePageNav();
            imJs.onePageNav2();
            imJs.onePageNavMobile();
            imJs.stickyAdjust();
            imJs._slickactivation();
            imJs.clapAnimation();
            imJs.stopVideo();
            imJs.plyrVideo();
            imJs.swiperSlideronModal();
            imJs.portfolio_slick_activation();
        },

        plyrVideo: function() {
            // init video player for courses Curriculum
            const player = new Plyr(".rbt-player");
        },

        stopVideo: function() {
            $(".modal").on("show.bs.modal", function(event) {
                $(this).find(".portfolio-popup-thumbnail iframe").attr("src", $(event.relatedTarget).data("url"));
            });
            $(".modal").on("hidden.bs.modal", function(e) {
                $(this).find(".portfolio-popup-thumbnail iframe").attr("src", "");
            });

            $.fn.stopVideoAfterLoadmore = function() {
                return this.each(function() {
                    $(".modal").on("show.bs.modal", function(event) {
                        $(this)
                            .find(".portfolio-popup-thumbnail iframe").attr("src", $(event.relatedTarget).data("url"));
                    });
                    $(".modal").on("hidden.bs.modal", function(e) {
                        $(this).find(".portfolio-popup-thumbnail iframe").attr("src", "");
                    });
                });
            };
            $(document).on("click", ".close", function() {
                $(this).stopVideoAfterLoadmore();
            });
        },

        swiperSlideronModal: function() {
            $(document).on('shown.bs.modal', '.modal', function() {
                setTimeout(function() {
                    if (typeof(Event) === 'function') {
                        // modern browsers
                        window.dispatchEvent(new Event('resize'));
                    } else {
                        // for IE and other old browsers
                        // causes deprecation warning on modern browsers
                        var evt = window.document.createEvent('UIEvents');
                        evt.initUIEvent('resize', true, false, window, 0);
                        window.dispatchEvent(evt);
                    }
                }, 500);
            });

        },

        clapAnimation: function() {
            $.fn.clapAnimateButton = function() {
                return this.each(function() {
                    $(this).addClass("animate");
                    setTimeout(() => {
                        $(this).removeClass("animate");
                    }, 300);
                });
            };
            $(document).on("click", ".like-button", function() {
                $(this).clapAnimateButton();
            });
        },

        onePageNav: function() {
            $("#sideNav").onePageNav({
                currentClass: "current",
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.8,
                filter: ":not(.external-link)",
                easing: "swing",
            });
        },
        onePageNav2: function() {
            $("#onepagenav").onePageNav({
                currentClass: "current",
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.8,
                filter: ":not(.external-link)",
                easing: "swing",
            });
        },
        onePageNavMobile: function() {
            $("#sideNavMobile").onePageNav({
                currentClass: "current",
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.8,
                filter: ":not(.external-link)",
                easing: "swing",
            });
        },

        onePageTopFixed: function() {
            if ($(".onepagefixed").length) {
                var fixedElem = $(".onepagefixed"),
                    distance = fixedElem.offset().top - 100,
                    $window = $(window),
                    totalDistance =
                    $(".service-scroll-navigation-area").outerHeight() + distance;

                $(window).on("scroll", function() {
                    if ($window.scrollTop() >= distance) {
                        fixedElem.css({
                            position: "fixed",
                            left: "0",
                            right: "0",
                            top: "0",
                            zIndex: "5",
                        });
                    } else {
                        fixedElem.removeAttr("style");
                    }
                    if ($window.scrollTop() >= totalDistance) {
                        fixedElem.removeAttr("style");
                    }
                });
            }
        },

        activePopupDemo: function(e) {
            $(".popuptab-area li a.demo-dark").on("click", function(e) {
                $(".demo-modal-area").addClass("dark-version");
                $(".demo-modal-area").removeClass("white-version");
            });
            $(".popuptab-area li a.demo-light").on("click", function(e) {
                $(".demo-modal-area").removeClass("dark-version");
                $(".demo-modal-area").addClass("white-version");
            });
        },

        demoActive: function(e) {
            $(".rn-right-demo").on("click", function(e) {
                $(".demo-modal-area").addClass("open");
            });
            $(".demo-close-btn").on("click", function(e) {
                $(".demo-modal-area").removeClass("open");
            });
        },

        contactForm: function() {
            $(".rwt-dynamic-form").on("submit", function(e) {
                e.preventDefault();
                var _self = $(this);
                var __selector = _self.closest("input,textarea");
                _self.closest("div").find("input,textarea").removeAttr("style");
                _self.find(".error-msg").remove();
                _self
                    .closest("div")
                    .find('button[type="submit"]')
                    .attr("disabled", "disabled");
                var data = $(this).serialize();
                $.ajax({
                    url: "mail.php",
                    type: "post",
                    dataType: "json",
                    data: data,
                    success: function(data) {
                        _self
                            .closest("div")
                            .find('button[type="submit"]')
                            .removeAttr("disabled");
                        if (data.code == false) {
                            _self.closest("div").find('[name="' + data.field + '"]');
                            _self
                                .find(".rn-btn")
                                .after('<div class="error-msg"><p>*' + data.err + "</p></div>");
                        } else {
                            $(".error-msg").hide();
                            $(".form-group").removeClass("focused");
                            _self
                                .find(".rn-btn")
                                .after(
                                    '<div class="success-msg"><p>' + data.success + "</p></div>"
                                );
                            _self.closest("div").find("input,textarea").val("");

                            setTimeout(function() {
                                $(".success-msg").fadeOut("slow");
                            }, 5000);
                        }
                    },
                });
            });
        },

        wowActive: function() {
            new WOW().init();
        },

        stickyAdjust: function(e) {
            // Sticky Top Adjust..,
            $(".rbt-sticky-top-adjust").css({
                top: 120,
            });
            $(".rbt-sticky-top-adjust-two").css({
                top: 100,
            });
            $(".rbt-sticky-top-adjust-three").css({
                top: 50,
            });
            $(".header-sticky .rbt-sticky-top-adjust").css({
                top: 160,
            });
        },

        portfolio_slick_activation: function portfolio_slick_activation() {

            var SlickCarousel = $('.portfolio-style-three');
            if (SlickCarousel.length) {
                try {
                    if (SlickCarousel.find('.portfolio-slick-activation').hasClass('slick-initialized')) {
                        SlickCarousel.find('.portfolio-slick-activation').slick('unslick');
                    }
                } catch (e) {}

                SlickCarousel.find('.portfolio-slick-activation').slick({
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    cssEase: 'linear',
                    adaptiveHeight: true,
                    prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                    nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                    responsive: [{
                            breakpoint: 1124,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 868,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true,
                                arrows: false,
                            }
                        }
                    ]

                });
            }

        },

        testimonialActivation: function() {
            $(".testimonial-activation").slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                cssEase: "linear",
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        pauseOnFocus: false,
                        pauseOnHover: false,
                        pauseOnDotsHover: false,
                    },
                }, ],
            });

            $(".testimonial-item-one").slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                cssEase: "linear",
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                    },
                }, ],
            });

            $(".portfolio-slick-activation").slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                cssEase: "linear",
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        },
                    },
                ],
            });

            $(".blog-slick-activation").slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                cssEase: "linear",
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        },
                    },
                ],
            });



            $(".testimonial-activation-item-3").slick({
                arrows: true,
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: false,
                        },
                    },
                    {
                        breakpoint: 577,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                        },
                    },
                ],
            });

            $(".brand-activation-item-5").slick({
                arrows: true,
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1124,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 868,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
        },

        _slickactivation: function(e) {
            $(".inbio-carousel-gallery").slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
            });
        },

        backToTopInit: function() {
            // declare variable
            var scrollTop = $(".backto-top");
            $(window).scroll(function() {
                // declare variable
                var topPos = $(this).scrollTop();
                // if user scrolls down - show scroll to top button
                if (topPos > 250) {
                    $(scrollTop).css("opacity", "1");
                } else {
                    $(scrollTop).css("opacity", "0");
                }
            });
            //Click event to scroll to top
            $(scrollTop).on("click", function() {
                $("html, body").animate({
                        scrollTop: 0,
                        easingType: "linear",
                    },
                    500
                );
                return false;
            });
        },

        stickyHeader: function(e) {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 150) {
                    $(".header--sticky").addClass("sticky");
                } else {
                    $(".header--sticky").removeClass("sticky");
                }
            });
        },

        magnificPopupActivation: function() {
            var yPopup = $(".video-play-button");
            if (yPopup.length) {
                yPopup.magnificPopup({
                    disableOn: 700,
                    type: "iframe",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    preloader: false,

                    fixedContentPos: false,
                });
            }
        },

        vedioActivation: function(e) {
            $("#play-video").on("click", function(e) {
                e.preventDefault();
                $("#video-overlay").addClass("open");
                $("#video-overlay").append(
                    '<iframe width="80%" height="80%" src="https://www.youtube.com/embed/7e90gBu4pas" frameborder="0" allowfullscreen></iframe>'
                );
            });

            $(".video-overlay, .video-overlay-close").on("click", function(e) {
                e.preventDefault();
                close_video();
            });

            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    close_video();
                }
            });

            function close_video() {
                $(".video-overlay.open").removeClass("open").find("iframe").remove();
            }
        },

        mobileMenuActive: function(e) {
            $(".humberger-menu").on("click", function(e) {
                e.preventDefault();
                $(".popup-mobile-menu").addClass("menu-open");
                imJs._html.css({
                    overflow: "hidden",
                });
            });

            $(
                ".close-menu-activation, .is-mobile-onepage.popup-mobile-menu .primary-menu .menu-item a:not(.external-link), .is-mobile-onepage.popup-mobile-menu .mainmenu-nav .menu-item a:not(.external-link)"
            ).on("click", function(e) {
                e.preventDefault();
                $(".popup-mobile-menu").removeClass("menu-open");
                $(".has-droupdown > a")
                    .removeClass("open")
                    .siblings(".submenu")
                    .removeClass("active")
                    .slideUp("400");
                imJs._html.css({
                    overflow: "",
                });
            });

            $(".popup-mobile-menu").on("click", function(e) {
                e.target === this && $(".popup-mobile-menu").removeClass("menu-open");
                imJs._html.css({
                    overflow: "",
                });
            });

            $(".popup-mobile-menu .menu-item-has-children > a").on(
                "click",
                function(e) {
                    e.preventDefault();
                    $(this)
                        .siblings(".sub-menu")
                        .toggleClass("active")
                        .slideToggle("400");
                    $(this).toggleClass("open");
                    imJs._html.css({
                        overflow: "",
                    });
                }
            );

            $(".nav-pills .nav-link").on("click", function(e) {
                $(".rn-popup-mobile-menu").removeClass("menu-open");
                imJs._html.css({
                    overflow: "",
                });
            });
        },
        awsActivation: function(e) {
            setTimeout(function() {
                AOS.init();
            }, 1000);
        },
    };
    imJs.m();

    // inbio all audio script below code

    $(document).ready(function() {
        // Function to play audio and handle playback issues
        function closePlayAudio(audioElement, callback) {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
                let playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        if (callback) {
                            callback();
                        }
                    }).catch(function(error) {
                        if (callback) {
                            callback();
                        }
                    });
                } else if (callback) {
                    callback();
                }
            } else if (callback) {
                callback();
            }
        }

        // Close button click event with audio playback
        $(".rbt-iv-close-button").click(function(e) {
            e.preventDefault();

            let closeButtonAudio = $("#rbt-close-button-audio")[0];

            closePlayAudio(closeButtonAudio, function() {
                setTimeout(function() {
                    $(".rbt-intro-video-card-wrapper").remove();
                }, 500);
            });
        });

        // Notification bar close button click event
        $(document).on('click', '.inbio-close-button', function(e) {
            $('.inbio-notification-bar').fadeOut();
        });
    });

    if (typeof RainbowObj !== 'undefined' && RainbowObj.intro_video_close_sound) {

        let closeSound = `<audio class="rbt-close-button-audio-modal"  preload="auto"><source src=${RainbowObj.intro_video_close_sound}" type="audio/mpeg"><source src="${RainbowObj.intro_video_close_sound}" type="audio/ogg"></audio>`;


        if ($(".modal-header .close,.inbio-close-button,.close-menu-activation").length > 0) {
            $(".modal-header .close,.inbio-close-button").each(function(index) {
                if (index === 0) {
                    $(this).after(closeSound);
                }
            });


            $(".modal-header .close,.inbio-close-button,.close-menu-activation").click(function(e) {
                let modalButtonAudio = $(".rbt-close-button-audio-modal")[0];
                modalButtonAudio.pause();
                modalButtonAudio.currentTime = 0;
                modalButtonAudio.play();

            });
        }
    }

    // mneu audio js
    Audio.prototype.play = (function(play) {
        return function() {
            var audio = this,
                args = arguments,
                promise = play.apply(audio, args);
            if (promise !== undefined) {
                promise.catch(_ => {});
            }
        };
    })(Audio.prototype.play);

    if (typeof RainbowObj !== 'undefined' && RainbowObj.inbio_menu_audio) {

        // Function to play audio
        function playNavMenu() {
            let navMenu = $(".rbt-nav-menu-button-audio")[0];
            if (navMenu) {
                navMenu.pause();
                navMenu.currentTime = 0;
                navMenu.play();
            }
        }

        // Create and insert the audio element dynamically after the first matching element
        let audioContainer = `<audio class="rbt-nav-menu-button-audio"  preload="auto">
    <source src="${RainbowObj.inbio_menu_audio}" type="audio/mpeg">
    <source src="${RainbowObj.inbio_menu_audio}" type="audio/ogg">
  </audio>`;

        $("#sideNav .primary-menu .menu-item a, .footer-area .description a").each(function(index) {
            if (index === 0) {
                $(this).after(audioContainer);
            }
        });

        // Ensure that the audio element is in the DOM before binding events

        if ($(".rbt-nav-menu-button-audio").length > 0) {
            $(".menu-item a, .copyright .description a, .footer-area > .description a, .inbio-enter-protected-password a, .elementor-button-wrapper .elementor-button, .woocommerce-LostPassword a").mouseenter(playNavMenu);
        }

    }

    if (typeof RainbowObj !== 'undefined' && RainbowObj.button_click_audio_sound) {
        // Create and insert the audio element dynamically
        let btnAudioContainer = `<audio class="rbt-button-audio" preload="auto">
      <source src="${RainbowObj.button_click_audio_sound}" type="audio/mpeg">
      <source src="${RainbowObj.button_click_audio_sound}" type="audio/ogg">
    </audio>`;

        // Insert the audio element after the first matching element
        const elementsToInsertAfter = '.rn-btn, .woocommerce-product-search .search-button, .cart .single_add_to_cart_button, .woocommerce-cart, .social-icone a, .post-like .like-button, .read-more-button, .inbio-protect-submit-button, .ajax_add_to_cart, .add_to_cart_button, .place-order .button';
        $(elementsToInsertAfter).each(function(index) {
            if (index === 0) {
                $(this).after(btnAudioContainer);
            }
        });

        if ($(".rbt-button-audio").length > 0) {
            let btnAudio = $(".rbt-button-audio")[0];

            // Function to play audio with handling for resetting currentTime
            function playAudio() {
                btnAudio.pause();
                btnAudio.currentTime = 0;
                let playPromise = btnAudio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(error) {
                        console.log('Error playing audio:', error.message);
                    });
                }
            }

            // Click event selectors
            const clickSelectors = '.rn-btn, .social-share li a, .rbt-mini-cart-wrap a, .return-to-shop .button, .woocommerce-product-search .search-button, .cart .single_add_to_cart_button, .woocommerce-message .button, .woocommerce-cart .button, .checkout-button, .social-icone a, .slick-arrow, .post-like .like-button, .read-more-button, .inbio-protect-submit-button, .ajax_add_to_cart, .add_to_cart_button, .place-order .button, #place_order, button[name="apply_coupon"], button[name="update_cart"], .woocommerce-MyAccount-navigation-link a, button[name="save_account_details"], button[name="save_address"], .woocommerce-Button.wc-forward, .woocommerce-form-login__submit, .woocommerce-form-register__submit, .slick-dots button, .carousel-control-prev, .carousel-control-next,.hamberger-menu';

            // Bind click event to play audio
            $(document).on('click', clickSelectors, function() {
                playAudio();
            });

            // Reset audio currentTime after it finishes playing
            btnAudio.addEventListener('ended', function() {
                btnAudio.currentTime = 0;
            });
        }
    }


    if (typeof RainbowObj !== 'undefined' && RainbowObj.tab_button_click_audio_sound) {

        let tabAudioContainer = `<audio class="rbt-tab-button-audio" preload="auto"><source src=${RainbowObj.tab_button_click_audio_sound}" type="audio/mpeg"><source src="${RainbowObj.tab_button_click_audio_sound}"  type="audio/ogg"></audio>`;
        // Iterate through each anchor element
        const tabElementsToInsertAfter = '.tab-navigation-button .nav-item a,.rn-resume-area .nav-item a,.post-pagination .page-numbers a,.slick-arrow';
        $(tabElementsToInsertAfter).each(function(index) {

            if (index === 0) {
                $(this).after(tabAudioContainer);
            }
        });

        if ($(".rbt-tab-button-audio").length > 0) {
            let tab_audio = $(".rbt-tab-button-audio")[0];

            function TabplayAudio() {
                tab_audio.pause();
                tab_audio.currentTime = 0;
                let playPromise = tab_audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(error) {
                        console.log('Error playing audio:', error.message);
                    });
                }
            }

            // Click event selectors
            const clickSelectorsTab = '.tab-navigation-button .nav-item a,.rn-resume-area .nav-item a,.inbio-protect-submit-button,.rn-custom-before-login-layout,.rn-pricing-area .nav-item a,.post-pagination .page-numbers a';

            // Bind click event to play audio
            $(document).on('click', clickSelectorsTab, function() {
                TabplayAudio();
            });

            // Reset audio currentTime after it finishes playing
            tab_audio.addEventListener('ended', function() {
                tab_audio.currentTime = 0;
            });
        }

    }

    if (typeof RainbowObj !== 'undefined' && RainbowObj.backtotop_click_audio_sound) {
        let preloaderSound = `<audio class="preloader-button-audio" preload="auto"><source src=${RainbowObj.backtotop_click_audio_sound}" type="audio/mpeg"><source src="${RainbowObj.backtotop_click_audio_sound}" type="audio/ogg"></audio>`;
        // Iterate through each anchor element
        $('.backto-top > div').each(function(index) {
            $(this).after(preloaderSound);
        });

        if ($(".preloader-button-audio").length > 0) {

            let preloaderAudio = $(".preloader-button-audio")[0];
            $(".backto-top > div").click(function() {
                preloaderAudio.pause();
                preloaderAudio.play();
            });
        }
    }



    function inbioAudioValueUpdated(event) {

        if (event.detail == 1 || event.detail == 0) {
            var updatedValue = event.detail;
        } else {
            var updatedValue = event; // This could be 'undefined' or the event object itself
        }

        let audioElements = document.getElementsByClassName('rbt-nav-menu-button-audio');
        let tabAudioElements = document.getElementsByClassName('rbt-tab-button-audio');
        let buttonAudio = document.getElementsByClassName('rbt-button-audio');
        let closeModalBtn = document.getElementsByClassName('rbt-close-button-audio-modal');
        let preloaderBtn = document.getElementsByClassName('preloader-button-audio');
        let VideoCloseBtn = document.getElementById('rbt-close-button-audio');

        // Check the updatedValue and control audio playback
        for (let i = 0; i < audioElements.length; i++) {
            let audio = audioElements[i];
            if (updatedValue == 0) {
                audio.muted = true; // Mute the audio
            } else {
                audio.muted = false; // Unmute the audio
            }
        }

        // Check the updatedValue and control audio playback
        for (let i = 0; i < tabAudioElements.length; i++) {
            let tabaudio = tabAudioElements[i];
            if (updatedValue == 0) {
                tabaudio.muted = true; // Mute the audio
            } else {
                tabaudio.muted = false; // Unmute the audio
            }
        }

        for (let i = 0; i < buttonAudio.length; i++) {
            let allButtonAudio = buttonAudio[i];
            if (updatedValue == 0) {
                allButtonAudio.muted = true; // Mute the audio
            } else {
                allButtonAudio.muted = false; // Unmute the audio
            }
        }

        for (let i = 0; i < closeModalBtn.length; i++) {
            let closeaudio = closeModalBtn[i];
            if (updatedValue == 0) {
                closeaudio.muted = true; // Mute the audio
            } else {
                closeaudio.muted = false; // Unmute the audio
            }
        }

        if ($('#rbt-close-button-audio').length > 0) {

            if (updatedValue == 0) {
                VideoCloseBtn.muted = true; // Mute the audio

            } else {
                VideoCloseBtn.muted = false; // Unmute the audio
            }

        }

        for (let i = 0; i < preloaderBtn.length; i++) {
            let preloaderAudio = preloaderBtn[i];
            if (updatedValue == 0) {
                preloaderAudio.muted = true; // Mute the audio
            } else {
                preloaderAudio.muted = false; // Unmute the audio
            }
        }

        if ($('.inbio-volume-change').length > 0) {

            if (updatedValue == 0) {
                $('.inbio-volume-change').removeClass('feather-volume-2');
                $('.inbio-volume-change').addClass('feather-volume-x');
            } else {
                $('.inbio-volume-change').addClass('feather-volume-2');
                $('.inbio-volume-change').removeClass('feather-volume-x');
            }

        }

    }

    let ajaxreload_value = RainbowObj.inbio_audio_sound_active;
    let reduxSoundEnable = RainbowObj.rainbow_enable_audio_sound;


    if (reduxSoundEnable == 'yes' && ajaxreload_value == 1) {
        let reduxResult = (reduxSoundEnable === 'yes') ? 1 : 0;
        inbioAudioValueUpdated(reduxResult);

    } else if (reduxSoundEnable === 'yes' && ajaxreload_value == 0 && ajaxreload_value !== '') {
        inbioAudioValueUpdated(0);
    } else if (reduxSoundEnable == 'yes') {
        let reduxResult = (reduxSoundEnable === 'yes') ? 1 : 0;
        inbioAudioValueUpdated(reduxResult);
    } else {
        inbioAudioValueUpdated(0);
    }

    //Listen for the custom event
    window.addEventListener('valueUpdated', inbioAudioValueUpdated);


})(jQuery, window);