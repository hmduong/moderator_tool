<template>
    <v-card id="card">
        <div id="games">
            <v-expansion-panels v-if="games.length > 0" class="games">
                <v-expansion-panel class="game" v-for="(game, index) in games" :key="index">
                    <v-expansion-panel-title>
                        <template v-slot:actions>
                        </template>
                        <div class="title">
                            <p>{{ game.name }}</p>
                            <v-btn style="margin-left: 20px;" icon="mdi-play" color="success" size="x-large"
                                @click="() => startGame(game)"></v-btn>
                        </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text style="padding: 0;">
                        <div class="detail">
                            <p>{{ game.description }}</p>
                            <v-item-group>
                                {{ gameQty(game.cards) }} players:
                                <v-item v-for="(card, index2) in cardsListDetail(game.cards)" :key="index2">
                                    <v-chip style="margin-bottom: 5px;margin-right: 5px;">
                                        {{ card.name }}: {{ card.qty }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                            <div class="option-btns">
                                <v-btn icon="mdi-pencil" size="small" color="warning" @click="() => editGame(game)"></v-btn>
                                <v-btn style="margin-left: 10px;" icon="mdi-delete" size="small" :color="'error'"
                                    @click="() => deleteGame(game.id)"></v-btn>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="no-data">
                Empty
            </div>
            <div class="btns">
                <v-btn class="btn" @click="() => store.changeView('FormGameView')"> Create Game </v-btn>
                <v-btn class="btn" @click="() => { store.changeView('HomeView') }"> Back </v-btn>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#games {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.games {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.game {
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-bottom: 5px solid rgb(255, 60, 60);
    margin-top: 0;
}

.title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.game-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 0;
}


.option-btns {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
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

.create-btn {
    height: 60px;
    width: 100%;
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-top: 5px solid rgb(87, 140, 255);
}

.no-data {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 10px 20px;
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
        games: [],
        cards: []
    }),
    mounted() {
        this.games = this.store.getGames;
        this.cards = this.store.getCards;
    },
    methods: {
        cardsListDetail(subCards) {
            return subCards.map(subCard => {
                let res = this.cards.find(card => card.id === subCard.id)
                return { ...res, qty: subCard.qty }
            })
        },
        gameQty(subCards) {
            return subCards.reduce(
                (accumulator, card) => accumulator + Number(card.qty),
                0
            );
        },
        startGame(game) {
            this.store.playGame(game);
            this.store.changeView({ name: 'StartView', props: { game: { ...game, cards: game.cards, qty: this.gameQty(game.cards) } } });
        },
        editGame(game) {
            this.store.changeView({ name: 'FormGameView', props: { editGame: game } });
        },
        deleteGame(id) {
            this.store.storeModal({
                component: 'Confirm',
                props: {
                    title: `Delete ${id}?`,
                    choices: [
                        {
                            label: 'Cancel',
                            active: () => {
                                this.store.clearModal();
                            }
                        },
                        {
                            label: 'Delete',
                            color: 'error',
                            active: async () => {
                                this.store.storeModal({
                                    component: 'Loading',
                                    props: null
                                });
                                await this.store.deleteGame(id);
                                this.games = this.store.getGames;
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