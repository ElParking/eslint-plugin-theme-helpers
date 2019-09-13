const UNKNOWN_MESSAGE = "Unknown theme color '{{name}}'"

const COLOR_PROP_NAMES = [
  'main',
  'darkMain',
  'lightMain',
  'darkGray',
  'mediumDarkGray',
  'mediumGray',
  'lightGray',
  'extraLightGray',
  'white',
  'black',
  'mediumBlack',
  'blue',
  'green',
  'yellow',
  'red',
  'googleRed',
  'orange',
  'teal',
  'gold',
  'yellowOrange',
  'mintGreen',
  'facebookBlue',
  'darkFacebookBlue',
]

function isColorName({ type, value, colors }) {
  return colors.includes(value)
}

module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
        console.log("Rule", {options: context.options[0].colors})
        if (node.callee.name === 'themeColor') {
          const [firstArgument] = node.arguments

          if (firstArgument.type === 'Literal' && !isColorName(firstArgument, context.options[0].colors)) {
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
