var $ = require("..")
var Sinon = require("sinon")
var demand = require("must")
var toUpperCase = Function.call.bind(String.prototype.toUpperCase)

describe("Oolong", function() {
  describe(".assign", function() {
    it("must return undefined given nothing", function() {
      demand($.assign()).be.undefined()
    })

    it("must return null given null", function() {
      demand($.assign(null)).be.null()
    })

    it("must return undefined given undefined and a source", function() {
      demand($.assign(undefined, {name: "John"})).be.undefined()
    })

    it("must return null given null and a source", function() {
      demand($.assign(null, {name: "John"})).be.null()
    })

    it("must return target given no source", function() {
      var obj = {}
      $.assign(obj).must.equal(obj)
    })

    it("must return target given one source", function() {
      var obj = {}
      $.assign(obj, {name: "John"}).must.equal(obj)
    })

    it("must assign properties to target from one source", function() {
      $.assign({}, {name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties to target from two sources", function() {
      $.assign({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
    })

    it("must overwrite property with later source", function() {
      $.assign({}, {name: "John"}, {name: "Mike"}).must.eql({name: "Mike"})
    })

    it("must not change target given no source", function() {
      $.assign({name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties from inherited sources", function() {
      $.assign({}, Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not assign unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      $.assign({}, source).must.eql({})
    })

    it("must assign properties with undefined value", function() {
      $.assign({name: "John"}, {name: undefined}).must.eql({name: undefined})
    })
  })

  describe(".clone", function() {
    it("must return undefined given nothing", function() {
      demand($.clone()).be.undefined()
    })

    it("must return undefined given undefined", function() {
      demand($.clone(undefined)).be.undefined()
    })

    it("must return null given null", function() {
      demand($.clone(null)).be.null()
    })

    it("must return new object", function() {
      var obj = {}
      $.clone(obj).must.not.equal(obj)
    })

    it("must clone properties", function() {
      $.clone({name: "John", age: 42}).must.eql({name: "John", age: 42})
    })

    it("must assign nested properties", function() {
      var attrs = {age: 42}
      var obj = $.clone({name: "John", attrs: attrs})
      obj.attrs.must.equal(attrs)
    })

    it("must assign functions", function() {
      function fn() {}
      $.clone({fn: fn}).must.eql({fn: fn})
    })

    it("must clone properties from inherited sources", function() {
      $.clone(Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not clone unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      $.clone(source).must.eql({})
    })

    // Just to ensure the target isn't shared between invocations.
    it("must clone properties when called twice", function() {
      $.clone({name: "John"})
      $.clone({age: 42}).must.eql({age: 42})
    })
  })

  describe(".cloneDeep", function() {
    it("must return undefined given nothing", function() {
      demand($.cloneDeep()).be.undefined()
    })

    it("must return undefined given undefined", function() {
      demand($.cloneDeep(undefined)).be.undefined()
    })

    it("must return null given null", function() {
      demand($.cloneDeep(null)).be.null()
    })

    it("must return new object", function() {
      var obj = {}
      $.cloneDeep(obj).must.not.equal(obj)
    })

    it("must return new object given nested objects", function() {
      var obj = {attributes: {}}
      $.cloneDeep(obj).attributes.must.not.equal(obj.attributes)
    })

    it("must clone properties", function() {
      $.cloneDeep({name: "John", age: 42}).must.eql({name: "John", age: 42})
    })

    it("must clone nested properties", function() {
      var obj = {name: "John", attributes: {age: 13}}
      $.cloneDeep(obj).must.eql({name: "John", attributes: {age: 13}})
    })

    it("must assign functions", function() {
      function fn() {}
      $.cloneDeep({fn: fn}).must.eql({fn: fn})
    })

    it("must clone properties from inherited sources", function() {
      $.cloneDeep(Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not clone unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      $.cloneDeep(source).must.eql({})
    })

    // Just to ensure the target isn't shared between invocations.
    it("must clone properties when called twice", function() {
      $.cloneDeep({name: "John"})
      $.cloneDeep({age: 42}).must.eql({age: 42})
    })
  })

  describe(".create", function() {
    it("must return an object inheriting from the one given", function() {
      var prototype = {}
      var obj = $.create(prototype)
      Object.getPrototypeOf(obj).must.equal(prototype)
    })

    it("must return an object inheriting from null if given", function() {
      var obj = $.create(null)
      demand(Object.getPrototypeOf(obj)).be.null()
    })

    it("must assign properties to target from one source", function() {
      $.create({}, {name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties to target from two sources", function() {
      var obj = $.create({}, {name: "John"}, {age: 13})
      obj.must.eql({name: "John", age: 13})
    })

    it("must throw TypeError given nothing", function() {
      var err
      try { $.create() } catch (ex) { err = ex }
      err.must.be.an.instanceof(TypeError)
    })

    it("must not modify the given prototype", function() {
      var prototype = {name: ""}
      $.create(prototype, {name: "John"})
      prototype.must.eql({name: ""})
    })
  })

  describe(".defaults", function() {
    it("must return undefined given nothing", function() {
      demand($.defaults()).be.undefined()
    })

    it("must return null given null", function() {
      demand($.defaults(null)).be.null()
    })

    it("must return undefined given undefined and a source", function() {
      demand($.defaults(undefined, {name: "John"})).be.undefined()
    })

    it("must return null given null and a source", function() {
      demand($.defaults(null, {name: "John"})).be.null()
    })

    it("must return target given no source", function() {
      var obj = {}
      $.defaults(obj).must.equal(obj)
    })

    it("must return target given one source", function() {
      var obj = {}
      $.defaults(obj, {name: "John"}).must.equal(obj)
    })

    it("must assign properties to target from one source", function() {
      $.defaults({}, {name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties to target from two sources", function() {
      $.defaults({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
    })

    it("must not assign properties in Object.prototype", function() {
      $.defaults({}, {hasOwnProperty: true}).must.eql({})
    })

    it("must assign properties in Object.prototype when inheriting from null",
      function() {
      var obj = $.defaults(Object.create(null), {hasOwnProperty: true})
      demand(obj).eql({hasOwnProperty: true})
    })

    it("must not overwrite property if target already has it", function() {
      $.defaults({name: "John"}, {name: "Mike"}).must.eql({name: "John"})
    })

    it("must not overwrite property with later source", function() {
      $.defaults({}, {name: "John"}, {name: "Mike"}).must.eql({name: "John"})
    })

    it("must not change target given no source", function() {
      $.defaults({name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties from inherited sources", function() {
      $.defaults({}, Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not assign unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      $.defaults({}, source).must.eql({})
    })

    it("must assign properties with undefined value", function() {
      $.defaults({}, {name: undefined}).must.eql({name: undefined})
    })
  })

  describe(".each", function() {
    it("must call function with value, key and object", function() {
      var obj = {name: "John", age: 42, height: 190}
      var spy = Sinon.spy()
      var context = {}
      $.each(obj, spy, context)

      spy.callCount.must.equal(3)
      spy.args[0][0].must.equal("John")
      spy.args[0][1].must.equal("name")
      spy.args[0][2].must.equal(obj)
      spy.thisValues[0].must.equal(context)
      spy.args[1][0].must.equal(42)
      spy.args[1][1].must.equal("age")
      spy.args[1][2].must.equal(obj)
      spy.thisValues[1].must.equal(context)
      spy.args[2][0].must.equal(190)
      spy.args[2][1].must.equal("height")
      spy.args[2][2].must.equal(obj)
      spy.thisValues[2].must.equal(context)
    })

    it("must call function for inherited properties", function() {
      var obj = Object.create({name: "John"})
      obj.age = 42
      var spy = Sinon.spy()
      var context = {}
      $.each(obj, spy, context)

      spy.callCount.must.equal(2)
      spy.args[0][0].must.equal(42)
      spy.args[0][1].must.equal("age")
      spy.args[0][2].must.equal(obj)
      spy.thisValues[0].must.equal(context)
      spy.args[1][0].must.equal("John")
      spy.args[1][1].must.equal("name")
      spy.args[1][2].must.equal(obj)
      spy.thisValues[0].must.equal(context)
    })

    it("must return the given object", function() {
      var obj = {}
      $.each(obj, noop).must.equal(obj)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.each(obj, noop)
      obj.must.eql({name: "John"})
    })
  })

  describe(".eachOwn", function() {
    it("must call function with value, key and object", function() {
      var obj = {name: "John", age: 42, height: 190}
      var spy = Sinon.spy()
      var context = {}
      $.eachOwn(obj, spy, context)

      spy.callCount.must.equal(3)
      spy.args[0][0].must.equal("John")
      spy.args[0][1].must.equal("name")
      spy.args[0][2].must.equal(obj)
      spy.thisValues[0].must.equal(context)
      spy.args[1][0].must.equal(42)
      spy.args[1][1].must.equal("age")
      spy.args[1][2].must.equal(obj)
      spy.thisValues[1].must.equal(context)
      spy.args[2][0].must.equal(190)
      spy.args[2][1].must.equal("height")
      spy.args[2][2].must.equal(obj)
      spy.thisValues[2].must.equal(context)
    })

    it("must call function only for own properties", function() {
      var obj = Object.create({name: "John"})
      obj.age = 42
      var spy = Sinon.spy()
      var context = {}
      $.eachOwn(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.args[0][0].must.equal(42)
      spy.args[0][1].must.equal("age")
      spy.args[0][2].must.equal(obj)
      spy.thisValues[0].must.equal(context)
    })

    it("must return the given object", function() {
      var obj = {}
      $.eachOwn(obj, noop).must.equal(obj)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.eachOwn(obj, noop)
      obj.must.eql({name: "John"})
    })
  })

  describe(".filter", function() {
    function isEven(value) { return value % 2 == 0 }

    it("must filter properties", function() {
      $.filter({a: 1, b: 2, c: 3, d: 4}, isEven).must.eql({b: 2, d: 4})
    })

    it("must filter inherited properties", function() {
      var obj = Object.create({a: 1, b: 2, c: 3, d: 4})
      $.filter(obj, isEven).must.eql({b: 2, d: 4})
    })

    it("must call function with value, key and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      $.filter(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("John")
      spy.firstCall.args[1].must.equal("name")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.filter(obj, function() { return false }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".forEach", function() {
    it("must be an alias to .each", function() {
      $.forEach.must.equal($.each)
    })
  })

  describe(".forEachOwn", function() {
    it("must be an alias to .eachOwn", function() {
      $.forEachOwn.must.equal($.eachOwn)
    })
  })

  describe(".has", function() {
    it("must return false given an object without property", function() {
      $.has({}, "name").must.be.false()
    })

    it("must return true given an object with property", function() {
      $.has({"name": "John"}, "name").must.be.true()
    })

    it("must return true given a property set undefined", function() {
      $.has({"name": undefined}, "name").must.be.true()
    })

    it("must return true given an object with an inherited property",
      function() {
      $.has(Object.create({name: "John"}), "name").must.be.true()
    })
  })

  describe(".hasOwn", function() {
    it("must return false given an object without property", function() {
      $.hasOwn({}, "name").must.be.false()
    })

    it("must return true given an object with property", function() {
      $.hasOwn({"name": "John"}, "name").must.be.true()
    })

    it("must return true given a property set undefined", function() {
      $.hasOwn({"name": undefined}, "name").must.be.true()
    })

    it("must return false given an object with an inherited property",
      function() {
      $.hasOwn(Object.create({name: "John"}), "name").must.be.false()
    })
  })

  describe(".isEmpty", function() {
    it("must return true given an empty object", function() {
      $.isEmpty({}).must.be.true()
    })

    it("must return false given an non-empty object", function() {
      $.isEmpty({name: "John"}).must.be.false()
    })

    it("must return false given an object with an inherited property",
      function() {
      $.isEmpty(Object.create({name: "John"})).must.be.false()
    })
  })

  describe(".isIn", function() {
    it("must be an alias to .has", function() {
      $.isIn.must.equal($.has)
    })
  })

  describe(".isInOwn", function() {
    it("must be an alias to .hasOwn", function() {
      $.isInOwn.must.equal($.hasOwn)
    })
  })

  describe(".isOwnEmpty", function() {
    it("must return true given an empty object", function() {
      $.isOwnEmpty({}).must.be.true()
    })

    it("must return false given an non-empty object", function() {
      $.isOwnEmpty({name: "John"}).must.be.false()
    })

    it("must return false given an object with hasOwnProperty", function() {
      $.isOwnEmpty({hasOwnProperty: 42}).must.be.false()
    })

    it("must return true given an object with an inherited property",
      function() {
      $.isOwnEmpty(Object.create({name: "John"})).must.be.true()
    })
  })

  describe(".isPlainObject", function() {
    it("must return true given an object literal", function() {
      $.isPlainObject({}).must.be.true()
    })

    it("must return true given an object inheriting from a literal",
      function() {
      $.isPlainObject(Object.create({})).must.be.true()
    })

    it("must return true given Object.prototype", function() {
      $.isPlainObject(Object.prototype).must.be.true()
    })

    it("must return true given an Object inheritng from null", function() {
      $.isPlainObject(Object.create(null)).must.be.true()
    })

    it("must return true given Math", function() {
      $.isPlainObject(Math).must.be.true()
    })

    it("must return true given JSON", function() {
      $.isPlainObject(JSON).must.be.true()
    })

    // Arguments have all the qualities of a plain object, so it might as well
    // be one.
    it("must return true given arguments", function() {
      $.isPlainObject(arguments).must.be.true()
    })

    it("must return false given undefined", function() {
      $.isPlainObject(undefined).must.be.false()
    })

    it("must return false given null", function() {
      $.isPlainObject(null).must.be.false()
    })

    it("must return false given a number", function() {
      $.isPlainObject(noop).must.be.false()
    })

    it("must return false given a string", function() {
      $.isPlainObject("").must.be.false()
    })

    it("must return false given a function", function() {
      $.isPlainObject(noop).must.be.false()
    })

    it("must return false given a regular expression", function() {
      $.isPlainObject(/./).must.be.false()
    })

    it("must return false given an instance of Date", function() {
      $.isPlainObject(new Date).must.be.false()
    })

    it("must return false given an instance of a class", function() {
      function Model() {}
      $.isPlainObject(new Model).must.be.false()
    })

    it("must return false given an object inheriting from an instance",
      function() {
      function Model() {}
      $.isPlainObject(Object.create(new Model)).must.be.false()
    })
  })

  describe(".keys", function() {
    it("must return all enumerable keys of an object", function() {
      $.keys({a: 1, b: 2}).must.eql(["a", "b"])
    })

    it("must return inherited enumerable keys of an object", function() {
      $.keys(Object.create({a: 1, b: 2})).must.eql(["a", "b"])
    })
  })

  describe(".map", function() {
    function double(value) { return value * 2 }

    it("must map properties", function() {
      $.map({a: 1, b: 2, c: 3}, double).must.eql({a: 2, b: 4, c: 6})
    })

    it("must map inherited properties", function() {
      var obj = Object.create({a: 1, b: 2, c: 3})
      $.map(obj, double).must.eql({a: 2, b: 4, c: 6})
    })

    it("must call function with value, key and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      $.map(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("John")
      spy.firstCall.args[1].must.equal("name")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.map(obj, function() { return "Mike" }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".mapKeys", function() {
    it("must transform keys", function() {
      var obj = $.mapKeys({name: "John", age: 32}, toUpperCase)
      obj.must.eql({NAME: "John", AGE: 32})
    })

    it("must transform keys of inherited properties", function() {
      var obj = $.mapKeys(Object.create({name: "John", age: 32}), toUpperCase)
      obj.must.eql({NAME: "John", AGE: 32})
    })

    it("must call function with key, value and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      $.mapKeys(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("name")
      spy.firstCall.args[1].must.equal("John")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.mapKeys(obj, function() { return "NAME" }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".merge", function() {
    it("must return undefined given nothing", function() {
      demand($.merge()).be.undefined()
    })

    it("must return null given null", function() {
      demand($.merge(null)).be.null()
    })

    it("must return undefined given undefined and a source", function() {
      demand($.merge(undefined, {name: "John"})).be.undefined()
    })

    it("must return null given null and a source", function() {
      demand($.merge(null, {name: "John"})).be.null()
    })

    it("must return target given no source", function() {
      var obj = {}
      $.merge(obj).must.equal(obj)
    })

    it("must return target given one source", function() {
      var obj = {}
      $.merge(obj, {name: "John"}).must.equal(obj)
    })

    it("must merge 2 plain objects", function() {
      var target = {name: "John"}
      $.merge(target, {age: 42}).must.eql({name: "John", age: 42})
    })

    it("must merge 3 plain objects", function() {
      var obj = $.merge({name: "John"}, {age: 42}, {height: 190})
      obj.must.eql({name: "John", age: 42, height: 190})
    })

    it("must merge two plain objects deeply", function() {
      var target = {name: "John", attributes: {age: 13}}
      var source = {attributes: {height: 190}}
      var obj = $.merge(target, source)
      obj.must.eql({name: "John", attributes: {age: 13, height: 190}})
    })

    it("must replace first object if second not an object", function() {
      var target = {attributes: {age: 13}}
      var source = {attributes: null}
      $.merge(target, source).must.eql({attributes: null})
    })

    it("must replace second object if first not an object", function() {
      var target = {attributes: null}
      var source = {attributes: {age: 13}}
      $.merge(target, source).must.eql({attributes: {age: 13}})
    })

    it("must not modify second sources objects", function() {
      var a = {attributes: {age: 13}}
      var b = {attributes: {height: 190}}
      $.merge({}, a, b)
      a.must.eql({attributes: {age: 13}})
    })

    it("must not modify deep second sources objects", function() {
      var a = {john: {attributes: {age: 13}}}
      var b = {john: {attributes: {height: 190}}}
      $.merge({}, a, b)
      a.must.eql({john: {attributes: {age: 13}}})
    })

    it("must assign non-plain objects directly", function() {
      var date = new Date
      var obj = $.merge({name: "John"}, {date: date})
      obj.date.must.equal(date)
    })

    it("must merge inherited properties", function() {
      var obj = $.merge({name: "John"}, Object.create({age: 42}))
      obj.must.eql({name: "John", age: 42})
    })

    it("must not assign unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      $.merge({}, source).must.eql({})
    })

    it("must assign properties with undefined value", function() {
      $.merge({name: "John"}, {name: undefined}).must.eql({name: undefined})
    })
  })

  describe(".ownKeys", function() {
    it("must return all enumerable keys of an object", function() {
      $.ownKeys({a: 1, b: 2}).must.eql(["a", "b"])
    })

    it("must not return inherited enumerable keys of an object", function() {
      var obj = Object.create({a: 1})
      obj.b = 2
      $.ownKeys(obj).must.eql(["b"])
    })
  })

  describe(".reject", function() {
    function isEven(value) { return value % 2 == 0 }

    it("must reject properties", function() {
      $.reject({a: 1, b: 2, c: 3, d: 4}, isEven).must.eql({a: 1, c: 3})
    })

    it("must reject inherited properties", function() {
      var obj = Object.create({a: 1, b: 2, c: 3, d: 4})
      $.reject(obj, isEven).must.eql({a: 1, c: 3})
    })

    it("must call function with value, key and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      $.reject(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("John")
      spy.firstCall.args[1].must.equal("name")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      $.reject(obj, function() { return true }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".values", function() {
    it("must return all enumerable values of an object", function() {
      $.values({a: 1, b: 2}).must.eql([1, 2])
    })

    it("must return inherited enumerable values of an object", function() {
      $.values(Object.create({a: 1, b: 2})).must.eql([1, 2])
    })
  })
})

function noop() {}
