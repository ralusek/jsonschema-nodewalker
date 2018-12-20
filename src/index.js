'use strict';



/**
 *
 */
function walkNodes(node, onNode, meta) {
  return _walkNodes(node, onNode, meta, {isRoot: true});
}


function _walkNodes(node, onNode, meta = {}, {isRoot} = {}) {
  const { lineage = [], path = [] } = meta;

  const childMeta = {
    lineage: [...lineage, node],
    path: isRoot ? path : [...path, meta.name]
  };

  if (node.type === 'array') {
    childMeta.isArrayItem = true;
    meta.childArrayItem = _walkNodes(node.items, onNode, childMeta);
  }
  else if (node.type === 'object') {
    const required = new Set(node.required || []);

    const childProps = meta.childObjectProperties = {};
    for (let prop in node.properties) {
      childMeta.name = prop;
      childMeta.isRequired = required.has(prop);
      childProps[prop] = _walkNodes(node.properties[prop], onNode, childMeta);
    }
  }

  return onNode(node, meta);
}


/**
 *
 */
module.exports = (node, onNode) => {
  return walkNodes(node, onNode);
};
