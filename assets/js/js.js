// Hi.

var WP = WP || {};

WP.cosmetics = {
    init: function () {
        var weiPreload = new Image();
        weiPreload.src = '/w/assets/images/wei-outline.svg';

        $(function () {
            var wei = $('#wei');
            var weiOutline = $('#wei-outline');

            wei.mouseenter(function () {
                wei.fadeOut(250);
                weiOutline.fadeIn(250);
                weiOutline.css('display', 'block');
            });

            weiOutline.mouseleave(function () {
                weiOutline.fadeOut(250);
                wei.fadeIn(250);
            });

            var topPrev = $('#top-prev');
            var topNext = $('#top-next');
            var left = $('.side-nav-left');
            var right = $('.side-nav-right');
            var leftDiv = $('.side-nav-left div');
            var rightDiv = $('.side-nav-right div');

            // Change property of cssElement to value when hovering
            // over hoverElement
            function linkHoverStates(hoverElement, cssElement, property, value) {
                hoverElement.mouseenter(function () {
                    cssElement.css(property, value);
                });

                hoverElement.mouseleave(function () {
                    cssElement.css(property, '');
                })
            }

            linkHoverStates(topPrev, leftDiv, 'border-right', '1px solid #07f');
            linkHoverStates(topPrev, leftDiv, 'background', 'white');

            linkHoverStates(topNext, rightDiv, 'border-left', '1px solid #07f');
            linkHoverStates(topNext, rightDiv, 'background', 'white');

            linkHoverStates(left, topPrev, 'color', '#07f');
            linkHoverStates(right, topNext, 'color', '#07f');

            if ($('.side-nav span').is(':visible')) {
                $('.side-nav span').hide().delay(500).fadeIn(1000);
            }

            $('img.lazy').lazyload({
                effect: 'fadeIn'
            });
        });
    }
};

WP.cosmetics.init();
