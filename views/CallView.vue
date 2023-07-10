<template>
    <v-card id="card">
        <div id="call-view">
            <div class="game-detail">
                <h2>Round {{ play.round }}</h2>
                <div class="spacer"></div>
                <p>{{ play.qty }}</p>
                <v-btn @click="seePlayers" size="small" icon="mdi-account" color="purple" class="game-btn"></v-btn>
                <v-btn @click="seeCards" size="small" icon="mdi-file-star" color="purple" class="game-btn"></v-btn>
                <v-btn @click="quitGame" size="small" icon="mdi-logout" color="purple" class="game-btn"></v-btn>
            </div>
            <v-card class="pins">
                <v-item-group class="pin-inner">
                    <strong>pins:</strong>
                    <v-card class="pin">
                        <v-item v-for="(log, index) in play.pins" :key="index">
                            <p>_ {{ log }}</p>
                        </v-item>
                    </v-card>
                </v-item-group>
                <v-item-group class="log-inner">
                    <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                        <strong>logs:</strong>
                        <v-btn @click="seeLogs" size="small" icon="mdi-clipboard-text-clock" color="purple"
                            class="game-btn"></v-btn>
                    </div>
                    <v-card class="logs">
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
            <v-card class="card">
                <div class="card-inner">
                    <div class="card-head">
                        <h2 class="card-name">{{ currentCard.name }}
                        </h2>
                        <div class="card-btns">
                            <v-btn size="small" @click="nextClick" class="card-btn"
                                :color="firstClick.next ? 'success' : 'purple'"
                                :icon="!firstClick.next ? 'mdi-skip-next' : 'mdi-check'"></v-btn>
                            <v-btn size="small" @click="passClick" class="card-btn"
                                :color="firstClick.pass ? 'warning' : 'purple'"
                                :icon="!firstClick.pass ? 'mdi-debug-step-over' : 'mdi-check'"></v-btn>
                        </div>
                    </div>
                    <div class="card-body">
                        <v-item-group class="card-players" v-if="play.currentCall && play.currentCall.type !== '@'">
                            <v-item v-for="(player, index) in currentCard.players" :key="index">
                                <v-chip :color="playerDetail(player.id).isDead ? 'error' : ''" style="margin-right: 5px;">
                                    {{ player.name }}
                                </v-chip>
                            </v-item>
                        </v-item-group>
                        <v-card :color="firstClick.next ? 'green' : (firstClick.pass ? 'warning' : '')" class="card-call">
                            <div @click="targetHandler" class="aim-btn"></div>
                            <h4>
                                <v-icon>mdi-pencil</v-icon>{{ play.currentCall ?
                                    play.currentCall.content : '' }} [{{ callReply }}]
                            </h4>
                        </v-card>
                    </div>
                </div>
            </v-card>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#call-view {
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

.pin-inner {
    height: 40%;
}

.log-inner {
    height: 60%;
    flex: 6;
}

