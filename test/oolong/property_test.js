var $ = require("../..")
var demand = require("must")

describe("Oolong.property", function() {
  it("must return a function that returns the given property", function() {
    var obj = {name: "John"}
    $.property("name")(obj).must.equal("John")
  })

  it("must return inherited properties", function() {
    var obj = Object.create({name: "John"})
    $.property("name")(obj).must.equal("John")
  })

  it("must return undefined given a non-existent property", function() {
    demand($.property("name")({})).be.undefined()
  })
})
