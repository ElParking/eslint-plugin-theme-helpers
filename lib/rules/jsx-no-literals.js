'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
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
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const isNoStrings = context.options[0] ? context.options[0].noStrings : false;
    const allowedStrings = context.options[0] ? new Set(context.options[0].allowedStrings) : false;

    const message = isNoStrings ?
      'Strings not allowed in JSX files' :
      'Missing JSX expression container around literal string';

    function reportLiteralNode(node) {
      let fixable = false
      let moreOptions = null
      if (context.options[1]) {
        const { prefix, sufix } = moreOptions
        moreOptions = context.options[1]
        fixable = prefix || sufix
      }
      context.report({
        node,
        message: `${message}: “${context.getSourceCode().getText(node).trim()}”`,
        fix: fixable ? function(fixer) {
            if (sufix) {
                fixer.insertTextAfter(node, sufix)
            }
            if (prefix) {
                fixer.insertTextBefore(node, prefix);
            }
            return node
        } : null
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