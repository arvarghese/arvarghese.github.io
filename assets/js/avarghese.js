var AV = {
    initialize: function () {
        AV.loadEvents();
    },
    loadEvents: function () {
        AV.loadNavEvents();
        AV.loadVREvents();
        AV.loadKeyboardEvents();
        $('.page-wrap').removeClass('loading');
        AV.loadBGEvents();
        console.info('All events loaded.');
    },
    loadInitialBG: function () {
        var imgUrl = 'assets/img/bg/puertorico.jpg';
        var bgUrl = "url('" + imgUrl + "')";
        var bgImg = new Image();
        bgImg.onload = function () {
            $('.page-wrap>.bg-img').css('background-image', bgUrl);
            $('.page-wrap>.bg-img').removeClass('loading');
        };
        bgImg.src = imgUrl;
    },
    loadKeyboardEvents: function () {
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 27:
                    if ($('nav').hasClass('nav-open')) {
                        $('.nav-btn').click();
                    }
                    break;
                case 8:
                    if ($('nav').hasClass('nav-open')) {
                        $('.nav-btn').click();
                    }
                    else if ($('.bg-vr').hasClass('bg-vr-visible')) {
                        $('.vr-btn').click();
                    }
                    break;
                case 32:
                    $('.nav-btn').click();
                    break;
            }
        };
    },
    loadVREvents: function () {
        $('.vr-btn').click(function () {
            $('.vr-btn').toggleClass('vr-close');
            $('.vr-btn>.vr-icon>.close-btn,.vr-btn>.vr-icon>.open-btn').addClass('animated bounceIn');
            $('.bg-vr').toggleClass('bg-vr-visible');
            if ($('.vr-btn').hasClass('vr-close')) {
                $('.vr-drag-demo').addClass('demo');
            }
            else {
                $('.vr-drag-demo').removeClass('demo');
            }
        });
        $('.vr-drag-demo').click(function () {
            $('.vr-drag-demo').removeClass('demo');
        });
    },
    loadScrollEvents: function () {
        $('body').bind('mousewheel DOMMouseScroll', function (e) {
            var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
            var conditions = delta < 0 && !$('.nav').hasClass('nav-open') && ($('.page-wrap>.content')[0].scrollHeight - $('.page-wrap>.content').scrollTop() === $('.page-wrap>.content').outerHeight());
            if (conditions) {
                $('.nav-btn').click();
            }
        });
    },
    loadBGEvents: function () {
        $('.shuffle-bg-btn').click(function () {
            AV.loadNextBg();
        });
        setInterval(function () {
            AV.loadNextBg();
        }, 20000);
        AV.loadInitialBG();
    },
    loadNextBg: function () {
        var imgUrl = AV.bgImgList[~~(Math.random() * AV.bgImgList.length)];
        var bgUrl = "url('" + imgUrl + "')";
        if ($('.shuffle-bg-btn').css('display') === 'none') {
            return;
        }
        if ($('.page-wrap>.bg-img').attr('src') === imgUrl) {
            return;
        }
        $('.shuffle-bg-btn').hide();
        var bgImg = new Image();
        bgImg.onload = function () {
            $('.page-wrap>.bg-img').css('background-image', bgUrl);
            $('.shuffle-bg-btn').show();
        };
        bgImg.src = imgUrl;
    },
    loadNavEvents: function () {
        $('.nav-btn,.nav-menu-item>.content>a,.nav-menu-grid').click(function () {
            if ($('.bg-vr').hasClass('bg-vr-visible')) {
                $('.vr-btn').click();
            }
            $('.nav-btn').toggleClass('nav-close');
            $('.nav-btn>.nav-icon>.close-btn,.nav-btn>.nav-icon>.open-btn').addClass('animated bounceIn');
            $('nav').toggleClass('nav-open');
            $('.page-wrap').toggleClass('page-wrap-disable');
            $('.page-wrap>.content').toggleClass('content-hidden');
        });
        $('.nav-menu-item').on('mousemove', AV.panImage);
        $('.open-nav-btn').click(function () {
            if ($('.bg-vr').hasClass('bg-vr-visible')) {
                $('.vr-btn').click();
            }
            $('.nav-btn').click();
        });
    },
    panImage: function (e) {
        var item = e.target.parentNode;
        $(item).children('.bg-img').css({
            'transform-origin': ((e.pageX - $(item).offset().left) / $(item).width()) * 100 + "% " + ((e.pageY - $(item).offset().top) / $(item).height()) * 100 + "%"
        });
    },
    bgImgList: [
        'assets/img/bg/muaythai.jpg',
        'assets/img/bg/phangngabay.jpg',
        'assets/img/bg/chicago.jpg',
        'assets/img/bg/colorado.jpg',
        'assets/img/bg/costarica.jpg',
        'assets/img/bg/denver.jpg',
        'assets/img/bg/eastcoastbeach.jpg',
        'assets/img/bg/parcguell.jpg',
        'assets/img/bg/phuket.jpg',
        'assets/img/bg/positano.jpg',
        'assets/img/bg/puertorico.jpg',
        'assets/img/bg/rome.jpg',
        'assets/img/bg/magicmountain.jpg',
        'assets/img/bg/manava.jpg',
        'assets/img/bg/moorea.jpg',
        'assets/img/bg/moorealagoon.jpg',
        'assets/img/bg/moorearestaurant.jpg',
        'assets/img/bg/twobays.jpg',
        'assets/img/bg/santhiya.jpg',
        'assets/img/bg/sanfrancisco.jpg',
        'assets/img/bg/segovialedge.jpg'
    ],
    vrImgList: [
        'assets/img/vr/example.jpg'
    ]
};
