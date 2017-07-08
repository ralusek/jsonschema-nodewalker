Given the following schema:
```
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

```js
const walkNodes = require('jsonschema-nodewalker');

walkNodes(SCHEMA, (node, {name} = {}) => console.log('Hello from:', name));
```

That's it! You can do whatever you'd like in the `onNode` callback, here we're
just logging the value out, but you could of course modify the node or anything
else.

The logger example above gives us an output of:
`Hello from: undefined`
`Hello from: title`
`Hello from: actors`
`Hello from: undefined`
`Hello from: name`
`Hello from: gender`
