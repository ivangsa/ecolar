<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.eAccount.home.title')" id="e-account-heading">E Accounts</span>
            <router-link to="/entity/e-account/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-e-account">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.eAccount.home.createLabel')">
                    Create new EAccount
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
        <div class="table-responsive" v-if="eAccounts">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                        <th><span v-text="$t('ecolarApp.eAccount.accountCode')">Account Code</span></th>
                        <th><span v-text="$t('ecolarApp.eAccount.accountName')">Account Name</span></th>
                        <th><span v-text="$t('ecolarApp.eAccount.type')">Type</span></th>
                            <th><span v-text="$t('ecolarApp.eAccount.category')">Category</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="eAccount in eAccounts"
                    :key="eAccount.id">
                    <td><router-link :to="{name: 'EAccountView', params: {eAccountId: eAccount.id}}">{{eAccount.id}}</router-link></td>
                            <td>{{eAccount.accountCode}}</td>
                            <td>{{eAccount.accountName}}</td>
                            <td v-text="$t('ecolarApp.AccountType.' + eAccount.type)">{{eAccount.type}}</td>
                        <td>
                                        <div v-if="eAccount.category">
                                            <router-link :to="'../entity/category/' + eAccount.category.id + '/view'" >{{eAccount.category.name}}</router-link>
                                        </div>
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EAccountView', params: {eAccountId: eAccount.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EAccountEdit', params: {eAccountId: eAccount.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(eAccount)"
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
            <span slot="modal-title"><span id="ecolarApp.eAccount.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-eAccount-heading" v-bind:title="$t('ecolarApp.eAccount.delete.question')">Are you sure you want to delete this E Account?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-eAccount" v-text="$t('entity.action.delete')" v-on:click="removeEAccount()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./e-account.component.ts">
</script>
