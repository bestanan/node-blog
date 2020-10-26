const { SuccessModel, ErrorModel} = require('../model/resModel')
const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')

// 统一的登录验证
const checkLogin = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    
    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // return {
        //     msg: '博客列表'
        // }
        // const listData = getList(author, keyword)
        // return listData
        const result = getList(author, keyword)
        return result.then((listData) => {
            console.log('listData',listData)
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }

    // 新增博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = checkLogin(req)
        if(loginCheckResult) {
            // 未登录
            return checkLogin
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }

    // 删除博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const loginCheckResult = checkLogin(req)
        if(loginCheckResult) {
            // 未登录
            return checkLogin
        }

        const author = req.session.username
        const result = deleteBlog(id, author)
        return result.then((val) => {
            if(val) {
                return new SuccessModel()
            }
            return new ErrorModel('删除博客失败')
        })
    }

    // 修改博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = checkLogin(req)
        if(loginCheckResult) {
            // 未登录
            return checkLogin
        }
        
        req.body.author = req.session.username
        const result = updateBlog(id, req.body)
        return result.then((val) => {
            if(val) {
                return new SuccessModel()
            } 
            return new ErrorModel('更新博客失败')
        })
    }
}

module.exports = handleBlogRouter