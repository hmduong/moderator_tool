<template>
    <div id="m-cards">
        <v-expansion-panels class="cards">
            <v-expansion-panel class="card" v-for="(card, index) in cards" :key="index">
                <v-expansion-panel-title>
                    <template v-slot:actions>
                    </template>
                    <div class="brief">
                        {{ card.name }}
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="card-info">
                        <p>{{ card.qty }} Player</p>
                        <p>{{ card.description }}</p>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-btn @click="back" class="btn">Back</v-btn>
    </div>
</template>

<style scoped>
#m-cards {
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.card {
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
        cards: Array,
    },
    mounted() {
        console.log(this.cards);
    },
    methods: {
        back() {
            this.store.clearModal();
        }
    }
}
</script>