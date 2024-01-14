import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {  faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faUser,faMagnifyingGlass,faHouse,               faCircleExclamation, faEnvelopeCircleCheck,faPen,faArrowRightFromBracket,faEye, faEyeSlash,faLink, faPenToSquare, faTrashCan,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'
library.add(faUser,faMagnifyingGlass, faHouse,                                              faEnvelopeCircleCheck,faPen,faCircleExclamation,faArrowRightFromBracket,faEye,faEyeSlash,faLink,faPenToSquare,faTrashCan,faFacebookSquare,faAngleLeft,faAngleRight)


// import vue3GoogleLogin from 'vue3-google-login'

// import GAuth from 'vue3-google-oauth2'
// import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// const gAuthOptions = 

createApp(App).use(store).use(router)

// .use(GAuth, { clientId: '594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com', scope: 'email',plugin_name:'Posting', prompt: 'consent', fetch_basic_profile: false })

// .use(GAuth, { clientId: '579548266498-m63f6q3jph78nvvkh9r9eemcut3lbke9.apps.googleusercontent.com', plugin_name:'Posting', prompt: 'consent', fetch_basic_profile: false })

// .use(vue3GoogleLogin, 
//     {
//     // clientId: '958652903991-j5p3g656q6g9dp09te6iibas69qhaodv.apps.googleusercontent.com'
//     clientId: '594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com'
//   }
//   )
.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
