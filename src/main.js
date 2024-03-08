import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/index.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import {  faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
// import { faUser,faMagnifyingGlass,faHouse,faPlus, faMinus ,faPen,  faCheck, faXmark,faFileExcel,
//     faCircleExclamation, faEnvelopeCircleCheck,faArrowRightFromBracket,faLink, faPenToSquare, faTrashCan,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'
// import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
// library.add(faUser,faMagnifyingGlass, faHouse,faPlus, faMinus , faPen,     faCheck, faXmark,  faEyeSlash,faEye,faFileExcel,
    
//     faEnvelopeCircleCheck,faCircleExclamation,faArrowRightFromBracket,faLink,faPenToSquare,faTrashCan,faFacebookSquare,faAngleLeft,faAngleRight)

    import VueApexCharts from "vue3-apexcharts";

    // const app = createApp(App);

// import vue3GoogleLogin from 'vue3-google-login'

// import GAuth from 'vue3-google-oauth2'
// import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// const gAuthOptions = 
var moment = require('moment'); // require
// moment().format(); 
// app.config.globalProperties.$moment = 
const momentPlugin = {
  install(app) {
      // Attach moment to Vue 3 global properties, to make it globally available.
      // https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
      app.config.globalProperties.$moment = moment
  }
}
import { Icon } from '@iconify/vue';

// app
const app = createApp(App).use(store).use(router).use(momentPlugin).use(VueApexCharts)

// .use(GAuth, { clientId: '594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com', scope: 'email',plugin_name:'UBIS', prompt: 'consent', fetch_basic_profile: false })

// .use(GAuth, { clientId: '579548266498-m63f6q3jph78nvvkh9r9eemcut3lbke9.apps.googleusercontent.com', plugin_name:'UBIS', prompt: 'consent', fetch_basic_profile: false })

// .use(vue3GoogleLogin, 
//     {
//     // clientId: '958652903991-j5p3g656q6g9dp09te6iibas69qhaodv.apps.googleusercontent.com'
//     clientId: '594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com'
//   }
//   )
// .component('font-awesome-icon', FontAwesomeIcon)
.component('Icon',Icon)
// import moment from 'moment'
// Vue.use(require('vue-moment'));

app.mount('#app')