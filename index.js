const allRules = {
  'no-unknown-theme-color': require('./lib/rules/no-unknown-theme-color'),
  'no-unknown-theme-font-size': require('./lib/rules/no-unknown-theme-font-size'),
  'no-unknown-theme-font-weight': require('./lib/rules/no-unknown-theme-font-weight'),
  'box-attrb-validator': require('./lib/rules/box-attrb-validator.js'),
  'flex-attrb-validator': require('./lib/rules/flex-attrb-validator.js'),
}

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: ['theme-helpers'],
      rules: {
        'theme-helpers/no-unknown-theme-color': 2,
      },
    },
    all: {
      plugins: ['theme-helpers'],
      rules: {
        'theme-helpers/no-unknown-theme-color': 2,
        'theme-helpers/no-unknown-theme-font-size': 2,
        'theme-helpers/no-unknown-theme-font-weight': 2,
        'theme-helpers/box-attrb-validator': 2,
        'theme-helpers/flex-attrb-validator': 2,
      },
    },
  },
}
