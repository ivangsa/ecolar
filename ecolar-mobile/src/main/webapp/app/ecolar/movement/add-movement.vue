<template>
<div v-if="movement">
<v-layout align-start justify-center>
  <v-flex fluid  xs12>
    <v-layout row xs12 wrap v-if="!movement.type">
      <v-card class="ma-4" @click="selectMovementType('EXPENSE')">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.EXPENSE') }}</h3>
            <div>{{ $t('ecolarApp.AccountType.EXPENSE') }}</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="ma-4" @click="selectMovementType('REVENUE')">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.REVENUE') }}</h3>
            <div>{{ $t('ecolarApp.AccountType.REVENUE') }}</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="ma-4" @click="selectMovementType('ASSETS')">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.ASSETS') }}</h3>
            <div>{{ $t('ecolarApp.AccountType.ASSETS') }}</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="ma-4" @click="selectMovementType('LIABILITIES')">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.LIABILITIES') }}</h3>
            <div>{{ $t('ecolarApp.AccountType.LIABILITIES') }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-flex>
</v-layout>        

  <div v-if="movement.type">
    <v-layout row xs12 wrap v-if="movement.type">
      <v-card class="ma-4" @click="selectMovementType(null)">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.' + movement.type) }}</h3>
            <div>{{ $t('ecolarApp.AccountType..' + movement.type) }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>

    <v-layout row xs12 wrap v-if="movement.type">
      <v-card class="ma-4" @click="setSelectingAccountFor('DEBIT')">
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">FROM: </h3>
            <div><span v-if="movement.eventLines[0].account">{{movement.eventLines[0].account.accountName}}</span></div>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="ma-4" @click="setSelectingAccountFor('CREDIT')">
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">TO:</h3>
            <div><span v-if="movement.eventLines[1].account">{{movement.eventLines[1].account.accountName}}</span></div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>
      <div v-if="selectingAccountFor">
        <v-expansion-panel popout>
          <template v-for="category in categories">
            <v-expansion-panel-content v-if="category.accounts" :key="category.id" ripple>
              <div slot="header">{{category.path}}</div>
              <v-card v-for="account in category.accounts" :key="account.id" @click="selectAccount(account)">
                <v-card-text>{{account.accountName}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </template>
        </v-expansion-panel>   
      </div>

    <v-layout row xs12 wrap v-if="movement.type">
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field type="datetime-local" v-model="eventTime" :label="$t('ecolarApp.movement.eventTime')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="amount" @input="$v.movement.amount.$touch()" :label="$t('ecolarApp.movement.amount')" :error-messages="validationMessages('movement.amount')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="$v.movement.location.$model" :label="$t('ecolarApp.movement.location')" :error-messages="validationMessages('movement.location')"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn @click="cancel()" v-text="$t('entity.action.cancel')">Cancel</v-btn>
                    <v-btn @click="save()" :disabled="$v.movement.$invalid || isSaving" v-text="$t('entity.action.save')">Save</v-btn>
                </v-flex>
            </v-layout>
            </v-container>
          </v-card-title>
      </v-card>
    </v-layout>
       
    </div>
</div>
</template>
<script lang="ts" src="./add-movement.ts">
</script>