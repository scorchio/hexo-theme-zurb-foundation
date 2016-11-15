'use strict';

var url = require('url');
var sizeOf = require('image-size');
var fs = require('hexo-fs');

var hexo = hexo || {};
var asset_path = hexo.extend.tag.env.extensions.asset_path.fn;

hexo.extend.tag.register('responsive_image', function (args) {

    var PostAsset = hexo.model('PostAsset');

    function assetPath(id, slug) {
        if (!slug) return;

        var asset = PostAsset.findOne({post: id, slug: slug});
        if (!asset) return;

        return asset.path;
    }

    var slug = args.shift();
    if (!slug) return;

    var slug_mini = args.shift();
    if (!slug_mini) return;

    var alt = args.shift() || "";
    var lightbox = args.shift() || true;

    var asset_original = this.asset_dir + slug;
    var asset_normal = assetPath(this._id, slug);
    var asset_normal_url = url.resolve(hexo.config.root, asset_normal);
    var asset_thumb_url = url.resolve(hexo.config.root, assetPath(this._id, slug_mini));

    var dimensions = sizeOf(asset_original);

    return '<a class="img-a-lightbox" ' +
        'href="' + asset_normal_url +
        '" data-size="' +  dimensions.width+ 'x' + dimensions.height +
        '"><img src="' + asset_thumb_url + '" alt="' + alt + '"/></a>';
});