import VueSocketIO from 'vue-socket.io'

export default class Socket {
    constructor(that, ip, port, token = "6666") {
        this.that = that
        const {io, emitter} = this.createSocket(that, ip, port, token)
        this.io = io
        this.emitter = emitter
    }

    createSocket(that, ip, port, username, token = "6666") {//也可在页面初始话调用
        const createSocketItem = new VueSocketIO({
            // 生产环境建议关闭，开发环境打开(在控制台看到socket连接和事件监听的信息)
            debug: true,
            connection: 'http://' + ip + ':' + port,
            options: {
                // 创建时是否自动连接 我们这里设定为false,在指定页面再开启
                autoConnect: false,
                // 是否自动重连
                reconnection: false,
                query: {
                    loginUser: username,
                    token: token
                }
            }
        })
        const {io, emitter} = createSocketItem
        io.on('connecting', () => {
            console.log('正在连接' + ip + ':' + port)
        })
        io.on('connect', () => {
            console.log('连接成功' + ip + ':' + port)
        })
        io.on('disconnect', () => {
            console.log('断开连接' + ip + ':' + port)
        })
        io.on('connect_failed', () => {
            console.log('连接失败' + ip + ':' + port)
        })
        io.on('error', () => {
            console.log('错误发生，并且无法被其他事件类型所处理')
        })
        io.on('reconnect_attempt', () => {
            console.log('触发尝试重新连接' + ip + ':' + port)
        })
        io.on('reconnecting', () => {
            console.log('正在重连' + ip + ':' + port)
        })
        io.on('reconnect_failed', () => {
            console.log('重连失败' + ip + ':' + port)
        })
        io.on('reconnect', () => {
            console.log('重连成功' + ip + ':' + port)
        })
        emitter.addListener('push_event', (data) => {
            console.log('data', data)
        }, that)
        return createSocketItem
    }

    open() {
        return this.io.open()
    }

    sendmsg(msg) { // 发送消息
        return this.io.emit('receive_event', msg)
    }

    lockResult() {
        console.log('链接状态', this.io.connected)
    }

    close() {
        return this.io.close()
    }

}
