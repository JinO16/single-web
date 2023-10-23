const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAliyunOss = require('webpack-aliyun-oss');
// 在打包之前删除当前构建记录
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

console.log('process.env.ENV-', process.env.ENV);
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimize: true,
    minimizer: [
      // js 代码压缩 删除注释等内容
        new TerserPlugin({
            extractComments: false,
            terserOptions: {
                compress: {
                    drop_console: env.ENV === 'PROD',
                },
            }
        })
    ],
  },
  // webpack 4之后会在控制台中输出性能提示，当生成的文件大小超过一定阈值时，就会提示警告信息。
  performance: {
    // 禁止提示告警信息
    hints: false,
    // 指定入口点的最大大小 - 10M
    maxEntrypointSize: 102400,
    // 指定生成的资源文件的最大大小 - 10M
    maxAssetSize: 102400
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename({chunk}) {
          if (chunk.name.includes('immerse')) {
              return 'css/[name].css';
          }
          return 'css/[name].[contenthash].css';
      },
      chunkFilename: 'css/[name].[contenthash].css',
      ignoreOrder: true,
    })
  ]
}

// 包分析工具
if (process.env.ENV === 'ANALYZE') {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

// 使用阿里云cnd缓存
if (env.ENV === 'PROD') {
  prodConfig.plugins.push(
      new WebpackAliyunOss({
          from: './build/**/!(*.html)',
          dist: `fe/project/${'上传位置'}/`,
          region: 'oss-cn-beijing',
          overwrite: true,
          accessKeyId: '',
          accessKeySecret: '',
          bucket: '',
      })
  );
}

module.exports = merge(baseConfig, prodConfig);