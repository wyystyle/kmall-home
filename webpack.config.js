const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const publicPath = '/';
const getHtmlConfig=(name,title)=>({
      template:'./src/view/'+name+'.html',
      filename:name +'.html',
      title:title,
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
        userlogin:'./src/pages/userlogin/index.js',
        user_register:'./src/pages/user_register/index.js',
        result:'./src/pages/result/index.js',
        user_center:'./src/pages/user_center/index.js',
        user_update_password:'./src/pages/user_update_password/index.js',
        list:'./src/pages/list/index.js',
        detail:'./src/pages/detail/index.js'
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
      common:path.resolve(__dirname,'./src/pages/common'),
      service:path.resolve(__dirname,'./src/service'),
      images:path.resolve(__dirname,'./src/images')
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
      {
        test:/\.tpl$/,
        use: {
            loader: 'html-loader'
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
    	getHtmlConfig('index','首页')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('userlogin','登录')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('user_register','注册')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('result','操作成功')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('user_center','用户中心')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('user_update_password','用户中心')
    ),
    new HtmlWebpackPlugin(
      getHtmlConfig('list','商品列表')
    ), 
    new HtmlWebpackPlugin(
      getHtmlConfig('detail','商品详情')
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