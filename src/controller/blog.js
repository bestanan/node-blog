const getList = (author, keyword) => {
    // 先使用假数据（格式正确）
    return [
        {
            id: 1,
            title: '标题1',
            content: '内容1',
            author: 'zhangsan',
            createTime: 1603538554257
        },
        {
            id: 1,
            title: '标题2',
            content: '内容2',
            author: 'lisi',
            createTime: 1603538577377
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题1',
        content: '内容1',
        author: 'zhangsan',
        createTime: 1603538554257
    }
}

const newBlog = (blogData = {}) => {
    // console.log('blogData',blogData) 
    // blogData 是一个博客对象，包含 title content 等属性
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    // console.log('blogData',id,blogData) 
    return true
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}