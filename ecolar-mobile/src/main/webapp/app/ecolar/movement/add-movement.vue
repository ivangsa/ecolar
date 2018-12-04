<template>
<div>
    <div v-if="!state.movementType" class="row justify-content-center">
        <div class="col-8">
            <div @click="selectMovementType('EXPENSE')">{{ $t('ecolarApp.AccountType.EXPENSE') }}</div>
            <div @click="selectMovementType('REVENUE')">{{ $t('ecolarApp.AccountType.REVENUE') }}</div>
            <div @click="selectMovementType('ASSETS')">{{ $t('ecolarApp.AccountType.ASSETS') }}</div>
            <div @click="selectMovementType('LIABILITIES')">{{ $t('ecolarApp.AccountType.LIABILITIES') }}</div>
        </div>
    </div>
    <div v-if="state.movementType">
        <add-new-movement-select-account></add-new-movement-select-account>
        <div v-if="!state.selectingAccountFor" class="row justify-content-center">
            <div class="col-8" @click="selectMovementType(null)">{{ $t('entity.action.cancel') }}</div>
            <div class="col-8">
                <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                    <h2 id="ecolarApp.movement.home.createOrEditLabel" v-text="$t('ecolarApp.movement.home.createOrEditLabel')">Create or edit a Movement</h2>
                    <div>

                        <div class="form-group">
                            <label class="form-control-label" v-text="$t('ecolarApp.movement.eventTime')" for="movement-eventTime">Event Time</label>
                            <div class="d-flex">
                                <input id="movement-eventTime" type="datetime-local" class="form-control" name="eventTime" :class="{'valid': !$v.movement.eventTime.$invalid, 'invalid': $v.movement.eventTime.$invalid }" v-model="$v.movement.eventTime.$model" />
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
    </div>
</div>
</template>
<script lang="ts" src="./add-movement.ts">
</script>
