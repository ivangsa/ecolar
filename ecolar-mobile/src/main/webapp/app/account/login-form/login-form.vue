<template>
<v-dialog v-model="$store.state.showLoginForm" persistent max-width="390">
    <v-card>
        <v-card-title>
            <v-toolbar color="indigo" dark fixed app>
                <v-toolbar-side-icon @click.stop="toogleDrawer()"></v-toolbar-side-icon>
                <v-toolbar-title><span v-text="$t('global.menu.account.login')">Sign in</span></v-toolbar-title>
            </v-toolbar>     
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-alert show variant="danger" v-if="authenticationError" v-html="$t('login.messages.error.authentication')">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </v-alert>
                <v-flex xs12>
                    <v-text-field v-model="login" :label="$t('global.form.username')" 
                        :error-messages="validationMessages('login')"
                        @input="$v.login.$touch()"
                        @blur="$v.login.$touch()"
                        required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="password" 
                        :type="showPassword ? 'text' : 'password'" 
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        @click:append="showPassword = !showPassword"
                        :error-messages="validationMessages('password')"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        :label="$t('login.form.password')" 
                        required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-checkbox v-model="rememberMe" :label="$t('login.form.rememberme')" checked>Remember me</v-checkbox>
                </v-flex>
                <v-flex xs12>
                    <v-btn @click="close()" v-text="$t('entity.action.cancel')">Close</v-btn>
                    <v-btn @click="doLogin()" v-text="$t('login.form.button')">Sign in</v-btn>
                </v-flex>
                <v-flex xs12>
                    <v-alert show variant="warning">
                        <a :href="'#resetPassword'" class="alert-link" v-text="$t('login.password.forgot')">Did you forget your password ?</a>
                    </v-alert>
                    <v-alert show variant="warning">
                        You don't have an account yet ?
                        <a :href="'#register'" class="alert-link" v-text="$t('global.messages.info.register.link')">Register a new account</a>
                    </v-alert>
                </v-flex>
            </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
