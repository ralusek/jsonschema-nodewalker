'use strict';

/**
 *
 */
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

module.exports.walkNodes = walkNodes;


/**
 *
 */
function modifyNodes(node, onNode, meta) {
  node = Object.assign({}, onNode(node, meta));

  meta = Object.assign({}, meta || {});
  delete meta.isArrayItem;
  delete meta.name;
  
  if (node.type === 'array') {
    meta.isArrayItem = true;
    node.items = modifyNodes(node.items, onNode, meta);
  }
  else if (node.type === 'object') {
    node.properties = Object.assign({}, node.properties);
    for (let prop in node.properties) {
      meta.name = prop;
      node.properties[prop] = modifyNodes(node.properties[prop], onNode, meta);
    }
  }

  return node;
}

module.exports.modifyNodes = modifyNodes;
