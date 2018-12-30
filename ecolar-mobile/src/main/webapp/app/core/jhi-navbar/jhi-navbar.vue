<template>
<v-navigation-drawer v-model="$store.state.drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
    <v-list>
      <v-list-tile>
        <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
        <v-list-tile-title>
            <span v-text="$t('global.title')" class="navbar-title">jhipster</span> <span class="navbar-version">{{version}}</span>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="th-list" value="true">
        <v-list-tile slot="activator">
          <v-list-tile-title v-text="$t('global.menu.entities.main')">Entities</v-list-tile-title>
        </v-list-tile>

        <v-list-group no-action sub-group value="true">
          <v-list-tile>
            <v-list-tile-title v-text="$t('global.menu.entities.houseHold')">HouseHold</v-list-tile-title>
            <v-list-tile-action>
                <router-link to="/entity/house-hold">
                    <font-awesome-icon icon="plus"></font-awesome-icon>&nbsp;<span v-text="$t('global.menu.entities.houseHold')">HouseHold</span>
                </router-link>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>

      <v-list-tile v-if="!authenticated">
        <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
        <v-list-tile-title :click="openLogin">
            <font-awesome-icon icon="sign-in-alt" /> <span v-text="$t('global.menu.account.login')">Sign in</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-if="authenticated">
        <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
        <v-list-tile-title :click="logout()">
            <font-awesome-icon icon="sign-in-alt" /> <span v-text="$t('global.menu.account.login')">Sign in</span>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
</v-navigation-drawer>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>
