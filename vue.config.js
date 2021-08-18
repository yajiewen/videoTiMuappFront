module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081',
                //target: 'http://172.16.233.48:26667',  //后端地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            },
        }
    }
}