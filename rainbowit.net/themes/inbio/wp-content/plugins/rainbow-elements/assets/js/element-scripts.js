(function($) {
    "use strict";

    var $document = $(document),
        $window = $(window),
        isEditMode = false;


    /**
     * Portfolio Filter Options
     * @param $scope
     * @param $
     * @constructor
     */
    var PortfolioFilter = function($scope, $) {
        var rn_portfolio_area = $scope.find('.rn-portfolio-area').eq(0);
        var uniq_id = rn_portfolio_area.attr('id');

        $('#' + uniq_id).imagesLoaded(function() {
            // filter items on button click
            $('#' + uniq_id + ' .messonry-button').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            // init Isotope
            var $grid = $('#' + uniq_id + ' .rn-filterable-portfolios').isotope({
                itemSelector: '.rn-filterable-portfolio-item',
                percentPosition: true,
                transitionDuration: '0.7s',
                layoutMode: 'fitRows',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.rn-filterable-portfolio-item',
                }
            });
        });



        $('#' + uniq_id + ' .messonry-button button').on('click', function(event) {
            $(this).siblings('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            event.preventDefault();
        });
    }


    var PortfolioFilterSlider = function($scope, $) {


        var rn_portfolio_area = $scope.find('.portfolio-style-three').eq(0);
        var uniq_id = rn_portfolio_area.attr('id');

        var SlickCarousel = $('#' + uniq_id);
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

    }


    var portfolio_ajax = function($scope, $) {

        var rn_portfolio_area = $scope.find('.rn-portfolio-area').eq(0);
        var uniq_id = rn_portfolio_area.attr('id');
        $('#' + uniq_id).imagesLoaded(function() {

            jQuery(function($) {
                const settings = window.bioShortcodeData;

                $('.inbio-password-protected').on('click', function() {
                    $(this).parent().find('.inbio-protected-content-main-wrapper').addClass('inbio-protected-from-opend');
                    $(this).parent().find('.portfolio-password-protected-field').addClass('inbio-protected-lock-closed');
                    $(this).parent().find('.portfolio-password-protected-field').hide();

                });

                function init() {
                    $('.inbio-portfolio-password').on('submit', function(e) {
                        e.preventDefault();

                        const form = this;
                        var protectedData = $(this).attr('data-protectedpass');
                        var parsedData = JSON.parse(protectedData);
                        var passwordInput = $(form).find('.userpass').val();

                        var postId = parsedData.post_id;
                        var thumbnail_size = parsedData.thumbnail_size;
                        var meta_display = parsedData.meta_display;
                        var projects_meta_display = parsedData.projects_meta_display;
                        var like_text = parsedData.like_text;
                        var like_this_txt = parsedData.like_this_txt;
                        var button_text = parsedData.button_text;
                        var modal_button_txt = parsedData.modal_button_txt;
                        var project_cat_display = parsedData.project_cat_display;
                        var modal_popup_display = parsedData.modal_popup_display;
                        var layout_style = parsedData.layout_style;


                        $.post({
                            url: settings['endpoint'],
                            data: {
                                'action': settings['action'],
                                'bio-post-id': postId,
                                'nonce': settings['nonce'],
                                'password': passwordInput,
                                thumbnail_size,
                                meta_display,
                                projects_meta_display,
                                like_text,
                                like_this_txt,
                                button_text,
                                modal_button_txt,
                                project_cat_display,
                                modal_popup_display,
                                layout_style
                            },
                            cache: false,
                            crossDomain: true,
                            success: function(data) {
                                if (!data.status) {
                                    $('.inbio-errorPWdata')
                                        .empty()
                                        .append(data.message);


                                    return;
                                }

                                if (data.isValidPassword) {
                                    var expirationDate = new Date();
                                    expirationDate.setDate(expirationDate.getDate() + 2); // Cookie will expire in 7 days

                                    document.cookie = "userpass=" + encodeURIComponent(passwordInput) + "; path=/";
                                    document.cookie = "postId=" + encodeURIComponent(postId) + "; path=/";
                                    localStorage.setItem('protectedContent_' + postId, data.content);

                                    $('.rn-portfolio-custom-' + postId).removeClass('rn-custom-before-login-layout');

                                } else {
                                    $('.rn-portfolio-custom-' + postId + " " + '.inbio-errorPWdata').html("Invalid Password");
                                }

                                if (data.isValidPassword == true) {
                                    $('.rn-portfolio-custom-' + postId).html(data.content);
                                }


                                init();
                            },
                            error: function() {
                                console.log("Server error");
                            }
                        });

                    })
                }

                init();

                $(document).ready(function() {
                    // Iterate through all keys in localStorage

                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);

                        if (key.startsWith('protectedContent_')) {
                            const postId = key.replace('protectedContent_', '');

                            const protectedContent = localStorage.getItem(key);

                            // Update the HTML content for the corresponding post
                            $('.rn-portfolio-custom-' + postId).html(protectedContent);
                            $('.rn-portfolio-custom-' + postId).removeClass('rn-custom-before-login-layout');
                        }
                    }
                });
            });
        });
    }


    // Init 
    $(window).on('elementor/frontend/init', function() {
        if (elementorFrontend.isEditMode()) {
            isEditMode = true;
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/rainbow-portfolio-grid.default', PortfolioFilter);

        if (elementorFrontend.isEditMode()) {
            elementorFrontend.hooks.addAction('frontend/element_ready/rainbow-portfolio-grid.default', PortfolioFilterSlider);
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/rainbow-portfolio-grid.default', portfolio_ajax);
    });


}(jQuery));