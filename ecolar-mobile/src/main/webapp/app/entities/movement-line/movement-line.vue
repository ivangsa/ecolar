<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.movementLine.home.title')" id="movement-line-heading">Movement Lines</span>
            <router-link to="/entity/movement-line/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-movement-line">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.movementLine.home.createLabel')">
                    Create new MovementLine
                </span>
            </router-link>
        </h2>
        <!--<jhi-alert></jhi-alert>-->
        <br/>
        <div class="table-responsive" v-if="movementLines">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                        <th><span v-text="$t('ecolarApp.movementLine.amount')">Amount</span></th>
                        <th><span v-text="$t('ecolarApp.movementLine.eventType')">Event Type</span></th>
                            <th><span v-text="$t('ecolarApp.movementLine.account')">Account</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="movementLine in movementLines">
                    <td><router-link :to="{name: 'MovementLineView', params: {movementLineId: movementLine.id}}">{{movementLine.id}}</router-link></td>
                            <td>{{movementLine.amount}}</td>
                            <td v-text="$t('ecolarApp.LineType.' + movementLine.eventType)">{{movementLine.eventType}}</td>
                        <td>
                                        <div v-if="movementLine.account">
                                            <router-link :to="'../e-account/' + movementLine.account.id + '/View'" >{{movementLine.account.accountName}}</router-link>
                                        </div>
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'MovementLineView', params: {movementLineId: movementLine.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'MovementLineEdit', params: {movementLineId: movementLine.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-btn v-on:click="prepareRemove(movementLine)"
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
            <span slot="modal-title"><span id="ecolarApp.movementLine.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-movementLine-heading" v-bind:title="$t('ecolarApp.movementLine.delete.question')">Are you sure you want to delete this Movement Line?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-movementLine" v-text="$t('entity.action.delete')" v-on:click="removeMovementLine()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./movement-line.component.ts">
</script>
