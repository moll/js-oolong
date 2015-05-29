var $ = require("../..")

describe("Oolong.isOwnEmpty", function() {
  it("must return true given an empty object", function() {
    $.isOwnEmpty({}).must.be.true()
  })

  it("must return false given an non-empty object", function() {
    $.isOwnEmpty({name: "John"}).must.be.false()
  })

  it("must return false given an object with hasOwnProperty", function() {
    $.isOwnEmpty({hasOwnProperty: 42}).must.be.false()
  })

  it("must return true given an object with an inherited property",
    function() {
    $.isOwnEmpty(Object.create({name: "John"})).must.be.true()
  })
})
