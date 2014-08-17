var slice = Array.prototype.slice

var NOT_A_FN_MSG = " is not a function"

exports.assign = function(target) {
  if (target) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) target[key] = source[key]
  }

  return target
}

exports.isEmpty = function(value) {
  if (typeof value == "string") return value.length == 0
  for (value in value) return false
  return true
}

exports.new = function(Constructor) {
  var obj = Object.create(Constructor.prototype)
  return Constructor.apply(obj, slice.call(arguments, 1))
}

exports.compose = function() {
  var fns = arguments
  for (var i = 0, l = fns.length; i < l; ++i)
    if (typeof fns[i] != "function") throw new TypeError(fns[i] + NOT_A_FN_MSG)

  return function() {
    var args = arguments, i = fns.length
    while (i--) args = [fns[i].apply(this, args)]
    return args[0]
  }
}

exports.noop = function() {}
exports.identity = function(value) { return value }
exports.constant = function(value) { return exports.identity.bind(null, value) }
exports.clone = function(obj) { return obj ? exports.assign({}, obj)  : obj }
exports.isBoolean = function(value) { return typeof value == "boolean" }
exports.isNumber = function(value) { return typeof value == "number" }
exports.isString = function(value) { return typeof value == "string" }
exports.isFunction = function(value) { return typeof value == "function" }
exports.isArray = Array.isArray
