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
