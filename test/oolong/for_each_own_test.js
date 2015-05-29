var $ = require("../..")

describe("Oolong.forEachOwn", function() {
  it("must be an alias to .eachOwn", function() {
    $.forEachOwn.must.equal($.eachOwn)
  })
})
