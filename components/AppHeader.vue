<template>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

	<div class="max-w-5xl mx-auto h-14 flex justify-between items-center mb-8 bg-white rounded-b-lg">
		<nuxt-link to="/" class="relative inline-block bg-white pr-16 rounded-bl-lg">
			<img src="/img/greenerland_logo.jpg" width="142" alt="Greener.land" class="ml-1 p-1 rounded-lg" />
		</nuxt-link>
		<div class="h-14 flex text-white uppercase text-sm ">
			<nuxt-link class="h-full px-4 flex items-center bg-green-700 hover:brightness-110 border-r border-green-300" to="/getstarted">Get Started</nuxt-link>
			<nuxt-link class="h-full px-4 flex items-center bg-green-700 hover:brightness-110 border-r border-green-300" to="/about">About</nuxt-link>
			<nuxt-link class="h-full px-4 flex items-center bg-green-700 hover:brightness-110 rounded-br-lg" to="/contactus">Contact Us</nuxt-link>
		</div>
	</div>
</template>

<script>
	// export default {
	// 	props: {page: String},
	// 	data() {
	// 		return {
	// 			show: false
	// 		}
	// 	},
	// 	created () {
	// 	}
	// }
</script>
