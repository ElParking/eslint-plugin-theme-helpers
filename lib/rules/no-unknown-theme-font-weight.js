const UNKNOWN_MESSAGE = "Unknown theme font weight '{{name}}'"

function isFontWeightValid({ type, value }, fontWeights) {
  return fontWeights.includes(value)
}

module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
         if (node.callee.name === 'themeFontWeight') {
          const [firstArgument] = node.arguments
          const [fontWeights] = context.options
          if (firstArgument.type === 'Literal' && fontWeights.fontWeights && !isFontWeightValid(firstArgument, fontWeights.fontWeights)) {
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
