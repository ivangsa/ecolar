<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="userPreferences">
                <h2><span v-text="$t('ecolarApp.userPreferences.detail.title')">UserPreferences</span> {{userPreferences.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">


                        <dt><span v-text="$t('ecolarApp.userPreferences.user')">User</span></dt>
                        <dd>
                                        {{userPreferences.user.login}}
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'UserPreferencesEdit', params: {userPreferencesId: userPreferences.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./user-preferences-details.component.ts">
</script>

