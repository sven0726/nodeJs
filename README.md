NodeJs学习示例的相关项目
===

##项目

* Nodejs+express4.x+boostrap web开发
* Nodejs cluster 多核处理模块cluster
* Nodejs+socket.io 服务器监控

##Nodejs+express4.x+boostrap web开发
###目录
此文重点介绍Express4.x(具体是4.10.4)的开发框架，其中还会涉及到Mongoose,Ejs,Bootstrap等相关内容。

* 建立工程
* 目录结构
* Express4.x配置文件
* Ejs模板使用
* Bootstrap界面框架
* 路由功能
* Session使用
* 页面提示
* 页面访问控制

详细可以参考：[Nodejs开发框架Express4.x开发手记](http://www.geedoo.info/nodejs-development-framework-express4-x-development-notes.html)


##Nodejs cluster 多核处理模块cluster

###前言
nodejs是一个单进程单线程的服务器引擎，不管有多么的强大硬件，只能利用到单个CPU进行计算。所以，有人开发了第三方的cluster，让node可以利用多核CPU实现并行。
随着nodejs的发展，让nodejs上生产环境，就必须是支持多进程多核处理！在V0.6.0版本，Nodejs内置了cluster的特性。自此，Nodejs终于可以作为一个独立的应用开发解决方案，映入大家眼帘了。

###目录
* cluster介绍
* cluster的简单使用
* cluster的工作原理
* cluster的API
* master和worker的通信
* 用cluster实现负载均衡(Load Balance)
* cluster负载均衡策略的测试

详细参考：[node.js多核处理模块cluster](http://www.geedoo.info/node-js-multicore-processing-module-cluster.html)

##Nodejs+socket.io 聊天系统

###基于Scoket.io的网页聊天系统
本部分介绍怎么来使用nodejs+express+socket.io来开发一个网页即时聊天系统。在开始本文前我假设你已经搭建好nodejs开发环境和学会了基本的express使用。

本系统基于b/s架构。当某个用户从客户端连接到服务端后，服务端自动向所有的客户端发送xx上线的消息。客户端聊天内容能够即时显示在每个客户端的聊天窗口。自此完成一个网页聊天的基本功能。

* a.创建web项目
* b.添加聊天功能
* c.集成socket.io完成聊天核心功能
* d.scoket.io在服务端和客户端通讯（聊天系统核心）

示例图：
![geedoo.info](http://www.geedoo.info/wp-content/uploads/2014/12/nodejs-scoket-chart-demo2.gif,基于Scoket.io的网页聊天系统)

详细参考：[Scoket.io用于开发WebSocket应用示例](http://www.geedoo.info/scoket-io%E7%94%A8%E4%BA%8E%E5%BC%80%E5%8F%91websocket%E5%BA%94%E7%94%A8%E7%A4%BA%E4%BE%8B.html)


##Nodejs+socket.io 服务器监控
































=======
touch README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:sven0726/nodeJs.git
git push -u origin master
