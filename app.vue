<template>
  <div id="app">
    <!-- <p style="color: white;">{{ text }}</p> -->
    <component :is="viewComponent" v-bind="view.props" />
    <Modal />
  </div>
</template>

<style>
* {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 0;
}

html {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

body {
  position: relative;
  width: 100%;
  height: 100%;
}

#__nuxt {
  position: relative;
  width: 100%;
  height: 100%;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: rgb(62, 0, 104);
  display: flex;
  align-items: center;
  justify-content: center;
}

#app::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import { useStore } from '~/store';
import Modal from '~/components/Modal';

export default {
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    return {
      store,
    }
  },
  data: () => ({
    props: null
  }),
  computed: {
    view() {
      return this.store.getView
    },
    viewComponent() {
      let view = this.view;
      return defineAsyncComponent(() => import(`./views/${view.name ? view.name : view}.vue`));
    },
  },
  async mounted() {
    await this.getData();
    this.confirmRefresh();
  },
  methods: {
    async getData() {
      if (this.store.getCards.length === 0 && this.store.getGames.length === 0) {
        this.store.storeModal({
          component: 'Loading',
          props: null
        });
        await this.store.fetchCards();
        await this.store.fetchGames();
        this.store.clearModal();
      }
    },
    confirmRefresh() {
      const handler = (event) => {
        event.preventDefault();
        return event.returnValue = "Are you sure you want to leave the page?";
      }
      window.addEventListener("beforeunload", handler, { capture: true });
    }
  }
}
</script>