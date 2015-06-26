var $ = require("../..")
var demand = require("must")

describe("Oolong.setPrototypeOf", function() {
  it("must return object", function() {
    var obj = {}
    $.setPrototypeOf(obj, {}).must.equal(obj)
  })

  it("must set object's prototype given object prototype", function() {
    var obj = {}
    var prototype = {}
    $.setPrototypeOf(obj, prototype)
    Object.getPrototypeOf(obj).must.equal(prototype)
  })

  it("must set object's prototype given null prototype", function() {
    var obj = {}
    $.setPrototypeOf(obj, null)
    demand(Object.getPrototypeOf(obj)).be.null()
  })

  it("must throw given undefined", function() {
    $.setPrototypeOf.bind(null, undefined, {}).must.throw(TypeError)
  })

  it("must throw given null", function() {
    $.setPrototypeOf.bind(null, null, {}).must.throw(TypeError)
  })

  it("must ignore if given a number primitive", function() {
    $.setPrototypeOf(42, {}).must.equal(42)
  })

  it("must throw given a non-extensible object", function() {
    var obj = Object.preventExtensions({})
    $.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })

  it("must throw given a sealed object", function() {
    var obj = Object.seal({})
    $.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })

  it("must throw given a frozen object", function() {
    var obj = Object.freeze({})
    $.setPrototypeOf.bind(null, obj, {}).must.throw(TypeError)
  })
})
