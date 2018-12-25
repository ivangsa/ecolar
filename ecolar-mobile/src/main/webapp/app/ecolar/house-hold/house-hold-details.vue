<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="state.houseHold">
                <h2><span v-text="$t('ecolarApp.houseHold.detail.title')">HouseHold</span> {{state.houseHold.name}}</h2>
                <router-link :to="{name: 'AddNewMovement', params: {houseHoldId: state.houseHold.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="plus"></font-awesome-icon>&nbsp;<span v-text="$t('ecolarApp.movement.home.createLabel')"> New Movement</span>
                </router-link>

                <div>
                    TODO añadir movimientos
                </div>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./house-hold-details.component.ts">
</script>

