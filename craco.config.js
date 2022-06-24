/*
 * @Descripttion:
 * @version:
 * @Author: wutingting
 * @Date: 2022-03-20 21:36:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-20 21:40:19
 */
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
  },
}
