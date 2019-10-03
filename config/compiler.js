const webpack = require('webpack')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

module.exports = (config, env, previousFileSizes = {}) => {
  if (env === 'development') {
    console.log('Creating an dev build...')
  } else if (env === 'production') {
    console.log('Creating an optimized production build...')
  }

  let compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings
      })
    })
  })
}
