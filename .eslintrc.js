module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    uni: true,
    App: true,
    Page: true,
    wx: true,
    swan: true,
    tt: true,
    my: true,
    getApp: true,
    getPage: true,
    getCurrentPages: true,
    requirePlugin: true
  }
};
