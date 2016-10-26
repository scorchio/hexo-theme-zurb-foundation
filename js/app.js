$(document).foundation();

// Photoswipe initialization
var $pswp = $('.pswp')[0];
var image = [];

var getItems = function() {
        var items = [];
        $('a.img-a-lightbox').each(function() {
            var $href   = $(this).attr('href'),
                $size   = $(this).data('size').split('x'),
                $width  = $size[0],
                $height = $size[1],
                $caption = $(this).find('img').attr('alt');

            var item = {
                src : $href,
                w   : $width,
                h   : $height,
                title: $caption
            };

            items.push(item);
        });
        return items;
    };

var items = getItems();

$.each(items, function(index, value) {
    image[index]     = new Image();
    image[index].src = value['src'];
});

$('.article-main').on('click', 'a.img-a-lightbox', function(event) {
    event.preventDefault();

    var $index = $(this).index();
    var options = {
        index: $index,
        bgOpacity: 0.7,
        showHideOpacity: true
    };

    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
    lightBox.init();
});
