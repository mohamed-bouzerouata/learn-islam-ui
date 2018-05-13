module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],

  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  plugins: ['flowtype'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    graphql: true,
  },
  rules: {
    camelcase: 0,
    'flowtype/space-after-type-colon': 0,
    'flowtype/space-before-type-colon': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'no-underscore-dangle': 0,
    'no-unexpected-multiline': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-array-index-key': 0,
    'react/no-danger': 0,
    'react/require-default-props': 0,
    'react/self-closing-comp': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}
