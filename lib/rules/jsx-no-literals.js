'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const ATTRIBUTE_FIX = 'ATTRIBUTE_FIX'
const DEFAULT_FIX = 'DEFAULT_FIX'

module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'Prevent using string literals in React component definition',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [{
      type: 'object',
      properties: {
        noStrings: {
          type: 'boolean'
        },
        allowedStrings: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string'
          }
        },
        prefix: {
          type: 'string'
        },
        sufix: {
          type: 'string'
        },
        warningAttributes: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string'
          }
        },
        warningFunctions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name:  {
                type: 'string'
              },
              arguments: {
                type: 'array',
                items: {
                  type: 'number'
                }
              }
            }
          }
        },
      },
      additionalProperties: {},
    }]
  },

  create(context) {
    const isNoStrings = context.options[0] ? context.options[0].noStrings : false;
    const allowedStrings = context.options[0] ? new Set(context.options[0].allowedStrings) : false;
    const prefix = context.options[0] && context.options[0].prefix
    const sufix = context.options[0] && context.options[0].sufix
    const warningFunctions = (context.options[0] && context.options[0].warningFunctions) || []
    const warningAttributes = (context.options[0] && context.options[0].warningAttributes) || []

    const message = isNoStrings ?
      'Strings not allowed in JSX files' :
      'Missing JSX expression container around literal string';

    function reportLiteralNode(node, type=DEFAULT_FIX) {
      context.report({
        node,
        message: `${message}: “${context.getSourceCode().getText(node).trim()}”`,
        fix (fixer) {
          if (prefix && sufix && node && node.value) {
            const value = `${prefix}${node.value}${sufix}`
            if (type === ATTRIBUTE_FIX) {
              return fixer.replaceText(node, '{' + value + '}')
            }
            return fixer.replaceText(node, value)
          }
          return null
        }
      });
    }

    function getParentIgnoringBinaryExpressions(node) {
      let current = node;
      while (current.parent.type === 'BinaryExpression') {
        current = current.parent;
      }
      return current.parent;
    }

    function getValidation(node) {
      if (allowedStrings && allowedStrings.has(node.value)) {
        return false;
      }
      const parent = getParentIgnoringBinaryExpressions(node);

      let standard = false
      let type = DEFAULT_FIX
      if (typeof node.value === 'string' && parent.type.indexOf('JSX') !== -1) {
          if (parent.type !== 'JSXAttribute') {
            standard = !/^[\s]+$/.test(node.value)
          }
          if (node.parent.type === 'JSXAttribute') {
            const myAttr = warningAttributes.find((att) => att === node.parent.name.name)
            if (myAttr) {
              type = ATTRIBUTE_FIX
              standard = !/^[\s]+$/.test(node.value)
            }
          }
      }
      
      if (isNoStrings) {
        return {
          standard,
          type
        }
      }
      return {
        standard: standard && parent.type !== 'JSXExpressionContainer',
        type,
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (warningFunctions.length > 0) {
          const name = node.callee.name || (node.callee.property && node.callee.property.name)
          const fn = warningFunctions.find((fn) => fn.name === name)
          if (name && fn) {
            fn.arguments.forEach ((arg) => {
              const myArg = node.arguments[arg-1]
              if (myArg.type === 'Literal') {
                reportLiteralNode(myArg);
              }
            })
          }
        }
     },

      Literal(node) {
        const {standard, type} = getValidation(node)
        if (standard) {
          reportLiteralNode(node, type);
        }
      },

      JSXText(node) {
        const {standard, type} = getValidation(node)
        if (standard) {
          reportLiteralNode(node, type);
        }
      },

      TemplateLiteral(node) {
        const parent = getParentIgnoringBinaryExpressions(node);
        if (isNoStrings && parent.type === 'JSXExpressionContainer') {
          reportLiteralNode(node);
        }
      }
    }
  }
}