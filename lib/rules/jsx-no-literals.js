'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

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
      },
      additionalProperties: {},
    }]
  },

  create(context) {
    const isNoStrings = context.options[0] ? context.options[0].noStrings : false;
    const allowedStrings = context.options[0] ? new Set(context.options[0].allowedStrings) : false;
    const prefix = context.options[0] && context.options[0].prefix
    const sufix = context.options[0] && context.options[0].sufix

    const message = isNoStrings ?
      'Strings not allowed in JSX files' :
      'Missing JSX expression container around literal string';

    function reportLiteralNode(node) {
      context.report({
        node,
        message: `${message}: “${context.getSourceCode().getText(node).trim()}”`,
        fix (fixer) {
          if (prefix && sufix && node && node.value) {
            return fixer.replaceText(node, `${prefix}${node.value}${sufix}`)
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
      const standard = !/^[\s]+$/.test(node.value) &&
          typeof node.value === 'string' &&
          parent.type.indexOf('JSX') !== -1 &&
          parent.type !== 'JSXAttribute';
      if (isNoStrings) {
        return standard;
      }
      return standard && parent.type !== 'JSXExpressionContainer';
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      Literal(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      JSXText(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      TemplateLiteral(node) {
        const parent = getParentIgnoringBinaryExpressions(node);
        if (isNoStrings && parent.type === 'JSXExpressionContainer') {
          reportLiteralNode(node);
        }
      }

    };
  }
};