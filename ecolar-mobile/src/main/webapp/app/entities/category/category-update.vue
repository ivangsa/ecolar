<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="ecolarApp.category.home.createOrEditLabel" v-text="$t('ecolarApp.category.home.createOrEditLabel')">Create or edit a Category</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="category.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="category.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.category.name')" for="category-name">Name</label>
                        <input type="text" class="form-control" name="name" id="category-name"
                            :class="{'valid': !$v.category.name.$invalid, 'invalid': $v.category.name.$invalid }" v-model="$v.category.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.category.description')" for="category-description">Description</label>
                        <input type="text" class="form-control" name="description" id="category-description"
                            :class="{'valid': !$v.category.description.$invalid, 'invalid': $v.category.description.$invalid }" v-model="$v.category.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.category.path')" for="category-path">Path</label>
                        <input type="text" class="form-control" name="path" id="category-path"
                            :class="{'valid': !$v.category.path.$invalid, 'invalid': $v.category.path.$invalid }" v-model="$v.category.path.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.category.parentId')" for="category-parentId">Parent Id</label>
                        <input type="text" class="form-control" name="parentId" id="category-parentId"
                            :class="{'valid': !$v.category.parentId.$invalid, 'invalid': $v.category.parentId.$invalid }" v-model="$v.category.parentId.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('ecolarApp.category.accountType')" for="category-accountType">Account Type</label>
                        <select class="form-control" name="accountType" :class="{'valid': !$v.category.accountType.$invalid, 'invalid': $v.category.accountType.$invalid }" v-model="$v.category.accountType.$model" id="category-accountType" >
                            <option value="ASSETS" v-bind:label="$t('ecolarApp.AccountType.ASSETS')">ASSETS</option>
                            <option value="LIABILITIES" v-bind:label="$t('ecolarApp.AccountType.LIABILITIES')">LIABILITIES</option>
                            <option value="REVENUE" v-bind:label="$t('ecolarApp.AccountType.REVENUE')">REVENUE</option>
                            <option value="EXPENSE" v-bind:label="$t('ecolarApp.AccountType.EXPENSE')">EXPENSE</option>
                        </select>
                    </div>

                        <div class="form-group">
                            <label class="form-control-label" v-bind:value="$t('ecolarApp.category.parent')" for="category-parent">Parent</label>
                                <select class="form-control" id="category-parent" name="parent" v-model="category.parent" >
                                    <option value="null"></option>
                                    <option v-bind:value="category.parent && categoryOption.id === category.parent.id ? category.parent : categoryOption" v-for="categoryOption in categories">{{categoryOption.name}}</option>
                                </select>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" v-bind:value="$t('ecolarApp.category.document')" for="category-document">Document</label>
                                <select class="form-control" id="category-document" name="document" v-model="category.document" >
                                    <option value="null"></option>
                                    <option v-bind:value="category.document && accountCategoriesOption.id === category.document.id ? category.document : accountCategoriesOption" v-for="accountCategoriesOption in accountCategories">{{accountCategoriesOption.id}}</option>
                                </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.category.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./category-update.component.ts">
</script>
