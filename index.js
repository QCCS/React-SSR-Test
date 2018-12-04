const express = require('express');
const app = express();
const template = require('./views/template');
const path = require('path');
const fs = require('fs');
// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

/*
* 如果这里使用服务端渲染方式，数据会被缓存起来，
* 由于不是使用 ajax 请求数据，这里已经把数据模型渲染死了，如果修改了这个数据，
* 页面不会实时更新。
* 使用客户端渲染则会实时更新。
* */
// const data = require('./assets/data.json');
// console.log(data)
function getData() {
    let json = fs.readFileSync('assets/data.json', 'utf8');
    return JSON.parse(json)
}
//主要是靠这个把 DOM 节点渲染为字符串
const ssr = require('./views/server');

// 服务端渲染
app.get('/', (req, res) => {
    let data = getData();
    let initialState = {
        isFetching: false,
        apps: data
    };
    const {preloadedState, content} = ssr(initialState);
    const response = template('服务端渲染', preloadedState, content);
    res.send(response);
});

// 客户端渲染
app.get('/client', (req, res) => {
    //把 DOM 节点,以及包依赖，打包好 -> bundle.js
    let response = template('客户端渲染');
    res.send(response);
});
