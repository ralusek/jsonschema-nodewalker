'use strict';

const walkNodes = require('../lib');

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'number' },
    configuration: {
      type: 'object',
      properties: {
        active: { type: 'boolean' },
        description: { type: 'string' },
        disabled: {
          type: 'object',
          properties: {
            blockA: { type: 'boolean'},
            blockB: { type: 'boolean' }
          }
        }
      }
    }
  },
  required: ['name']
};

walkNodes(schema, (...args) => {
  console.log(args);
});
