'use strict';

function walkNodes(node, onNode, meta) {
  onNode(node, meta);
  
  meta = Object.assign({}, meta || {});
  delete meta.isArrayItem;
  delete meta.name;
  
  if (node.type === 'array') {
    meta.isArrayItem = true;
    walkNodes(node.items, onNode, meta);
  }
  else if (node.type === 'object') {
    for (let prop in node.properties) {
      meta.name = prop;
      walkNodes(node.properties[prop], onNode, meta);
    }
  }
};

module.exports = walkNodes;
