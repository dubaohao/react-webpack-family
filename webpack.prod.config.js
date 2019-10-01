const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin') //代码压缩

// const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理打包文件【引入方式不对】
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清理打包文件

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽取css代码

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', //  开启sourcemap
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // "css-loader?modules&localIdentName=[local]-[hash:base64:5]",
        "postcss-loader"
      ]
    }]
  },
  //抽取代码webpack.optimize.CommonsChunkPlugin插件的替换方式
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  plugins: [
      //抽取公共代码块，把入口entry定义的几部分不怎么变得的代码，单独打包成vendor.hahs.js
      //问题：现在发现编译生成的文件app.[hash].js和vendor.[hash].js生成的hash一样的，这里是个问题，每次修改代码,都会导致vendor.[hash].js名字改变，那我们提取出来的意义也就没了。
      //但是无奈，如果用chunkhash，会报错。和本地webpack-dev-server --hot不兼容；所以区分生产和开发环境，
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // })
      //该插件已被遗弃，替换使用上面的配置：optimization
      //代码压缩
    new UglifyJSPlugin(),
    //通过环境变量，区分环境
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
      //用于解决抽取公共代码块后，更改了一句代码导致vendor.hash.js名字改变，重新缓存【违背缓存的初衷】的问题
    new webpack.HashedModuleIdsPlugin(),
      //清理打包文件
    new CleanWebpackPlugin(),
      //css文件抽离
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    })
  ]
};

module.exports = merge(commonConfig, publicConfig);
