'use strict';



/**
 *
 */
function walkNodes(node, onNode, meta = {}) {
  const { lineage = [] } = meta;

  const childMeta = {
    lineage: [...lineage, node]
  };

  if (node.type === 'array') {
    childMeta.isArrayItem = true;
    meta.childArrayItem = walkNodes(node.items, onNode, childMeta);
  }
  else if (node.type === 'object') {
    const required = new Set(node.required || []);

    const childProps = meta.childObjectProperties = {};
    for (let prop in node.properties) {
      childMeta.name = prop;
      childMeta.isRequired = required.has(prop);
      childProps[prop] = walkNodes(node.properties[prop], onNode, childMeta);
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
