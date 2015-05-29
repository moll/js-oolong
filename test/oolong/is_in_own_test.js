var $ = require("../..")

describe("Oolong.isInOwn", function() {
  it("must be an alias to .hasOwn", function() {
    $.isInOwn.must.equal($.hasOwn)
  })
})
