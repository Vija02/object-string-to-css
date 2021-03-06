const chai = require('chai');
const objectStringToCSS = require('../index.js');

describe('index', function () {
  describe('#objectStringToCSS()', function () {
    it('should throw error if selector parameter is not a string', function () {
      chai.expect(() => objectStringToCSS({}, 1)).to.throw()
      chai.expect(() => objectStringToCSS({}, [])).to.throw()
    });
    it('should throw error if object parameter is not object or string', function () {
      chai.expect(() => objectStringToCSS(1, ".class")).to.throw()
      chai.expect(() => objectStringToCSS([], ".class")).to.throw()
      chai.expect(() => objectStringToCSS(null, ".class")).to.throw()
    });
    it('should throw error if object parameter string is not a valid JSON/Object', function () {
      chai.expect(() => objectStringToCSS("Random String", ".class")).to.throw()
      chai.expect(() => objectStringToCSS("{{}}", ".class")).to.throw()
      chai.expect(() => objectStringToCSS("{key: 'something\"}", ".class")).to.throw()
    });
    it('should put anything given to selector to the front', function () {
      const selector = ".random-class"
      const res = objectStringToCSS({}, selector)

      chai.expect(res.substring(0, selector.length) === selector).to.be.true

      const selector2 = ".random-class .random-class2"
      const res2 = objectStringToCSS({}, selector2)
      chai.expect(res2.substring(0, selector2.length) === selector2).to.be.true
    });
    it('should parse object to css correctly', function () {
      chai.expect(objectStringToCSS({ backgroundColor: "red" }, ".class").split("\n")[1] === "\tbackground-color: red;").to.be.true
      chai.expect(objectStringToCSS({ marginRight: "2em" }, ".class").split("\n")[1] === "\tmargin-right: 2em;").to.be.true
      chai.expect(objectStringToCSS({ flex: "1 1 0" }, ".class").split("\n")[1] === "\tflex: 1 1 0;").to.be.true
    });
    it('should parse appropriate number with px', function () {
      chai.expect(objectStringToCSS({ width: 100 }, ".class").split("\n")[1] === "\twidth: 100px;").to.be.true
      chai.expect(objectStringToCSS({ height: 500 }, ".class").split("\n")[1] === "\theight: 500px;").to.be.true

      chai.expect(objectStringToCSS({ zIndex: 5 }, ".class").split("\n")[1] === "\tz-index: 5;").to.be.true
      chai.expect(objectStringToCSS({ flex: 1 }, ".class").split("\n")[1] === "\tflex: 1;").to.be.true
    });
  });
});