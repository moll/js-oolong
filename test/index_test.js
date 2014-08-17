var _ = require("..")
var Sinon = require("sinon")
var demand = require("must")

// Let String et al be used as constructors:
/* jshint -W053 */

describe("Overstrike", function() {
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

  describe(".isEmpty", function() {
    describe("given a string", function() {
      it("must return true given an empty string", function() {
        _.isEmpty("").must.be.true()
      })

      it("must return false given a non-empty string", function() {
        _.isEmpty("A").must.be.false()
      })
    })

    describe("given an array", function() {
      it("must return true given an empty array", function() {
        _.isEmpty([]).must.be.true()
      })

      it("must return false given a non-empty array", function() {
        _.isEmpty([1]).must.be.false()
      })
    })

    describe("given an object", function() {
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

      it("must return true given an empty String", function() {
        _.isEmpty(new String("")).must.be.true()
      })

      it("must return false given a non-empty String", function() {
        _.isEmpty(new String("A")).must.be.false()
      })
    })
  })

  describe(".new", function() {
    it("must create and call given constructor", function() {
      var Model = Sinon.spy(function Model() {})
      var model = _.new(Model)
      model.must.be.an.instanceof(Model)

      Model.callCount.must.equal(1)
      Model.firstCall.thisValue.must.be.an.instanceof(Model)
      Model.firstCall.args.must.eql([])
    })

    it("must create and call given constructor with arguments", function() {
      var Model = Sinon.spy(function Model() {})
      var model = _.new(Model, 1, 2, 3)
      model.must.be.an.instanceof(Model)

      Model.callCount.must.equal(1)
      Model.firstCall.thisValue.must.be.an.instanceof(Model)
      Model.firstCall.args.must.eql([1, 2, 3])
    })

    it("must return what constructor returns ", function() {
      function Model() { return 42 }
      _.new(Model).must.equal(42)
    })
  })

  describe(".compose", function() {
    it("must throw TypeError given a non-function", function() {
      var err
      try { _.compose(null) } catch (ex) { err = ex }
      err.must.be.an.instanceof(TypeError)
      err.message.must.include("is not a function")
    })

    it("must throw TypeError given a non-function with functions", function() {
      var err
      try { _.compose(_.noop, 42, _.noop) } catch (ex) { err = ex }
      err.must.be.an.instanceof(TypeError)
      err.message.must.include("is not a function")
    })

    it("must return a function that returs nothing given nothing", function() {
      demand(_.compose()()).be.undefined()
    })

    it("must return a function that returs first argument", function() {
      _.compose()(42).must.equal(42)
    })

    it("must call first function with all arguments", function() {
      var spy = Sinon.spy()
      _.compose(spy)(1, 2, 3)
      spy.firstCall.args.must.eql([1, 2, 3])
    })

    it("must call other functions with return values", function() {
      var a = Sinon.spy(function(value) { return value + "a" })
      var b = Sinon.spy(function(value) { return value + "b" })
      var c = Sinon.spy(function(value) { return value + "c" })

      _.compose(c, b, a)("")
      a.firstCall.args.must.eql([""])
      b.firstCall.args.must.eql(["a"])
      c.firstCall.args.must.eql(["ab"])
    })

    it("must return what last function returns", function() {
      function a(value) { return value + "a" }
      function b(value) { return value + "b" }
      function c(value) { return value + "c" }
      _.compose(c, b, a)("").must.equal("abc")
    })

    it("must call functions in context", function() {
      var obj = {}
      var a = Sinon.spy()
      var b = Sinon.spy()
      var c = Sinon.spy()

      _.compose(c, b, a).call(obj)
      a.firstCall.thisValue.must.equal(obj)
      b.firstCall.thisValue.must.equal(obj)
      c.firstCall.thisValue.must.equal(obj)
    })
  })

  describe(".noop", function() {
    it("must return nothing", function() {
      demand(_.noop()).be.undefined()
    })
  })

  describe(".identity", function() {
    it("must return argument", function() {
      _.identity(42).must.equal(42)
    })

    it("must return first argument given two", function() {
      _.identity(42, 69).must.equal(42)
    })
  })

  describe(".constant", function() {
    it("must return a function that returns argument", function() {
      _.constant(42)().must.equal(42)
    })

    it("must return a function that returns first argument given two",
      function() {
      _.constant(42, 69)().must.equal(42)
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

  describe(".isBoolean", function() {
    it("must return true given a boolean", function() {
      _.isBoolean(false).must.be.true()
    })

    it("must return false given a Boolean", function() {
      _.isBoolean(new Boolean(true)).must.be.false()
    })

    it("must return false given a non-boolean", function() {
      _.isBoolean(42).must.be.false()
    })
  })

  describe(".isNumber", function() {
    it("must return true given a number", function() {
      _.isNumber(42).must.be.true()
    })

    it("must return false given a Number", function() {
      _.isNumber(new Number(42)).must.be.false()
    })

    it("must return false given a non-number", function() {
      _.isNumber(true).must.be.false()
    })
  })

  describe(".isString", function() {
    it("must return true given a string", function() {
      _.isString("Hello").must.be.true()
    })

    it("must return false given a String", function() {
      _.isString(new String("Hello")).must.be.false()
    })

    it("must return false given a non-string", function() {
      _.isString(true).must.be.false()
    })
  })

  describe(".isFunction", function() {
    it("must return true given a function", function() {
      _.isFunction(function() {}).must.be.true()
    })

    it("must return false given a non-function", function() {
      _.isFunction(true).must.be.false()
    })
  })
})
