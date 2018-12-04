<template>
    <div>
        MovementType: {{ state.movementType }}
        <div>
            <div @click="setSelectingAccountFor('DEBIT')">FROM <span v-if="state.selectedCategoryFrom">{{state.selectedCategoryFrom.name}}</span></div>
            <div @click="setSelectingAccountFor('CREDIT')">TO <span v-if="state.selectedCategoryTo">{{state.selectedCategoryTo.name}}</span></div>
        </div>
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
</template>s
<script lang="ts" src="./add-movement-select-account.ts">
</script>
