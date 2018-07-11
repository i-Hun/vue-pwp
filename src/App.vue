<template>
	<div id="app">
		<nav class="navbar is-transparent">
			<div class="navbar-brand">
				<router-link :to="{name: 'Main', query: {}}" class="navbar-item">
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

	.content a, .card a
		&:link
			border-bottom: 1px solid rgba(0,137,255,.3)
			transition: color .3s ease,border-color .3s ease

		&:visited
			color: #b40eb4
			border-color: rgba(180,14,180,.3)

		&:hover
			color: #f41224
			border-color: rgba(244,18,36,.3)

		.navbar-burger span:nth-child(3)
			top: calc(50% + 4px)
</style>