(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    // Bit-Chats video controls (custom)
    var $bitVideo = $('#bitchats-video');
    if ($bitVideo.length) {
        var bitVideo = $bitVideo.get(0);
    var $playBtn = $('#video-playpause');
    var $seek = $('#video-seek');

        // When metadata loaded, set seek max to duration
        $bitVideo.on('loadedmetadata', function () {
            try { $seek.attr('max', Math.floor(bitVideo.duration)); } catch (e) {}
        });

        // Update slider as video plays
        $bitVideo.on('timeupdate', function () {
            try { $seek.val(Math.floor(bitVideo.currentTime)); } catch (e) {}
        });

        // Play/pause button
        $playBtn.on('click', function () {
            if (bitVideo.paused) { bitVideo.play(); $(this).text('Pause'); }
            else { bitVideo.pause(); $(this).text('Play'); }
        });

        // Seek when slider moved
        $seek.on('input change', function () {
            try { bitVideo.currentTime = Number($(this).val()); } catch (e) {}
        });


        // Auto-play when the Bit-Chats project card becomes visible in viewport
        var wrapperEl = $bitVideo.closest('.video-wrapper').get(0);
        function tryPlay() {
            try {
                var p = bitVideo.play();
                if (p && p.then) p.catch(function () { /* ignore play rejection */ });
            } catch (e) { }
        }
        function tryPause() {
            try { bitVideo.pause(); } catch (e) { }
        }

        if (wrapperEl && 'IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        tryPlay();
                    } else {
                        tryPause();
                    }
                });
            }, { threshold: [0.5] });
            io.observe(wrapperEl);
        } else {
            // Fallback: check visibility on scroll/resize/load
            function checkVisibility() {
                if (!wrapperEl) return;
                var rect = wrapperEl.getBoundingClientRect();
                var vh = window.innerHeight || document.documentElement.clientHeight;
                var visible = rect.top < vh * 0.75 && rect.bottom > vh * 0.25;
                if (visible) tryPlay(); else tryPause();
            }
            $(window).on('scroll resize load', checkVisibility);
            checkVisibility();
        }

        // Sync button text on play/pause events
        $bitVideo.on('play', function () { $playBtn.text('Pause'); });
        $bitVideo.on('pause', function () { $playBtn.text('Play'); });
    }

    
})(jQuery);

