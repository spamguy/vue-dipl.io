// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        es6: true
    },
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    extends: [
        'semistandard',
        'plugin:vue/recommended'
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': [2, 'never'],
        'one-var': [2, { var: 'always', let: 'always', const: 'never' }],
        'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
        'curly': [2, 'multi-or-nest', 'consistent'],
        'dot-location': ['error', 'property'],
        'no-unneeded-ternary': ['error', { 'defaultAssignment': false }],
        'max-nested-callbacks': ['error', 5],
        'array-bracket-spacing': ["error", "never"],
        'object-curly-spacing': ["error", "always", { "objectsInObjects": false }],
        'vue/html-indent': ['error', 4, {
            attribute: 1
        }],
        'indent': ['error', 4, { 'MemberExpression': 0 }],
        'vue/max-attributes-per-line': [1, {
            singleline: 4,
            multiline: {
                max: 1,
                allowFirstLine: true
            }
        }],
        'vue/mustache-interpolation-spacing': [2, 'never']
    }
};
