<template>
	<div class="center">
		<p id="game-state">{{ gameState }}</p>
		<button type="button" id="play" class="center" v-if="notStarted" @click="onClick">{{ btnText }}</button>
	</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
	export default {
		name: 'game-state',
		computed: mapGetters({
            notStarted: 'notStarted',
            btnText: 'btnText',
            gameState: 'gameState'
		}),
        methods: mapActions({
			onClick: 'playerAction'
		})
    }
</script>

