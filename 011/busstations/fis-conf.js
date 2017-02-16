// ¼Ó md5
fis.match('*.{js,css,png,jpg}', {
    useHash: false,
});

// ÆôÓÃ fis-spriter-csssprites ²å¼þ
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});

// ¶Ô CSS ½øÐÐÍ¼Æ¬ºÏ²¢
fis.match('*.css', {
    // ¸øÆ¥Åäµ½µÄÎÄ¼þ·ÖÅäÊôÐÔ `useSprite`
    useSprite: true
});

fis.match('*^[min].js', {
    // fis-optimizer-uglify-js ²å¼þ½øÐÐÑ¹Ëõ£¬ÒÑÄÚÖÃ
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css ²å¼þ½øÐÐÑ¹Ëõ£¬ÒÑÄÚÖÃ
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor ²å¼þ½øÐÐÑ¹Ëõ£¬ÒÑÄÚÖÃ
    optimizer: fis.plugin('png-compressor')
});

fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
}) 

fis.match('*.less', {
  // fis-parser-less 插件进行解析
  parser: fis.plugin('less'),
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
})