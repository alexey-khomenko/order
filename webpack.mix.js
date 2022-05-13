let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');

const styles = [
  'base',
  'fonts',
  'normalize',
  'layouts/default',
];
const scripts = [
  'base',
];

mix
  .setPublicPath('docs')
  .setResourceRoot('../')
  .copyDirectory('resources/images/*.*', 'docs/images')
  .copyDirectory('resources/favicons/*.*', 'docs/favicons')
  .copyDirectory('resources/fonts/*.*', 'docs/fonts')
  .pug('resources/views/pages/*.pug', 'docs', {
    //excludePath: 'resources/views/pages',
    excludePath: 'C:\\Users\\admin\\WebProjects\\order\\resources\\views\\pages',
    pug: {
      pretty: true,
    },
  })
;

for (let style of styles) {
  mix.sass(`resources/styles/${style}.scss`, `css/${style}.css`);
}

for (let script of scripts) {
  mix.copy(`resources/scripts/${script}.js`, `docs/js/${script}.js`);
}

if (!mix.inProduction()) {
  mix
    .browserSync({
      server: './docs',
      files: [
        'resources/**/*.*',
      ],
    })
  ;
}