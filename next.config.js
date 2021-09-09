const path = require('path')

module.exports = {
  async redirects() {
    return [
      {
        source: '/artwork',
        destination: '/',
        permanent: true,
      },
      {
        source: '/bid',
        destination: '/',
        permanent: true,
      },
      {
        source: '/post',
        destination: '/',
        permanent: true,
      },
      {
        source: '/user',
        destination: '/',
        permanent: true,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
