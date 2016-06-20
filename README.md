# react

启动服务：npm start

访问地址：http://localhost/

react+redux+weback

webpack配置：

var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
/*
extract-text-webpack-plugin插件，
将你的样式提取到单独的css文件里，如果没有它的话，webpack会将css打包到js当中
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
      './main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: './public',
    publicPath:'http://nine.tootoo.cn/'
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
      React: "react",//加载react
      ReactDOM: "react-dom",//加载react-dom
      $:__dirname+'/resource/assets/vendor/util',//加载util.js
      gb:__dirname+'/resource/assets/vendor/global'//加载global.js
    }),
    new webpack.NoErrorsPlugin(),
    //将公共代码抽离出来合并为一个文件
    new CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的 publickPath
    //压缩js
    /*new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),*/
    //html-webpack-plugin 插件，动态为html加入js和css
    new HtmlwebpackPlugin({
      title: '测试',
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
    },
    ////自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.jsx','.css', '.scss']
  },
};
