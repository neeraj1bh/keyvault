module.exports = {
  '*/**/*.{js,ts}': ['prettier --write', 'eslint --fix'],
  '*/**/*.{json,css,md}': ['prettier --write'],
};
