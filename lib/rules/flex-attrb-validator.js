const astUtils = require('jsx-ast-utils');

const UNKNOWN_MESSAGE = "Flex: Unknown attr '{{name}}'"

const VALID_FLEX_ATTRB = ['flex', 'mr', 'ml', 'mb', 'mt', 'my', 'mx',
 'alingSelf', 'pt', 'pl', 'pr', 'pb', 'px', 'py', 'p',
  'w', 'width', 'is', 'flexWrap', 'alignItems', 'justifyContent', 'flexDirection']
const VALID_GENERAL_ATTRB = ['dataTest', 'key']

function isAttrb(value) {
  return VALID_FLEX_ATTRB.includes(value) || astUtils.eventHandlers.includes(value) || VALID_GENERAL_ATTRB.includes(value) 
}

module.exports = {
  create: function(context) {
    return {
      JSXElement(node) {
        const element = node.openingElement;
        if (astUtils.elementType(element)==='Flex')
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
