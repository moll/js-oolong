var $ = require("../..")
var demand = require("must")

describe("Oolong.clone", function() {
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
