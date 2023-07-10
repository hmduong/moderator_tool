<template>
    <div id="modal" v-if="modal">
        <component :is="modalComponent" v-bind="modal.props" />
    </div>
</template>

<style scoped>
#modal {
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
    computed: {
        modalComponent() {
            let component = this.modal.component;
            return defineAsyncComponent(() => import(`./m-${component}.vue`));
        },
        players() {
            let players = this.store.getPlayers;
            return players;
        },
        modal() {
            let modal = this.store.getModal;
            return modal;
        },
    },
}
</script>