import { Button , Col , Dialog , Option , OptionGroup , Row , Select , Switch , Tree } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

const element = {
	install : function ( Vue ) {
		Vue.use ( Select )
		Vue.use ( Option )
		Vue.use ( OptionGroup )
		Vue.use ( Switch )
		Vue.use ( Tree )
		Vue.use ( Dialog )
		Vue.use ( Row )
		Vue.use ( Col )
		Vue.use ( Button )
	}
}
export default element
