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


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Popup chi tiết sản phẩm
    $(document).ready(function () {
        $('.product-card').on('click', function () {
            var name = $(this).data('name');
            var img = $(this).data('img');
            var price = $(this).data('price');
            var content = $(this).data('content');
            $('#productDetailModalLabel').text(name);
            $('#productDetailImg').attr('src', img).attr('alt', name);
            $('#productDetailPrice').text(price);
            $('#productDetailContent').html(content);
            $('#productDetailModal').modal('show');
        });
        $('#productDetailBuyBtn').on('click', function () {
            alert('Chức năng mua hàng sẽ sớm ra mắt!');
            // window.location.href = 'checkout.html';
        });
    });

})(jQuery);

