# Detect color not defined in the theme (theme-helpers/no-unknown-theme-color)

Warn if `themeColor` is called with an argument what is not containing in array `colors`

## Rule Options

```js
const maggieColors = ['red', 'blue']
...
{
    colors: maggieColors
}
...
```

Rule fail with
```js
const maggieColors = ['red', 'blue']
...
themeColor('rde')
...
```
Rule success with
```js
const maggieColors = ['red', 'blue']
...
themeColor('red')
...
```

