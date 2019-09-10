const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unknown-theme-color')

const ruleTester = new RuleTester()

ruleTester.run('no-unknown-theme-color', rule, {
  valid: [
    {
      code: "themeColor('darkGray');",
    },
    {
      code: 'themeColor(colorName);',
    },
  ],
  invalid: [
    {
      code: "themeColor('darGray');",
      errors: [
        {
          message: "Unknown theme color 'darGray'",
        },
      ],
    },
  ],
})
