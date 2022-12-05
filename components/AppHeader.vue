<template>
	<div>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

		<template v-if="(page !== 'home' && page !== 'about')">
			<span v-if="page !== 'home'"><nuxt-link to="/">Home</nuxt-link></span> / <strong v-text="page"></strong>
		</template>
		<template v-else>
			<strong v-text="page"></strong>&nbsp;
			<span v-if="page !== 'home'"> | <nuxt-link to="/">home</nuxt-link></span>
			<span v-if="page !== 'about'"> | <nuxt-link to="/about">about</nuxt-link></span>
		</template>
		<br />
    <hr />
	</div>
</template>

<script>
	export default {
		props: {page: String},
		data() {
			return {
				show: false
			}
		},
		created () {
			console.log('header created', this.page);
		}
	}
</script>
