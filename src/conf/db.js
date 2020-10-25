// 数据库配置文件
const env = process.env.NODE_ENV // 环境变量：判断当前环境为开发环境or线上环境

// 配置参数对象
let MYSQL_CONF = {}

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'an123',
        port: '3306',
        database: 'myblog'
    }
}

if(env === 'production') { // 线上
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'an123',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = MYSQL_CONF