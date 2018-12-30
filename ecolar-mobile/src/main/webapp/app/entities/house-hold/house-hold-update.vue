<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.houseHold.home.createOrEditLabel" v-text="$t('ecolarApp.houseHold.home.createOrEditLabel')">Create or edit a HouseHold</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="houseHold.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="houseHold.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.houseHold.name')" for="house-hold-name">Name</label>
                        <input type="text" class="form-control" name="name" id="house-hold-name"
                            :class="{'valid': !$v.houseHold.name.$invalid, 'invalid': $v.houseHold.name.$invalid }" v-model="$v.houseHold.name.$model" />
                    </div>

                        <div class="form-group">
                            <label class="form-control-label" v-text="$t('ecolarApp.houseHold.accountCategories')" for="house-hold-accountCategories">Account Categories</label>
                                <select class="form-control" id="house-hold-accountCategories" name="accountCategories" v-model="houseHold.accountCategories">
                                    <option value="null"></option>
                                    <option v-bind:value="houseHold.accountCategories && accountCategoriesOption.id === houseHold.accountCategories.id ? houseHold.accountCategories : accountCategoriesOption" v-for="accountCategoriesOption in accountCategories">{{accountCategoriesOption.id}}</option>
                                </select>
                        </div>
                        <div class="form-group">
                            <label v-text="$t('ecolarApp.houseHold.members')" for="house-hold-members">Members</label>
                            <select class="form-control" id="house-hold-members" multiple name="members" v-model="houseHold.members">
                                <option v-bind:value="getSelected(houseHold.members, userOption)" v-for="userOption in users">{{userOption.login}}</option>
                            </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.houseHold.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./house-hold-update.component.ts">
</script>
