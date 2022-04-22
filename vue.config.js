const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api-factory.simbirsoft1.com',
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simbirsoft-2/'
    : '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";

        `,
      },
    },
  },
};
