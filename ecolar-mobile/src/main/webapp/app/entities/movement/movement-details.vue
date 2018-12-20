<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="movement">
                <h2><span v-text="$t('ecolarApp.movement.detail.title')">Movement</span> {{movement.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('ecolarApp.movement.type')">Type</span></dt>
                        <dd>
                                <span v-text="$t('ecolarApp.AccountType.' + movement.type)">{{movement.type}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.movement.eventTime')">Event Time</span></dt>
                        <dd>
                                <span>{{movement.eventTime}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.movement.registrationTime')">Registration Time</span></dt>
                        <dd>
                                <span>{{movement.registrationTime}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.movement.amount')">Amount</span></dt>
                        <dd>
                                <span>{{movement.amount}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.movement.location')">Location</span></dt>
                        <dd>
                                <span>{{movement.location}}</span>
                        </dd>

                        <dt><span v-text="$t('ecolarApp.movement.eventLines')">Event Lines</span></dt>
                        <dd>
                                    <span v-for="eventLines in movement.eventLines">
                                        <router-link :to="'../movement-line/' + eventLines.id + '/View'">{{eventLines.id}}</router-link>{{last ? '' : ', '}}
                                    </span>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'MovementEdit', params: {movementId: movement.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./movement-details.component.ts">
</script>

