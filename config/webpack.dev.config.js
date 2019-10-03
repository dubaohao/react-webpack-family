const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const paths = require('./paths')
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
  mode: 'development',

  /*入口*/
  // entry: path.join(__dirname, 'src/index.jsx'),
  entry: {
    app: [
      'react-hot-loader/patch', //适配react保存状态的热更新插件
      path.resolve(paths.appSrc, 'index.jsx'),
    ],
  },

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },

  devtool: 'inline-source-map', //  开启sourcemap
  // debug: true,
  //本地运行服务器
  devServer: {
    port: 8080,
    hot: true,
    contentBase: path.join(__dirname, paths.appBuild),
    historyApiFallback: true, //每次刷新指向index.js入口文件
    host: '0.0.0.0',
    // open: true// 会自动打开浏览器运行，还可以有port端口参数，默认是8080
  },

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 将 JS 字符串生成为 style 节点
          // "css-loader", // 将 CSS 转化成 CommonJS 模块
          // "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
          {
            loader: 'css-loader',
            options: {
              modules: true, //开始css Modules
            },
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true, //开始css Modules
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          "postcss-loader",
        ],
      },
    ]
  },

  plugins: [
    //适配react保存状态的热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
