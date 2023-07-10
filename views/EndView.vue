<template>
    <v-card id="card">
        <div id="-view">
            <div class="result">
                <v-item-group class="dps">
                    <p>Deads:</p>
                    <v-item :color="'error'" v-for="(player, index) in dPlayers" :key="index">
                        <v-chip :color="'error'" class="player">
                            {{ player.name }}{{ player.card ? ': ' + player.card.name : '' }}
                        </v-chip>
                    </v-item>
                    <p>Remaining:</p>
                    <v-item :color="'error'" v-for="(player, index) in rPlayers" :key="index">
                        <v-chip :color="'error'" class="player">
                            {{ player.name }}{{ player.card ? ': ' + player.card.name : '' }}
                        </v-chip>
                    </v-item>
                    <v-btn @click="seeLogs"> Logs </v-btn>
                </v-item-group>
            </div>
            <div class="btns">
                <v-btn class="btn" @click="home"> Home </v-btn>
                <v-btn class="btn" @click="again"> Play again </v-btn>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#-view {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.result {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1;
    width: 100%;
    padding: 10px;
}

.dps,
.rmn {
    width: 100%;
    height: 50%;
}

.player {
    margin: 0 5px 5px 0;
}

.btns {
    display: flex;
    width: 100%;
    border-radius: 0;
}

.btn {
    height: 60px;
    flex: 1;
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
            store,
        }
    },
    props: {
        dPlayers: Array,
        logs: Array
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
        show: false,
    }),
    computed: {
        rPlayers() {
            if (this.play.players.length > 0)
                return this.play.players.filter(player => player.isDead === false);
        },
        dPlayers() {
            if (this.play.players.length > 0)
                return this.play.players.filter(player => player.isDead === true);
        },
    },
    mounted() {
        Object.assign(this.play, this.store.getPlay);
    },
    methods: {
        home() {
            this.store.clearPlay();
            this.store.changeView('HomeView');
        },
        again() {
            const game = this.store.getGame;
            this.store.changeView({ name: 'StartView', props: { game: { ...game, cards: game.cards, qty: this.gameQty(game.cards) } } });
        },
        seeLogs() {
            this.store.storeModal({
                component: 'Logs',
                props: {
                    logs: this.play.logs
                }
            });
        },
        gameQty(subCards) {
            return subCards.reduce(
                (accumulator, card) => accumulator + Number(card.qty),
                0
            );
        },
    }
}
</script>