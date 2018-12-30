<template>
<v-navigation-drawer v-model="$store.state.drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
    <v-list>
      <v-list-tile @click="$router.push({name: 'Home'})">
        <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
        <v-list-tile-title>
            <span v-text="$t('global.menu.home')">Home</span>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="th-list" value="true">
        <v-list-tile slot="activator">
          <v-list-tile-title v-text="$t('global.menu.entities.main')">Entities</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({name: 'HouseHolds'})">
          <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.entities.houseHold')">HouseHold</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="th-list" value="true" id="languagesnavBarDropdown" v-if="languages && Object.keys(languages).length > 1">
          <v-list-tile slot="activator">
            <v-list-tile-action><font-awesome-icon icon="flag" /></v-list-tile-action>
              <v-list-tile-title>
              <span v-text="$t('global.menu.language')">Language</span>
              </v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="(value, key) in languages" :key="`lang-${key}`" @click="changeLanguage(key)" :class="{ active: isActiveLanguage(key)}">
            <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
            <v-list-tile-title>{{value.name}}</v-list-tile-title>
          </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="th-list" value="true" id="languagesnavBarDropdown" v-if="languages && Object.keys(languages).length > 1">
          <v-list-tile slot="activator">
              <v-list-tile-title>
              <font-awesome-icon icon="user" />
              <span v-text="$t('global.menu.account.main')">Account</span>
              </v-list-tile-title>
          </v-list-tile>
        
          <v-list-tile v-if="authenticated" @click="$router.push('/account/settings')">
          <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
          <v-list-tile-title>
              <font-awesome-icon icon="wrench" /> <span v-text="$t('global.menu.account.settings')">Settings</span>
          </v-list-tile-title>
        </v-list-tile>

          <v-list-tile v-if="authenticated" @click="$router.push('/account/password')">
          <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
          <v-list-tile-title>
              <font-awesome-icon icon="clock" /> <span v-text="$t('global.menu.account.password')">password</span>
          </v-list-tile-title>
        </v-list-tile>
        
        <v-list-tile v-if="!authenticated" @click="openLogin()">
          <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
          <v-list-tile-title>
              <font-awesome-icon icon="sign-in-alt" /> <span v-text="$t('global.menu.account.login')">Sign in</span>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="authenticated" @click="logout()">
          <v-list-tile-action><v-icon>sign-in-alt</v-icon></v-list-tile-action>
          <v-list-tile-title>
              <font-awesome-icon icon="sign-in-alt" /> <span v-text="$t('global.menu.account.logout')">Sign out</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
</v-navigation-drawer>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>
