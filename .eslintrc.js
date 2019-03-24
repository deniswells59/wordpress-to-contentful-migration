module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always']
  }
};
