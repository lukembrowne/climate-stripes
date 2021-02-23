// vue.config.js - https://cli.vuejs.org/config/#global-cli-config
const path = require('path'); // To manipulate file paths
module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/climate-stripes/'
        : '/'

}

