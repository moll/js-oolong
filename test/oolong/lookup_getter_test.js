var $ = require("../..")
var demand = require("must")

describe("Oolong.lookupGetter", function() {
  it("must lookup a getter", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    $.lookupGetter(obj, "name").must.equal(getter)
  })

  it("must lookup a getter of an inherited property", function() {
    var obj = Object.defineProperty({}, "name", {get: getter})
    $.lookupGetter(Object.create(obj), "name").must.equal(getter)
  })

  it("must return undefined given no getter", function() {
    demand($.lookupGetter({}, "name")).be.undefined()
  })

  it("must not lookup setter", function() {
    var obj = Object.defineProperty({}, "name", {set: setter})
    demand($.lookupGetter(obj, "name")).be.undefined()
  })
})

function setter() {}
function getter() {}
