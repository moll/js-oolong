var $ = require("../..")

describe("Oolong.forEach", function() {
  it("must be an alias to .each", function() {
    $.forEach.must.equal($.each)
  })
})
