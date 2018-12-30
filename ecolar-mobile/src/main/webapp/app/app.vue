<template>
    <v-app id="inspire">
        <ribbon></ribbon>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="toogleDrawer()"></v-toolbar-side-icon>
            <v-toolbar-title><span v-text="$t('global.title')" class="navbar-title">jhipster</span> <span class="navbar-version">{{version}}</span></v-toolbar-title>
        </v-toolbar>            
        <jhi-navbar></jhi-navbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center>
                <v-flex text-xs-center>
                    <router-view></router-view>
                </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2018</span>
        </v-footer>
        <login-form></login-form>
    </v-app>
</template>

<script lang="ts" src="./app.component.ts">
</script>
