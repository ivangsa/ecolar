<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.userPreferences.home.createOrEditLabel" v-text="$t('ecolarApp.userPreferences.home.createOrEditLabel')">Create or edit a UserPreferences</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="userPreferences.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="userPreferences.id" readonly />
                    </div>


                        <div class="form-group">
                            <label class="form-control-label" v-bind:value="$t('ecolarApp.userPreferences.user')" for="user-preferences-user">User</label>
                                <select class="form-control" id="user-preferences-user" name="user" v-model="userPreferences.user" >
                                    <option value="null"></option>
                                    <option v-bind:value="userPreferences.user && userOption.id === userPreferences.user.id ? userPreferences.user : userOption" v-for="userOption in users">{{userOption.login}}</option>
                                </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.userPreferences.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./user-preferences-update.component.ts">
</script>
