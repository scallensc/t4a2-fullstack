const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  env: {
    BASE_API_URL: "/api"
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@raw-loader',
        },
      ],
    })

    return config
  },
}