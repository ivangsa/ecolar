<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="accountCategories">
                <h2><span v-text="$t('ecolarApp.accountCategories.detail.title')">AccountCategories</span> {{accountCategories.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">


                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'AccountCategoriesEdit', params: {accountCategoriesId: accountCategories.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./account-categories-details.component.ts">
</script>

