const UNKNOWN_MESSAGE = "Unknown theme font size '{{name}}'"

function isFontSizeValid({type, value}, fontSizes) {
  return fontSizes.includes(value)
}

module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
         if (node.callee.name === 'themeFontSize') {
          const [firstArgument] = node.arguments
          const [fontSizes] = context.fontSizes
          if (firstArgument.type === 'Literal' && fontSizes.fontSizes && !isFontSizeValid(firstArgument, fontSizes.fontSizes)) {
            context.report({
              node,
              message: UNKNOWN_MESSAGE,
              data: {
                name: firstArgument.value,
              },
            })
          }
        }
      },
    }
  },
}
