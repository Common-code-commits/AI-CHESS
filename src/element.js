import {Button, Col, Dialog, Form, FormItem, Input, Message, MessageBox, Option, Row, Select, Switch} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

const element = {
    install: function (Vue) {
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Switch)
        Vue.use(Input)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Button)
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$prompt = MessageBox.prompt
        Vue.prototype.$message = Message
    }
}
export default element
