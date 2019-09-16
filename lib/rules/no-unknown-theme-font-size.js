const UNKNOWN_MESSAGE = "Unknown theme font size '{{name}}'"

function isFontSizeValid({ type, value }, fontSizes) {
  return fontSizes.includes(value)
}

module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
         if (node.callee.name === 'themeFontSize') {
          const [firstArgument] = node.arguments
          if (firstArgument.type === 'Literal' && !isFontSizeValid(firstArgument, context.options[0].fontSizes)) {
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
