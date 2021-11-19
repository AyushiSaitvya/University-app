const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
    entry : './src/index.js',
    output : {
               path : path.resolve(__dirname,'dist'),
               filename : 'index_bundle.js',
               publicPath: '/'

            },
            module :{
                rules :[ 
                       { test : /\.(js)$/,use : 'babel-loader'},
                       { test : /\.(css)$/,use:['style-loader','css-loader']},
                       {
                        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/
                        
                       },
                     
                       
                    ]
              },
              mode : 'development',
              devServer: {
                historyApiFallback: true,
                proxy: {
                  '/api': {
                       target: 'http://localhost:8081',
                       router: () => 'http://localhost:3030',
                       logLevel: 'debug' /*optional*/
                  }
               }
              },
plugins :[
  new HtmlWebpackPlugin({
     template : 'src/index.html'
    })
],

// watch: true
 }