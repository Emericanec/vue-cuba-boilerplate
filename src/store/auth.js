import cookies from 'browser-cookies'

export const actions = {
    init: 'modules/auth/init',
    login: 'modules/auth/login',
    logout: 'modules/auth/logout',
};

export const mutations = {
    DO_LOGIN: 'modules/auth/DO_LOGIN',
    DO_LOGOUT: 'modules/auth/DO_LOGOUT',
};

export default {
    state: {
        logged: false,
        user: {},
        access_token: ""
    },
    actions: {
        async [actions.init] ({commit}, {cuba, router}) {
            const access_token = cookies.get('access_token');
            if (access_token != null) {
                cuba.restApiToken = access_token;
                const user = await cuba.getUserInfo();
                commit(mutations.DO_LOGIN, {
                    user: user,
                    access_token: access_token
                });
            } else {
                commit(mutations.DO_LOGOUT);
                cookies.erase('access_token');
                router.push('/login');
            }
        },
        async [actions.login] ({commit}, {cuba, login, password}) {
            try {
                const response = await cuba.login(login, password);
                const user = await cuba.getUserInfo();
                commit(mutations.DO_LOGIN, {
                    user: user,
                    access_token: response.access_token
                });
                cookies.set('access_token', response.access_token);
            } catch (e) {
                console.log(e);
            }
        },
        [actions.logout] ({commit}) {
            commit(mutations.DO_LOGOUT);
            cookies.erase('access_token');
        }
    },
    mutations: {
        [mutations.DO_LOGIN] (state, payload) {
            state.user = payload.user;
            state.access_token = payload.access_token;
            state.logged = true;
        },
        [mutations.DO_LOGOUT] (state, payload) {
            state.user = {};
            state.access_token = "";
            state.logged = false;
        }
    },
    getters: {
        logged: (state) => (state.logged),
        getUserInfo: (state) => (state.user)
    }
}