import Vue from 'vue';
import VuexI18n from 'vuex-i18n';
import VueSocketIO from 'vue-socket.io';

import GameState from './components/game-state.vue';
import CanvasComponent from './components/canvas.vue';
import localeEn from './locale/en';
import store from './store/store';

Vue.use(VueSocketIO, 'http://localhost:3000', store);
Vue.use(VuexI18n.plugin, store, {
	moduleName: 'i18n',
	onTranslationNotFound(locale, key) {
		console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
	},
});

Vue.i18n.add('en', Vue.i18n.add('en', localeEn));
Vue.i18n.set('en');

new Vue({
	el: '#app',
	store,
	components: {
		GameState,
		CanvasComponent,
	},
});
