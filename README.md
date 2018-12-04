# React-SSR-Test

## 运行
```
npm build
npm run start
```
## 服务端渲染
```
app.get('/', (req, res) => {
    const {preloadedState, content} = ssr(initialState);
    const response = template('服务端渲染', preloadedState, content);
    res.send(response);
});
```
## 客户端渲染
```
app.get('/client', (req, res) => {
    //把 DOM 节点,以及包依赖，打包好 -> bundle.js
    let response = template('客户端渲染');
    res.send(response);
});
```


