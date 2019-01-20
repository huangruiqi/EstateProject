'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// //mook数据
// const express = require('express');
// const app = express();

// //获取guide的内容
// let guide = require('../static/guide.json');
// let imgBack = guide.imgBack;
// let imgLogo = guide.imgLogo;
// let word = guide.word;

// //获取Index内容
// let index = require('../static/index.json');
// let imgIndexBack = index.imgIndexBack;
// let imgProject = index.imgProject;

// //获取激活模块
// let moduleIndex = require('../static/module.json').moduleIndex;

// //获取项目介绍
// let project = require('../static/project.json');
// // let imgProjectBack = project.imgProjectBack;
// // let projectWord = project.word;
// // let project3D = project.project3D;
// // let back = project.back;

// //leftNav大的公共模块
// let appData = require('../static/data.json')
// let LeftNav = appData.LeftNav
// // let HouseTypeleftNav = appData.HouseTypeleftNav

// //企业简介数据
// let enterprise = require('../static/enterprise.json')

// //品牌荣誉
// let honor = require('../static/honor.json')

// //发展历程
// let develop = require('../static/develop.json')

// //企业文化
// let culture = require('../static/culture.json')

// //获取户型的地址
// let house = require('../static/house.json');
// let dataAll = house.data;

// //获取周边
// let near = require('../static/nearBy.json');

// let apiRoutes = express.Router();//定义router

// app.use('/api',apiRoutes)//定义域名下的访问路径

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
    //   app.all('*', (req, res, next) => {
    //     var origin = req.headers.origin;
    //     res.header('Access-Control-Allow-Origin', origin);
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    //     next()
    //   });
    //   app.get('/api/guide', function (req, res) {
    //     res.json({
    //       imgBack: imgBack,
    //       imgLogo: imgLogo,
    //       word: word
    //     });
    //   });
    //   app.get('/api/index', function (req, res) {
    //     res.json({
    //       imgIndexBack: imgIndexBack,
    //       imgProject: imgProject
    //     });
    //   });
    //   app.get('/api/module', function (req, res) {
    //     res.json({
    //       moduleIndex: moduleIndex
    //     });
    //   });
    //   app.get('/api/project', function (req, res) {
    //     res.json({
    //       // imgProjectBack: imgProjectBack,
    //       // projectWord: projectWord,
    //       project: project,
    //       // project3D: project3D,
    //       // back: back
    //     });
    //   });
    //   app.get('/api/leftNav', function (req, res) {
    //     res.json({
    //       LeftNav: LeftNav,
    //       enterprise: enterprise
    //       // HouseTypeleftNav: HouseTypeleftNav,
    //       // ,
    //       // nearBy: nearBy
    //     })
    //   });
    //   app.get('/api/enterprise', function (req, res) {
    //     res.json({
    //       enterprise: enterprise,
    //     })
    //   });
    //   app.get('/api/honor', function (req, res) {
    //     res.json({
    //       honor: honor,
    //     })
    //   });
    //   app.get('/api/develop', function (req, res) {
    //     res.json({
    //       develop: develop,
    //     })
    //   });
    //   app.get('/api/culture', function (req, res) {
    //     res.json({
    //       culture: culture,
    //     })
    //   });
    //   app.get('/api/house', function (req, res) {
    //     res.json({
    //       dataAll: dataAll
    //     })
    //   });
    //   app.get('/api/near', function (req, res) {
    //     res.json({
    //       near: near
    //     })
    //   });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
