module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 8
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "airbnb-base"
  ],
  "rules": {
    "brace-style": [
      2,
      "stroustrup",
      {
        "allowSingleLine": true
      }
    ],
    "curly": [
      2,
      "multi-or-nest",
      "consistent"
    ],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "objectsInObjects": false
      }
    ],
    "vue/html-indent": [
      "error",
      4,
      {
        "attribute": 1
      }
    ],
    "indent": [
      "error",
      4,
      {
        "MemberExpression": 0
      }
    ],
    "vue/max-attributes-per-line": [
      1,
      {
        "singleline": 4,
        "multiline": {
          "max": 1,
          "allowFirstLine": true
        }
      }
    ],
    "vue/mustache-interpolation-spacing": [
      2,
      "never"
    ],
    "vue/valid-v-on": "off"
  }
};
