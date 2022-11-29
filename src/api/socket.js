import VueSocketIO from 'vue-socket.io'

export default class Socket {
    constructor(that, ip, port, token = "6666") {
        this.that = that
        const {io, emitter} = this.createSocket(that, ip, port, token)
        this.io = io
        this.emitter = emitter
    }

    createSocket(that, ip, port, token = "6666") {//也可在页面初始话调用
        const createSocketItem = new VueSocketIO({
            // 生产环境建议关闭，开发环境打开(在控制台看到socket连接和事件监听的信息)
            debug: true,
            connection: 'http://' + ip + ':' + port,
            options: {
                // 创建时是否自动连接 我们这里设定为false,在指定页面再开启
                autoConnect: false,
                // 路径(默认值：/socket.io/)
                path: "/my-app/",
                // 目前有两种传输方式：HTTP long-polling（可简称：polling）、WebSocket
                transports: ['polling'],
                // 附加请求头（在服务器端的 socket.handshake.headers 对象中找到）
                extraHeaders: {},
            }
        })
        const {io, emitter} = createSocketItem
        io.open()
        io.on('connecting', () => {
            console.log('正在连接---888')
        })
        io.on('connect', () => {
            console.log('连接成功---888')
        })
        io.on('disconnect', () => {
            console.log('断开连接---888')
        })
        io.on('connect_failed', () => {
            console.log('连接失败---888')
        })
        io.on('error', () => {
            console.log('错误发生，并且无法被其他事件类型所处理')
        })
        io.on('reconnect_attempt', () => {
            console.log('触发尝试重新连接', 888)
        })
        io.on('reconnecting', () => {
            console.log('正在重连---888')
        })
        io.on('reconnect_failed', () => {
            console.log('重连失败---888')
        })
        io.on('reconnect', () => {
            console.log('重连成功---888')
        })
        emitter.addListener('welcome', (data) => {
            console.log('data', data)
        }, that)
        return createSocketItem
    }

    Open() {
        this.io.open()
    }

    Sendmsg() { // 发送消息
        this.io.emit('hello', '这里是客户端')
    }

    lockResult() {
        console.log('链接状态', this.io.connected)
    }

    close() {
        this.io.close()
    }

    submsgContent(flag) {
        if (flag) {
            this.emitter.addListener('welcome', (data) => {
                console.log('data', data)
            }, this)
        } else {
            this.emitter.removeListener('welcome', this.that)
        }
    }
}
