module.exports = {
  root: true,
  env: {
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2]
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true
  }
}
