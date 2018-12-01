<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.houseHold.home.title')" id="house-hold-heading">House Holds</span>
            <router-link to="/entity/house-hold/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-house-hold">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.houseHold.home.createLabel')">
                    Create new HouseHold
                </span>
            </router-link>
        </h2>
        <!--<jhi-alert></jhi-alert>-->
        <br/>
        <div class="table-responsive" v-if="houseHolds">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                        <th><span v-text="$t('ecolarApp.houseHold.name')">Name</span></th>
                            <th><span v-text="$t('ecolarApp.houseHold.accountCategories')">Account Categories</span></th>
                            <th><span v-text="$t('ecolarApp.houseHold.members')">Members</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="houseHold in houseHolds">
                    <td><router-link :to="{name: 'HouseHoldView', params: {houseHoldId: houseHold.id}}">{{houseHold.id}}</router-link></td>
                            <td>{{houseHold.name}}</td>
                        <td>
                                        <div v-if="houseHold.accountCategories">
                                            <router-link :to="'../account-categories/' + houseHold.accountCategories.id + '/View'" >{{houseHold.accountCategories.id}}</router-link>
                                        </div>
                        </td>
                        <td>
                                    <span v-for="members in houseHold.members">
                                        {{members.login}}{{last ? '' : ', '}}
                                    </span>
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'HouseHoldView', params: {houseHoldId: houseHold.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'HouseHoldEdit', params: {houseHoldId: houseHold.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-btn v-on:click="prepareRemove(houseHold)"
                                   class="btn btn-danger btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-btn>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="ecolarApp.houseHold.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-houseHold-heading" v-bind:title="$t('ecolarApp.houseHold.delete.question')">Are you sure you want to delete this House Hold?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-houseHold" v-text="$t('entity.action.delete')" v-on:click="removeHouseHold()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./house-hold.component.ts">
</script>
