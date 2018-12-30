<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.category.home.title')" id="category-heading">Categories</span>
            <router-link to="/entity/category/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-category">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('ecolarApp.category.home.createLabel')">
                    Create new Category
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="categories">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                        <th><span v-text="$t('ecolarApp.category.name')">Name</span></th>
                        <th><span v-text="$t('ecolarApp.category.description')">Description</span></th>
                        <th><span v-text="$t('ecolarApp.category.path')">Path</span></th>
                        <th><span v-text="$t('ecolarApp.category.parentId')">Parent Id</span></th>
                        <th><span v-text="$t('ecolarApp.category.accountType')">Account Type</span></th>
                            <th><span v-text="$t('ecolarApp.category.parent')">Parent</span></th>
                            <th><span v-text="$t('ecolarApp.category.document')">Document</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories"
                    :key="category.id">
                    <td><router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}">{{category.id}}</router-link></td>
                            <td>{{category.name}}</td>
                            <td>{{category.description}}</td>
                            <td>{{category.path}}</td>
                            <td>{{category.parentId}}</td>
                            <td v-text="$t('ecolarApp.AccountType.' + category.accountType)">{{category.accountType}}</td>
                        <td>
                                        <div v-if="category.parent">
                                            <router-link :to="'../entity/category/' + category.parent.id + '/view'" >{{category.parent.name}}</router-link>
                                        </div>
                        </td>
                        <td>
                                        <div v-if="category.document">
                                            <router-link :to="'../entity/account-categories/' + category.document.id + '/view'" >{{category.document.id}}</router-link>
                                        </div>
                        </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CategoryEdit', params: {categoryId: category.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(category)"
                                   class="btn btn-danger btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="ecolarApp.category.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="eco-delete-category-heading" v-bind:title="$t('ecolarApp.category.delete.question')">Are you sure you want to delete this Category?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="eco-confirm-delete-category" v-text="$t('entity.action.delete')" v-on:click="removeCategory()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./category.component.ts">
</script>
