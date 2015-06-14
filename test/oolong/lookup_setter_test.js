var $ = require("../..")
var demand = require("must")

describe("Oolong.lookupSetter", function() {
  it("must lookup a setter", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    $.lookupSetter(obj, "name").must.equal(setter)
  })

  it("must lookup a setter of an inherited property", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    $.lookupSetter(Object.create(obj), "name").must.equal(setter)
  })

  it("must return undefined given no setter", function() {
    demand($.lookupSetter({}, "name")).be.undefined()
  })

  it("must not lookup getter", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    demand($.lookupSetter(obj, "name")).be.undefined()
  })
})

function setter() {}
function getter() {}
