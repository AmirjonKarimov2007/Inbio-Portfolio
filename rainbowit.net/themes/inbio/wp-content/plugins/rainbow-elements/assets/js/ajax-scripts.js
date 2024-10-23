(function($) {
    "use strict";

    // var $document = $(document),
    //     $ajax_nonce = rainbow_portfolio_ajax.ajax_nonce,
    //     $rainbow_ajax_url = rainbow_portfolio_ajax.ajax_url;


    // Ajax Call
    /**
     * setTime
     * @returns {number}
     */
    function setTime() {
        return 100;
    }

    /**
     * showTextLoading
     * @param selector
     */
    function showTextLoading(selector) {
        $('' + selector + '').addClass('text-loading');
        $('' + selector + '').addClass('disabled');
    }

    /**
     * hideTextLoading
     * @param selector
     */
    function hideTextLoading(selector) {
        $('' + selector + '').removeClass('text-loading');
        $('' + selector + '').removeClass('disabled');
    }

    /*inbio password protected ajax code*/


    jQuery(function($) {
        const settings = window.bioShortcodeData;

        $('.inbio-password-protected').on('click', function() {
            $(this).parent().find('.inbio-protected-content-main-wrapper').addClass('inbio-protected-from-opend');
            $(this).parent().find('.portfolio-password-protected-field').addClass('inbio-protected-lock-closed');
            $(this).parent().find('.portfolio-password-protected-field').hide();
            $(this).parent().find('.inbio-password-protected-inner-content').empty().hide();


        });

        function init() {
            $('.inbio-portfolio-password').on('submit', function(e) {
                e.preventDefault();

                const form = this;
                var passwordInput = $(form).find('.userpass').val();
                var protectedData = $(this).attr('data-protectedpass');
                var parsedData = JSON.parse(protectedData);

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


    // audio sound effect on/off

    $('#inbio-audio-label').on('click', function(e) {
        e.preventDefault();

        // Toggle the checkbox state
        var isChecked = $('#inbio-audio-toggle').prop('checked');
        $('#inbio-audio-toggle').prop('checked', !isChecked);


        var audioEnable = $('#inbio-audio-toggle').prop('checked') ? 1 : 0;

        // Get the updated state

        // AJAX request to save state
        $.ajax({
            type: 'POST',
            url: inbio_ajax_obj_global.ajaxUrl,
            data: {
                action: 'inbio_save_audio_toggle_state',
                nonce: inbio_ajax_obj_global.nonce,
                audioStatus: audioEnable
            },
            success: function(response) {
                // Trigger a custom event
                var event = new CustomEvent('valueUpdated', {
                    detail: audioEnable
                });
                window.dispatchEvent(event);
                if (audioEnable == 0) {
                    $('.inbio-volume-change').removeClass('feather-volume-1');
                    $('.inbio-volume-change').addClass('feather-volume-x');
                } else {
                    $('.inbio-volume-change').addClass('feather-volume-1');
                    $('.inbio-volume-change').removeClass('feather-volume-x');
                }
            },
            error: function(error) {

            }
        });
    });


    // notification bar reload after 3 second

    document.addEventListener('DOMContentLoaded', function() {

        let showTimeout;

        function showNotificationBar() {
            const notificationBar = document.getElementById('inbio-notification-bar');
            if (notificationBar) {
                notificationBar.classList.remove('notificationbar-hidden');
                notificationBar.classList.add('visible');
            }
        }

        if (showTimeout) {
            clearTimeout(showTimeout);
        }
        showTimeout = setTimeout(showNotificationBar, inbio_ajax_obj_global.notice_bar_show_display_time);
    });



    const notificationBar = document.getElementById("inbio-notification-bar");
    let initialX, initialY;

    notificationBar.addEventListener('mousedown', function(event) {
        initialX = event.clientX - notificationBar.offsetLeft;
        initialY = event.clientY - notificationBar.offsetTop;
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDragging);
    });

    function moveElement(event) {
        notificationBar.style.left = `${event.clientX - initialX}px`;
        notificationBar.style.top = `${event.clientY - initialY}px`;
    }

    function stopDragging() {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDragging);
    }

}(jQuery));