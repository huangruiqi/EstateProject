'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

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
// let imgProjectBack = project.imgProjectBack;
// let projectWord = project.word;
// let project3D = project.project3D;
// let back = project.back;

// //leftNav大的公共模块
// let appData = require('../static/data.json')
// let LeftNav = appData.LeftNav
// let HouseTypeleftNav = appData.HouseTypeleftNav


// //获取户型的地址
// let house = require('../static/house.json');
// let dataAll = house.data;

// //获取周边
// let near = require('../static/nearBy.json');

// //获取房间类型
// let houseType = require('../static/houseType.json');

// //获取公园类型
// let parkType = require('../static/parkType.json');

// // 企业简介数据
// let enterprise = require('../static/enterprise.json')

// // 品牌荣誉
// let honor = require('../static/honor.json')

// // 发展历程
// let develop = require('../static/develop.json')

// // 企业文化
// let culture = require('../static/culture.json')

// let apiRoutes = express.Router()

// app.use('/api', apiRoutes)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
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
      // app.get('/api/guide', function (req, res) {
      //   res.json({
      //     imgBack: imgBack,
      //     imgLogo: imgLogo,
      //     word: word
      //   });
      // });
      // app.get('/api/index', function (req, res) {
      //   res.json({
      //     imgIndexBack: imgIndexBack,
      //     imgProject: imgProject
      //   });
      // });
      // app.get('/api/module', function (req, res) {
      //   res.json({
      //     moduleIndex: moduleIndex
      //   });
      // });
      // app.get('/api/project', function (req, res) {
      //   res.json({
      //     imgProjectBack: imgProjectBack,
      //     projectWord: projectWord,
      //     project3D: project3D,
      //     back: back
      //   });
      // });
      // app.get('/api/leftNav', function (req, res) {
      //   res.json({
      //     LeftNav: LeftNav,
      //     // HouseTypeleftNav: HouseTypeleftNav,
      //     // enterprise: enterprise,
      //     // honor: honor,
      //     // develop: develop,
      //     // culture: culture
      //     // ,
      //     // nearBy: nearBy
      //   })
      // });
      // app.get('/api/house', function (req, res) {
      //   res.json({
      //     dataAll: dataAll
      //   })
      // });
      // app.get('/api/near', function (req, res) {
      //   res.json({
      //     near: near
      //   })
      // });
      // app.get('/api/houseType', function (req, res) {
      //   res.json({
      //     houseType: houseType.data
      //   })
      // });
      // app.get('/api/parkType', function (req, res) {
      //   res.json({
      //     parkType: parkType.data
      //   })
      // });
      // app.get('/api/enterprise', function(req, res) {
      //   res.json({
      //     enterprise
      //   })
      // })
      // app.get('/api/honor', function(req, res) {
      //   res.json({
      //     honor
      //   })
      // })
      // app.get('/api/develop', function(req, res) {
      //   res.json({
      //     develop
      //   })
      // })
      // app.get('/api/culture', function(req, res) {
      //   res.json({
      //     culture
      //   })
      // })
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
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-element-admin'
    })
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
