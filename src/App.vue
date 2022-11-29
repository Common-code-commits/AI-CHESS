<!--<template>-->
<!--  <div id="app">-->
<!--    <router-view/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'app'-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--body {-->
<!--  margin: 0;-->
<!--}-->
<!--</style>-->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  mounted() {
    let _this = this
    let opts = {
      query: 'loginUser=linzf'
    }
    // socketIo连接的服务器信息，就是我们后端配置的信息
    let socket = io.connect('http://127.0.0.1:1111', opts)
    socket.on('connect', function () {
      console.log('连接成功')
    })
    // 接收后端发送过来的消息
    socket.on('push_event', function (data) {
      console.log(data)
    })
    socket.on('disconnect', function () {
      console.log('已经下线')
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
