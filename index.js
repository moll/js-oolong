var hasOwn = Object.prototype.hasOwnProperty

/**
 * @class Objectware
 */

/**
 * Assigns all enumerable properties on `source` objects to `target`.  
 * Similar to `Object.assign`, but takes inherited properties into account.
 * Does not modify anything in the source objects.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * Objectware.assign({name: "John"}, {age: 32}, {shirt: "blue"})
 * // => {name: "John", age: 32, shirt: "blue"}
 *
 * @static
 * @method assign
 * @param target
 * @param source...
 */
exports.assign = function(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) target[key] = source[key]
  }

  return target
}

/**
 * Creates a shallow clone of the given object, taking all enumerable
 * properties into account.  
 * Shallow means if you've got nested objects, those will be shared.
 *
 * @example
 * Objectware.clone({name: "John", age: 32})
 * // => {name: "John", age: 32}
 *
 * @static
 * @method clone
 * @param object
 */
exports.clone = function(obj) {
  return obj == null ? obj : exports.assign({}, obj)
}

/**
 * Creates a deep clone of the given object, taking all enumerable properties
 * into account.
 *
 * @example
 * Objectware.cloneDeep({name: "John", attributes: {age: 42}})
 * // => {name: "John", attributes: {age: 42}}
 *
 * @static
 * @method cloneDeep
 * @param object
 */
exports.cloneDeep = function(obj) {
  return obj == null ? obj : exports.merge({}, obj)
}

/**
 * Creates and returns an object inheriting from `prototype` and, optionally,
 * assigns enumerable properties from `source` objects to the new object.  
 * Uses `Object.create` and [`Objectware.assign`](#Objectware.assign)
 * internally.  
 * Does not modify the given `prototype` nor source objects.
 *
 * @example
 * var PERSON = {name: "Unknown", age: 0}
 * Objectware.create(PERSON, {name: "John"}, {shirt: "blue"})
 * // => {name: "John", age: 0, shirt: "blue"}
 *
 * @static
 * @method create
 * @param prototype
 * @param [source...]
 */
exports.create = function(obj) {
  obj = Object.create(obj)
  return arguments.length == 1 ? obj : exports.assign.apply(this, arguments)
}

/**
 * Calls the given function for all enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Objectware.each(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method each
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.each = function(obj, fn, context) {
  for (var key in obj) fn.call(context, obj[key], key, obj)
  return obj
}

/**
 * Calls the given function for all _own_ enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Objectware.eachOwn(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method eachOwn
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.eachOwn = function(obj, fn, context) {
  for (var key in obj)
    if (hasOwn.call(obj, key)) fn.call(context, obj[key], key, obj)

  return obj
}

/**
 * Filters all enumerable properties and returns a new object with only those
 * properties for which the given function returned truthy for.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Objectware.filter(obj, function(value, key) { return value % 2 == 0 })
 * // => {b: 2, d: 4}
 *
 * @static
 * @method filter
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.filter = function(obj, fn, context) {
  var filtered = {}

  for (var key in obj) {
    var value = obj[key]
    if (fn.call(context, value, key, obj)) filtered[key] = value
  }

  return filtered
}

/**
 * @static
 * @method forEach
 * @alias each
 */
exports.forEach = exports.each

/**
 * @static
 * @method forEachOwn
 * @alias eachOwn
 */
exports.forEachOwn = exports.eachOwn

/**
 * Checks whether the given object has the given property, inherited or not.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Objectware.has({name: "John"}) // => true
 * Objectware.has(Object.create({name: "John"}), "name") // => true
 * Objectware.has({}, "name") // => false
 *
 * @static
 * @method has
 * @param object
 * @param key
 */
exports.has = function(obj, key) {
  return key in obj
}

/**
 * Checks whether the given object has the given property as an own property.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Objectware.hasOwn({name: "John"}) // => true
 * Objectware.hasOwn(Object.create({name: "John"}), "name") // => false
 * Objectware.hasOwn({}, "name") // => false
 *
 * @static
 * @method hasOwn
 * @param object
 * @param key
 */
exports.hasOwn = function(obj, key) {
  return hasOwn.call(obj, key)
}

/**
 * Checks whether the given object has any enumerable properties, inherited
 * or not.
 *
 * @example
 * Objectware.isEmpty({name: "John"}) // => false
 * Objectware.isEmpty(Object.create({name: "John"})) // => false
 * Objectware.isEmpty({}) // => true
 *
 * @static
 * @method isEmpty
 * @param object
 */
exports.isEmpty = function(obj) {
  for (obj in obj) return false
  return true
}

/**
 * @static
 * @method isIn
 * @alias has
 */
exports.isIn = exports.has

