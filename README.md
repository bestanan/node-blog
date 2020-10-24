# node-blog
使用 Node.js 原生方式开发的博客系统。功能包括登录、博客增删改查、个人中心等，技术包括路由处理、接口设计、数据存储等。

### 需求
1. 首页（博客列表）、作者主页、博客详情页
2. 管理中心：
    - 新建博客
    - 编辑博客
    - 删除博客
    - 搜索（作者名或关键字）
3. 登录页

### 接口设计
* 博客列表：/api/blog/list  （get 参数：author、keyword）
* 博客详情：/api/blog/detail（get 参数：id）
* 新建博客：/api/blog/new   （post）
* 编辑博客：/api/blog/update（post 参数：id）
* 删除博客：/api/blog/delete（post 参数：id）
* 登录页面：/api/user/login （post）

### 数据存储
MySQL

### 启动方式
* 开发环境：nodemon
* 线上环境：pm2（暂时未上线）