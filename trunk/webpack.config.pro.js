var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
/*var DEBUG = new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    });*/
module.exports = {
  entry: [
      './main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: './public'
  },
  module: {
    loaders:[
      {test: /\.js[x]?$/, exclude: /node_modules/,loader: 'babel-loader?presets[]=es2015&presets[]=react'},
      {test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //全局引用
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      $:__dirname+'/resource/assets/vendor/jq'
    }),
    new webpack.NoErrorsPlugin(),
    //将公共代码抽离出来合并为一个文件
    new CommonsChunkPlugin('common.js'),
    /*new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),*/
    new HtmlwebpackPlugin({
      title: '美食九段',
      template: './index.html'
    }),

  ],
  resolve: {
    root: [ __dirname + '/resource', __dirname + '/node_modules'],
    //配置别名，在项目中可缩减引用路径
    alias: {
        comp: __dirname + "/resource/assets/components",
        core: __dirname + "/resource/assets/core",
        vender: __dirname + "/resource/assets/vendor",
        page:__dirname + "/resource/assets/page",
        css:__dirname + "/resource/assets/css",
        reducers:__dirname + "/resource/assets/reducers",
        emp: __dirname + "/examples"
    },
    extensions: ['', '.js', '.jsx','.css', '.scss']
  },
};