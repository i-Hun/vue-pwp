<template>
	<div id="app">
		<nav class="navbar is-transparent">
			<div class="navbar-brand">
				<router-link :to="{query: {}}" class="navbar-item">
					<p class="is-5 title">Oleg Nagornyy</p>
				</router-link>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>


<script>
	import {router} from './main.js';


	export default {
		name: "app",
		data: () => ({

		})
	}

</script>

<style lang="sass">
	@import 'styles/custom.scss'
	.is-transparent
		background-color: transparent
</style>