module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  // Define the rules for your project.
  rules: {
    // Example rule: disallow the use of 'console'.
    'no-lone-blocks': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-alert': 'off',
    'no-console': 'off',
    // 'no-shadow': 'error',

    // More rules can be added here...
  },
};
