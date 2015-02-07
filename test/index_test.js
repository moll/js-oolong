var _ = require("..")
var Sinon = require("sinon")
var demand = require("must")
var toUpperCase = Function.call.bind(String.prototype.toUpperCase)

describe("Objectware", function() {
  describe(".assign", function() {
    it("must return undefined given nothing", function() {
      demand(_.assign()).be.undefined()
    })

    it("must return null given null", function() {
      demand(_.assign(null)).be.null()
    })

    it("must return undefined given undefined and a source", function() {
      demand(_.assign(undefined, {name: "John"})).be.undefined()
    })

    it("must return null given null and a source", function() {
      demand(_.assign(null, {name: "John"})).be.null()
    })

    it("must return target given no source", function() {
      var obj = {}
      _.assign(obj).must.equal(obj)
    })

    it("must return target given one source", function() {
      var obj = {}
      _.assign(obj, {name: "John"}).must.equal(obj)
    })

    it("must assign properties to target from one source", function() {
      _.assign({}, {name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties to target from two sources", function() {
      _.assign({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
    })

    it("must overwrite property with later source", function() {
      _.assign({}, {name: "John"}, {name: "Mike"}).must.eql({name: "Mike"})
    })

    it("must not change target given no source", function() {
      _.assign({name: "John"}).must.eql({name: "John"})
    })

    it("must assign properties from inherited sources", function() {
      _.assign({}, Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not assign unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      _.assign({}, source).must.eql({})
    })

    it("must assign properties with undefined value", function() {
      _.assign({name: "John"}, {name: undefined}).must.eql({name: undefined})
    })
  })

  describe(".clone", function() {
    it("must return undefined given nothing", function() {
      demand(_.clone()).be.undefined()
    })

    it("must return undefined given undefined", function() {
      demand(_.clone(undefined)).be.undefined()
    })

    it("must return null given null", function() {
      demand(_.clone(null)).be.null()
    })

    it("must return new object", function() {
      var obj = {}
      _.clone(obj).must.not.equal(obj)
    })

    it("must clone properties", function() {
      _.clone({name: "John", age: 42}).must.eql({name: "John", age: 42})
    })

    it("must assign nested properties", function() {
      var attrs = {age: 42}
      var obj = _.clone({name: "John", attrs: attrs})
      obj.attrs.must.equal(attrs)
    })

    it("must assign functions", function() {
      function fn() {}
      _.clone({fn: fn}).must.eql({fn: fn})
    })

    it("must clone properties from inherited sources", function() {
      _.clone(Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not clone unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      _.clone(source).must.eql({})
    })

    // Just to ensure the target isn't shared between invocations.
    it("must clone properties when called twice", function() {
      _.clone({name: "John"})
      _.clone({age: 42}).must.eql({age: 42})
    })
  })

  describe(".filter", function() {
    function isEven(value) { return value % 2 == 0 }

    it("must filter properties", function() {
      _.filter({a: 1, b: 2, c: 3, d: 4}, isEven).must.eql({b: 2, d: 4})
    })

    it("must filter inherited properties", function() {
      var obj = Object.create({a: 1, b: 2, c: 3, d: 4})
      _.filter(obj, isEven).must.eql({b: 2, d: 4})
    })

    it("must call function with value, key and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      _.filter(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("John")
      spy.firstCall.args[1].must.equal("name")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      _.filter(obj, function() { return false }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".isEmpty", function() {
    it("must return true given an empty object", function() {
      _.isEmpty({}).must.be.true()
    })

    it("must return false given an non-empty object", function() {
      _.isEmpty({name: "John"}).must.be.false()
    })

    it("must return false given an object with an inherited property",
      function() {
      _.isEmpty(Object.create({name: "John"})).must.be.false()
    })
  })

  describe(".isPlainObject", function() {
    it("must return true given an object literal", function() {
      _.isPlainObject({}).must.be.true()
    })

    it("must return true given an object inheriting from a literal",
      function() {
      _.isPlainObject(Object.create({})).must.be.true()
    })

    it("must return true given Object.prototype", function() {
      _.isPlainObject(Object.prototype).must.be.true()
    })

    it("must return true given an Object inheritng from null", function() {
      _.isPlainObject(Object.create(null)).must.be.true()
    })

    it("must return true given Math", function() {
      _.isPlainObject(Math).must.be.true()
    })

    it("must return true given JSON", function() {
      _.isPlainObject(JSON).must.be.true()
    })

    // Arguments have all the qualities of a plain object, so it might as well
    // be one.
    it("must return true given arguments", function() {
      _.isPlainObject(arguments).must.be.true()
    })

    it("must return false given undefined", function() {
      _.isPlainObject(undefined).must.be.false()
    })

    it("must return false given null", function() {
      _.isPlainObject(null).must.be.false()
    })

    it("must return false given a number", function() {
      _.isPlainObject(function() {}).must.be.false()
    })

    it("must return false given a string", function() {
      _.isPlainObject("").must.be.false()
    })

    it("must return false given a function", function() {
      _.isPlainObject(function() {}).must.be.false()
    })

    it("must return false given a regular expression", function() {
      _.isPlainObject(/./).must.be.false()
    })

    it("must return false given an instance of Date", function() {
      _.isPlainObject(new Date).must.be.false()
    })

    it("must return false given an instance of a class", function() {
      function Model() {}
      _.isPlainObject(new Model).must.be.false()
    })

    it("must return false given an object inheriting from an instance",
      function() {
      function Model() {}
      _.isPlainObject(Object.create(new Model)).must.be.false()
    })
  })

  describe(".keys", function() {
    it("must return all enumerable keys of an object", function() {
      _.keys({a: 1, b: 2}).must.eql(["a", "b"])
    })

    it("must return inherited enumerable keys of an object", function() {
      _.keys(Object.create({a: 1, b: 2})).must.eql(["a", "b"])
    })
  })

  describe(".map", function() {
    function double(value) { return value * 2 }

    it("must map properties", function() {
      _.map({a: 1, b: 2, c: 3}, double).must.eql({a: 2, b: 4, c: 6})
    })

    it("must map inherited properties", function() {
      var obj = Object.create({a: 1, b: 2, c: 3})
      _.map(obj, double).must.eql({a: 2, b: 4, c: 6})
    })

    it("must call function with value, key and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      _.map(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("John")
      spy.firstCall.args[1].must.equal("name")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      _.map(obj, function() { return "Mike" }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".mapKeys", function() {
    it("must transform keys", function() {
      var obj = _.mapKeys({name: "John", age: 32}, toUpperCase)
      obj.must.eql({NAME: "John", AGE: 32})
    })

    it("must transform keys of inherited properties", function() {
      var obj = _.mapKeys(Object.create({name: "John", age: 32}), toUpperCase)
      obj.must.eql({NAME: "John", AGE: 32})
    })

    it("must call function with key, value and object", function() {
      var obj = {name: "John"}
      var spy = Sinon.spy()
      var context = {}
      _.mapKeys(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("name")
      spy.firstCall.args[1].must.equal("John")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {name: "John"}
      _.mapKeys(obj, function() { return "NAME" }).must.not.equal(obj)
      obj.must.eql({name: "John"})
    })
  })

  describe(".merge", function() {
    it("must return undefined given nothing", function() {
      demand(_.merge()).be.undefined()
    })

    it("must return null given null", function() {
      demand(_.merge(null)).be.null()
    })

    it("must return undefined given undefined and a source", function() {
      demand(_.merge(undefined, {name: "John"})).be.undefined()
    })

    it("must return null given null and a source", function() {
      demand(_.merge(null, {name: "John"})).be.null()
    })

    it("must return target given no source", function() {
      var obj = {}
      _.merge(obj).must.equal(obj)
    })

    it("must return target given one source", function() {
      var obj = {}
      _.merge(obj, {name: "John"}).must.equal(obj)
    })

    it("must merge 2 plain objects", function() {
      var target = {name: "John"}
      _.merge(target, {age: 42}).must.eql({name: "John", age: 42})
    })

    it("must merge 3 plain objects", function() {
      var obj = _.merge({name: "John"}, {age: 42}, {height: 190})
      obj.must.eql({name: "John", age: 42, height: 190})
    })

    it("must merge two plain objects deeply", function() {
      var target = {name: "John", attributes: {age: 13}}
      var source = {attributes: {height: 190}}
      var obj = _.merge(target, source)
      obj.must.eql({name: "John", attributes: {age: 13, height: 190}})
    })

    it("must replace first object if second not an object", function() {
      var target = {attributes: {age: 13}}
      var source = {attributes: null}
      _.merge(target, source).must.eql({attributes: null})
    })

    it("must replace second object if first not an object", function() {
      var target = {attributes: null}
      var source = {attributes: {age: 13}}
      _.merge(target, source).must.eql({attributes: {age: 13}})
    })

    it("must not modify second sources objects", function() {
      var a = {attributes: {age: 13}}
      var b = {attributes: {height: 190}}
      _.merge({}, a, b)
      a.must.eql({attributes: {age: 13}})
    })

    it("must not modify deep second sources objects", function() {
      var a = {john: {attributes: {age: 13}}}
      var b = {john: {attributes: {height: 190}}}
      _.merge({}, a, b)
      a.must.eql({john: {attributes: {age: 13}}})
    })

    it("must assign non-plain objects directly", function() {
      var date = new Date
      var obj = _.merge({name: "John"}, {date: date})
      obj.date.must.equal(date)
    })

    it("must merge inherited properties", function() {
      var obj = _.merge({name: "John"}, Object.create({age: 42}))
      obj.must.eql({name: "John", age: 42})
    })

    it("must not assign unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      _.merge({}, source).must.eql({})
    })

    it("must assign properties with undefined value", function() {
      _.merge({name: "John"}, {name: undefined}).must.eql({name: undefined})
    })
  })

  describe(".values", function() {
    it("must return all enumerable values of an object", function() {
      _.values({a: 1, b: 2}).must.eql([1, 2])
    })

    it("must return inherited enumerable values of an object", function() {
      _.values(Object.create({a: 1, b: 2})).must.eql([1, 2])
    })
  })
})
