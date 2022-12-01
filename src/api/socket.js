import VueSocketIO from 'vue-socket.io'

class Socket {
    constructor() {
        this.methods = {}
    }

    init(that, ip, port, token = "6666") {
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
                reconnection: true,
                // 重连次数
                reconnectionAttempts: 5,
                // 重连延迟
                reconnectionDelay: 1000,
                // 重连延迟最大值
                reconnectionDelayMax: 5000,
                // 连接超时时间
                timeout: 20000,
                // 是否使用query参数
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
        emitter.addListener('send_event', (data) => {
            console.log('收到返回消息', data)
            if (this.methods[data.url]) {
                this.methods[data.url](data)
            }
        }, that)
        return createSocketItem
    }

    open() {
        return this.io.open()
    }

    on(event, callback) {
        this.methods[event] = callback
    }

    sendmsg(data) { // 发送消息
        return this.io.emit('send_event', data)
    }

    close() {
        return this.io.close()
    }

}

export default new Socket()
