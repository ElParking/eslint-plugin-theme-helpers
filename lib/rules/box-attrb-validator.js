const astUtils = require('jsx-ast-utils');

const UNKNOWN_MESSAGE = "Box: Unknown attr '{{name}}'"

const VALID_BOX_ATTRB = ['flex', 'mr', 'ml', 'mb', 'mt', 'my', 'mx', 'alingSelf', 'pt', 'pl', 'pr', 'pb', 'px', 'py', 'p', 'w', 'width', 'is']
const VALID_GENERAL_ATTRB = ['dataTest', 'key']

function isAttrb(value) {
  return VALID_BOX_ATTRB.includes(value) || astUtils.eventHandlers.includes(value) || VALID_GENERAL_ATTRB.includes(value) 
}

module.exports = {
  create: function(context) {
    return {
      JSXElement(node) {
        const element = node.openingElement;
        if (astUtils.elementType(element)==='Box')
          (element.attributes).forEach(attr => {
            if (!isAttrb(attr.name.name)) {
              context.report({
                node,
                message: UNKNOWN_MESSAGE,
                data: {
                  name: attr.name.name,
                },
              })
            }
          });
      },
    }
  },
}
