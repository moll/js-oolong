var $ = require("../..")

describe("Oolong.isPlainObject", function() {
  it("must return true given an object literal", function() {
    $.isPlainObject({}).must.be.true()
  })

  it("must return true given an object inheriting from a literal",
    function() {
    $.isPlainObject(Object.create({})).must.be.true()
  })

  it("must return true given Object.prototype", function() {
    $.isPlainObject(Object.prototype).must.be.true()
  })

  it("must return true given an Object inheritng from null", function() {
    $.isPlainObject(Object.create(null)).must.be.true()
  })

  it("must return true given Math", function() {
    $.isPlainObject(Math).must.be.true()
  })

  it("must return true given JSON", function() {
    $.isPlainObject(JSON).must.be.true()
  })

  // Arguments have all the qualities of a plain object, so it might as well
  // be one.
  it("must return true given arguments", function() {
    $.isPlainObject(arguments).must.be.true()
  })

  it("must return false given undefined", function() {
    $.isPlainObject(undefined).must.be.false()
  })

  it("must return false given null", function() {
    $.isPlainObject(null).must.be.false()
  })

  it("must return false given a number", function() {
    $.isPlainObject(1).must.be.false()
  })

  it("must return false given a string", function() {
    $.isPlainObject("").must.be.false()
  })

  it("must return false given a function", function() {
    $.isPlainObject(noop).must.be.false()
  })

  it("must return false given a regular expression", function() {
    $.isPlainObject(/./).must.be.false()
  })

  it("must return false given an instance of Date", function() {
    $.isPlainObject(new Date).must.be.false()
  })

  it("must return false given an instance of a class", function() {
    function Model() {}
    $.isPlainObject(new Model).must.be.false()
  })

  it("must return false given an object inheriting from an instance",
    function() {
    function Model() {}
    $.isPlainObject(Object.create(new Model)).must.be.false()
  })
})

function noop() {}
