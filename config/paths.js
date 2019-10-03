'use strict';

const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
// 项目 root 文件夹
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => (path.resolve(appDirectory, relativePath) || '')

module.exports = {
  // 环境变量
  // dotenv: resolveApp('.env'),
  // package.json
  appPackageJson: resolveApp('package.json'),
  // 源代码
  appSrc: resolveApp('src'),
  // 编译目标
  appBuild: resolveApp('output'),
  // 静态资源文件夹
  staticDir: resolveApp('static'),
  // node_modules
  appNodeModules: resolveApp('node_modules'),
  // @Page
  appPages: resolveApp('src/pages'),
  // @Components
  appComponents: resolveApp('src/components'),
  // @Router
  appRouter: resolveApp('src/router'),
  // // @Utils
  // appUtils: resolveApp('src/utils'),
  // // @Interface
  // appInterface: resolveApp('src/interface'),
  // // @Model
  // appModel: resolveApp('src/model'),
  // // @Style
  // appStyle: resolveApp('src/style'),
  // // @Context
  // appContext: resolveApp('src/context'),
}
