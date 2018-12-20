<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.movement.home.title')" id="movement-heading">Movements</span>
            <router-link to="/entity/movement/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-movement">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.movement.home.createLabel')">
                    Create new Movement
                </span>
            </router-link>
        </h2>
        <!--<jhi-alert></jhi-alert>-->
        <br/>
        <div class="table-responsive" v-if="movements">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                        <th><span v-text="$t('ecolarApp.movement.type')">Type</span></th>
                        <th><span v-text="$t('ecolarApp.movement.eventTime')">Event Time</span></th>
                        <th><span v-text="$t('ecolarApp.movement.registrationTime')">Registration Time</span></th>
                        <th><span v-text="$t('ecolarApp.movement.amount')">Amount</span></th>
                        <th><span v-text="$t('ecolarApp.movement.location')">Location</span></th>
                            <th><span v-text="$t('ecolarApp.movement.eventLines')">Event Lines</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="movement in movements">
                    <td><router-link :to="{name: 'MovementView', params: {movementId: movement.id}}">{{movement.id}}</router-link></td>
                            <td v-text="$t('ecolarApp.AccountType.' + movement.type)">{{movement.type}}</td>
                            <td>{{movement.eventTime | formatDate}}</td>
                            <td>{{movement.registrationTime | formatDate}}</td>
                            <td>{{movement.amount}}</td>
                            <td>{{movement.location}}</td>
                        <td>
                                    <span v-for="eventLines in movement.eventLines">
                                        <router-link class="form-control-static" :to="'../entity/movement-line/' + eventLines.id + '/view'">{{eventLines.id}}</router-link>{{last ? '' : ', '}}
                                    </span>
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'MovementView', params: {movementId: movement.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'MovementEdit', params: {movementId: movement.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-btn v-on:click="prepareRemove(movement)"
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
            <span slot="modal-title"><span id="ecolarApp.movement.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-movement-heading" v-bind:title="$t('ecolarApp.movement.delete.question')">Are you sure you want to delete this Movement?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-movement" v-text="$t('entity.action.delete')" v-on:click="removeMovement()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./movement.component.ts">
</script>
