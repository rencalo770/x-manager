const { createProxyMiddleware }= require('http-proxy-middleware')

module.exports = function (app) {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
    app.use(createProxyMiddleware(
        ['/bu', '/add/bu', '/scenes', '/add/scene','/rules', '/add/rule','/change/em', '/user/login'],
        {target: 'http://127.0.0.1:8083', changeOrigin: true}
        ))
}
