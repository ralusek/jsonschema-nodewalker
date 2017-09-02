Traverse JSON Schema from bottom up. Allows altering of structure or reformatting
to match other schema formats, even if the structure is immutable, as values
return in `onNode` callback will be placed at the node's position in a newly
formatted structure.


Given the following schema:
```javascript
const SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    actors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          gender: {
            type: 'string'
          }
        }
      }
    }
  }
};
```

`$ npm install --save jsonschema-nodewalker`

```javascript
const walkNodes = require('jsonschema-nodewalker');

```

To simply walk the nodes, we call:

```javascript
walkNodes(SCHEMA, (node, meta) => {
  // `node` will contain the schema node we're currently on
  // `meta` will contain metadata about the current node, such as whether it is
  // required, whether it is an array item, as well as the structures that its
  // children returned from their onNode functions.
});
```
