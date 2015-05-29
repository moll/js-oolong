var $ = require("../..")
var demand = require("must")

describe("Oolong.cloneDeep", function() {
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
