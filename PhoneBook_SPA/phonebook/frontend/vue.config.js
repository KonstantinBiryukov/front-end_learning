module.exports = {
    outputDir: "../public/dist",
    filenameHashing: false,

    devServer: {
        proxy: 'http://localhost:3000'
    },

    chainWebpack: config => {
        config.plugins.delete("html");
        config.plugins.delete("preload");
        config.plugins.delete("prefetch");
    }
};