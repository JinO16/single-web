const cssnanoPlugin = require('cssnano');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path  = require('path');

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
      postcssOptions: {
          plugins: [
              autoprefixer({
                  overrideBrowserslist: [
                      '> 1%',
                      'last 2 versions',
                      'not ie <= 8'
                  ]
              }),
              cssnanoPlugin({
                preset: 'default'
              })
          ]
      }
  }
};

module.exports = {
  // 入口文件，这里之后会着重强调
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname,'../src'),
      '@pages': path.resolve(__dirname, '../src/pages')
    },
    // 指定在解析模块时要尝试的文件名，当导入模块时，webpack会按照指定的文件名顺序尝试解析模块
    // 如果找到其中一个文件名匹配的文件，则使用该文件作为模块的入口文件
    mainFiles: ['index', 'main'],
    // 不写文件后缀名时，默认的解析规则
    extensions: ['.ts', '.tsx', '.scss', '.json', '.js', '.less']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type:'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(less|css)$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            postCssLoader,
            'less-loader'
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css'
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ]
}
