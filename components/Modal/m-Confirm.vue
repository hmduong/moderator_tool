<template>
    <div id="m-confirm">
        <v-card class="card">
            <div>
                <h2>{{ title }}</h2>
                <p>{{ content }}</p>
                <div class="btns">
                    <v-btn class="btn" v-for="(choice, index) in choices" :key="index" @click="choice.active"
                        :color="choice.color || 'default'">{{
                            choice.label
                        }}</v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
#m-confirm {
    background: rgba(156, 154, 154, 0.8);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.card {
    width: 90%;
    min-height: 150px;
    max-height: 200px;
    padding: 20px;
}

.card>div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.card h2 {
    width: 100%;
}

.targets {
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.player {
    margin: 5px;
}

.btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.btn {
    margin-left: 20px;
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
        title: String,
        content: String,
        choices: Array
    },
    data: () => ({
        targets: []
    }),
    computed: {
        summitable() {
            return this.targets.length > 0 && (!this.quantity || this.quantity === this.targets.length);
        },
        inTarget() {
            return (index) => this.targets.indexOf(index) > -1;
        }
    },
    mounted() {
        this.backupPlayers = this.players;
    },
    methods: {
        togglePlayer(index) {
            const player = this.players[index];
            if (!player.isDead) {
                if (this.inTarget(index)) {
                    let pos = this.targets.indexOf(index);
                    this.targets.splice(pos, 1);
                }
                else this.targets.push(index);
            }
        },
        submit() {
            if (this.summitable) {
                this.callback(this.targets.map(target => this.players[target]));
                this.store.storeModal(null);
            }
        }
    }
}
</script>