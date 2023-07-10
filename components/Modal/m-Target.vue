<template>
    <div id="m-player">
        <h3>{{ title }}</h3>
        <p v-if="qty">quantity: {{ qty }}</p>
        <p>targets: {{ targetList }}</p>
        <v-item-group class="targets">
            <v-item v-for="(player, index) in players" :key="index">
                <v-chip :color="player.isDead ? 'error' : (inTarget(index) ? 'warning' : null)" class="player"
                    @click="() => togglePlayer(index)">
                    {{ player.name }}{{ player.card ? ': ' + player.card.name : '' }}
                </v-chip>
            </v-item>
        </v-item-group>
        <div class="btns">
            <v-btn class="btn" :disabled="!summitable" @click="submit"> submit </v-btn>
            <v-btn class="btn" @click="() => this.store.storeModal(null)"> Cancel </v-btn>
        </div>
    </div>
</template>

<style scoped>
#m-player {
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        callback: Function,
        players: Array,
        title: String,
        qty: Number
    },
    data: () => ({
        targets: [],
    }),
    computed: {
        summitable() {
            return this.targets.length > 0 && (!this.qty || this.qty === this.targets.length);
        },
        inTarget() {
            return (index) => this.targets.indexOf(index) > -1;
        },
        targetList() {
            if (this.targets.length > 0) return this.targets.map(player => this.playerDetail(player).name).join(', ')
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
        playerDetail(playerId) {
            return { ...this.players[playerId] };
        },
        submit() {
            if (this.summitable) {
                this.callback(this.targets.map(target => this.playerDetail(target)));
                this.store.storeModal(null);
            }
        }
    }
}
</script>