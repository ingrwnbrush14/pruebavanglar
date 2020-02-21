import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyDjzmEg9Tqg_R15U8eb9RfFOcxkq2b_1JA",
  authDomain: "pruebavanglar2.firebaseapp.com",
  databaseURL: "https://pruebavanglar2.firebaseio.com",
  projectId: "pruebavanglar2",
  storageBucket: "pruebavanglar2.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