.pin-inner,
.log-inner {
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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

.pins-list {
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

.card-inner {
    padding: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.card-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    max-width: 200px;
}

.card-players {
    width: 100%;
    margin-bottom: 5px;
}

.card-call {
    position: relative;
    width: 100%;
    flex: 1;
    padding: 5px;
}

.aim-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.card-btns {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin-bottom: 5px;
}


.card-btn {
    border-radius: 5px;
    margin-left: 5px;
}


.spacer {
    flex: 1;
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
        firstClick: {
            next: false,
            pass: false,
        },
    }),
    computed: {
        calls() {
            return this.play.cards.reduce(
                (acc, card) => {
                    let cardDetail = this.cardDetail(card.id);
                    let calls = this.play.round === 0 ? cardDetail.firstCalls : cardDetail.eachCalls;
                    return [...acc, ...calls.map(call => (this.genCall(cardDetail.id, call)))];
                },
                []
            );
        },
        currentCard() {
            let card = {
                name: '',
                players: [],
            }
            if (this.play.currentCall) Object.assign(card, this.cardDetail(this.play.currentCall.card));
            return card;
        },
        cards() {
            return this.store.getCards;
        },
        callReply() {
            if (this.play.currentCall) {
                let type = this.play.currentCall.type;
                if (type !== '%') {
                    return this.play.targets.map(player => player.name).join(', ');
                } else return this.play.agree ? 'Yes' : 'No';
            }
        }
    },
    mounted() {
        Object.assign(this.play, this.store.getPlay);
        if (this.calls[0]) this.play.currentCall = this.calls[0];
    },
    methods: {
        next() {
            this.saveLog();
            this.pass();
        },
        saveLog() {
            let log = '';
            if (this.play.currentCall.type === '#') {
                if (this.play.targets.length > 0) log = this.play.currentCall.content + ' [' + this.play.targets.map(player => player.name + (player.card ? `: ${this.cardDetail(player.card.id).name}` : '')).join(',') + ']';
            } else if (this.play.currentCall.type === '@') {
                log = this.play.currentCall.content + ' [' + this.play.targets.map(player => player.name).join(',') + ']';
                if (this.play.targets.length > 0) {
                    this.play.cards.find(card => card.id === this.play.currentCall.card).players = [...this.play.targets];
                    this.play.targets.forEach(player => { this.play.players[player.id].card = this.play.currentCall.card });
                }
            } else if (this.play.currentCall.type === '%') {
                if (this.play.agree) log = this.play.currentCall.content + '(Yes)';
            }
            if (log && this.play.currentCall.type !== '@') this.logs[1].push(log);
            let pin = 'R' + this.play.round + ': ' + log;
            if (pin && this.play.currentCall.pin) this.play.pins.push(pin);
        },
        pass() {
            if (this.calls.length === this.play.turn + 1) {
                if (this.play.round === 0) this.play.players.forEach(player => {
                    if (player.card === null) player.card = this.cards.find(card => card.code === 'DL').id;
                });
                this.play.turn = 0;
                this.play.currentCall = this.calls[0];
                this.play.targets = [];
                this.play.agree = false;
                this.store.storePlay(this.play);
                this.store.changeView({ name: 'SynthView', props: { logs: this.logs } });
            } else {
                this.play.currentCall = this.calls[++this.play.turn];
                this.play.targets = [];
                this.play.agree = false;
            }
        },
        genCall(id, call) {
            let type = '+';
            let pin = false;
            if (call[0] === '#') {
                call = call.substring(1);
                type = '#';
            } else if (call[0] === '@') {
                call = call.substring(1);
                type = '@';
                pin = true;
            } else if (call[0] === '%') {
                call = call.substring(1);
                type = '%';
            }
            if (call[0] === '^') {
                call = call.substring(1);
                pin = true;
            }
            return ({
                content: call,
                type: type,
                card: id,
                pin: pin
            })
        },
        cardDetail(cardId) {
            if (cardId || cardId === 0)
                return { ...this.cards.find(card => card.id === cardId), ...this.play.cards.find(card => card.id === cardId) }
            else return null;
        },
        playerDetail(playerId) {
            if (playerId || playerId === 0)
                return this.play.players.find(player => player.id == playerId);
            else return null;
        },
        nextClick() {
            if (!this.firstClick.next) {
                this.firstClick.next = true;
                this.firstClick.pass = false;
            } else {
                this.next();
                this.firstClick.next = false
            }
        },
        passClick() {
            if (!this.firstClick.pass) {
                this.firstClick.next = false;
                this.firstClick.pass = true;
            } else {
                this.pass();
                this.firstClick.pass = false
            }
        },
        targetHandler() {
            if (this.play.currentCall.type === '%') {
                this.firstClick.next = false;
                this.firstClick.pass = false;
                this.play.agree = !this.play.agree;
            } else {
                this.firstClick.next = false;
                this.firstClick.pass = false;
                let props = {
                    callback: (players) => {
                        this.play.targets.splice(0, this.play.targets.length);
                        this.play.targets.push(...players);
                    },
                    players: [...this.play.players.map(player => ({ ...player, card: this.cardDetail(player.card) }))],
                    title: this.play.currentCall.content,
                    qty: this.play.currentCall.type === "@" ? this.cardDetail(this.play.currentCall.card).qty : null,
                };
                this.store.storeModal({
                    component: 'Target',
                    props: props
                });
            }
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
        }
    }
}
</script>