module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2020, // support for JSX syntax and modern JavaScript features
    sourceType: 'module',
  },
  rules: {
    'react/no-unescaped-entities': 'off',
  },
};
