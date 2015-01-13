exports.assign = function(target) {
  if (target) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) target[key] = source[key]
  }

  return target
}

exports.isEmpty = function(value) {
  for (value in value) return false
  return true
}

exports.clone = function(obj) {
  return obj ? exports.assign({}, obj) : obj
}
