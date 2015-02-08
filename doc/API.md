Objectware.js API Documentation
===============================
### [Objectware](#Objectware)
- [assign](#Objectware.assign)(target, source...)
- [clone](#Objectware.clone)(object)
- [cloneDeep](#Objectware.cloneDeep)(object)
- [filter](#Objectware.filter)(object, callback, [thisArg])
- [isEmpty](#Objectware.isEmpty)(object)
- [isIn](#Objectware.isIn)(object, key)
- [isPlainObject](#Objectware.isPlainObject)(object)
- [keys](#Objectware.keys)(object)
- [map](#Objectware.map)(object, callback, [thisArg])
- [mapKeys](#Objectware.mapKeys)(object, callback, [thisArg])
- [merge](#Objectware.merge)(target, source...)
- [reject](#Objectware.reject)(object, callback, [thisArg])
- [values](#Objectware.values)(object)


<a name="Objectware" />
Objectware
----------


<a name="Objectware.assign" />
### Objectware.assign(target, source...)
Assigns all enumerable properties on `source` objects to `target`.  
Similar to `Object.assign`, but takes inherited properties into account.
Does not modify anything in the source objects.

Think of it as _extending_ the first object step by step with others.

**Examples**:
```javascript
Objectware.assign({name: "John"}, {age: 32}, {shirt: "blue"})
// => {name: "John", age: 32, shirt: "blue"}
```

<a name="Objectware.clone" />
### Objectware.clone(object)
Creates a shallow clone of the given object, taking all enumerable
properties into account.  
Shallow means if you've got nested objects, those will be shared.

**Examples**:
```javascript
Objectware.clone({name: "John", age: 32})
// => {name: "John", age: 32}
```

<a name="Objectware.cloneDeep" />
### Objectware.cloneDeep(object)
Creates a deep clone of the given object, taking all enumerable properties
into account.

**Examples**:
```javascript
Objectware.cloneDeep({name: "John", attributes: {age: 42}})
// => {name: "John", attributes: {age: 42}}
```

<a name="Objectware.filter" />
### Objectware.filter(object, callback, [thisArg])
Filters all enumerable properties and returns a new object with only those
properties for which the given function returned truthy for.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3, d: 4}
Objectware.filter(obj, function(value, key) { return value % 2 == 0 })
// => {b: 2, d: 4}
```

<a name="Objectware.isEmpty" />
### Objectware.isEmpty(object)
Checks whether the given object has any enumerable properties, inherited
or not.

**Examples**:
```javascript
Objectware.isEmpty({name: "John"}) // => false
Objectware.isEmpty(Object.create({name: "John"})) // => false
Objectware.isEmpty({}) // => true
```

<a name="Objectware.isIn" />
### Objectware.isIn(object, key)
Checks whether the given object has the given property. Uses `key in obj`.

**Examples**:
```javascript
_.isIn({name: "John"}, "name") // => true
_.isIn({name: "John"}, "age") // => false
```

<a name="Objectware.isPlainObject" />
### Objectware.isPlainObject(object)
Checks whether the given object is one constructed by `Object` or inheriting
from `null`.

A non-plain object has a `constructor` property set to anything but `Object`.
That's the case when you do, for example, `new MyModel`, `new Date`.

**Examples**:
```javascript
Objectware.isPlainObject({name: "John", age: 42}) // => true
Objectware.isPlainObject(Object.create(null)) // => true
Objectware.isPlainObject(Math) // => true
Objectware.isPlainObject(new Date) // => false
Objectware.isPlainObject("John") // => false
```

<a name="Objectware.keys" />
### Objectware.keys(object)
Returns all enumerable keys of an object as an array.
Similar to `Object.keys`, but takes inherited properties into account.

**Examples**:
```javascript
Objectware.keys({name: "John", age: 32}) // => ["name", "age"]
```

<a name="Objectware.map" />
### Objectware.map(object, callback, [thisArg])
Maps all enumerable property values and returns a new object.

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3}
Objectware.map(obj, function(value, key) { return value * 2 })
// => {a: 2, b: 4, c: 6}
```

<a name="Objectware.mapKeys" />
### Objectware.mapKeys(object, callback, [thisArg])
Transforms all enumerable keys and returns a new object.

The function will be called with arguments `key`, `value` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var person = {name: "John", age: 32}
Objectware.mapKeys(person, function(key) { return key.toUpperCase() })
// => {NAME: "John", AGE: 32}
```

<a name="Objectware.merge" />
### Objectware.merge(target, source...)
Assigns all enumerable properties on `source` objects to `target`
recursively.  
Only plain objects a merged. Refer to
[`Objectware.isPlainObject`](#Objectware.isPlainObject) for the definition of
a plain object. Does not modify anything in the source objects.

Think of it as _extending_ the first object step by step with others.

**Examples**:
```javascript
var person = {name: "John", attributes: {age: 42}}
Objectware.merge(person, {attributes: {height: 190}})
person // => {name: "John", attributes: {age: 42, height: 190}}
```

<a name="Objectware.reject" />
### Objectware.reject(object, callback, [thisArg])
Rejects all enumerable properties and returns a new object without those
properties for which the given function returned truthy for.  
Opposite of [`filter`](#Objectware.filter).

The function will be called with arguments `value`, `key` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var obj = {a: 1, b: 2, c: 3, d: 4}
Objectware.reject(obj, function(value, key) { return value % 2 == 0 })
// => {a: 1, c: 3}
```

<a name="Objectware.values" />
### Objectware.values(object)
Returns all enumerable property values as an array.

**Examples**:
```javascript
Objectware.values({name: "John", age: 32}) // => ["John", 32]
```
