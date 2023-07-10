<template>
    <div id="m-players">
        <v-expansion-panels class="cards">
            <v-expansion-panel class="card" v-for="(player, index) in players" :key="index">
                <v-expansion-panel-title :color="player.isDead ? 'error' : ''">
                    <template v-slot:actions>
                    </template>
                    <div>
                        {{ player.name }}
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div>
                        <p>{{ cardDetail(player.card).name }}</p>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-btn @click="back" class="btn">Back</v-btn>
    </div>
</template>

<style scoped>
#m-players {
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
        players: Array,
    },
    data: () => ({
        play: {
            qty: 0,
            players: [],
            cards: [],
            pins: [],
            logs: [],
            currentCall: null,
            targets: [],
            agree: false,
            turn: 0,
            shift: false,
            round: 0,
        },
    }),
    computed: {
        cards() {
            return this.store.getCards;
        },
    },
    mounted() {
        Object.assign(this.play, this.store.getPlay);
    },
    methods: {
        back() {
            this.store.clearModal();
        },
        cardDetail(cardId) {
            if (cardId || cardId === 0)
                return { ...this.cards.find(card => card.id === cardId), ...this.play.cards.find(card => card.id === cardId) }
            else return null;
        },
    }
}
</script>