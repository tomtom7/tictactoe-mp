import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

import GameState from './components/game-state.vue';
import CanvasComponent from './components/canvas.vue';
import store from './store/store';

Vue.use(VueSocketIO, 'http://localhost:3000', store);

new Vue({
	el: '#app',
	store,
	components: {
		GameState,
		CanvasComponent
	}
});
