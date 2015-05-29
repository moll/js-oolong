var $ = require("../..")

describe("Oolong.has", function() {
  it("must return false given an object without property", function() {
    $.has({}, "name").must.be.false()
  })

  it("must return true given an object with property", function() {
    $.has({"name": "John"}, "name").must.be.true()
  })

  it("must return true given a property set undefined", function() {
    $.has({"name": undefined}, "name").must.be.true()
  })

  it("must return true given an object with an inherited property",
    function() {
    $.has(Object.create({name: "John"}), "name").must.be.true()
  })
})
