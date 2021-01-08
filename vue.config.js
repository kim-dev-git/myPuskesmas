process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    themeColor: "#fff",
    msTileColor: "#fff",
    name: "myPuskes",
  }
}