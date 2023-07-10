<template>
    <div id="m-logs">
        <v-expansion-panels class="logs">
            <v-expansion-panel class="log" v-for="(round, index) in logs" :key="index">
                <v-expansion-panel-title>
                    <template v-slot:actions>
                    </template>
                    <div class="brief">
                        round {{ index }}
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-item-group class="pin-inner">
                        <strong>day:</strong>
                        <v-item v-for="(log, index2) in round[0]" :key="index2">
                            <p>_ {{ log }}</p>
                        </v-item>
                    </v-item-group>
                    <v-item-group class="pin-inner">
                        <strong>night:</strong>
                        <v-item v-for="(log, index2) in round[1]" :key="index2">
                            <p>_ {{ log }}</p>
                        </v-item>
                    </v-item-group>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-btn @click="back" class="btn">Back</v-btn>
    </div>
</template>

<style scoped>
#m-logs {
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.log {
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-bottom: 5px solid rgb(255, 60, 60);
    margin-top: 0;
}

.btn {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 60px;
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-top: 5px solid rgb(87, 140, 255);
}
</style>

<script>
import { useStore } from '~/store';

export default {
    setup() {
        const store = useStore();
        return {
            store
        }
    },
    props: {
        logs: Array
    },
    mounted() {
        console.log(this.logs);
    },
    methods: {
        back() {
            this.store.clearModal();
        }
    }
}
</script>