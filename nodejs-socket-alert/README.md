##Nodejs+socket.io 服务器监控
###前言
Websocket技术的强大之处在于，打通了浏览器和服务器的双向通信的高速通道。有了如此神器，我们就可以在web上面“为所欲为”了。

在web上面，模拟一个Shell窗口，已经不稀奇了。我们再通过shell获得Linux系统(CPU,IO)信息，时时返回到web端，通过Highcharts生成系统监控图，是不是很高端！？

快动起来吧，你也可以做到的。
![monitor](http://www.geedoo.info/wp-content/uploads/2014/12/nodejs-socket-monitor-demo.jpg "系统监控")

###目录

* 系统架构设计
* 通过Shell获得CPU及IO信息
* 创建nodejs项目
* 实现websocket服务器端
* 实现websocket客户端
* 用Highcharts生成时时系统监控图

//来自：http://blog.fens.me/nodejs-websocket-monitor/
