<template>
    <v-app>
        <v-navigation-drawer app v-if="isAuth">
            <v-list dense>
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list dense>
                <v-list-tile to="/profile">
                    <v-list-tile-action>
                        <v-icon>person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Profile</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app v-if="isAuth">
            <v-toolbar-title>Vue Cuba</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="logout">Logout</v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app v-if="isAuth"></v-footer>
    </v-app>
</template>

<script>
    import 'vuetify/dist/vuetify.min.css';
    import 'material-design-icons-iconfont/dist/material-design-icons.css';

    import {actions as authAction} from './store/auth';

    export default {
        computed: {
            isAuth() {
                return this.$store.getters.logged;
            }
        },
        created() {
            this.$store.dispatch(authAction.init, {
                cuba: this.$cuba.instance,
                router: this.$router
            });
            this.$router.beforeEnter = (to, from, next) => {
                console.log(to, from, next);
            }
        },
        methods: {
            logout() {
                this.$store.dispatch(authAction.logout);
                this.$router.push('/login');
            }
        }
    }
</script>