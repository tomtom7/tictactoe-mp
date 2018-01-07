<template>
	<div class="center">
		<p id="game-state">{{ $t(gameState) }}</p>
		<button type="button" id="play" class="center" v-if="!isRunning" @click="playerAction">{{ $t(btnText) }}</button>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
	export default {
		name: 'game-state',
		computed: mapGetters([
			'isRunning',
            'btnText',
            'gameState'
        ]),
        methods: mapActions([
        	'playerAction'
        ])
    }
</script>

