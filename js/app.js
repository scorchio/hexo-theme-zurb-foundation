$(document).foundation();

$(document).ready(function() {
    // Photoswipe initialization
    var $pswp = $('.pswp')[0];
    var image = [];

    const IMG_LINK_SELECTOR = 'a.img-a-lightbox';

    var getItems = function() {
        var items = [];
        $(IMG_LINK_SELECTOR).each(function(index) {
            $(this).data('itemindex', index);
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

    $('.article-main').on('click', IMG_LINK_SELECTOR, function(event) {
        event.preventDefault();

        var $index = $(this).data('itemindex');
        var options = {
            index: $index,
            bgOpacity: 0.7,
            showHideOpacity: true
        };

        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        lightBox.init();
    });

    var client = algoliasearch('2ILC8NZH7T', 'c33e2a02105ba1b5f531d2f7ef32e6da');
    var index = client.initIndex('scorchioblog_content');
    $('#searchbox').autocomplete({ hint: false }, [
        {
            source: $.fn.autocomplete.sources.hits(index, { hitsPerPage: 10 }),
            displayKey: 'title',
            templates: {
                suggestion: function(suggestion) {
                    return suggestion._highlightResult.title.value;
                }
            }
        }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
        window.location.href = suggestion.path;
    });
});
