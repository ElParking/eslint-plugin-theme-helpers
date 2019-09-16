# Detect color not defined in the theme (theme-helpers/no-unknown-theme-color)

Warn if `themeFontSize` is called with an argument what is not containing in array `fontSizes`

## Rule Options

```js
...
{
    fontSizes: maggieFontSizes
}
...
```
Rule fail with
```js
const maggieFontSizes = ['large', 'xxlarge']
...
themeFontSize('Large')
...
```
Rule success with
```js
const maggieFontSizes = ['large', 'xxlarge']
...
themeFontSize('large')
...
```

