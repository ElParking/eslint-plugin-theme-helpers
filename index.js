const allRules = {
  'no-unknown-theme-color': require('./lib/rules/no-unknown-theme-color'),
  'no-unknown-theme-font-size': require('./lib/rules/no-unknown-theme-font-size'),
  'no-unknown-theme-font-weight': require('./lib/rules/no-unknown-theme-font-weight'),
  'jsx-no-literals': require('./lib/rules/jsx-no-literals'),
}

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    all: {
      plugins: ['theme-helpers'],
      rules: {
        'theme-helpers/jsx-no-literals': 1,
        'theme-helpers/no-unknown-theme-color': 2,
        'theme-helpers/no-unknown-theme-font-size': 2,
        'theme-helpers/no-unknown-theme-font-weight': 2,
      },
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
  },
}
