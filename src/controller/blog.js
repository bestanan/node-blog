const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 先使用假数据（格式正确）
    // return [
    //     {
    //         id: 1,
    //         title: '标题1',
    //         content: '内容1',
    //         author: 'zhangsan',
    //         createTime: 1603538554257
    //     },
    //     {
    //         id: 1,
    //         title: '标题2',
    //         content: '内容2',
    //         author: 'lisi',
    //         createTime: 1603538577377
    //     }
    // ]
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    // 返回一个promise
    return exec(sql)
}

const getDetail = (id) => {
    // return {
    //     id: 1,
    //     title: '标题1',
    //     content: '内容1',
    //     author: 'zhangsan',
    //     createTime: 1603538554257
    // }
    let sql = `select * from blogs where id='${id}'`
    const result = exec(sql)
    return result.then((rows) => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // return {
    //     id: 3
    // }
    // blogData 是一个博客对象，包含 title content author createtime 等属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    let sql = `insert into blogs (title,content,createtime,author) 
        values ('${title}','${content}',${createTime},'${author}')`
    const result = exec(sql)
    return result.then((data) => {
        // data 返回的几个关键属性：affectedRows insertId changedRows
        return {
            id: data.insertId
        }
    })
}

const deleteBlog = (id, author) => {
    // return true
    let sql = `delete from blogs where id=${id} and author='${author}'`
    const result = exec(sql)
    return result.then((data) => {
        if(data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const updateBlog = (id, blogData = {}) => {
    // console.log('blogData',id,blogData) 
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author

    let sql = `update blogs set title='${title}',content='${content}' where id=${id} and author='${author}'`
    const result = exec(sql)
    return result.then((data) => {
        if(data.affectedRows > 0) {
            return true
        }
        return false
    })
    
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    deleteBlog,
    updateBlog
}