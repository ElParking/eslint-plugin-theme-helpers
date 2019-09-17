# Detect color not defined in the theme (theme-helpers/no-unknown-theme-color)

Warn if `themeFontWeight` is called with an argument what is not containing  `fontWeights` array

## Rule Options

```js
...
{
    fontWeights: maggieFontWeights
}
...
```

Rule fail with
```js
const maggieFontWeights = ['book', 'medium']
...
themeFontWeight('medimu')
...
```
Rule success with
```js
const maggieFontWeights = ['book', 'medium']
...
themeFontWeight('book')
...
```
