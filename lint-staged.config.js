module.exports = {
  // '*.{js,jsx,vue}': 'vue-cli-service lint'
  'src/**/*.{js,vue}': [
    'eslint --fix',
    'git add'
  ]
}
