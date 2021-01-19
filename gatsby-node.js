const fs = require('fs')

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    resolve: {
      alias: {
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      },
    },
  })
}

exports.createPages = ({ actions: { createRedirect }}) => {
  const files = JSON.parse(fs.readFileSync('redirects.json'))

  Object.entries(files).forEach(([from, to]) =>
    createRedirect({
      fromPath: `/functions/${from}`,
      toPath: to,
      redirectInBrowser: true,
      isPermanent: true,
    })
  )
}
