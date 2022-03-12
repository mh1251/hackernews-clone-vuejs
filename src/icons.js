import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBullhorn,  faFire, faQuestionCircle, faLightbulb, faMoneyBill1Wave, faNewspaper} from '@fortawesome/free-solid-svg-icons'

library.add(faBullhorn, faFire, faQuestionCircle, faLightbulb, faMoneyBill1Wave, faNewspaper)
Vue.component('font-awesome-icon', FontAwesomeIcon)

