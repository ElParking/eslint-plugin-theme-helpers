const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unknown-theme-font-size')

const fakeFontSizes = ["large"]

const ruleTester = new RuleTester()

ruleTester.run('no-unknown-theme-color', rule, {
  valid: [
    {
      code: "themeFontSize('large');",
      options: [{fontSizes: fakeFontSizes}]
    },
    {
      code: 'themeFontSize(fontSize);',
      options: [{fontSizes: fakeFontSizes}]
    },
    {
      code: 'themeFontSize(fontSize);',
      options: []
    },
  ],
  invalid: [
    {
      code: "themeFontSize('fake_size');",
      options: [{fontSizes: fakeFontSizes}],
      errors: [
        {
          message: "Unknown theme font size 'fake_size'",
        },
      ],
    },
  ],
})
