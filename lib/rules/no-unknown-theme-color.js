const UNKNOWN_MESSAGE = "Unknown theme color '{{name}}'"

function isColorName({type, value}, colors) {
  return colors.includes(value)
}

module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
         if (node.callee.name === 'themeColor') {
          const [firstArgument] = node.arguments
          const [colors] = context.options
          if (firstArgument.type === 'Literal' && colors.colors && !isColorName(firstArgument, colors.colors)) {
            context.report({
              node,
              loc: firstArgument.loc,
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
