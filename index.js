const allRules = {
  'no-unknown-theme-color': require('./lib/rules/no-unknown-theme-color'),
  'no-unknown-theme-font-size': require('./lib/rules/no-unknown-theme-font-size'),
  'no-unknown-theme-font-weight': require('./lib/rules/no-unknown-theme-font-weight'),
}

module.exports = {
  rules: allRules,
  configs: {
    all: {
      plugins: ['theme-helpers'],
      rules: {
        'theme-helpers/no-unknown-theme-color': 2,
        'theme-helpers/no-unknown-theme-font-size': 2,
        'theme-helpers/no-unknown-theme-font-weight': 2,
      },
    },
  },
}
