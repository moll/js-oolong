var $ = require("../..")
var demand = require("must")

describe("Oolong.assign", function() {
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
