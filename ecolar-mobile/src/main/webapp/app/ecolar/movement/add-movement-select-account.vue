<template>
    <div>
    <v-layout row xs12 wrap v-if="state.movementType">
      <v-card class="ma-4" @click="selectMovementType(null)">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $t('ecolarApp.AccountType.' + state.movementType) }}</h3>
            <div>{{ $t('ecolarApp.AccountType..' + state.movementType) }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>

    <v-layout row xs12 wrap v-if="state.movementType">
      <v-card class="ma-4" @click="setSelectingAccountFor('DEBIT')">
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">FROM:</h3>
            <div><span v-if="state.selectedCategoryFrom">{{state.selectedCategoryFrom.name}}</span></div>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="ma-4" @click="setSelectingAccountFor('CREDIT')">
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">TO:</h3>
            <div><span v-if="state.selectedCategoryTo">{{state.selectedCategoryFrom.name}}</span></div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>

        <div v-if="state.selectingAccountFor" v-for="category in categories" :key="category.id">
            <account-categories-tree 
                v-if="true"
                v-for="category in [category]" :key="category.id"
                :category="category" 
                :depth="0"
            >
            </account-categories-tree>
        </div>
    </div>
</template>
<script lang="ts" src="./add-movement-select-account.ts">
</script>
