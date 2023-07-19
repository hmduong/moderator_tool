<template>
    <v-card id="card">
        <div id="result-view">
            <div class="result">
                <v-item-group class="dps">
                    Deads:
                    <v-item :color="'error'" v-for="(player, index) in dPlayers" :key="index">
                        <v-chip :color="'error'" class="player">
                            {{ player.name }}{{ player.card ? ': ' + player.card.name : '' }}
                        </v-chip>
                    </v-item>
                </v-item-group>
                <div class="rmn">
                    <p>{{ play.qty }} remaining: <span @click="toggleShow">{{ '<detail>' }}</span></p>
                    <div class="remaining">
                        <v-item-group class="players" v-if="show">
                            <v-item v-for="(player, index) in rPlayers" :key="index">
                                <v-chip class="player">
                                    {{ player.name }}{{ player.card ? ': ' + cardDetail(player.card).name : '' }}
                                </v-chip>
                            </v-item>
                        </v-item-group>
                    </div>
                </div>
            </div>
            <div class="btns">
                <v-btn class="btn" @click="continues"> {{ play.shift ? 'Discussion' : 'Sleep' }} </v-btn>
                <v-btn class="btn" @click="endGame"> End game </v-btn>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#result-view {
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
        cards() {
            return this.store.getCards;
        },
    },
    mounted() {
        Object.assign(this.play, this.store.getPlay);
    },
    methods: {
        continues() {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    content: 'OK?',
                    choices: [
                        {
                            label: 'Yes',
                            active: () => {
                                this.play.shift = !this.play.shift;
                                this.store.storePlay(this.play);
                                this.store.clearModal();
                                this.store.changeView(!this.play.shift ? 'DiscussionView' : { name: 'CallView', props: { logs: this.logs } });
                            }
                        },
                        {
                            label: 'No',
                            active: () => {
                                this.store.clearModal();
                            }
                        },
                    ]
                }
            });
        },
        endGame() {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    content: 'End game???',
                    choices: [
                        {
                            label: 'Yes',
                            active: () => {
                                this.play.shift = false;
                                this.store.storePlay(this.play);
                                this.store.clearModal();
                                this.store.changeView('EndView');
                            }
                        },
                        {
                            label: 'No',
                            active: () => {
                                this.store.clearModal();
                            }
                        },
                    ]
                }
            });
        },
        cardDetail(cardId) {
            return { ...this.cards.find(card => card.id === cardId), ...this.play.cards.find(card => card.id === cardId) }
        },
        seeCards() {
            let props = {
                cards: this.play.cards.map(card => this.cardDetail(card.id)),
            };
            this.store.storeModal({
                component: 'Cards',
                props: props
            });
        },
        seePlayers() {
            let props = {
                players: this.play.players,
            };
            this.store.storeModal({
                component: 'Players',
                props: props
            });
        },
        seeLogs() {
            this.store.storeModal({
                component: 'Logs',
                props: {
                    logs: this.play.logs
                }
            });
        },
        quitGame() {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    content: 'Quit game ưtf???',
                    choices: [
                        {
                            label: 'Yes',
                            active: () => {
                                this.store.clearModal();
                                this.store.clearPlay();
                                this.store.changeView('HomeView');
                            }
                        },
                        {
                            label: 'No',
                            active: () => {
                                this.store.clearModal();
                            }
                        },
                    ]
                }
            });
        },
        toggleShow() {
            this.show = !this.show;
        }
    }
}
</script>