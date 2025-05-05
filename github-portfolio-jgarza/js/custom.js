// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

        $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop();
            var pageBottom = $(document).height() - $(window).height();
        
            sections.each(function (index, section) {
                var top = $(section).offset().top - nav_height;
                var bottom = top + $(section).outerHeight();
        
                // If we're near the bottom, force the last section active
                if (cur_pos + 50 >= pageBottom && index === sections.length - 1) {
                    nav.find('a').removeClass('active');
                    sections.removeClass('active');
        
                    $(section).addClass('active');
                    nav.find('a[href="#' + $(section).attr('id') + '"]').addClass('active');
                    return;
                }
        
                if (cur_pos >= top && cur_pos <= bottom) {
                    nav.find('a').removeClass('active');
                    sections.removeClass('active');
        
                    $(section).addClass('active');
                    nav.find('a[href="#' + $(section).attr('id') + '"]').addClass('active');
                }
            });
        });

nav.find('a').on('click', function () {
    var $el = $(this),
        id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height + 2
    }, 600);

    // 🔄 Trigger scroll check after animation ends
    setTimeout(() => $(window).trigger('scroll'), 620);

    return false;
});
// Show scroll cue only if no scroll after 5 seconds
setTimeout(function () {
    if (window.scrollY === 0) {
      document.getElementById('scroll-cue').style.display = 'block';
    }
  }, 5000);
  
  // Hide cue when user scrolls
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      var cue = document.getElementById('scroll-cue');
      if (cue) cue.style.display = 'none';
    }
  });
    // Dark/Light Mode Functionality
    $('#mode-toggle').on('change', function () {
        $('body').toggleClass('dark-mode');
        localStorage.setItem('darkMode', $('body').hasClass('dark-mode'));
    });

    // Load saved mode on page load
    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
        $('#mode-toggle').prop('checked', true);
    }

    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });
    // Alternate .section backgrounds across all pages
    $('.section').each(function (index) {
        if (index % 2 !== 0) {
        $(this).addClass('alt');
        }
    });

    $('.section').each(function (index) {
        if (index % 2 !== 0) {
          $(this).addClass('alt');
        }
      });

    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });
// Show back-to-top button when scrolled down
window.addEventListener('scroll', function () {
    var backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  // Custom smooth scroll to top (slower)
document.getElementById('backToTop').addEventListener('click', function (e) {
    e.preventDefault();
    let currentPosition = window.scrollY;
    const scrollSpeed = 100; // smaller = slower
    const scrollStep = () => {
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition);
        currentPosition -= scrollSpeed;
        requestAnimationFrame(scrollStep);
      }
    };
    scrollStep();
  });
    //animatedModal
    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});