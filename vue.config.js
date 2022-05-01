module.exports = {
    chainWebpack: (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = " Affiliate Dashboard";
        return args;
      });
    },
    transpileDependencies: ["vuetify"],
    publicPath: "http://affiliate.surf2sawa.com/dashboard/",
  };