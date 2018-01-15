# object-string-to-css 
Convert object or strings into valid CSS

## Install

```
$ npm install --save object-string-to-css
```

## Usage

```js
const objectStringToCSS = require('object-string-to-css');

objectStringToCSS({ 
  width: 100, 
  display: "flex",
  flexDirection: "column",
}, ".class")
/*
.class{
  width: 100px;
  display: flex;
  flex-direction: column;
}
*/
```

## API

### `function (string|object objectToChange, string selector): string`

Throws when
- Invalid JSON
- Invalid Parameter type

## FAQ

### Why?

Makes migrating my projects faster

## Help

If there is any problem with the package, please create an issue on github. Thanks!
