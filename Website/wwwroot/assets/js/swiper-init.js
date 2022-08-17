// Params
var sliderSelector = '.swiper-container',
    options = {
        init: false,
        loop: true,
        speed: 800,
        slidesPerView: 'auto', // or 'auto'
        // spaceBetween: 10,
        centeredSlides: true,
        effect: 'cards', // 'cards','cube', 'fade', 'coverflow',
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        },
        // Events
        on: {
            imagesReady: function () {
                this.el.classList.remove('loading');
            }
        }
    };
var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();

//let portfolio = $('.portfolio-info');
//if (portfolio) {
//    $(portfolio).magnificPopup({
//        delegate: 'a', // child items selector, by clicking on it popup will open
//        type: 'image'
//        // other options
//    });
//}