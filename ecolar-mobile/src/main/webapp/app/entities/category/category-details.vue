<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="category">
                <h2><span v-text="$t('ecolarApp.category.detail.title')">Category</span> {{category.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('ecolarApp.category.name')">Name</span></dt>
                        <dd>
                                <span>{{category.name}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.category.description')">Description</span></dt>
                        <dd>
                                <span>{{category.description}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.category.path')">Path</span></dt>
                        <dd>
                                <span>{{category.path}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.category.parentId')">Parent Id</span></dt>
                        <dd>
                                <span>{{category.parentId}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.category.accountType')">Account Type</span></dt>
                        <dd>
                                <span v-text="$t('ecolarApp.AccountType.' + category.accountType)">{{category.accountType}}</span>
                        </dd>

                        <dt><span v-text="$t('ecolarApp.category.parent')">Parent</span></dt>
                        <dd>
                                        <div v-if="category.parent">
                                            <router-link :to="'../category/' + category.parent.id + '/View'">{{category.parent.name}}</router-link>
                                        </div>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.category.document')">Document</span></dt>
                        <dd>
                                        <div v-if="category.document">
                                            <router-link :to="'../account-categories/' + category.document.id + '/View'">{{category.document.id}}</router-link>
                                        </div>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'CategoryEdit', params: {categoryId: category.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./category-details.component.ts">
</script>

