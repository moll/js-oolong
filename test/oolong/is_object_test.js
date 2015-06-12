var $ = require("../..")

describe("Oolong.isObject", function() {
  it("must return true given an object literal", function() {
    $.isObject({}).must.be.true()
  })

  it("must return true given an object inheriting from a literal",
    function() {
    $.isObject(Object.create({})).must.be.true()
  })

  it("must return true given Object.prototype", function() {
    $.isObject(Object.prototype).must.be.true()
  })

  it("must return true given an Object inheritng from null", function() {
    $.isObject(Object.create(null)).must.be.true()
  })

  it("must return true given Math", function() {
    $.isObject(Math).must.be.true()
  })

  it("must return true given JSON", function() {
    $.isObject(JSON).must.be.true()
  })

  // Arguments have all the qualities of an object, so it might as well be one.
  it("must return true given arguments", function() {
    $.isObject(arguments).must.be.true()
  })

  it("must return false given undefined", function() {
    $.isObject(undefined).must.be.false()
  })

  it("must return false given null", function() {
    $.isObject(null).must.be.false()
  })

  it("must return false given a number", function() {
    $.isObject(1).must.be.false()
  })

  it("must return false given a string", function() {
    $.isObject("").must.be.false()
  })

  it("must return false given a function", function() {
    $.isObject(noop).must.be.false()
  })

  it("must return true given a regular expression", function() {
    $.isObject(/./).must.be.true()
  })

  it("must return true given an instance of Date", function() {
    $.isObject(new Date).must.be.true()
  })

  it("must return true given an instance of a class", function() {
    function Model() {}
    $.isObject(new Model).must.be.true()
  })
})

function noop() {}
