<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 v-text="$t('ecolarApp.houseHold.home.title')">House Holds</h2>              
      </v-flex>
      <v-flex v-for="houseHold in state.houseHolds" :key="houseHold.id" lg2 md4 xs6>
        <v-card color="purple" class="white--text" :to="{ name: 'HouseHoldView', params: { houseHoldId: houseHold.id } }" ripple>
          <v-card-text>
            <dl class="row jh-entity-details">
              <dt><span v-text="$t('ecolarApp.houseHold.name')">Name</span></dt>
              <dd><span>{{houseHold.name}}</span></dd>
              <dt><span v-text="$t('ecolarApp.houseHold.members')">Members</span></dt>
              <dd>
                <span v-for="(members, key, index) in houseHold.members" :key="members.login">
                    {{members.login}}{{last ? '' : ', '}}
                </span>
              </dd>
            </dl>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src="./house-holds.component.ts">
</script>
