'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],
    sassOptions: {
      extension: 'scss'
    },

    // todo: figure out how to auto include these paths from nypr-icons addon?
    svgJar: {
      sourceDirs: [
        'public',
        'tests/dummy/public/assets/images/',
        'node_modules/nypr-icons/public',
      ],
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('node_modules/normalize.css/normalize.css');

  return app.toTree();
};
