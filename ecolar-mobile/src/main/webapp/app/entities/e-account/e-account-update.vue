<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.eAccount.home.createOrEditLabel" v-text="$t('ecolarApp.eAccount.home.createOrEditLabel')">Create or edit a EAccount</h2>
                <div v-if="eAccount">
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="eAccount.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="eAccount.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.eAccount.accountCode')" for="e-account-accountCode">Account Code</label>
                        <input type="text" class="form-control" name="accountCode" id="e-account-accountCode"
                            :class="{'valid': !$v.eAccount.accountCode.$invalid, 'invalid': $v.eAccount.accountCode.$invalid }" v-model="$v.eAccount.accountCode.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.eAccount.accountName')" for="e-account-accountName">Account Name</label>
                        <input type="text" class="form-control" name="accountName" id="e-account-accountName"
                            :class="{'valid': !$v.eAccount.accountName.$invalid, 'invalid': $v.eAccount.accountName.$invalid }" v-model="$v.eAccount.accountName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.eAccount.type')" for="e-account-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.eAccount.type.$invalid, 'invalid': $v.eAccount.type.$invalid }" v-model="$v.eAccount.type.$model" id="e-account-type" >
                            <option value="ASSETS" v-bind:label="$t('ecolarApp.AccountType.ASSETS')">ASSETS</option>
                            <option value="LIABILITIES" v-bind:label="$t('ecolarApp.AccountType.LIABILITIES')">LIABILITIES</option>
                            <option value="REVENUE" v-bind:label="$t('ecolarApp.AccountType.REVENUE')">REVENUE</option>
                            <option value="EXPENSE" v-bind:label="$t('ecolarApp.AccountType.EXPENSE')">EXPENSE</option>
                        </select>
                    </div>

                        <div class="form-group">
                            <label class="form-control-label" v-bind:value="$t('ecolarApp.eAccount.category')" for="e-account-category">Category</label>
                                <select class="form-control" id="e-account-category" name="category" v-model="eAccount.category" >
                                    <option value="null"></option>
                                    <option v-bind:value="eAccount.category && categoryOption.id === eAccount.category.id ? eAccount.category : categoryOption" v-for="categoryOption in categories">{{categoryOption.name}}</option>
                                </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.eAccount.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./e-account-update.component.ts">
</script>
