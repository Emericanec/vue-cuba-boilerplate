<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form @submit="loginHandler">
                        <v-text-field prepend-icon="person" v-model="login" label="Login" type="text"></v-text-field>
                        <v-text-field prepend-icon="lock" v-model="password" label="Password"
                                      type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="loginHandler">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {actions as authAction} from '../store/auth';
    export default
    {
        data: () => ({
            login: "",
            password: ""
        }),
        computed: {
            isAuth() {
                return this.$store.getters.logged;
            }
        },
        methods: {
            async loginHandler() {
                const data = {
                    cuba: this.$cuba.instance,
                    login: this.login,
                    password: this.password,
                };
                await this.$store.dispatch(authAction.login, data);
                if (this.isAuth) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>