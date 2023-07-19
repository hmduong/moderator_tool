<template>
    <v-card id="card">
        <div id="discuss-view">
            <div class="game-detail">
                <h2>Round {{ play.round }}</h2>
                <div class="spacer"></div>
                <p>{{ play.qty }}</p>
                <v-btn @click="seePlayers" size="small" icon="mdi-account" color="purple" class="game-btn"></v-btn>
                <v-btn @click="seeCards" size="small" icon="mdi-file-star" color="purple" class="game-btn"></v-btn>
                <v-btn @click="quitGame" size="small" icon="mdi-logout" color="purple" class="game-btn"></v-btn>
            </div>
            <v-card class="pins">
                <v-item-group class="log-inner">
                    <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                        <strong>logs:</strong>
                        <v-btn @click="seeLogs" size="small" icon="mdi-clipboard-text-clock" color="purple"
                            class="game-btn"></v-btn>
                    </div>
                    <v-card class="logs">
                        <v-item v-for="(log, index) in play.pins" :key="index">
                            <p><v-icon>mdi-pin</v-icon>{{ log }}</p>
                        </v-item>
                        <p>Day:</p>
                        <v-item v-for="(log, index) in logs[0]" :key="index">
                            <p>_ {{ log }}</p>
                        </v-item>
                        <p>Night:</p>
                        <v-item v-for="(log, index) in logs[1]" :key="index">
                            <p>_ {{ log }}</p>
                        </v-item>
                    </v-card>
                </v-item-group>
            </v-card>
            <v-card class="targets">
                <div class="target-inner">
                    <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                        <strong v-if="isVote">Vote:</strong>
                        <strong v-else>Deads:</strong>
                        <v-btn @click="aim" size="small" icon="mdi-target-account"
                            :color="targets.length > 0 ? 'warning' : 'purple'" class="game-btn"></v-btn>
                    </div>
                    <v-card class="target-card">
                        <div style="overflow-x: hidden; overflow-y: scroll;">
                            <v-item-group style="display: flex; gap: 5px; flex-wrap: wrap;">
                                <v-item v-for="(player, index) in targets" :key="index">
                                    <v-chip :color="isVote ? 'warning' : 'error'">
                                        {{ player.name }}{{ player.card ? ': ' + player.card.name : '' }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>
                    </v-card>
                </div>
            </v-card>
            <v-btn v-if="isVote" class="btn" @click="vote"> {{ time }} </v-btn>
            <v-btn v-else class="btn" @click="done"> Done </v-btn>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#discuss-view {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.game-detail {
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
}

.game-btn {
    margin-left: 5px;
    border-radius: 5px;
}

.pins {
    width: calc(100% - 20px);
    margin: 5px;
    flex: 6;
    background: rgb(227, 231, 201);
    display: flex;
    flex-direction: column;
}

.pin-inner,
.log-inner,
.target-inner {
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.pin-inner {
    height: 40%;
}

.log-inner {
    height: 60%;
    flex: 6;
}

.target-inner {
    height: 100%;
    flex: 5;
}

.pins-list {
    overflow-x: hidden;
    overflow-y: scroll;
}

.pin,
.logs {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
}

.card {
    width: calc(100% - 20px);
    margin: 5px;
    flex: 4;
    background: rgb(227, 231, 201);
    display: flex;
}

.targets {
    width: calc(100% - 20px);
    flex: 3;
    background: rgb(227, 231, 201);
}

.card-inner {
    padding: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.card-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
}

.card-name {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 5px;
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: 250px;
}

.card-players {
    width: 100%;
    margin-bottom: 5px;
}

.card-call {
    width: 100%;
    flex: 1;
    padding: 5px;
}

.card-btns {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    margin-left: 10px;
}


.card-btn {
    border-radius: 5px;
    margin-bottom: 5px;
}


.spacer {
    flex: 1;
}

.btn {
    height: 60px;
    width: 100%;
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-top: 5px solid rgb(87, 140, 255);
}

.target-card {
    position: relative;
    width: 100%;
    padding: 5px;
    flex: 2;
    gap: 5px;
    display: flex;
}

.aim-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
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
    data: () => ({
        newPlayerName: '',
        targets: [],
        time: 120,
        isVote: true,
        logs: [[], []],
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
        inTarget() {
            return (index) => this.targets.indexOf(index) > -1;
        },
    },
    mounted() {
        Object.assign(this.play, this.store.getPlay);
        const interval = setInterval(() => {
            if (this.isVote) {
                if (this.time > 0) {
                    this.time--;
                } else {
                    this.store.clearModal();
                    this.isVote = false;
                    this.targets = [];
                }
            } else {
                this.time = 0;
                clearInterval(interval);
            }
        }, 1000);
    },
    methods: {
        aim() {
            let props = {
                callback: (players) => {
                    this.targets.splice(0, this.targets.length);
                    this.targets.push(...players);
                },
                players: [...this.play.players.map(player => ({ ...player, card: this.cardDetail(player.card) }))],
                title: 'title',
            };
            this.store.storeModal({
                component: 'Target',
                props: props
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
        vote() {
            this.logs[0] = [];
            if (this.targets.length > 0)
                this.logs[0].push(`${this.targets.map(player => player.name).join(', ')} is voted.`);
            this.isVote = false;
            this.targets = [];
        },
        done() {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    content: 'Are u suar?',
                    choices: [
                        {
                            label: 'Yes',
                            active: () => {
                                this.play.qty -= this.targets.length;
                                this.targets.forEach(player => {
                                    this.play.players.find(p => p.id === player.id).isDead = true;
                                });
                                if (this.targets.length > 0)
                                    this.logs[0].push(`${this.targets.map(player => player.name).join(', ')} is hanged.`);
                                else
                                    this.logs[0].push('Skip vote.');
                                this.store.storePlay(this.play);
                                this.store.clearModal();
                                this.store.changeView({ name: 'ResultView', props: { dPlayers: this.targets, logs: this.logs } });
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
        }
    }
}
</script>