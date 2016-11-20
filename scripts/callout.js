'use strict';

var hexo = hexo || {};

var callout = function (args, content) {
    var typeClass = args.shift();
    if (!typeClass) return;
    return '<div class="callout ' + typeClass + '">' + hexo.render.renderSync({text: content, engine: 'markdown'}) + '</div>';
};

hexo.extend.tag.register('callout', callout, true);