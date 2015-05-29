var $ = require("../..")

describe("Oolong.keys", function() {
  it("must return all enumerable keys of an object", function() {
    $.keys({a: 1, b: 2}).must.eql(["a", "b"])
  })

  it("must return inherited enumerable keys of an object", function() {
    $.keys(Object.create({a: 1, b: 2})).must.eql(["a", "b"])
  })
})
