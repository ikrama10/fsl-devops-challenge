module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
};
