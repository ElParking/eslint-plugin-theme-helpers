const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unknown-theme-color')

const fakeColors = ["darkGray"]

const ruleTester = new RuleTester()

ruleTester.run('no-unknown-theme-color', rule, {
  valid: [
    {
      code: "themeColor('darkGray');",
      options: [{colors: fakeColors}]
    },
    {
      code: 'themeColor(colorName);',
      options: [{colors: fakeColors}]
    },
    {
      code: 'themeColor(colorName);',
      options: []
    },
  ],
  invalid: [
    {
      code: "themeColor('darGray');",
      options: [{colors: fakeColors}],
      errors: [
        {
          message: "Unknown theme color 'darGray'",
        },
      ],
    },
  ],
})
