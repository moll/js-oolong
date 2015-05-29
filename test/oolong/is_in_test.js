var $ = require("../..")

describe("Oolong.isIn", function() {
  it("must be an alias to .has", function() {
    $.isIn.must.equal($.has)
  })
})
