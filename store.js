import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        preView: 'HomeView',
        view: 'HomeView',
        modal: null,
        games: [],
        cards: [],
        game: {},
        play: {
            qty: 0,
            players: [],
            cards: [],
            pins: [],
            logs: [],
            currentCall: '',
            round: 0,
            shift: false,
            result: '',
        },
    }),
    getters: {
        getView(state) {
            return state.view;
        },
        getModal(state) {
            return state.modal;
        },
        getCards(state) {
            return state.cards;
        },
        getGames(state) {
            return state.games;
        },
        getGame(state) {
            return state.game;
        },
        getPlay(state) {
            return state.play;
        }
    },
    actions: {
        changeView(newView) {
            this.preView = this.view;
            this.view = newView;
        },
        storeModal(modal) {
            this.modal = modal;
        },
        clearModal() {
            this.modal = null;
        },
        clearPlay() {
            this.play = {
                qty: 0,
                players: [],
                cards: [],
                pins: [],
                logs: [],
                currentCall: '',
                round: 0,
                shift: false,
                result: '',
            };
        },
        storePlay(play) {
            Object.assign(this.play, play);
        },
        playGame(game) {
            Object.assign(this.game, game);
        },
        async fetchCards() {
            const data = await $fetch('https://6487f23e0e2469c038fcafbe.mockapi.io/api/cards').catch((error) => error.data);
            this.cards.splice(0, this.cards.length)
            this.cards.push(...data);
            return this.cards;
        },
        async updateCard(card) {
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/cards/${card.id}`, { method: 'PUT', body: JSON.stringify(card) }).catch((error) => error.data);
            await this.fetchCards();
        },
        async deleteCard(id) {
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/cards/${id}`, { method: 'DELETE' }).catch((error) => error.data);
            await this.fetchCards();
        },
        async storeCard(card) {
            console.log(card);
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/cards`, { method: 'POST', body: JSON.stringify(card) }).catch((error) => error.data);
            await this.fetchCards();
        },
        async fetchGames() {
            const data = await $fetch('https://6487f23e0e2469c038fcafbe.mockapi.io/api/games').catch((error) => error.data);
            this.games.splice(0, this.games.length)
            this.games.push(...data);
            return this.games;
        },
        async updateGame(game) {
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/games/${game.id}`, { method: 'PUT', body: JSON.stringify(game) }).catch((error) => error.data);
            await this.fetchGames();
        },
        async deleteGame(id) {
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/games/${id}`, { method: 'DELETE' }).catch((error) => error.data);
            await this.fetchGames();
        },
        async storeGame(game) {
            await $fetch(`https://6487f23e0e2469c038fcafbe.mockapi.io/api/games`, { method: 'POST', body: JSON.stringify(game) }).catch((error) => error.data);
            await this.fetchGames();
        }
    },
})