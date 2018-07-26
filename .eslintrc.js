module.exports = {
  // Use only this configuration
  root: true,
  // File parser
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Use babel-eslint for JavaScript
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    // With import/export syntax
    'sourceType': 'module'
  },
  // Environment global objects
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead
    'plugin:vue/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],

    // Vue

   // Error
   'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      "singleline": 2,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    // Warn
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn',
  },
  globals: {
    "TimelineLite": false,
    "TimelineMax": false,
    "TweenLite": false,
    "TweenMax": false,
    "Back": false,
    "Bounce": false,
    "Circ": false,
    "Cubic": false,
    "Ease": false,
    "EaseLookup": false,
    "Elastic": false,
    "Expo": false,
    "Linear": false,
    "Power0": false,
    "Power1": false,
    "Power2": false,
    "Power3": false,
    "Power4": false,
    "Quad": false,
    "Quart": false,
    "Quint": false,
    "RoughEase": false,
    "Sine": false,
    "SlowMo": false,
    "SteppedEase": false,
    "Strong": false,
    "Draggable": false,
    "SplitText": false,
    "VelocityTracker": false,
    "CSSPlugin": false,
    "ThrowPropsPlugin": false,
    "BezierPlugin": false
  }
}