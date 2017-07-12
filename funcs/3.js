var _ = {}

_.isUndefined = function (obj) {
  return obj === void 0
}
var testUndefined
// console.log(_.isUndefined(testUndefined))

_.isNull = function (obj) {
  return obj === null
}

var ObjProto = Object.prototype
var toString = ObjProto.toString
var nativeIsArray = Array.isArray

_.isArray = nativeIsArray || function (obj) {
  return toString.call(obj) === '[object Array]'
}

// console.log(_.isArray([]))
// console.log(_.isArray({}))
// console.log(_.isArray(''))

_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object'+ name +']'
  }
})

_.isNaN = function (obj) {
  return _.isNumber(obj) && obj !== +obj
}

_.isFinite = function () {
  return isFinite(obj) && !isNaN(parseFloat(obj))
}

_.isObject = function (obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}

_.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1)
}

var ObjProto = Object.prototype
var hasOwnProperty = ObjProto.hasOwnProperty

_.has = function (obj, key) {
  return obj != null && hasOwnProperty.call(obj, key)
}