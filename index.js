const allRules = {
  'no-unknown-theme-color': require('./lib/rules/no-unknown-theme-color'),
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
      },
    },
  },
}
