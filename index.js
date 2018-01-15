var paramCase = require('param-case')
var isNumeric = require('isnumeric')
var isString = require('is-string')
var isPlainObject = require('is-plain-object')
var addPxToStyle = require('add-px-to-style');

// Convert object string into proper JSON
function JSONize(str) {
  return str
    // Wrap keys without quote with double quotes
    .replace(/([\$\w]+)\s*:/g, function (_, $1) { return '"' + $1 + '":' })
    // Replace single quote wrapped ones to double quotes
    .replace(/'([^']+)'/g, function (_, $1) { return '"' + $1 + '"' })
}

module.exports = function (objParam, selectorParam) {
  var object
  var selector = selectorParam !== undefined ? selectorParam : "";

  // Get an object out of the input
  if (isString(objParam)) {
    object = JSON.parse(JSONize(objParam))
  } else if (isPlainObject(objParam)) {
    object = objParam
  } else {
    throw new SyntaxError("Object should be either string or an object")
  }

  if (!isString(selectorParam)) {
    throw new SyntaxError("Selector should be a string")
  }

  var cssArray = []

  cssArray.push(selector + "{")
  // Push the css lines
  for (var key in object) {
    var value = object[key]
    if (isNumeric(value)) {
      value = addPxToStyle(key, value)
    }
    cssArray.push("\t" + paramCase(key) + ": " + value + ";")
  }
  cssArray.push("}")

  return cssArray.join("\n")
}