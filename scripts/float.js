'use strict';

var hexo = hexo || {};

var float = function (args, content) {
    var direction = args.shift();
    if (!direction) return;
    return '<div class="float float-' + direction + '">' + hexo.render.renderSync({text: content, engine: 'markdown'}) + '</div>';
};

hexo.extend.tag.register('float', float, true);
