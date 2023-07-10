<template>
    <v-card id="card">
        <div id="start-game">
            <v-card class="settings">
                <v-card class="add-player">
                    <v-text-field v-model="newPlayerName" :disabled="slotLeft === 0" label="Add new player"
                        :append-inner-icon="'mdi-plus-circle'" @click:append-inner="addPlayer()"></v-text-field>
                </v-card>
                <v-item-group class="mb-4" style="margin-bottom: 10px;">
                    Players({{ slotLeft }} slot left):
                    <v-item v-for="(player, index) in players" :key="index">
                        <v-chip style="margin-right: 5px; margin-bottom: 5px;" @click="() => removePlayer(index)">
                            {{ player.name }}
                        </v-chip>
                    </v-item>
                </v-item-group>
                <div class="spacer"></div>
                <v-item-group style="margin-bottom: 10px;">
                    Cards:
                    <v-item v-for="(card, index) in cardsListDetail(game.cards)" :key="index">
                        <v-chip style="margin-bottom: 5px; margin-right: 5px;">
                            {{ card.name }}: {{ card.qty }}
                        </v-chip>
                    </v-item>
                </v-item-group>
            </v-card>
            <div class="btns">
                <v-btn class="btn" @click="startGame" :disabled="slotLeft !== 0"> Start </v-btn>
                <v-btn class="btn" @click="() => { store.changeView('GamesView') }"> Back </v-btn>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#start-game {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.settings {
    width: 100%;
    flex: 1;
    padding: 10px;
    display: flex;
    border-radius: 0;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.settings>* {
    width: 100%;
}

.add-player {
    width: 100%;
    margin: 0 0 10px 0;
}

.game {
    width: 90%;
    flex: 1;
}

:deep(.v-input__details) {
    display: none;
}

.start-btn {
    height: 60px;
    width: 100%;
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-top: 5px solid rgb(87, 140, 255);
}

.spacer {
    flex: 1;
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
            store
        }
    },
    props: {
        game: Object
    },
    data: () => ({
        newPlayerName: '',
        players: [],
    }),
    computed: {
        slotLeft() {
            return this.game.qty - this.players.length;
        },
        cards() {
            return this.store.getCards;
        }
    },
    methods: {
        cardsListDetail(subCards) {
            return subCards.map(subCard => {
                let res = this.cards.find(card => card.id === subCard.id)
                return { ...res, qty: subCard.qty }
            })
        },
        startGame() {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    title: `Lưu ý!`,
                    content: 'Hãy đảm bảo rằng tất cả người chơi đã nhận được lá bài và nắm rõ chức năng của mình.',
                    choices: [
                        {
                            label: 'OK',
                            active: () => {
                                const play = {
                                    cards: [...this.game.cards],
                                    qty: this.game.qty,
                                    players: this.players.map((player, index) => ({ ...player, id: index }))
                                }
                                this.store.storePlay(play);
                                this.store.clearModal();
                                this.store.changeView({ name: 'CallView', props: { logs: [[], []] } });
                            }
                        },
                    ]
                }
            });
        },
        addPlayer() {
            if (this.newPlayerName) {
                this.players.push({
                    name: this.newPlayerName,
                    isDead: false,
                    card: null
                }),
                    this.newPlayerName = '';
            }
        },
        removePlayer(index) {
            this.players.splice(index, 1);
        }
    }
}
</script>