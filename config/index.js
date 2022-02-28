'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

      '/api/airGis':{
        // target: 'http://10.0.205.156:8080/',
        target: 'http://10.0.205.231:8900/',
        // target: 'http://39.97.239.112:8426/',
        changeOrigin:true,
        pathRewrite:{
          '^/api/airGis': ''
        }
      },
      '/gis/': {
        target: 'http://10.0.200.201:8213/',
        changeOrigin: true,
        pathRewrite: {
          '^/gis/': ''
        }
      },
      '/api/': {
        // target: 'http://10.0.200.108:8098/',
     target: 'http://10.0.200.90:8098/',
        // target: 'http://10.0.200.61:6298', 
        // target: 'http://121.17.30.65:8098/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      },

      '/front/':{
        target: 'http://39.97.239.112:9001/',
        changeOrigin: true,
        pathRewrite: {
          '^/front/': ''
        }
      },
      '/loginApi/waterdiagnosis':{
        target: 'http://10.0.200.120:8905/',
        changeOrigin:true,
        pathRewrite:{
          '^/loginApi/waterdiagnosis/': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
