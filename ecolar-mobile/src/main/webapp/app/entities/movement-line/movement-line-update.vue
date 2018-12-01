<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.movementLine.home.createOrEditLabel" v-text="$t('ecolarApp.movementLine.home.createOrEditLabel')">Create or edit a MovementLine</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="movementLine.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="movementLine.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movementLine.amount')" for="movement-line-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="movement-line-amount"
                            :class="{'valid': !$v.movementLine.amount.$invalid, 'invalid': $v.movementLine.amount.$invalid }" v-model="$v.movementLine.amount.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.movementLine.eventType')" for="movement-line-eventType">Event Type</label>
                        <select class="form-control" name="eventType" :class="{'valid': !$v.movementLine.eventType.$invalid, 'invalid': $v.movementLine.eventType.$invalid }" v-model="$v.movementLine.eventType.$model" id="movement-line-eventType" >
                            <option value="CREDIT" v-bind:label="$t('ecolarApp.LineType.CREDIT')">CREDIT</option>
                            <option value="DEBIT" v-bind:label="$t('ecolarApp.LineType.DEBIT')">DEBIT</option>
                        </select>
                    </div>

                        <div class="form-group">
                            <label class="form-control-label" v-bind:value="$t('ecolarApp.movementLine.account')" for="movement-line-account">Account</label>
                                <select class="form-control" id="movement-line-account" name="account" v-model="movementLine.account" >
                                    <option value="null"></option>
                                    <option v-bind:value="movementLine.account && eAccountOption.id === movementLine.account.id ? movementLine.account : eAccountOption" v-for="eAccountOption in eAccounts">{{eAccountOption.accountName}}</option>
                                </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.movementLine.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./movement-line-update.component.ts">
</script>
