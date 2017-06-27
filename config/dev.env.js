var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    DIPLICITY_ENDPOINT: '"http://localhost:8080"'
});
