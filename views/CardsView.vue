<template>
    <v-card id="card">
        <div class="wrapper">
            <v-expansion-panels v-if="cards.length > 0" class="cards">
                <v-expansion-panel class="card" v-for="(card, index) in cards" :key="index">
                    <v-expansion-panel-title>
                        <template v-slot:actions>
                        </template>
                        <div class="brief">
                            <div class="title">
                                <div class="avatar">{{ card.code.toUpperCase() }}</div>
                                <p>{{ card.name }}</p>
                            </div>
                            <div class="brief-btns">
                                <v-btn icon="mdi-pencil" color="warning" size="small" @click="() => editCard(card)"></v-btn>
                                <v-btn style="margin-left: 10px;" icon="mdi-delete" size="small" :color="'error'"
                                    @click="() => deleteCard(card.id)"></v-btn>
                            </div>
                        </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                            <div style="flex: 1;">
                                <p>{{ card.description }}</p>
                            </div>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="no-data">
                Empty
            </div>
            <div class="btns">
                <v-btn class="btn" @click="() => store.changeView('FormCardView')"> Create Card </v-btn>
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

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.cards {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.card {
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-bottom: 5px solid rgb(255, 60, 60);
    margin-top: 0;
}

.brief {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border: 3px solid rgb(87, 140, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 300;
    color: rgb(79, 156, 3);
    margin-right: 5px;
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

.no-data {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
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
    data: () => ({
        cards: []
    }),
    mounted() {
        this.cards = this.store.getCards;
    },
    methods: {
        editCard(card) {
            this.store.changeView({ name: 'FormCardView', props: { editCard: card } });
        },
        deleteCard(id) {
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
                                await this.store.deleteCard(id);
                                this.cards = this.store.getCards;
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