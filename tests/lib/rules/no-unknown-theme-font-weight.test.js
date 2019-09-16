const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unknown-theme-font-weight')

const fakeFontWeight = ["medium"]

const ruleTester = new RuleTester()

ruleTester.run('no-unknown-theme-color', rule, {
  valid: [
    {
      code: "themeFontWeight('medium');",
      options: [{fontWeights: fakeFontWeight}]
    },
    {
      code: 'themeFontWeight(fontSize);',
      options: [{fontWeights: fakeFontWeight}]
    },
    {
      code: 'themeFontSize(fontSize);',
      options: []
    },
  ],
  invalid: [
    {
      code: "themeFontWeight('fake_weight');",
      options: [{fontWeights: fakeFontWeight}],
      errors: [
        {
          message: "Unknown theme font weight 'fake_weight'",
        },
      ],
    },
  ],
})
