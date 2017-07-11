var _ = {} // 临时

_.noop = function () {}

_.random = function (min, max) {
  if (max == null) {
    max = min
    min = 0
  }

  return min + Math.floor(Math.random() * (max - min + 1))
}

// console.log(_.random(1))

_.now = Date.now || function () {
  return new Date().getTime()
}

// console.log(_.now())

var idCounter = 0
_.uniqueId = function (prefix) {
  var id = ++idCounter + ''
  return prefix ? prefix + id : id
}

// console.log(_.uniqueId())
// console.log(_.uniqueId('a'))
// console.log(_.uniqueId('3'))

var previousUnderscore = root._
_.noConflict = function () { // 非常经典的防止冲突的解决方案
  root._ = previousUnderscore
  return this 
}

_.identity = function (value) {
  return value
}

_.constant = function (value) {
  return function () {
    return value
  }
}