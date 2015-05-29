var $ = require("../..")

describe("Oolong.ownKeys", function() {
  it("must return all enumerable keys of an object", function() {
    $.ownKeys({a: 1, b: 2}).must.eql(["a", "b"])
  })

  it("must not return inherited enumerable keys of an object", function() {
    var obj = Object.create({a: 1})
    obj.b = 2
    $.ownKeys(obj).must.eql(["b"])
  })
})
