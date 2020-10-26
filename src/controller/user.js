const { exec } = require('../db/mysql')

const login = (username, password) => {
    // if(username === 'zhangsan' && password === '123') {
    //     return true
    // }
    // return false
    let sql = `select username,realname from user where username='${username}' && password='${password}'`
    return exec(sql).then((rows) => {
        return rows[0] || {}  // undefined
    })
}

module.exports = {
    login
}