<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('ecolarApp.houseHold.home.title')" id="house-hold-heading">House Holds</span>
        </h2>
        <!--<jhi-alert></jhi-alert>-->
        <br/>
        <div class="table-responsive" v-if="state.houseHolds">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('ecolarApp.houseHold.name')">Name</span></th>
                    <th><span v-text="$t('ecolarApp.houseHold.members')">Members</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="houseHold in state.houseHolds" :key="houseHold.id">
                    <td><span class="btn btn-info" @click="loadHouseHold(houseHold)">{{houseHold.name}}</span></td>
                    <td>
                        <span v-for="members in houseHold.members" :key="members.login">
                            {{members.login}},
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" src="./house-holds.component.ts">
</script>
