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
})
