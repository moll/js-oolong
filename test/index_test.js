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

    it("must add properties to target from one source", function() {
      _.assign({}, {name: "John"}).must.eql({name: "John"})
    })

    it("must add properties to target from two sources", function() {
      _.assign({}, {name: "John"}, {age: 13}).must.eql({name: "John", age: 13})
    })

    it("must overwrite property with later source", function() {
      _.assign({}, {name: "John"}, {name: "Mike"}).must.eql({name: "Mike"})
    })

    it("must not change target given no source", function() {
      _.assign({name: "John"}).must.eql({name: "John"})
    })

    it("must add properties from inherited sources", function() {
      _.assign({}, Object.create({name: "John"})).must.eql({name: "John"})
    })

    it("must not add unenumerable properties", function() {
      var source = Object.defineProperty({}, "name", {value: "John"})
      _.assign({}, source).must.eql({})
    })
  })

  describe(".clone", function() {
    it("must return undefined given nothing", function() {
      demand(_.clone()).be.undefined()
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

    it("must assign functions", function() {
      function fn() {}
      _.clone({fn: fn}).must.eql({fn: fn})
    })

    it("must not change target given no source", function() {
      _.clone({name: "John"}).must.eql({name: "John"})
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

  describe(".keys", function() {
    it("must return all enumerable keys of an object", function() {
      _.keys({a: 1, b: 2}).must.eql(["a", "b"])
    })

    it("must return inherited enumerable keys of an object", function() {
      _.keys(Object.create({a: 1, b: 2})).must.eql(["a", "b"])
    })
  })

  describe(".mapKeys", function() {
    it("must transform keys with given function", function() {
      var obj = _.mapKeys({name: "John", age: 32}, toUpperCase)
      obj.must.eql({NAME: "John", AGE: 32})
    })

    it("must call function with key, value and object", function() {
      var spy = Sinon.spy()
      var obj = {name: "John"}
      var context = {}
      _.mapKeys(obj, spy, context)

      spy.callCount.must.equal(1)
      spy.firstCall.args[0].must.equal("name")
      spy.firstCall.args[1].must.equal("John")
      spy.firstCall.args[2].must.equal(obj)
      spy.firstCall.thisValue.must.equal(context)
    })

    it("must not change the given object", function() {
      var obj = {a: 1}
      _.mapKeys(obj, function() { return "b" }).must.not.equal(obj)
      obj.must.eql({a: 1})
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
