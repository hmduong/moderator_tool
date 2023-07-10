<template>
    <v-card id="card">
        <v-form id="form-game" fast-fail ref="gameForm" @submit.prevent="submit">
            <div class="form-main">
                <v-text-field v-model="game.name" label="Game title"></v-text-field>
                <v-text-field v-model="game.description" label="Game description"></v-text-field>
                <v-item-group id="inner">
                    <strong>{{ gameQty }}</strong> Players:
                    <v-item v-for="(card, index) in game.cards" :key="index">
                        <!-- @touchmove="e => touchmoveHandler(e, index)" @touchend="e => dropHandler(e, index)" @dragstart="dragstartHandler" draggable="true" -->
                        <v-chip :id="`card-${index}`" style="margin: 3px;">
                            <v-chip style="margin-left: -10px; margin-right: 5px; font-weight: 700; font-size: 25px;"
                                @click="() => reduceCard(card.id)" :color="'error'">-</v-chip>
                            {{ cardDetail(card.id).name }}:
                            {{ card.qty }}
                        </v-chip>
                    </v-item>
                </v-item-group>
                <v-card class="add-card inner">
                    Add:
                    <v-item-group class="card-btns">
                        <v-item v-for="(card, index) in cards" :key="index">
                            <v-btn style="padding: 0" @click="() => addCard(card.id)">{{ card.name
                            }}</v-btn>
                        </v-item>
                    </v-item-group>
                </v-card>
                <p style="margin-top: 5px;">Thứ tự gọi: <strong>{{ callFlow }}</strong> <span @click="sort"
                        class="sort">Chỉnh
                        sửa</span></p>
            </div>
            <div class="btns">
                <v-btn class="btn" type="submit"> Submit </v-btn>
                <v-btn class="btn" @click="() => { store.changeView('GamesView') }"> Back </v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<style scoped>
#card {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}

#form-game {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.form-main {
    background: #fff;
    width: 100%;
    border-radius: 0;
}

#inner {
    position: relative;
    width: calc(100% - 20px);
    margin: 10px auto;
}

.add-card {
    background: #ccc;
    padding: 10px;
}

.card-btns {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 5px;
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

.sort {
    text-decoration: underline;
    color: blueviolet;
}

:deep(.v-input__details) {
    display: none;
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
        editGame: Object
    },
    data: () => ({
        formRules: [value => {
            if (value?.length > 3) return true

            return 'First name must be at least 3 characters.'
        },],
        game: {
            title: '',
            description: '',
            qty: 0,
            cards: []
        },
        cards: [],
        gameQty: 0,
        dragment: {
            posX: 0,
            posY: 0,
            onEvent: false,
        },
        screenWidth: window.innerWidth,
    }),
    computed: {
        mapCard() {
            return (id) => this.game.cards.find(card => card.id === id);
        },
        callFlow() {
            return this.game.cards.map(card => this.cardDetail(card.id).name).join(', ');
        },
        short() {
            return this.screenWidth < 760;
        }
    },
    mounted() {
        this.cards = this.store.getCards;
        if (this.editGame) Object.assign(this.game, this.editGame);
        this.gameQty = this.game.cards.reduce(
            (accumulator, card) => accumulator + Number(card.qty),
            0
        );
    },
    methods: {
        async submit() {
            const { valid } = await this.$refs.gameForm.validate();
            if (valid) {
                this.store.storeModal({
                    component: 'Loading',
                    props: null
                });
                if (this.editGame) {
                    await this.store.updateGame(this.game);
                } else {
                    await this.store.storeGame(this.game);
                }
                this.store.clearModal();
                this.store.changeView('GamesView');
            }
        },
        cardDetail(cardId) {
            return this.cards.find(card => card.id === cardId)
        },
        addCard(cardId) {
            this.gameQty++;
            let card = this.game.cards.find(card => card.id === cardId);
            if (card) card.qty++;
            else this.game.cards.push({ id: cardId, qty: 1 });
        },
        reduceCard(cardId) {
            this.gameQty--;
            let card = this.game.cards.find(card => card.id === cardId);
            if (card.qty === 1) {
                const index = this.game.cards.indexOf(card);
                if (index > -1) {
                    this.game.cards.splice(index, 1);
                }
            }
            else card.qty--;
        },
        sort() {
            console.log('sort');
        },
        touchmoveHandler(e, i) {
            e.preventDefault();
            let entity = document.getElementById('card-' + i);
            let inner = document.getElementById('inner');
            var touchLocation = e.targetTouches[0];
            if (!this.dragment.onEvent) {
                this.dragment.posX = touchLocation.pageX - (entity.offsetLeft - inner.offsetLeft);
                this.dragment.posY = touchLocation.pageY - (entity.offsetTop - inner.offsetTop) - 134;
            }
            entity.style.position = 'absolute'
            entity.style.left = (touchLocation.pageX - this.dragment.posX) + 'px';
            entity.style.top = (touchLocation.pageY - this.dragment.posY) + 'px';
            console.log('touchmoveHandler', touchLocation.pageY);
            this.dragment.onEvent = true;
        },
        dropHandler(e, i) {
            let entity = document.getElementById('card-' + i);
            console.log(e);
            // var touchLocation = e.targetTouches[0];
            // entity.style.position = 'inherit';/
            this.dragment.onEvent = false;
        },
        dragstartHandler(e) {
            // ev.dataTransfer.setData("application/my-app", ev.target.id);
            // ev.dataTransfer.effectAllowed = "move";/
            console.log(e);
        }
    },
    created() {
        window.addEventListener("resize", () => {
            this.screenWidth = window.innerWidth;
        });
    },
    unmounted() {
        window.removeEventListener("resize", () => {
            this.screenWidth = window.innerWidth;
        });
    }
}
</script>