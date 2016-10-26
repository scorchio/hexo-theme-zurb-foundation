'use strict';

var asset_path = require('../../../node_modules/hexo/lib/plugins/tag/asset_path');
asset_path = asset_path(hexo);

hexo.extend.tag.register('responsive_image', function (slug, alt, lightbox) {
    /*
    * <a class="img-a-lightbox" href="{% asset_path ABoldogsagMintVersenyelony.jpg %}" data-size="450x600">
    *     {% asset_img ABoldogsagMintVersenyelony-responsive-mini-256.jpg A boldogság, mint versenyelőny %}
    * </a>

    */
    alt = alt || "";
    lightbox = lightbox || true;
    var result = '<a class="img-a-lightbox" href="' + asset_path(slug) + '</a>';
    return result;
});