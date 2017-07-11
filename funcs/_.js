(function () {
  var root = this
  var previousUndescore = root._

  var ArrayProto = Array.prototype
  var ObjProto = Object.prototype
  var FuncProto = Function.prototype

  var push = ArrayProto.push
  var slice = ArrayProto.slice
  var toString = ObjProto.toString
  var hasOwnProperty = ObjProto.hasOwnProperty

  var nativeIsArray = Array.isArray
  var nativeKeys = Object.keys
  var nativeBind = FuncProto.bind
  var nativeCreate = Object.create

  var Ctor = function () {}

  var _ = function (obj) {
    if (obj instanceof _) {
      return obj
    }

    if (!(this instanceof _)) {
      return new _(obj)
    }

    this.wrapped = obj
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _
    }

    exports._ = _
  } else {
    root._ = _
  }

  _.VERSION = '1.8.3'

  var optimizeCb = function (func, context, argCount) {
    if (context === void 0) {
      return func
    }

    switch (argCount == null ? 3 : argCount) {
      case 1 : return function (value) {
        return func.call(context, value)
      }
      case 2 : return function (value, other) {
        return func.call(context, value, other)
      }
      case 3 : return function (value, index, collection) {
        return func.call(context, value, index, collection)
      }
      case 4 : return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection)
      }
    }
    return function () {
      return func.apply(context, arguments)
    }
  }

  var cb = function (value, context, argCount) {
    if (value == null) {
      return _.identity
    }

    if (_.isFunction(value)) {
      return optimizeCb(value, context, argCount)
    }

    if (_.isObject(value)) {
      return _.matcher(value)
    }

    return _.property(value)
  }

  _.iteratee = function (value, context) {
    return cb(value, context, Infinity)
  }

  // createAssigner xxx

  // baseCreate xxx

  var property = function (key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key]
    }
  }

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
  var getLength = property('length')

  var isArrayLike = function (collection) {
    var length = getLength(collection)
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  _.each = _.forEach = function (obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context)
    var i, length

    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj)
      }
    } else {
      var keys = _.keys(obj) // 缺一个_.keys

      for (i = 0, length = keys.length; i< length; i++) {
        iteratee(obj[keys[i]], keys[i], obj)
      }
    }
  }

  _.map = _.collect = function (obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context)
    var keys = !isArrayLike(obj) && _.keys(obj)
    var length = (keys || obj).length
    var results = Array(length)

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index
      results[index] = iteratee(obj[currentKey], currentKey, obj)
    }

    return results
  }

  // createReduce

  // _.reduce _.foldr

  // _.find _.detect

  _.filter = _.select = function (obj, predicate, context) {
    var results = []
    predicate = cb(predicate, context)

    _.each(obj, function (value, index, list) {
      if (predicate(value, index, list)) {
        return results.push(value)
      }
    })

    return results
  }

  if (typeof define === 'function' && define.amd) {
    define('undescore', [], function () {
      return _
    })
  }

}.call(this));