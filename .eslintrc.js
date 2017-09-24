// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    // required to lint *.vue files
    plugins: [
        'vue', 'html'
    ],
    extends: [
        'semistandard',
        'plugin:vue/recommended'
    ],
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ['error', 4, { 'MemberExpression': 0 }],
        'space-before-function-paren': [2, 'never'],
        'one-var': [2, { var: 'always', let: 'always', const: 'never' }],
        'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
        'curly': [2, 'multi-or-nest', 'consistent'],
        'dot-location': ['error', 'property'],
        'no-unneeded-ternary': ['error', { 'defaultAssignment': false }],
        'max-nested-callbacks': ['error', 5]

    }
};
