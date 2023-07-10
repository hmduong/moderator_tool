<template>
    <v-card id="card">
        <div class="wrapper">
            <v-form id="form-card" fast-fail ref="cardForm" @submit.prevent="submit">
                <v-card class="form-main">
                    <v-text-field class="input" v-model="card.name" label="Card's name"></v-text-field>
                    <v-text-field class="input" v-model="card.description" label="Card's description"></v-text-field>
                    <v-text-field class="input" v-model="card.code" maxlength="2"
                        :label="`Card's code (${2 - card.code.length} remaining)`"></v-text-field>
                    <v-text-field class="input" v-model="callInput.firstCall" label="First call"
                        :append-inner-icon="'mdi-plus-circle'" @click:append-inner="addFirstCall"></v-text-field>
                    <v-item-group>
                        <v-item v-for="(call, index) in card.firstCalls" :key="index">
                            <v-chip @click="() => removeCall(index, true)" class="call">{{ call }}</v-chip>
                        </v-item>
                    </v-item-group>
                    <v-text-field class="input" v-model="callInput.eachCall" label="Each call"
                        :append-inner-icon="'mdi-plus-circle'" @click:append-inner="addEachCall"></v-text-field>
                    <v-item-group>
                        <v-item v-for="(call, index) in card.eachCalls" :key="index">
                            <v-chip @click="() => removeCall(index, false)" class="call">{{ call }}</v-chip>
                        </v-item>
                    </v-item-group>
                </v-card>
                <div class="btns mt-2">
                    <v-btn class="btn" type="submit">Submit</v-btn>
                    <v-btn class="btn" @click="() => { store.changeView('CardsView') }"> Back </v-btn>
                </div>
            </v-form>
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

.form-main {
    background: #fff;
    width: 100%;
    border-radius: 0;
}

#form-card {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}

.input :deep(.v-input__details) {
    display: none;
}

.call {
    margin: 5px 5px 10px 5px;
}

.btns {
    display: flex;
    width: 100%;
    border-radius: 0;
}

.btn {
    width: 50%;
    height: 60px;
    flex: 1;
    border-radius: 0;
    background: rgb(255, 247, 203);
    border-top: 5px solid rgb(87, 140, 255);
}
</style>

<script>
import { useStore } from '~/store';
import { cardsData, partiesList } from '~/js/mockData';

export default {
    setup() {
        const store = useStore();
        return {
            store,
            cardsData,
            partiesList,
        }
    },
    props: {
        editCard: Object
    },
    data: () => ({
        formRules: [
            value => {
                if (value?.length > 3) return true

                return 'First name must be at least 3 characters.'
            },
        ],
        card: {
            name: null,
            description: null,
            code: '',
            firstCalls: [],
            eachCalls: [],
        },
        callInput: {
            firstCall: null,
            eachCall: null,
        }
    }),
    mounted() {
        if (this.editCard) Object.assign(this.card, this.editCard);
    },
    methods: {
        async submit() {
            const { valid } = await this.$refs.cardForm.validate();
            if (valid) {
                this.store.storeModal({
                    component: 'Loading',
                    props: null
                });
                if (this.editCard) {
                    await this.store.updateCard(this.card);
                } else {
                    await this.store.storeCard(this.card);
                }
                this.store.clearModal();
                this.store.changeView('CardsView');
            }
        },
        addFirstCall() {
            if (this.callInput.firstCall) {
                this.card.firstCalls.push(this.callInput.firstCall);
                this.callInput.firstCall = '';
            }
        },
        addEachCall() {
            if (this.callInput.eachCall) {
                this.card.eachCalls.push(this.callInput.eachCall);
                this.callInput.eachCall = '';
            }
        },
        removeCall(index, isFirst) {
            let array = isFirst ? this.card.firstCalls : this.card.eachCalls;
            array.splice(index, 1);
        }
    }
}
</script>