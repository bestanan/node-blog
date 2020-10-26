const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 存储 session 数据
let session_data = {}

// 用于处理 post 数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // cookie 格式为 k1=v1;k2=v2
    cookieStr.split(';').forEach(item => {
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1]
        req.cookie[key] = val
    });
    console.log('req.cookie',req.cookie) // {'', undefined}

    // 解析 session
    let isNeedSetCookie = false // 是否需要设置 cookie
    let userId = req.cookie.userid
    console.log(userId)
    if(userId) {
        if(!session_data[userId]) {
            session_data[userId] = {}
        }
    } else {
        isNeedSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        session_data[userId] = {}
    }
    req.session = session_data[userId]

    // 处理 post data
    getPostData(req).then((postData) => {
        req.body = postData
        // const blogData = handleBlogRouter(req, res)
        // if(blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }

        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then((blogData) => {
                if(isNeedSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; exprise='2030-07-13'`)
                }

                res.end(JSON.stringify(blogData))
            })
            return
        }
        
        // 处理 user 路由
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then((userData) => {
                if(isNeedSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; exprise='2030-07-13'`)
                }

                res.end(JSON.stringify(userData))
            })
            return
        }
        
        // 未命中，404 路由
        res.writeHead('404', {'content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })
}

module.exports = serverHandle
