<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="movementLine">
                <h2><span v-text="$t('ecolarApp.movementLine.detail.title')">MovementLine</span> {{movementLine.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('ecolarApp.movementLine.amount')">Amount</span></dt>
                        <dd>
                                <span>{{movementLine.amount}}</span>
                        </dd>
                        <dt><span v-text="$t('ecolarApp.movementLine.eventType')">Event Type</span></dt>
                        <dd>
                                <span v-text="$t('ecolarApp.LineType.' + movementLine.eventType)">{{movementLine.eventType}}</span>
                        </dd>

                        <dt><span v-text="$t('ecolarApp.movementLine.account')">Account</span></dt>
                        <dd>
                                        <div v-if="movementLine.account">
                                            <router-link :to="'../e-account/' + movementLine.account.id + '/View'">{{movementLine.account.accountName}}</router-link>
                                        </div>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'MovementLineEdit', params: {movementLineId: movementLine.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./movement-line-details.component.ts">
</script>

