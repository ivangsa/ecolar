<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="houseHold">
                <h2><span v-text="$t('ecolarApp.houseHold.detail.title')">HouseHold</span> {{houseHold.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('ecolarApp.houseHold.name')">Name</span></dt>
                        <dd>
                                <span>{{houseHold.name}}</span>
                        </dd>

                        <dt><span v-text="$t('ecolarApp.houseHold.accountCategories')">Account Categories</span></dt>
                        <dd>
                                        <div v-if="houseHold.accountCategories">
                                            <router-link :to="'../account-categories/' + houseHold.accountCategories.id + '/View'">{{houseHold.accountCategories.id}}</router-link>
                                        </div>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.houseHold.members')">Members</span></dt>
                        <dd>
                                    <span v-for="members in houseHold.members">
                                        {{members.login}}{{last ? '' : ', '}}
                                    </span>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'HouseHoldEdit', params: {houseHoldId: houseHold.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./house-hold-details.component.ts">
</script>

