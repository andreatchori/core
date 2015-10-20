'use strict'

/**
  * adonis-fold
  * Copyright(c) 2015-2015 Harminder Virk
  * MIT Licensed
*/

/**
 * @ignore
*/
const parallel     = require('co-parallel')
const co           = require('co')
const _            = require('lodash')
const requireStack = require('require-stack')

/**
 * @module Registrar
 * @description Register providers to ioc container
 * @type {Object}
 */
let Registrar = exports = module.exports = {}

/**
 * @description requires an array of provider and returns
 * their register method
 * @method require
 * @param  {Array} arrayOfProviders
 * @return {Array}
 * @public
 */
Registrar.require = function (arrayOfProviders) {
  return _.map(arrayOfProviders, function (provider) {
    const module = new(requireStack(provider))
    return module.register()
  })
}

/**
 * @description registers an array of providers by
 * called their register method.
 * @method register
 * @param  {Array} arrayOfProviders
 * @return {void}
 * @public
 */
Registrar.register = function (arrayOfProviders) {
  arrayOfProviders = Registrar.require(arrayOfProviders)
  return co (function * () {
    return yield parallel(arrayOfProviders)
  })
}
