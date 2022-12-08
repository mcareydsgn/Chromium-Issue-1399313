const path = require('path');
const HomePages = require('./pages-config/home.js')

module.exports = {
    publicPath: '/dist/',
    configureWebpack: {
        devtool: 'source-map',
        resolve: {
            alias: {
                SRC: path.resolve(__dirname, 'src'),
            }
        }
    },
    pages: {
        ...HomePages
    }
}