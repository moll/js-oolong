Objectware.js API Documentation
===============================
### [Objectware](#Objectware)
- [assign](#Objectware.assign)(target, source...)
- [clone](#Objectware.clone)(object)
- [filter](#Objectware.filter)(object, callback, [thisArg])
- [isEmpty](#Objectware.isEmpty)(object)
- [keys](#Objectware.keys)(object)
- [mapKeys](#Objectware.mapKeys)(object, callback, [thisArg])
- [values](#Objectware.values)(object)


<a name="Objectware" />
Objectware
----------


<a name="Objectware.assign" />
### Objectware.assign(target, source...)
Assigns all enumerable properties on `source` objects to `target`.  
Similar to `Object.assign`, but takes inherited properties into account.

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

<a name="Objectware.keys" />
### Objectware.keys(object)
Returns all enumerable keys of an object as an array.
Similar to `Object.keys`, but takes inherited properties into account.

**Examples**:
```javascript
Objectware.keys({name: "John", age: 32}) // => ["name", "age"]
```

<a name="Objectware.mapKeys" />
### Objectware.mapKeys(object, callback, [thisArg])
Transforms all enumerable keys of the given object with the given function.

The function will be called with arguments `key`, `value` and `object` and
bound to `thisArg`.

**Examples**:
```javascript
var person = {name: "John", age: 32}
Objectware.mapKeys(person, function(key) { return key.toUpperCase() })
// => {NAME: "John", AGE: 32}
```

<a name="Objectware.values" />
### Objectware.values(object)
Returns all enumerable property values as an array.

**Examples**:
```javascript
Objectware.values({name: "John", age: 32}) // => ["John", 32]
```
