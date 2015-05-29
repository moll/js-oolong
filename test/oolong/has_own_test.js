var $ = require("../..")

describe("Oolong.hasOwn", function() {
  it("must return false given an object without property", function() {
    $.hasOwn({}, "name").must.be.false()
  })

  it("must return true given an object with property", function() {
    $.hasOwn({"name": "John"}, "name").must.be.true()
  })

  it("must return true given a property set undefined", function() {
    $.hasOwn({"name": undefined}, "name").must.be.true()
  })

  it("must return false given an object with an inherited property",
    function() {
    $.hasOwn(Object.create({name: "John"}), "name").must.be.false()
  })
})
