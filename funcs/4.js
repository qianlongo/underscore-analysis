var _ = {}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

var isArrayLike = function (collection) {
  var length = collection != null && collection.length
  return typeof length === 'number' && length >=0 && length <= MAX_ARRAY_INDEX
}

var ObjProto = Object.prototype
var nativeKeys = Object.keys
var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString')



_.keys = function (obj) {
  if (!_.isObject(obj)) {
    return []
  }

  if (nativeKeys) {
    return nativeKeys(obj)
  }

  var keys = []

  for (var key in obj) {
    if (_.has(obj, key)) {
      keys.push(key)
    }
  }

  if (hasEnumBug) {
    collectNonEnumProps(obj, keys)
  }

  return keys
}