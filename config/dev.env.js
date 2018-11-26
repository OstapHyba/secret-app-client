'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    FORM_API_URL: '"http://localhost:8000/secret/"',
    CURRENT_URL: '"http://localhost:8080/"'
})
