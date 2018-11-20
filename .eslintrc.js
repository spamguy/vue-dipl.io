const { resolve } = require('path');

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2018
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        alias: {
                            '@': resolve('src')
                        },
                        extensions: ['.js', '.vue']
                    }
                }
            }
        }
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'airbnb-base'
    ],
    rules: {
        'nonblock-statement-body-position': ['error', 'below'],
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'comma-dangle': ['error', 'never'],
        'max-len': ['error', {
            code: 100,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'brace-style': [
            2,
            'stroustrup',
            {
                allowSingleLine: true
            }
        ],
        curly: [
            2,
            'multi-or-nest',
            'consistent'
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always',
            {
                objectsInObjects: false
            }
        ],
        indent: [
            'error',
            4,
            {
                MemberExpression: 0
            }
        ],

        // VUE RULES

        'vue/max-attributes-per-line': [
            1,
            {
                singleline: 4,
                multiline: {
                    max: 1,
                    allowFirstLine: true
                }
            }
        ],
        'vue/mustache-interpolation-spacing': [
            2,
            'never'
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1
            }
        ],
        'vue/valid-v-on': 'off'
    }
};
