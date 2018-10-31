// Native
const fs = require('fs')
const { join } = require('path')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)

// Modules
const withTypescript = require('@zeit/next-typescript')

// Only use in development!
if (process.env.NODE_ENV === 'development') {
  require('dotenv-safe').load()
}

module.exports = withTypescript({
  publicRuntimeConfig: {
    // Environment variables are accessible throughout the application now
    // using "import getConfig from 'next/config'".
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT
  },
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    if (dev) {
      return defaultPathMap
    }
    // This will copy auth.html from the project root into the 'out' directory.
    await copyFile(join(dir, 'auth.html'), join(outDir, 'auth.html'))
    return defaultPathMap
  }
})
