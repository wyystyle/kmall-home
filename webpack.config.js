const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const publicPath = '/';
const getHtmlConfig=(name)=>({
      template:'./src/view/'+name+'.html',
      filename:name +'.html',
      inject:true,
      hash:true,
      chunks:['common',name]
})
module.exports = {
	mode:'development',
  // mode:'production',
	entry:{
        common:'./src/pages/common/index.js',
        index:'./src/pages/index/index.js',
        userlogin:'./src/pages/userlogin/index.js'
		},
    //额外的引用jQuery
   /* externals:{
      'jquery':'window.jquery'
    },*/
	output:{
		filename:'js/[name].js',
    publicPath:publicPath,
		path:path.resolve(__dirname,'dist')
	},
  //配置别名
  resolve:{
    alias:{
      pages:path.resolve(__dirname,'./src/pages'),
      util:path.resolve(__dirname,'./src/util'),
      node_modules:path.resolve(__dirname,'./node_modules'),
      common:path.resolve(__dirname,'./src/pages/common')
    }
  },
	module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          "css-loader"
        ]
      },
      {
        test:/\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:100,
              name:'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test:/\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env','es2015','stage-3']
            }
        }               
      }, 

    ]
  },
 
  plugins:[
  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    }),
    new HtmlWebpackPlugin(
    	getHtmlConfig('index')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('userlogin')
    )
  ],
  devServer:{
  	contentBase:'./dist',
    port:3001,
    historyApiFallback:true,
    proxy:{
      "/user":"http://127.0.0.1:3000",
      changeOrigin:true
    }
  } 
};