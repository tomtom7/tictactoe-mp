<template>
	<canvas id="game-canvas" class="center" v-bind:width="w" v-bind:height="h" @click="onClick"></canvas>
</template>

<script>
	import { mapActions } from 'Vuex';
	import Renderer from '../renderer';
	export default {
		name: 'canvas-component',
		data() {
			return {
				w: '300',
				h: '300',
                renderer: {}
            }
		},
		mounted() {
			this.renderer = new Renderer(this.$el, 100);
        },
		methods: {
			onClick(e) {
				this.playerInput(this.getCursorPosition(e));
			},
			getCursorPosition(e) {
				const rect = this.$el.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				return { x, y };
			},
			...mapActions({
				playerInput: 'playerInput'
			})
		},
		watch: {
			'$store.state.game': function(game)  {
				if (game) {
					this.renderer.render(game);
				}
			}
		}
	}
</script>

