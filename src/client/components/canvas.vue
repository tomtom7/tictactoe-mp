<template>
	<canvas id="game-canvas" class="center" v-bind:width="w" v-bind:height="h" @click="playerInput(getCursorPosition($event))"></canvas>
</template>

<script>
	import { mapActions } from 'vuex';
	import Renderer from '../renderer';
	export default {
		name: 'canvas-component',
		data() {
			return {
				w: '300',
				h: '300',
        renderer: {},
        tileScale: 100
      }
		},
		mounted() {
			this.renderer = new Renderer(this.$el, this.tileScale);
    },
		computed: {
			game() {
				return this.$store.getters.game;
			}
		},
		methods: {
			...mapActions([
				'playerInput'
      ]),
			getCursorPosition(e) {
				const rect = this.$el.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				return { x, y };
			}
		},
		watch: {
			game() {
				if (this.game) {
					this.renderer.render(this.game);
				}
      }
		}
	}
</script>

