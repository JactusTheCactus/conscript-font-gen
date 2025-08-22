<!-- App.vue -->
<template>
	<div id="app">
		<nav>
			<router-link to="/">Home</router-link>
		</nav>
		<router-view />
	</div>
</template>


<script setup>
// nothing special needed here if you’re just adding a link
</script>

<style>
nav {
	padding: 1rem;
	background: #f5f5f5;
}

nav a {
	margin-right: 1rem;
	text-decoration: none;
	color: #42b983;
}

nav a.router-link-exact-active {
	font-weight: bold;
}
</style>
