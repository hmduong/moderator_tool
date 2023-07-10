<template>
    <div id="home">
        <img src="~/assets/img/logo.png"
            alt="Transparent Werewolf Png - Wolf Howling In The Distance, Png Download@kindpng.com" />
        <div class="btns">
            <v-btn class="btn" @click="() => store.changeView('GamesView')"> Games </v-btn>
            <v-btn class="btn" @click="() => store.changeView('CardsView')"> Cards </v-btn>
        </div>
    </div>
</template>

<style scoped>
#home {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
    width: 50%;
}

.btns {
    height: 20%;
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.btn {
    background: rgb(15, 131, 63);
    border: 2px solid rgb(255, 247, 203);
    color: rgb(255, 247, 203);
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
}
</script>