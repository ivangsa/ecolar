<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.userPreferences.home.title')" id="user-preferences-heading">User Preferences</span>
            <router-link to="/entity/user-preferences/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-user-preferences">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.userPreferences.home.createLabel')">
                    Create new UserPreferences
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="userPreferences">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                            <th><span v-text="$t('ecolarApp.userPreferences.user')">User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="userPreferences in userPreferences"
                    :key="userPreferences.id">
                    <td><router-link :to="{name: 'UserPreferencesView', params: {userPreferencesId: userPreferences.id}}">{{userPreferences.id}}</router-link></td>
                        <td>
                                        {{userPreferences.user.login}}
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'UserPreferencesView', params: {userPreferencesId: userPreferences.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'UserPreferencesEdit', params: {userPreferencesId: userPreferences.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(userPreferences)"
                                   class="btn btn-danger btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="ecolarApp.userPreferences.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-userPreferences-heading" v-bind:title="$t('ecolarApp.userPreferences.delete.question')">Are you sure you want to delete this User Preferences?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-userPreferences" v-text="$t('entity.action.delete')" v-on:click="removeUserPreferences()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./user-preferences.component.ts">
</script>
