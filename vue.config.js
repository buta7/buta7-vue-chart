module.exports = {
    devServer: {
        port: 3000,
        disableHostCheck: true,
        proxy: {
            '/api/': {
                target: process.env.VUE_APP_BASE_URL
            }
        }
    },

    transpileDependencies: [
      'vuetify',
      'element-ui'
    ]
};
