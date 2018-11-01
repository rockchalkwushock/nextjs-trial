// Native
const fs = require('fs')
const { join } = require('path')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)

// Modules
const webpack = require('webpack')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

// Only use in development!
if (process.env.NODE_ENV === 'development') {
  require('dotenv-safe').load()
}

const config = {
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  },
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
  },
  webpack: config => {
    config.plugins.push(
      // Cherry picks locales to be included in bundle.
      // MomentJS adds a significant amount of weight to the overall bundle size.
      // This is crucial to limiting the bundle size.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /da|de|en-au|en-gb|es|fr|it|nl|pt|sv/
      )
    )
    return config
  }
}

module.exports = withBundleAnalyzer(withCSS(withTypescript(config)))
