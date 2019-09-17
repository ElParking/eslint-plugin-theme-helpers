ESLint-plugin-theme-helpers
===================

# Description

There are some helpers which retrieve theme params (color, fonts, sizes...). The plugin ensure that arguments passed through these helpers exist in current theme.

# Configuration

There isn't recommended configuration because all rules exported in this plugin need custom parameters depends of your project's theme. 

Add "theme-helpers" to the plugins section.

```json
{
  "plugins": [
      "@elparking/eslint-plugin-theme-helpers"
  ]
}
```

Enable the rules that you would like to use with its arguments.

```javascript
    'rules': {
      'theme-helpers/no-unknown-theme-color': [
        2, 
        {
          colors: maggieColors
        }
      ],
      'theme-helpers/no-unknown-theme-font-size': [
        2, 
        {
          fontSizes: maggieFontSizes
        }
      ],
      'theme-helpers/no-unknown-theme-font-weight': [
        2, 
        {
          fontWeights: maggieFontWeights
        }
      ],
    }
```

# List of supported rules

* [theme-helpers/no-unknown-theme-color](docs/rules/no-unknown-theme-color.md): Checks arguments pass to `themeColor` in order to ensure is a correct color
* [theme-helpers/no-unknown-theme-font-size](docs/rules/no-unknown-theme-font-size.md): Checks arguments pass to `themeFontSize` in order to ensure is a correct font size
* [theme-helpers/no-unknown-theme-font-weight](docs/rules/no-unknown-theme-font-weight.md): Checks arguments pass to `themeFontWeight` in order to ensure is a correct font weights