/**
 * @static
 * @method isInOwn
 * @alias hasOwn
 */
exports.isInOwn = exports.hasOwn

/**
 * Checks whether the given object has any _own_ enumerable properties.
 *
 * @example
 * Objectware.isOwnEmpty({name: "John"}) // => false
 * Objectware.isOwnEmpty(Object.create({name: "John"})) // => true
 * Objectware.isOwnEmpty({}) // => true
 *
 * @static
 * @method isOwnEmpty
 * @param object
 */
exports.isOwnEmpty = function(obj) {
  for (var key in obj) if (hasOwn.call(obj, key)) return false
  return true
}

/**
 * Checks whether the given object is one constructed by `Object` or inheriting
 * from `null`.
 *
 * A non-plain object has a `constructor` property set to anything but `Object`.
 * That's the case when you do, for example, `new MyModel`, `new Date`.
 *
 * @example
 * Objectware.isPlainObject({name: "John", age: 42}) // => true
 * Objectware.isPlainObject(Object.create(null)) // => true
 * Objectware.isPlainObject(Math) // => true
 * Objectware.isPlainObject(new Date) // => false
 * Objectware.isPlainObject("John") // => false
 *
 * @static
 * @method isPlainObject
 * @param object
 */
exports.isPlainObject = function(obj) {
  if (obj == null) return false
  if (typeof obj != "object") return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

/**
 * Returns all enumerable keys of an object as an array.
 * Similar to `Object.keys`, but takes inherited properties into account.
 *
 * @example
 * Objectware.keys({name: "John", age: 32}) // => ["name", "age"]
 *
 * @static
 * @method keys
 * @param object
 */
exports.keys = function(obj) {
  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}

/**
 * Maps all enumerable property values and returns a new object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3}
 * Objectware.map(obj, function(value, key) { return value * 2 })
 * // => {a: 2, b: 4, c: 6}
 *
 * @static
 * @method map
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.map = function(obj, fn, context) {
  var mapped = {}
  for (var key in obj) mapped[key] = fn.call(context, obj[key], key, obj)
  return mapped
}

/**
 * Transforms all enumerable keys and returns a new object.
 *
 * The function will be called with arguments `key`, `value` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var person = {name: "John", age: 32}
 * Objectware.mapKeys(person, function(key) { return key.toUpperCase() })
 * // => {NAME: "John", AGE: 32}
 *
 * @static
 * @method mapKeys
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.mapKeys = function(obj, fn, context) {
	var result = {}

	for (var key in obj) {
    var value = obj[key]
    result[fn.call(context, key, value, obj)] = value
  }

	return result
}

/**
 * Assigns all enumerable properties on `source` objects to `target`
 * recursively.  
 * Only plain objects a merged. Refer to
 * [`Objectware.isPlainObject`](#Objectware.isPlainObject) for the definition of
 * a plain object. Does not modify anything in the source objects.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * var person = {name: "John", attributes: {age: 42}}
 * Objectware.merge(person, {attributes: {height: 190}})
 * person // => {name: "John", attributes: {age: 42, height: 190}}
 *
 * @static
 * @method merge
 * @param target
 * @param source...
 */
exports.merge = function merge(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]

    for (var key in source) {
      var a = target[key]
      var b = source[key]
      var aIsObject = exports.isPlainObject(a)
      var bIsObject = exports.isPlainObject(b)

      if (aIsObject && bIsObject) merge(a, b)
      else if (bIsObject) target[key] = merge({}, b)
      else target[key] = b
    }
  }

  return target
}

/**
 * Returns all enumerable _own_ keys of an object as an array.  
 * Same as `Object.keys`, really.
 *
 * @example
 * var person = Object.create({name: "John"})
 * person.age = 42
 * Objectware.ownKeys(person) // => ["age"]
 *
 * @static
 * @method ownKeys
 * @param object
 */
exports.ownKeys = Object.keys

/**
 * Rejects all enumerable properties and returns a new object without those
 * properties for which the given function returned truthy for.  
 * Opposite of [`filter`](#Objectware.filter).
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Objectware.reject(obj, function(value, key) { return value % 2 == 0 })
 * // => {a: 1, c: 3}
 *
 * @static
 * @method reject
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.reject = function(obj, fn, context) {
  return exports.filter(obj, not(fn), context)
}

/**
 * Returns all enumerable property values as an array.
 *
 * @example
 * Objectware.values({name: "John", age: 32}) // => ["John", 32]
 *
 * @static
 * @method values
 * @param object
 */
exports.values = function(obj) {
  var values = []
  for (var key in obj) values.push(obj[key])
  return values
}

function not(fn) { return function() { return !fn.apply(this, arguments) }}
