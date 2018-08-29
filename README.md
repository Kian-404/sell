# sell


## Build Setup

>sell server


``` bash
#first into server list
cd server

# install dependencies
npm install

# serve run at localhost:3000
node bin/www
```


> sell app


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


----------


> 用到的相关插件，`CSS`使用`stylus`编写， `axios`做数据交互，`vue-router`做路由切换 `better-scroll`页面滚动

> 相关接口数据使用`express`提供接口,使用时需要在项目目录的`config/index.js`中配置相关的代理
```
proxyTable: {
    '/api':{
        target:'http://localhost:3000/',
        changeOrigin: true,
    }
}

```

- /api/seller  提供相应的商家信息
- /api/goods   提供相应的商品信息
- /api/ratings 提供相应的评论信息


----------

> 文件目录

```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist
│   ├── index.html
│   └── static
├── index.html
├── package-lock.json
├── package.json
├── server
│   ├── app.js
│   ├── bin
│   ├── data
│   ├── package.json
│   ├── public
│   ├── routes
│   └── views
├── src
│   ├── App.vue
│   ├── assets
│   ├── common
│   ├── components
│   ├── main.js
│   └── router
└── static
    └── css
```
> 由于上传到github上之后再clone下来无法运行，`npm run dev`显示 `No PostCSS Config found`,通过搜索在根目录添加了一个`postcss.config.js`文件内容为
```
module.exports = {  
  plugins: {  
    'autoprefixer': {browsers: 'last 5 version'}  
  }  
} 
```
----------

> 通过此项目可以学到什么❓

## 能够`get`✔️到的和相关学习资料链接 ##
 - HTML JS CSS的使用
 - FLex布局 （移动端必杀技）
    - [语法篇][1]
    - [布局篇][2]
 - [Better-Scroll用法][3]
 - [Vue.js的基本用法][4]
    - [axios的使用][5]
    - [vue-router的使用][6]
 - [Stylus的使用][7]
 - [Express的搭建与使用][8]


  [1]: http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
  [2]: http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
  [3]: http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88
  [4]: https://cn.vuejs.org/v2/guide/
  [5]: https://www.kancloud.cn/yunye/axios/234845
  [6]: https://router.vuejs.org/zh/guide/
  [7]: https://www.zhangxinxu.com/jq/stylus/
  [8]: http://www.expressjs.com.cn/starter/installing.html

----------

> 程序截图

![程序截图][11]
![程序截图][12]
![程序截图][13]
![程序截图][14]


  [11]: ./img/img1.png
  [12]: ./img/img2.png
  [13]: ./img/img3.png
  [14]: ./img/img4.png
