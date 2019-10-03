const path = require('path');
// console.log('path', path) //打印path，审查有什么函数方法
const paths = require('./paths')

var HtmlWebpackPlugin = require('html-webpack-plugin'); //把bundle.js注入html

const commonConfig = {

  /*入口*/
  // entry: path.join(__dirname, 'src/index.jsx'),
  entry: {
    app: [
      "babel-polyfill",
      // path.join(__dirname, '../src/index.jsx'),
      path.resolve(paths.appSrc, 'index.jsx')
    ],
    vendor: ['react', 'react-router-dom', 'react-dom'] //抽取公共代码块
  },

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    // path: path.join(__dirname, '../dist'),
    path: paths.appBuild,
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ['babel-loader?cacheDirectory=true'],
        // include: path.join(__dirname, '../src'),
        include: paths.appSrc,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, //小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
          }
        }]
      }
    ]
  },
  //清楚控制台的warning
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  },

  /*自动补全引入文件的后缀，设置别称*/
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias:
        {
          // '@': path.resolve('../src'),
          // '@pages': path.join(__dirname, '../src/pages'),
          // '@components': path.join(__dirname, '../src/components'),
          // '@router': path.join(__dirname, '../src/router'),
          '@': paths.appSrc,
          '@pages': paths.appPages,
          '@components': paths.appComponents,
          '@router': paths.appRouter,
        }
  },

  plugins: [
    //自动把打包后的bundle.js插入到html中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // template: path.join(__dirname, '../src/index.html')
      template: path.resolve(paths.appSrc, 'index.html')
    }),

  ]
};

module.exports = commonConfig;
