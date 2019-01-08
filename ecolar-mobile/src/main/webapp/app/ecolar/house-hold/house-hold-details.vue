<template>
  <v-container v-if="state.houseHold" grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <dl class="row jh-entity-details">
              <dt><span v-text="$t('ecolarApp.houseHold.name')">Name</span></dt>
              <dd><span>{{state.houseHold.name}}</span></dd>
              <dt><span v-text="$t('ecolarApp.houseHold.members')">Members</span></dt>
              <dd>
                <span v-for="(members, key, index) in state.houseHold.members" :key="members.login">
                    {{members.login}}{{last ? '' : ', '}}
                </span>
              </dd>
            </dl>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
          <v-btn color="blue-grey" class="white--text" :to="{name: 'AddNewMovement', params: {houseHoldId: state.houseHold.id}}">
            <span v-text="$t('ecolarApp.movement.home.createLabel')"> New Movement</span>
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
      </v-flex>
      <v-flex>
            TODO añadir movimientos
      </v-flex>
      <v-flex>
        <button type="submit"
                v-on:click.prevent="previousState()"
                class="btn btn-info">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src="./house-hold-details.component.ts">
</script>

