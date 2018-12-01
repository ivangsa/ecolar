<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.movement.home.createOrEditLabel" v-text="$t('ecolarApp.movement.home.createOrEditLabel')">Create or edit a Movement</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="movement.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="movement.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movement.eventTime')" for="movement-eventTime">Event Time</label>
                        <div class="d-flex">
                            <input id="movement-eventTime" type="datetime-local" class="form-control" name="eventTime" :class="{'valid': !$v.movement.eventTime.$invalid, 'invalid': $v.movement.eventTime.$invalid }" v-model="$v.movement.eventTime.$model" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movement.registrationTime')" for="movement-registrationTime">Registration Time</label>
                        <div class="d-flex">
                            <input id="movement-registrationTime" type="datetime-local" class="form-control" name="registrationTime" :class="{'valid': !$v.movement.registrationTime.$invalid, 'invalid': $v.movement.registrationTime.$invalid }" v-model="$v.movement.registrationTime.$model" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movement.amount')" for="movement-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="movement-amount"
                            :class="{'valid': !$v.movement.amount.$invalid, 'invalid': $v.movement.amount.$invalid }" v-model="$v.movement.amount.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movement.location')" for="movement-location">Location</label>
                        <input type="text" class="form-control" name="location" id="movement-location"
                            :class="{'valid': !$v.movement.location.$invalid, 'invalid': $v.movement.location.$invalid }" v-model="$v.movement.location.$model" />
                    </div>

                        <div class="form-group">
                            <label v-text="$t('ecolarApp.movement.eventLines')" for="movement-eventLines">Event Lines</label>
                            <select class="form-control" id="movement-eventLines" multiple name="eventLines" v-model="movement.eventLines">
                                <option v-bind:value="getSelected(movement.eventLines, movementLineOption)" v-for="movementLineOption in movementLines">{{movementLineOption.id}}</option>
                            </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.movement.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./movement-update.component.ts">
</script>
