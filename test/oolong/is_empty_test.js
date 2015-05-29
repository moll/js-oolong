var $ = require("../..")

describe("Oolong.isEmpty", function() {
  it("must return true given an empty object", function() {
    $.isEmpty({}).must.be.true()
  })

  it("must return false given an non-empty object", function() {
    $.isEmpty({name: "John"}).must.be.false()
  })

  it("must return false given an object with an inherited property",
    function() {
    $.isEmpty(Object.create({name: "John"})).must.be.false()
  })
})
