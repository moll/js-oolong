Objectware.js API Documentation
===============================
### [Objectware](#Objectware)
- [assign](#Objectware.assign)(target, source...)
- [clone](#Objectware.clone)(object)
- [isEmpty](#Objectware.isEmpty)(object)
- [mapKeys](#Objectware.mapKeys)(object, function, context)
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

<a name="Objectware.mapKeys" />
### Objectware.mapKeys(object, function, context)
Transforms all enumerable keys of the given object with the given function.

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
