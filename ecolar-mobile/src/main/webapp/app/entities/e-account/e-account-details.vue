<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="eAccount">
                <h2><span v-text="$t('ecolarApp.eAccount.detail.title')">EAccount</span> {{eAccount.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('ecolarApp.eAccount.accountCode')">Account Code</span></dt>
                        <dd>
                                <span>{{eAccount.accountCode}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.eAccount.accountName')">Account Name</span></dt>
                        <dd>
                                <span>{{eAccount.accountName}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.eAccount.type')">Type</span></dt>
                        <dd>
                                <span v-text="$t('ecolarApp.AccountType.' + eAccount.type)">{{eAccount.type}}</span>
                        </dd>

                        <dt><span v-text="$t('ecolarApp.eAccount.category')">Category</span></dt>
                        <dd>
                                        <div v-if="eAccount.category">
                                            <router-link :to="'../category/' + eAccount.category.id + '/View'">{{eAccount.category.name}}</router-link>
                                        </div>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'EAccountEdit', params: {eAccountId: eAccount.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./e-account-details.component.ts">
</script>

