import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cuba from 'vue-cuba-app'
import Vuetify from 'vuetify'
import cookies from 'browser-cookies'

Vue.use(Cuba, {
    name: 'myApp',
    apiUrl: 'http://localhost:8080/app/rest/'
});

Vue.use(Vuetify);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const access_token = cookies.get('access_token');
    if (requiresAuth && access_token == null) {
        next('/login');
    } else {
        next();
    }
});

window.vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');